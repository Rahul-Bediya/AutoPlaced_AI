// // app/api/generate-questions/route.js
// const { NextResponse } = require("next/server");

// const sessions = global.__INTERVIEW_SESSIONS || (global.__INTERVIEW_SESSIONS = new Map());

// async function POST(req) {
//   try {
//     const body = await req.json();
//     const {
//       jobTitle = "",
//       jobDescription = "",
//       experienceLevel = "",
//       yearsOfExp = 0,
//       interviewType = "Technical",
//       programmingLanguage = "",
//       numQuestions = 5,
//       resumeText = ""
//     } = body;

//     // Build prompt for Grok
//     const prompt = `
// You are an expert interview generator. Create ${numQuestions} interview questions tailored to:
// - Job title: ${jobTitle}
// - Job description: ${jobDescription}
// - Interview type: ${interviewType}
// - Experience: ${experienceLevel} (${yearsOfExp} yrs)
// - Programming language / focus: ${programmingLanguage}
// - Candidate resume (if provided): ${resumeText}

// Output a JSON array named "questions" where each question has:
// {
//   "id": <integer>,
//   "type": "<Technical|HR|System Design|Behavioral>",
//   "level": "<Easy|Medium|Hard>",
//   "language": "<if applicable, e.g., Python>",
//   "text": "<the question prompt>"
// }

// Return ONLY valid JSON.
// `;

//     // Call Grok API
//     const grokRes = await fetch("https://api.grok.example/v1/generate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Bearer " + process.env.GROK_API_KEY
//       },
//       body: JSON.stringify({
//         model: "grok-cloud-v1",
//         prompt,
//         max_tokens: 1200,
//         temperature: 0.2
//       })
//     });

//     if (!grokRes.ok) {
//       const txt = await grokRes.text();
//       return NextResponse.json({ error: "Grok API Error", details: txt }, { status: 502 });
//     }

//     const grokText = await grokRes.text();

//     // Parse JSON from Grok response
//     let parsed;
//     try {
//       parsed = JSON.parse(grokText);
//     } catch (err) {
//       const match = grokText.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
//       if (!match) throw new Error("Could not parse Grok response as JSON");
//       parsed = JSON.parse(match[0]);
//     }

//     const questions = parsed.questions || parsed;

//     // Normalize questions
//     const normalized = questions.map((q, i) => ({
//       id: q.id ?? i + 1,
//       type: q.type ?? (interviewType === "HR" ? "HR" : "Technical"),
//       level: q.level ?? "Medium",
//       language: (q.language ?? programmingLanguage) || "",

//       text: q.text ?? q.prompt ?? ""
//     }));

//     // Create session
//     const sessionId = `s_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
//     const session = {
//       id: sessionId,
//       meta: { jobTitle, experienceLevel, yearsOfExp, interviewType, programmingLanguage },
//       questions: normalized,
//       createdAt: Date.now()
//     };

//     sessions.set(sessionId, session);

//     return NextResponse.json({ sessionId, questions: normalized });
//   } catch (err) {
//     console.error("generate-questions error", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// module.exports = { POST };

// app/api/generate-questions/route.js
import { NextResponse } from "next/server";

// Simple in-memory sessions store
const sessions = global.__INTERVIEW_SESSIONS || (global.__INTERVIEW_SESSIONS = new Map());

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      jobTitle = "",
      jobDescription = "",
      experienceLevel = "",
      yearsOfExp = 0,
      interviewType = "Technical",
      programmingLanguage = "",
      numQuestions = 5,
      resumeText = "",
    } = body;

    // 🧠 Build AI prompt
    const prompt = `
You are an expert interview question generator and ask first question a introdunction. Create ${numQuestions} interview questions tailored to:
- Job title: ${jobTitle}
- Job description: ${jobDescription}
- Interview type: ${interviewType}
- Experience: ${experienceLevel} (${yearsOfExp} yrs)
- Programming language / focus: ${programmingLanguage}
- Candidate resume (if provided): ${resumeText}

Return ONLY valid JSON as:
[
  {
    "id": <integer>,
    "type": "<Technical|HR|System Design|Behavioral>",
    "level": "<Easy|Medium|Hard>",
    "language": "<if applicable, e.g., Python>",
    "text": "<the question prompt>"
  }
]
`;

    // ✅ Correct Groq API call format
    const grokRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are an expert technical interviewer assistant.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 1200,
      }),
    });

    if (!grokRes.ok) {
      const text = await grokRes.text();
      return NextResponse.json({ error: "Grok API Error", details: text }, { status: 502 });
    }

    const data = await grokRes.json();
    const grokText = data.choices?.[0]?.message?.content?.trim();

    if (!grokText) throw new Error("No response from Grok API");

    // 🧩 Parse the JSON array from the AI response
    let parsed;
    try {
      parsed = JSON.parse(grokText);
    } catch (err) {
      const match = grokText.match(/\[[\s\S]*\]/);
      if (!match) throw new Error("Could not parse Grok response as JSON");
      parsed = JSON.parse(match[0]);
    }

    const questions = Array.isArray(parsed.questions) ? parsed.questions : parsed;

    // Normalize structure
    const normalized = questions.map((q, i) => ({
      id: q.id ?? i + 1,
      type: q.type ?? (interviewType === "HR" ? "HR" : "Technical"),
      level: q.level ?? "Medium",
      language: q.language ?? programmingLanguage ?? "",
      text: q.text ?? q.prompt ?? "",
    }));

    // Create an interview session
    const sessionId = `s_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const session = {
      id: sessionId,
      meta: { jobTitle, experienceLevel, yearsOfExp, interviewType, programmingLanguage },
      questions: normalized,
      createdAt: Date.now(),
    };

    sessions.set(sessionId, session);

    return NextResponse.json({ sessionId, questions: normalized });
  } catch (err) {
    console.error("generate-questions error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


/**
 * 🔹 GET — Fetch one question at a time from an existing session
 * Example: /api/generate-questions?session=s_12345&index=2
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session");
    const index = parseInt(searchParams.get("index") || "0", 10);

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session ID" }, { status: 400 });
    }

    const session = sessions.get(sessionId);
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const question = session.questions[index];
    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    return NextResponse.json(question);
  } catch (err) {
    console.error("generate-questions GET error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}