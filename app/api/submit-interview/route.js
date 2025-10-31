// app/api/submit-interview/route.js
import { NextResponse } from "next/server";

const sessions = global.__INTERVIEW_SESSIONS ||= new Map();

export async function POST(req) {
  try {
    const body = await req.json();
    const { sessionId, answers } = body;
    if (!sessionId || !answers) return NextResponse.json({ error: "missing params" }, { status: 400 });

    const session = sessions.get(sessionId);
    if (!session) return NextResponse.json({ error: "session not found" }, { status: 404 });

    // Build a prompt that asks Grok to grade each answer and provide feedback + best answer
    const questionList = session.questions.map(q => ({ id: q.id, text: q.text, type: q.type, level: q.level }));
    const prompt = `
You are an expert interviewer + grader.

We will provide:
- A list of questions (id + text).
- Candidate answers (object keyed by question id).

For each question, produce:
{
  "id": <id>,
  "score": <0-10 integer>,
  "maxScore": 10,
  "briefFeedback": "<short feedback what to improve>",
  "bestAnswer": "<an ideal/gold-standard answer the candidate could have given (concise)>",
  "detailedNotes": "<detailed improvement tips and resources>"
}

Finally, produce an overall summary with:
- totalScore (sum of scores),
- perQuestionBreakdown (array above),
- overallAdvice (3 concrete actionable suggestions ranked).

Return ONLY valid JSON.
---

Questions: ${JSON.stringify(questionList, null, 2)}

Answers: ${JSON.stringify(answers, null, 2)}
`;

    const grokRes = await fetch("https://api.grok.example/v1/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROK_API_KEY}`
      },
      body: JSON.stringify({
        model: "grok-cloud-v1",
        prompt,
        max_tokens: 1600,
        temperature: 0.0
      })
    });

    if (!grokRes.ok) {
      const t = await grokRes.text();
      return NextResponse.json({ error: "Grok error", details: t }, { status: 502 });
    }

    const grokText = await grokRes.text();
    let parsed;
    try {
      parsed = JSON.parse(grokText);
    } catch (err) {
      const match = grokText.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
      if (!match) throw new Error("Could not parse Grok grading response as JSON");
      parsed = JSON.parse(match[0]);
    }

    // Optionally store results into session
    session.results = parsed;
    sessions.set(sessionId, session);

    return NextResponse.json({ sessionId, results: parsed });
  } catch (err) {
    console.error("submit-interview error", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
