// import { NextResponse } from "next/server";
// import { extractTextFromFile } from "@/lib/parse";

// export const runtime = "nodejs";

// const MAX_INPUT = 200000;
// const MODEL = "llama-3.3-70b-versatile";

// // ---------------- Helpers ------------------

// function trimCap(input, max) {
//   return input.length > max ? input.slice(0, max) : input;
// }

// function badRequest(msg) {
//   return NextResponse.json({ error: msg }, { status: 400 });
// }

// function serverError(err) {
//   const msg =
//     typeof err === "object" && err && "message" in err
//       ? String(err.message)
//       : "Internal error";

//   return NextResponse.json({ error: msg }, { status: 500 });
// }

// // function promptParts(content) {
// //   const system =
// //     "You are an educational content generator AI. Return only valid JSON. No markdown.";

// //   const user = `
// // CONTENT:
// // ${content}

// // TASK: Using the content above, generate the following STRICT JSON:

// // {
// //   "summaryShort": "<80-120 character summary>",
// //   "summaryLong": "<2-4 sentence summary>",
// //   "flashcards": [
// //     { "term": "...", "definition": "..." },
// //     ...
// //   ],
// //   "quizzes": [
// //     {
// //       "question": "...",
// //       "options": ["A", "B", "C", "D"],
// //       "answer": "B"
// //     },
// //     ...
// //   ]
// // }

// // Rules:
// // - Flashcards must be important concepts only
// // - Quiz should be conceptual, not trivial
// // - Never include explanations
// // - JSON only!
// // `;

// //   return { system, user };
// // }

// // function safeJson(text) {
// //   try {
// //     return JSON.parse(text);
// //   } catch {
// //     return undefined;
// //   }
// // }


// function promptParts(content) {
//   const system =
//     "You are an educational content generator AI. Return only valid JSON. No markdown. Do not include explanations. Do not hallucinate. ONLY use information found in the provided content.";

//   const user = `
// CONTENT (raw PDF text, may contain noise):
// ${content}

// TASK:
// You MUST extract information ONLY from the above content.
// If something is missing, output "unknown" instead of guessing.

// Clean this mentally:
// - headers/footers
// - page numbers
// - references
// - random broken text

// Generate STRICT JSON:

// {
//   "summaryShort": "<80-120 character summary>",
//   "summaryLong": "<2-4 sentence summary>",
//   "keyPoints": [
//     "<key point 1>",
//     "<key point 2>",
//     "<key point 3>",
//     "<key point 4>",
//     "<key point 5>"
//   ],
//   "definitions": [
//     { "term": "<term>", "meaning": "<definition>" }
//   ],
//   "flashcards": [
//     { "term": "...", "definition": "..." }
//   ],
//   "quizzes": [
//     {
//       "question": "...",
//       "options": ["A", "B", "C", "D"],
//       "answer": "B"
//     }
//   ]
// }

// STRICT RULES:
// - JSON ONLY
// - NEVER introduce topics not present in content
// - If unsure, return "unknown"
// - DO NOT default to machine learning topics
// - If PDF contains too little text, return summary: "unknown"
// `;
//   return { system, user };
// }


// function safeJson(text) {
//   try {
//     return JSON.parse(text);
//   } catch {
//     return undefined;
//   }
// }


// async function getAI(content) {
//   const { system, user } = promptParts(content);

//   const grokRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.GROK_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: MODEL,
//       messages: [
//         { role: "system", content: system },
//         { role: "user", content: user },
//       ],
//       temperature: 0,
//       max_tokens: 2000,
//     }),
//   });

//   if (!grokRes.ok) {
//     const text = await grokRes.text();
//     throw new Error("Groq API error: " + text);
//   }

//   const data = await grokRes.json();
//   const txt = data.choices?.[0]?.message?.content?.trim() || "";

//   let parsed = safeJson(txt);
//   if (!parsed) {
//     const match = txt.match(/\{[\s\S]*\}/);
//     parsed = match ? safeJson(match[0]) : undefined;
//   }

//   return parsed || {};
// }

// // ---------------- Route Handler ------------------

// export async function POST(req) {
//   try {
//     if (!process.env.GROK_API_KEY) {
//       return serverError("Missing GROK_API_KEY");
//     }

//     const contentType = req.headers.get("content-type") || "";
//     if (!contentType.includes("multipart/form-data")) {
//       return badRequest("Expected multipart/form-data");
//     }

//     const form = await req.formData();
//     const file = form.get("file");

//     if (!(file instanceof File)) {
//       return badRequest("Missing file");
//     }

//     const raw = await extractTextFromFile(file, file.name);
//     const content = trimCap(raw, MAX_INPUT);

//     const ai = await getAI(content);

//     // const payload = {
//     //   summaryShort: ai.summaryShort || "",
//     //   summaryLong: ai.summaryLong || "",
//     //   flashcards: ai.flashcards || [],
//     //   quizzes: ai.quizzes || [],
//     //   meta: {
//     //     filename: file.name,
//     //   },
//     // };
//     const payload = {
//       summaryShort: ai.summaryShort || "",
//       summaryLong: ai.summaryLong || "",
//       keyPoints: ai.keyPoints || [],
//       definitions: ai.definitions || [],
//       flashcards: ai.flashcards || [],
//       quizzes: ai.quizzes || [],
//       meta: { filename: file.name },
//     };


//     return NextResponse.json(payload);
//   } catch (err) {
//     console.error("[content-gen] Error:", err);
//     return serverError(err);
//   }
// }

// app/api/generate-summary/route.js
// app/api/notesgenerate/route.js
import { NextResponse } from "next/server";
import { extractTextFromFile } from "@/lib/extractText";


const MODEL = "llama-3.3-70b-versatile";

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!file) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    const text = await extractTextFromFile(file, file.name);

    const prompt = {
      system: "You are an educational AI. Return ONLY JSON.",
      user: `
CONTENT:
${text}

TASK: Generate STRICT JSON:

{
  "summaryShort": "<80-120 chars>",
  "summaryLong": "<2-4 sentences>",
  "keyPoints": [
    "- point",
    "- point",
    "- point",
    "- point",
    "- point"
  ],
  "definitions": [
    "<term>: <definition>",
    "<term>: <definition>"
  ],
  "flashcards": [
    { "term": "...", "definition": "..." }
  ],
  "quizzes": [
    {
      "question": "...",
      "options": ["A","B","C","D"],
      "answer": "A"
    }
  ]
}

Rules:
- No markdown
- No commentary
- JSON only
      `
    };

    const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: prompt.system },
          { role: "user", content: prompt.user }
        ]
      })
    });

    const data = await resp.json();

    const raw = data.choices?.[0]?.message?.content?.trim() ?? "{}";
    const json = JSON.parse(raw);

    return NextResponse.json(json);
  } catch (err) {
    return NextResponse.json(
      { error: err.message ?? "Server error" },
      { status: 500 }
    );
  }
}
