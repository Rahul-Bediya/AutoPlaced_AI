"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function NotesUploadPage() {
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const onAnalyze = async () => {
    setError(null);
    if (!file) return setError("Upload a PDF / DOCX / TXT file.");

    setBusy(true);

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/notesgenerate", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // save JSON result
      localStorage.setItem("notes_result", JSON.stringify(data));

      router.push("/notestracker/notesresult");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl p-6 shadow max-w-md w-full space-y-6">

        <h1 className="text-lg font-bold text-gray-800 text-center">
          Smart Notes Generator
        </h1>

        <label className="cursor-pointer block border py-8 rounded-xl text-center">
          <input
            type="file"
            className="hidden"
            accept=".pdf,.docx,.txt"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          <span>Upload PDF/DOCX/TXT</span>
        </label>

        {file && <p className="text-sm">{file.name}</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          disabled={busy || !file}
          onClick={onAnalyze}
          className={clsx(
            "w-full px-4 py-3 rounded-xl font-semibold shadow transition",
            busy ? "bg-gray-300" : "bg-indigo-600 text-white hover:bg-indigo-700"
          )}
        >
          {busy ? "Generating..." : "Generate Smart Notes"}
        </button>
      </div>
    </div>
  );
}
