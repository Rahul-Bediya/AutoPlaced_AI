// app/api/generate-notes/route.js
import { NextResponse } from "next/server";

// Simple in-memory sessions store (development only)
const sessions = global.__NOTES_SESSIONS || (global.__NOTES_SESSIONS = new Map());

const systemPrompt = `You are an expert educator and note-taker. Generate comprehensive, well-structured study notes on the given topic. 

Your notes should:
- Start with a clear overview/introduction
- Be organized with clear headings and subheadings using markdown (## for main sections, ### for subsections)
- Include key concepts, definitions, and explanations
- Use bullet points for lists
- Include code examples where relevant (especially for programming topics)
- Add practical examples and use cases
- Include tips and best practices
- End with a summary of key takeaways

Make the notes educational, clear, and suitable for learning. Use markdown formatting for better readability.`;

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      topics = "",           // String or comma-separated topics
      level = "Beginner",    // optional: Beginner / Intermediate / Advanced
      format = "markdown",   // 'markdown' | 'text' | 'html'
      max_tokens = 1200,
    } = body;

    if (!topics || topics.toString().trim().length === 0) {
      return NextResponse.json({ error: "Missing topics in body" }, { status: 400 });
    }

    // Build a user prompt for the AI
    const userPrompt = `
Create comprehensive learning notes for the following topics:
Topics: ${Array.isArray(topics) ? topics.join(", ") : topics}
Target level: ${level}
Output format: ${format}

Requirements:
- Provide a clear table of contents / sections
- For each section include: key concepts, concise definitions, one or two examples, common pitfalls, and quick exercises (3-5 short practice items)
- Use bullet points and headings appropriate for the selected format
Return the notes as a single ${format} string.
`;

    // Call your Grok/OpenAI-style API (keeps same pattern as your original)
    const grokRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROK_API_KEY || process.env.GROK_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.2,
        max_tokens,
      }),
    });

    if (!grokRes.ok) {
      const text = await grokRes.text();
      console.error("Grok API error:", text);
      return NextResponse.json({ error: "Grok API Error", details: text }, { status: 502 });
    }

    const data = await grokRes.json();
    const notesText = data.choices?.[0]?.message?.content?.trim();

    if (!notesText) throw new Error("No response from Grok API");

    // Create a session to keep the notes on server memory (dev-only)
    const sessionId = `n_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const session = {
      id: sessionId,
      topics,
      level,
      format,
      notes: notesText,
      createdAt: Date.now(),
    };

    sessions.set(sessionId, session);

    return NextResponse.json({ sessionId, notes: notesText });
  } catch (err) {
    console.error("generate-notes error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * GET — fetch notes by session id
 * Example: /api/generate-notes?session=n_12345
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session");

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session ID" }, { status: 400 });
    }

    const session = sessions.get(sessionId);
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(session);
  } catch (err) {
    console.error("generate-notes GET error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
