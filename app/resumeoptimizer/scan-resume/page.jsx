"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import BreadcrumbNav from "../../../components/sidebar/BreadcrumbNav";
import clsx from "clsx";

const REACT_SKILLS = [
  "JavaScript (ES6+)", "TypeScript", "React", "React Hooks", "Redux Toolkit", "Zustand",
  "React Query / TanStack Query", "Next.js", "React Router", "CSS / SCSS", "Tailwind CSS", "Styled Components",
  "Testing (Jest/RTL)", "GraphQL", "REST APIs", "Form handling (Formik/RHF)", "Webpack/Vite", "Accessibility (a11y)",
  "Performance (memo, code-splitting)",
];

function parseCommaSeparated(input) {
  return Array.from(new Set(input.split(",").map(s => s.trim()).filter(Boolean)));
}

function Chip({ label, selected, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={clsx(
        "px-3 py-1 rounded-2xl text-sm border transition-all transform hover:-translate-y-1",
        selected
          ? "bg-indigo-600 text-white border-indigo-600 shadow-[0_4px_18px_rgba(79,70,229,0.45)]"
          : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50 hover:shadow-lg"
      )}
    >
      {label}
    </button>
  );
}

function Card({ title, children, right }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white backdrop-blur shadow-[0_10px_35px_rgba(0,0,0,0.07)] hover:shadow-[0_16px_45px_rgba(0,0,0,0.12)] transition-all p-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {right}
      </div>
      {children}
    </div>
  );
}

export default function ResumeAnalyzer() {
  const [selected, setSelected] = useState([]);
  const [showCustom, setShowCustom] = useState(false);
  const [customRaw, setCustomRaw] = useState("");
  const [jd, setJd] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Resume Optimizer");
  const router = useRouter();


  const combinedSkills = useMemo(() => Array.from(new Set([...selected])), [selected]);
  const otherChipSelected = showCustom || combinedSkills.includes("Other");

  const toggleSkill = (skill) =>
    setSelected((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]));

  const addCustomSkills = () => {
    const parsed = parseCommaSeparated(customRaw);
    if (parsed.length === 0) return;
    setSelected((prev) => Array.from(new Set([...prev, ...parsed])));
    setCustomRaw("");
  };

  const removeSkill = (skill) => setSelected((prev) => prev.filter((s) => s !== skill));



  const onAnalyze = async () => {
    setError(null);
    if (!resumeFile) {
      setError("Please upload a resume (PDF/DOCX/TXT)");
      return;
    }
    setBusy(true);

    try {
      const fd = new FormData();
      fd.append("resume", resumeFile);
      fd.append("skills", JSON.stringify(combinedSkills.filter((s) => s !== "Other")));
      if (jd.trim()) fd.append("jobDescription", jd.trim());

      const res = await fetch("/api/analyse", { method: "POST", body: fd });
      if (!res.ok) throw new Error((await res.text()) || `Request failed: ${res.status}`);
      const data = await res.json();

      localStorage.setItem("resume_result", JSON.stringify(data));

      // ✅ Proper Next.js router redirect
      router.push("/resumeoptimizer/result");

    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  };



  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-white ">

      {/* Header */}
      <header className="pt-6 pl-50">
        <BreadcrumbNav className="mt-10" activeTab={activeTab} />
      </header>



      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">


        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          <Card title="Upload Resume" right={<span className="text-xs text-gray-500">PDF • DOCX • TXT</span>}>
            <div className="flex items-center gap-4">
              <label className="shrink-0 inline-flex items-center gap-2 rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 cursor-pointer hover:shadow-md transition">
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.txt"
                  onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
                />
                Choose file
              </label>
              <div className="text-sm text-gray-700 truncate">
                {resumeFile ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="font-medium">{resumeFile.name}</span>
                    <button
                      className="text-gray-400 hover:text-red-500"
                      onClick={() => setResumeFile(null)}
                      title="Remove"
                    >
                      ✕
                    </button>
                  </span>
                ) : (
                  <span className="text-gray-500">No file selected</span>
                )}
              </div>
            </div>
          </Card>

          {/* SKILLS */}
          <Card title="Select Your Skills">
            <div className="flex flex-wrap gap-2">
              {REACT_SKILLS.map((skill) => (
                <Chip key={skill} label={skill} selected={selected.includes(skill)} onToggle={() => toggleSkill(skill)} />
              ))}
              <Chip label="Other" selected={otherChipSelected} onToggle={() => setShowCustom((v) => !v)} />
            </div>

            {otherChipSelected && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
                <input
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
                  placeholder="Add comma-separated custom skills"
                  value={customRaw}
                  onChange={(e) => setCustomRaw(e.target.value)}
                />
                <button
                  onClick={addCustomSkills}
                  className="rounded-xl bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-700 transition"
                >
                  Add
                </button>
              </div>
            )}

            {combinedSkills.length > 0 && (
              <div className="mt-5">
                <p className="text-sm text-gray-500 mb-2">Selected skills</p>
                <div className="flex flex-wrap gap-2">
                  {combinedSkills.filter((s) => s !== "Other").map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-2 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1 text-sm shadow hover:shadow-md transition"
                    >
                      {skill}
                      <button className="text-indigo-400 hover:text-red-500" onClick={() => removeSkill(skill)}>
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* JOB DESCRIPTION */}
          <Card title="Job Description (Optional)" right={<span className="text-xs text-gray-500">Boost match %</span>}>
            <textarea
              className="w-full min-h-[160px] rounded-2xl border border-gray-300 bg-white px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Paste the JD here..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
            />
          </Card>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <Card title="Analyze">
            {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
            <button
              onClick={onAnalyze}
              disabled={busy}
              className={clsx(
                "w-full rounded-2xl px-4 py-3 font-semibold transition shadow hover:shadow-lg hover:-translate-y-1",
                busy
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              )}
            >
              {busy ? "Analyzing…" : "Analyze Resume"}
            </button>
          </Card>

          {/* RESULTS */}
          

        </div>

      </main>
    </div>
  );
}
