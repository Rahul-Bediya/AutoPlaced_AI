'use client';
import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSession, removeSession } from "../../../store/notesSlice";
import BreadcrumbNav from "../../../components/sidebar/BreadcrumbNav";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function NotesGenerator() {
  const [topics, setTopics] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [format, setFormat] = useState("markdown");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Notes");

  const dispatch = useDispatch();
  const router = useRouter();

  // sessions come from Redux — this may be hydrated client-side only (localStorage etc.)
  const sessions = useSelector((state) => state.notes?.sessions || []);
  const [selectedId, setSelectedId] = useState(null);

  // mounted guard to avoid SSR/CSR mismatch when sessions (or anything derived from client-only storage) differ
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // deterministic date formatter (same locale on server and client)
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    []
  );

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/notesgenerate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topics, level, format }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to generate notes");

      const session = {
        id: data.sessionId,
        topics,
        level,
        format,
        notes: data.notes,
        createdAt: Date.now(),
      };

      dispatch(addSession(session));
      // navigate to view page
      router.push(`/notestracker/notes/view?session=${encodeURIComponent(session.id)}`);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this note?")) return;
    dispatch(removeSession(id));
    if (selectedId === id) setSelectedId(null);
  };

  const downloadNotes = (session) => {
    const ext = (session.format || "markdown") === "html" ? "html" : "md";
    const filename = `${(session.topics || "notes").toString().slice(0,30).replace(/[^a-z0-9]/gi,'_')}_${session.id}.${ext}`;
    const blob = new Blob([session.notes || ""], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const previewSession = isMounted ? sessions.find((s) => s.id === selectedId) || null : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-white py-16">
      <div className="max-w-4xl mx-auto px-6">
          <BreadcrumbNav activeTab={activeTab} />
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-amber-700 font-semibold text-sm select-none shadow-sm">
            ✨ AI-Powered Learning
          </div>

          <h1 className="mt-4 text-4xl sm:text-5xl font-display font-extrabold text-stone-900 leading-tight">Smart Notes Generator</h1>

          <p className="mt-3 text-stone-600 max-w-2xl mx-auto">Enter any topic and get comprehensive, well-structured study notes instantly.</p>
        </div>

        {/* Input hero card */}
        <div className="mb-8">
          <div className="flex items-center gap-4 bg-white rounded-2xl p-4 sm:p-5 border border-stone-100 shadow-soft-3xl">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-stone-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
                </svg>
                <input
                  value={topics}
                  onChange={(e) => setTopics(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl bg-transparent placeholder-stone-400 focus:outline-none focus:ring-4 focus:ring-amber-200/60 border border-transparent"
                  placeholder="Enter a topic (e.g., Java, React, Machine Learning...)"
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="text-sm px-3 py-2 border rounded-lg bg-white/90 shadow-sm"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>

                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="text-sm px-3 py-2 border rounded-lg bg-white/90 shadow-sm"
                >
                  <option value="markdown">Markdown</option>
                  <option value="text">Plain Text</option>
                  <option value="html">HTML</option>
                </select>
              </div>
            </div>

            <div>
              <button
                onClick={handleGenerate}
                disabled={loading || !topics.trim()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transform-gpu hover:scale-[1.02]"
                style={{ background: 'linear-gradient(90deg,#f6ad55,#f08b38)' }}
              >
                {loading ? 'Generating…' : 'Generate Notes'}
              </button>
            </div>
          </div>

          {error && <div className="text-red-600 mt-2 text-sm">{error}</div>}
        </div>

        {/* Empty / ready state card (renders the same on server/client) */}
        <div className="bg-white rounded-2xl p-10 border border-stone-100 shadow-soft-3xl">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border border-stone-100 shadow">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-stone-500">
                <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 0 0 2 2h14" />
                <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v10" />
              </svg>
            </div>

            <h3 className="text-xl font-semibold text-stone-900">Ready to Learn?</h3>
            <p className="text-stone-600 max-w-xl">Enter any topic above and click <strong>Generate Notes</strong> to create comprehensive study materials instantly.</p>

            <div className="flex flex-wrap gap-3 mt-4">
              {["Python","React","Machine Learning","Data Structures"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTopics(t)}
                  className="px-3 py-2 rounded-full bg-amber-50 border border-stone-100 text-stone-700 font-semibold text-sm shadow-sm"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* sessions grid: only render after mount to avoid SSR/CSR mismatch */}
        {isMounted && sessions.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4 text-stone-800">My Notes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sessions.map((s) => (
                <motion.div
                  key={s.id}
                  whileHover={{ translateY: -6 }}
                  className="bg-white rounded-2xl p-4 border border-stone-100 shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-stone-900 truncate">{(s.topics || "Untitled").toString().slice(0,60)}</div>
                      <div className="text-xs text-stone-500 mt-1">Level: {s.level} • {s.format}</div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button onClick={() => setSelectedId(s.id)} className="text-xs px-3 py-1 rounded-md border">Preview</button>
                      <div className="flex gap-2">
                        <button onClick={() => downloadNotes(s)} className="text-xs px-3 py-1 rounded-md border">Download</button>
                        <button onClick={() => handleDelete(s.id)} className="text-xs px-3 py-1 rounded-md border text-red-600">Delete</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Preview pane: also only render after mount */}
        {isMounted && previewSession && (
          <div className="mt-6 bg-white rounded-2xl p-4 border border-stone-100 shadow-soft-3xl">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-stone-900">{previewSession.topics}</h4>
                <div className="text-xs text-stone-500">Format: {previewSession.format} • {dateFormatter.format(new Date(previewSession.createdAt))}</div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => downloadNotes(previewSession)} className="px-3 py-1 rounded-lg border bg-white/80">Download</button>
                <button onClick={() => setSelectedId(null)} className="px-3 py-1 rounded-lg border bg-white/80">Close</button>
              </div>
            </div>

            <pre className="mt-3 max-h-[45vh] overflow-auto text-sm bg-amber-50/60 p-3 rounded-md border border-stone-100">{previewSession.notes}</pre>
          </div>
        )}

        <div className="text-center text-xs text-stone-400 mt-10">Powered by AI • Generate notes on any topic</div>
      </div>
    </div>
  );
}
