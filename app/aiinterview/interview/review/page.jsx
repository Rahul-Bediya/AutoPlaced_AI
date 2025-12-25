"use client";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "../../../../components/sidebar/sidebar";
import BreadcrumbNav from "../../../../components/sidebar/BreadcrumbNav";

/**
 * Review page for an interview session.
 * Expects `GET /api/session?id=<sessionId>` to return a session object like:
 * {
 *   id: "...",
 *   questions: [{ id, text, type, level, category }, ...],
 *   results: {
 *     totalScore: number,
 *     perQuestionBreakdown: [
 *       { id, score, maxScore, briefFeedback, bestAnswer, detailedNotes }, ...
 *     ],
 *     overallAdvice: [ "..." , "..." , "..." ]
 *   }
 * }
 */

export default function ReviewPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session");

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(Boolean(sessionId));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setError("Missing session id in query (use ?session=<id>)");
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetch(`/api/session?id=${encodeURIComponent(sessionId)}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.error) {
          setError(data.error);
          setSession(null);
        } else {
          setSession(data);
          setError(null);
        }
      })
      .catch((err) => {
        console.error("fetch session error", err);
        setError(err.message || "Failed to fetch session");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const perQuestion = useMemo(() => {
    if (!session) return [];
    const questions = session.questions || [];
    const results = (session.results && (session.results.perQuestionBreakdown || [])) || [];
    // build map of results by id for quick lookup
    const resMap = new Map(results.map((r) => [String(r.id), r]));
    return questions.map((q, idx) => {
      const r = resMap.get(String(q.id)) || {};
      return {
        index: idx + 1,
        id: q.id,
        question: q.text,
        userAnswer: (session.answers && session.answers[q.id]) || (session.userAnswers && session.userAnswers[q.id]) || "", // fallback possible shapes
        score: typeof r.score === "number" ? r.score : null,
        maxScore: typeof r.maxScore === "number" ? r.maxScore : (typeof r.maxScore === "undefined" ? 10 : r.maxScore),
        briefFeedback: r.briefFeedback || r.feedback || "",
        bestAnswer: r.bestAnswer || "",
        detailedNotes: r.detailedNotes || r.notes || ""
      };
    });
  }, [session]);

  const overall = useMemo(() => {
    if (!session || !session.results) return null;
    return {
      totalScore: session.results.totalScore ?? null,
      maxPossible: (session.results.perQuestionBreakdown || []).reduce((s, p) => s + (p.maxScore ?? 10), 0) || null,
      overallAdvice: session.results.overallAdvice || []
    };
  }, [session]);

  const copyJSON = async () => {
    if (!session) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(session, null, 2));
      alert("Session JSON copied to clipboard");
    } catch (e) {
      alert("Copy failed: " + (e?.message || e));
    }
  };

  const downloadJSON = () => {
    if (!session) return;
    const dataStr = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(session, null, 2));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = `session-${session.id || "review"}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  if (loading) return <div className="p-8">Loading review...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;
  if (!session) return <div className="p-8">No session data</div>;

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800 font-inter">
      <Sidebar activeTab="interview-prep" setActiveTab={() => {}} sidebarOpen={false} setSidebarOpen={() => {}} />
      <main className="flex-1 md:ml-60 p-8">
        <BreadcrumbNav activeTab="interview-prep" />

        <div className="max-w-6xl mx-auto">
          <header className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-semibold">Interview Review</h1>
              <p className="text-sm text-gray-600 mt-1">
                Session: <span className="font-medium">{session.id || session.sessionId || "—"}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={copyJSON}
                className="px-3 py-2 bg-white border rounded-md shadow-sm text-sm hover:shadow transition"
              >
                Copy JSON
              </button>
              <button
                onClick={downloadJSON}
                className="px-3 py-2 bg-indigo-600 text-white rounded-md shadow-sm text-sm hover:bg-indigo-700 transition"
              >
                Download JSON
              </button>
            </div>
          </header>

          {/* Overall summary */}
          <section className="bg-white border rounded-2xl p-5 mb-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Summary</h2>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="text-sm text-gray-600">Total score</div>
                <div className="text-xl font-bold">
                  {overall?.totalScore ?? "—"}
                  {overall?.maxPossible ? ` / ${overall.maxPossible}` : ""}
                </div>
              </div>

              <div className="flex-1">
                <div className="text-sm text-gray-600 mb-2">Overall advice</div>
                {overall?.overallAdvice?.length ? (
                  <ol className="list-decimal list-inside text-sm space-y-1">
                    {overall.overallAdvice.map((adv, i) => (
                      <li key={i} className="text-gray-700">{adv}</li>
                    ))}
                  </ol>
                ) : (
                  <div className="text-sm text-gray-500">No overall advice provided.</div>
                )}
              </div>
            </div>
          </section>

          {/* Per-question list */}
          <section className="space-y-4">
            {perQuestion.length === 0 && (
              <div className="text-gray-500">No questions found for this session.</div>
            )}

            {perQuestion.map((q) => (
              <article key={q.id} className="bg-white border rounded-2xl p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md">
                        Q{q.index}
                      </div>
                      <div className="text-sm text-gray-600">ID: <span className="font-mono text-xs text-gray-700 ml-2">{q.id}</span></div>
                    </div>

                    <h3 className="text-base font-medium text-gray-800 mb-2">{q.question}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Candidate answer</div>
                        <div className="whitespace-pre-wrap text-sm p-3 bg-gray-50 border rounded-md text-gray-800">
                          {q.userAnswer || <span className="text-gray-400">No answer recorded</span>}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-xs text-gray-500">AI grading</div>
                          <div className="text-sm font-medium">
                            {q.score === null ? "—" : `${q.score} / ${q.maxScore}`}
                          </div>
                        </div>

                        <div className="text-sm p-3 bg-gray-50 border rounded-md space-y-2">
                          <div>
                            <div className="text-xs text-gray-500">Brief feedback</div>
                            <div className="text-sm text-gray-700">{q.briefFeedback || <span className="text-gray-400">—</span>}</div>
                          </div>

                          <div>
                            <div className="text-xs text-gray-500">Best (gold) answer</div>
                            <div className="text-sm text-gray-700 whitespace-pre-wrap">{q.bestAnswer || <span className="text-gray-400">—</span>}</div>
                          </div>

                          <div>
                            <div className="text-xs text-gray-500">Detailed notes / resources</div>
                            <div className="text-sm text-gray-700 whitespace-pre-wrap">{q.detailedNotes || <span className="text-gray-400">—</span>}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
