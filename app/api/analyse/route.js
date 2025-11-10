import { NextResponse } from "next/server";
import { z } from "zod";

import { score } from "@/lib/score";
import { extractTextFromFile } from "@/lib/parse";

export const runtime = "nodejs";

const MAX_JD_CHARS = 4000;
const MAX_RESUME_CHARS = 200000;
const MODEL = "llama-3.3-70b-versatile";

// ---------------- Helpers ------------------

const SkillsArray = z.array(z.string().trim().min(1)).max(200).optional();

function coerceSkills(form) {
  const all = form.getAll("skills");
  if (all.length > 1) {
    const parsed = SkillsArray.safeParse(all.map(String));
    return parsed.success ? parsed.data : [];
  }

  const raw = form.get("skills");
  if (typeof raw === "string") {
    try {
      const parsed = SkillsArray.safeParse(JSON.parse(raw));
      return parsed.success ? parsed.data : [];
    } catch {
      return [];
    }
  }

  return [];
}

function trimCap(input, max) {
  return input.length > max ? input.slice(0, max) : input;
}

function badRequest(msg) {
  return NextResponse.json({ error: msg }, { status: 400 });
}

function serverError(err) {
  const msg =
    typeof err === "object" && err && "message" in err
      ? String(err.message)
      : "Internal error";

  return NextResponse.json({ error: msg }, { status: 500 });
}

function promptParts(resumeText, jd) {
  const system =
    "You are a precise resume analyst. Return JSON with keys: missing_skills[], weak_skills[], grammar_fixes[], ats_warnings[], summary_improved_short, summary_improved_long.";

  const user = `RESUME:
${resumeText}

TARGET_JD: ${jd}

Requirements:
- missing_skills: rank by impact, job-relevant only
- weak_skills: present but lacking depth
- grammar_fixes: {before, after, reason}
- ats_warnings: actionable and short
- summary_improved_short: 150-220 chars
- summary_improved_long: 2-3 lines

Return JSON only.
`;

  return { system, user };
}

function safeJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

async function getAI(resumeText, jd) {
  const { system, user } = promptParts(resumeText, jd);

  const grokRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROK_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0,
      max_tokens: 2000,
    }),
  });

  if (!grokRes.ok) {
    const text = await grokRes.text();
    throw new Error("Groq API error: " + text);
  }

  const data = await grokRes.json();
  const txt = data.choices?.[0]?.message?.content?.trim() || "";

  let parsed = safeJson(txt);
  if (!parsed) {
    const match = txt.match(/\{[\s\S]*\}/);
    parsed = match ? safeJson(match[0]) : undefined;
  }

  return parsed || {};
}

// ---------------- Route Handler ------------------

export async function POST(req) {
  try {
    if (!process.env.GROK_API_KEY) {
      return serverError("Missing GROK_API_KEY");
    }

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return badRequest("Expected multipart/form-data");
    }

    const form = await req.formData();
    const file = form.get("resume");

    if (!(file instanceof File)) {
      return badRequest("Missing resume file");
    }

    const jdRaw = form.get("jobDescription") || "";
    const jd = trimCap(jdRaw, MAX_JD_CHARS);
    const skills = coerceSkills(form);

    const resumeTextRaw = await extractTextFromFile(file, file.name);
    const resumeText = trimCap(resumeTextRaw, MAX_RESUME_CHARS);

    const ats = score(resumeText, jd);

    const ai = await getAI(resumeText, jd);

    const payload = {
      ats,
      ai: {
        missing_skills: ai.missing_skills || [],
        weak_skills: ai.weak_skills || [],
        grammar_fixes: ai.grammar_fixes || [],
        ats_warnings: ai.ats_warnings || [],
        summary_improved_short: ai.summary_improved_short || "",
        summary_improved_long: ai.summary_improved_long || "",
      },
      meta: {
        filename: file.name,
        skills,
      },
    };

    return NextResponse.json(payload);
  } catch (err) {
    console.error("[resume-analyze] Error:", err);
    return serverError(err);
  }
}
