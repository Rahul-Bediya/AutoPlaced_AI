// app/api/session/route.js
import { NextResponse } from "next/server";

const sessions = global.__INTERVIEW_SESSIONS ||= new Map();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });
    const session = sessions.get(id);
    if (!session) return NextResponse.json({ error: "session not found" }, { status: 404 });
    return NextResponse.json(session);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
