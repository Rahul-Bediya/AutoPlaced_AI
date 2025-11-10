// "use client";

// import { useEffect, useState } from "react";
// import {
//   PieChart, Pie, Cell, Tooltip,
//   BarChart, Bar, XAxis, YAxis, ResponsiveContainer
// } from "recharts";
// import Link from "next/link";

// export default function ResultPage() {
//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     const data = localStorage.getItem("resume_result");
//     if (data) setResult(JSON.parse(data));
//   }, []);

//   if (!result) return (
//     <div className="p-6 text-center">
//       No data found. <br/>
//       <Link href="/resumeoptimizer/scan-resume" className="text-indigo-600 underline">
//         Go Back
//       </Link>
//     </div>
//   );

//   // ✅ Safe fallbacks
//   const atsScore       = result.ats?.score || 0;
//   const missingSkills  = result.ai?.missing_skills || [];
//   const weakSkills     = result.ai?.weak_skills || [];
//   const grammarFixes   = result.ai?.grammar_fixes || [];
//   const atsWarnings    = result.ai?.ats_warnings || [];
//   const strongSkills   = result.ai?.strong_skills || [];
//   const actionPlan     = result.ai?.action_plan || [];
//   const keywordDensity = result.ai?.keyword_density || [];

//   const atsData = [
//     { name: "Score", value: atsScore },
//     { name: "Missing", value: 100 - atsScore }
//   ];

//   const weakSkillsData = weakSkills.map(s => ({
//     name: s,
//     value: Math.floor(Math.random() * 30) + 20
//   }));

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white p-8">
//       <div className="max-w-6xl mx-auto space-y-8">
//         <h1 className="text-3xl font-bold text-indigo-700 mb-6">Resume Analysis Result</h1>

//         {/* ATS Score Pie */}
//         <div className="w-full h-72 rounded-xl border bg-white p-5 shadow">
//           <h2 className="font-semibold mb-2">ATS Score</h2>
//           <ResponsiveContainer>
//             <PieChart>
//               <Pie data={atsData} dataKey="value" outerRadius={100} label>
//                 <Cell fill="#4f46e5" />
//                 <Cell fill="#e0e7ff" />
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Weak Skills Bar */}
//         {weakSkills.length > 0 && (
//           <div className="w-full h-72 rounded-xl border bg-white p-5 shadow">
//             <h2 className="font-semibold mb-2">Weak Skills Impact</h2>
//             <ResponsiveContainer>
//               <BarChart data={weakSkillsData}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="value" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         )}

//         {/* MISSING SKILLS */}
//         <div className="rounded-xl border bg-white p-5 shadow">
//           <h3 className="font-semibold text-gray-700 mb-2">Missing Skills</h3>
//           {missingSkills.length ? (
//             <ul className="list-disc ml-6 text-sm text-gray-600 space-y-1">
//               {missingSkills.map((s, i) => <li key={i}>{s}</li>)}
//             </ul>
//           ) : (
//             <p className="text-sm text-green-600">No major missing skills ✅</p>
//           )}
//         </div>

//         {/* WEAK SKILLS */}
//         <div className="rounded-xl border bg-white p-5 shadow">
//           <h3 className="font-semibold text-gray-700 mb-2">Weak Skills</h3>
//           {weakSkills.length ? (
//             <ul className="list-disc ml-6 text-sm text-gray-600">
//               {weakSkills.map((s, i) => <li key={i}>{s}</li>)}
//             </ul>
//           ) : (
//             <p className="text-sm text-green-600">No weak skills found ✅</p>
//           )}
//         </div>

//         {/* GRAMMAR FIXES */}
//         <div className="rounded-xl border bg-white p-5 shadow">
//           <h3 className="font-semibold text-gray-700 mb-2">Grammar Fixes</h3>
//           {grammarFixes.length ? (
//             <ul className="ml-2 space-y-2 text-sm">
//               {grammarFixes.map((fix, i) => (
//                 <li key={i} className="border rounded-md p-2 bg-white shadow">
//                   <div><b>Before:</b> {fix.before}</div>
//                   <div><b>After:</b> {fix.after}</div>
//                   <div className="text-gray-500"><b>Reason:</b> {fix.reason}</div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-sm text-green-600">No grammar issues ✅</p>
//           )}
//         </div>

//         {/* ATS WARNINGS */}
//         <div className="rounded-xl border bg-white p-5 shadow">
//           <h3 className="font-semibold text-gray-700 mb-2">ATS Warnings</h3>
//           {atsWarnings.length ? (
//             <ul className="list-disc ml-6 text-sm text-red-600 space-y-1">
//               {atsWarnings.map((w, i) => <li key={i}>{w}</li>)}
//             </ul>
//           ) : (
//             <p className="text-sm text-green-600">Perfect ATS formatting ✅</p>
//           )}
//         </div>

//         {/* STRONG SKILLS */}
//         <div className="rounded-xl border bg-white p-5 shadow">
//           <h3 className="font-semibold text-gray-700 mb-2">Strong Skills</h3>
//           {strongSkills.length ? (
//             <ul className="list-disc ml-6 text-sm">
//               {strongSkills.map((s, i) => <li key={i}>{s}</li>)}
//             </ul>
//           ) : (
//             <p className="text-sm text-green-600">No strong skills detected</p>
//           )}
//         </div>

//         {/* IMPROVED SUMMARIES */}
//         <div className="rounded-xl border bg-white p-5 shadow">
//           <h3 className="font-semibold text-gray-700 mb-1">Improved Summary (Short)</h3>
//           <p className="text-sm text-gray-600 bg-white border rounded-md p-2 shadow">
//             {result.ai?.summary_improved_short || "—"}
//           </p>
//         </div>

//         <div className="rounded-xl border bg-white p-5 shadow">
//           <h3 className="font-semibold text-gray-700 mb-1">Improved Summary (Long)</h3>
//           <p className="text-sm text-gray-600 bg-white border rounded-md p-2 shadow">
//             {result.ai?.summary_improved_long || "—"}
//           </p>
//         </div>

//         {/* KEYWORD DENSITY */}
//         {keywordDensity.length > 0 && (
//           <div className="rounded-xl border bg-white p-5 shadow">
//             <h3 className="font-semibold mb-2">Keyword Density</h3>
//             <ul className="pl-4 list-disc text-sm">
//               {keywordDensity.map((k, i) => (
//                 <li key={i}>{k.keyword}: {k.density}%</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* ACTION PLAN */}
//         {actionPlan.length > 0 && (
//           <div className="rounded-xl border bg-white p-5 shadow">
//             <h3 className="font-semibold mb-2">Action Plan</h3>
//             <ul className="pl-4 list-disc text-sm">
//               {actionPlan.map((s, i) => <li key={i}>{s}</li>)}
//             </ul>
//           </div>
//         )}

//         {/* META INFO */}
//         <div className="pt-2 text-xs text-gray-500">
//           File: {result.meta?.filename}
//         </div>

//         <Link
//           href="/resumeoptimizer/scan-resume"
//           className="inline-block px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
//         >
//           Go Back
//         </Link>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useMemo, useState } from "react";
// import Link from "next/link";
// import { ChevronDown, ChevronUp, AlertCircle, CheckCircle } from "lucide-react";

// /**
//  * Result page (UI-only). Uses localStorage "resume_result" saved by your existing scan flow.
//  * - Suggested default categories (UI grouping only; no logic changes)
//  * - Simple bullet format (B)
//  *
//  * Place file as: app/resumeoptimizer/result/page.jsx
//  */

// const DEFAULT_CATEGORIES = [
//   "Writing Quality",
//   "Formatting & Layout",
//   "Structure & Organization",
//   "Keyword & ATS Optimization",
//   "Content Relevance & Tailoring",
//   "Achievement Quantification & Impact",
//   "Clarity & Conciseness",
//   "Consistency & Accuracy",
//   "Readability & Scannability",
//   "Professional Branding & Tone",
//   "Supplemental Sections",
// ];

// function Gauge({ score = 0, issues = 0 }) {
//   const pct = Math.max(0, Math.min(100, Math.round(score)));
//   const angle = (pct / 100) * 360;
//   const stroke = 16;
//   const radius = 80;
//   const circ = 2 * Math.PI * radius;
//   const offset = circ - (angle / 360) * circ;

//   return (
//     <div className="w-full bg-white rounded-xl p-6 shadow-md">
//       <div className="flex items-center gap-6">
//         <svg width="220" height="140" viewBox="0 0 220 140">
//           <defs>
//             <linearGradient id="g1" x1="0" x2="1">
//               <stop offset="0%" stopColor="#10b981" />
//               <stop offset="60%" stopColor="#06b6d4" />
//               <stop offset="100%" stopColor="#6366f1" />
//             </linearGradient>
//           </defs>

//           <g transform="translate(110,90)">
//             {/* background arc */}
//             <circle
//               r={radius}
//               cx="0"
//               cy="0"
//               fill="transparent"
//               stroke="#eef2ff"
//               strokeWidth={stroke}
//               strokeLinecap="round"
//               strokeDasharray={`${circ}`}
//               strokeDashoffset={0}
//             />
//             {/* progress arc */}
//             <circle
//               r={radius}
//               cx="0"
//               cy="0"
//               fill="transparent"
//               stroke="url(#g1)"
//               strokeWidth={stroke}
//               strokeLinecap="round"
//               strokeDasharray={`${circ}`}
//               strokeDashoffset={offset}
//               transform="rotate(-90)"
//             />
//             {/* center text */}
//             <text x="0" y="-6" textAnchor="middle" fontSize="28" fontWeight="700" fill="#1e293b">
//               {pct}
//             </text>
//             <text x="0" y="20" textAnchor="middle" fontSize="12" fill="#475569">
//               /100
//             </text>
//           </g>
//         </svg>

//         <div className="flex-1">
//           <div className="text-sm text-gray-500">Your Score</div>
//           <div className="text-2xl font-bold text-slate-800">{pct}/100</div>
//           <div className="mt-2 text-sm text-gray-600">
//             {issues > 0 ? `${issues} issues to solve` : "No major issues detected"}
//           </div>

//           <div className="mt-4 flex gap-2">
//             <button className="px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-sm">All Suggestions</button>
//             <button className="px-3 py-1.5 rounded-full bg-white text-gray-600 text-sm border">Urgent</button>
//             <button className="px-3 py-1.5 rounded-full bg-white text-gray-600 text-sm border">Warning</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function CategoryCard({ name, items = [], openByDefault = false }) {
//   const [open, setOpen] = useState(openByDefault);
//   const count = items.length;

//   return (
//     <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
//       <button
//         onClick={() => setOpen((v) => !v)}
//         className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
//       >
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
//             <span className="text-sm font-semibold">{name.split(" ").slice(0,2).map(w=>w[0]).join("")}</span>
//           </div>
//           <div>
//             <div className="font-semibold text-slate-800">{name}</div>
//             <div className="text-xs text-gray-500">{count} suggestions</div>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <div className="text-sm text-red-500 font-semibold">{count > 0 ? count : ""}</div>
//           <div className="p-2 rounded-full hover:bg-gray-100">
//             {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//           </div>
//         </div>
//       </button>

//       {open && (
//         <div className="border-t p-4">
//           {items.length === 0 ? (
//             <div className="text-sm text-green-600">No issues found ✅</div>
//           ) : (
//             <ul className="space-y-3 text-sm text-gray-700">
//               {items.map((it, i) => (
//                 <li key={i} className="bg-gray-50 rounded-md p-3">
//                   {/* Simple bullet format (B) */}
//                   <div className="text-sm">{it}</div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default function ResultPage() {
//   const [result, setResult] = useState(null);
//   const [filter, setFilter] = useState("all"); // all, urgent, warning

//   useEffect(() => {
//     try {
//       const data = localStorage.getItem("resume_result");
//       if (data) setResult(JSON.parse(data));
//     } catch (e) {
//       console.error("failed to parse resume_result", e);
//     }
//   }, []);

//   // map your flat fields into suggested UI categories (UI-only)
//   const categories = useMemo(() => {
//     if (!result) return DEFAULT_CATEGORIES.map((n) => ({ name: n, items: [] }));

//     // collect arrays defensively
//     const missing = result.ai?.missing_skills || [];
//     const weak = result.ai?.weak_skills || [];
//     const grammar = (result.ai?.grammar_fixes || []).map(g => g.before ? `Fix: ${g.before}` : JSON.stringify(g));
//     const atsWarnings = result.ai?.ats_warnings || [];
//     const metaNotes = [];

//     // you can expand mapping rules here (UI only)
//     return [
//       { name: "Writing Quality", items: [...grammar] },
//       { name: "Formatting & Layout", items: [...(result.ats?.formatting_issues || []), ...metaNotes] },
//       { name: "Structure & Organization", items: [...(result.ai?.structure_tips || [])] },
//       { name: "Keyword & ATS Optimization", items: [...missing, ...atsWarnings] },
//       { name: "Content Relevance & Tailoring", items: [...(result.ai?.relevance_tips || [])] },
//       { name: "Achievement Quantification & Impact", items: [...(result.ai?.quantification_tips || [])] },
//       { name: "Clarity & Conciseness", items: [...(result.ai?.clarity_tips || []), ...grammar] },
//       { name: "Consistency & Accuracy", items: [...(result.ai?.consistency_tips || [])] },
//       { name: "Readability & Scannability", items: [...(result.ai?.readability_tips || [])] },
//       { name: "Professional Branding & Tone", items: [...(result.ai?.branding_tips || [])] },
//       { name: "Supplemental Sections", items: [...(result.ai?.supplemental_tips || [])] },
//     ];
//   }, [result]);

//   // aggregate issue count (sum of lengths)
//   const totalIssues = useMemo(() => {
//     if (!categories) return 0;
//     return categories.reduce((acc, c) => acc + (c.items?.length || 0), 0);
//   }, [categories]);

//   if (!result) {
//     return (
//       <div className="p-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="rounded-xl border bg-white p-6 shadow text-center">
//             <div className="text-lg font-semibold">No analysis found</div>
//             <div className="text-sm text-gray-500 mt-2">Run the resume scan first.</div>
//             <div className="mt-4">
//               <Link href="/resumeoptimizer/scan-resume" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md">
//                 Go to Scanner
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // filter categories if required (UI-only; uses presence of keyword "urgent" or "warning" in item text if no explicit urgency)
//   const filteredCategories = categories.map(cat => {
//     if (filter === "all") return cat;
//     const lower = filter === "urgent" ? "urgent" : "warning";
//     return { ...cat, items: (cat.items || []).filter(it => String(it).toLowerCase().includes(lower)) };
//   }).filter(c => c.items.length > 0 || filter === "all"); // keep empty if all

//   return (
//     <div className="min-h-screen px-6 py-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">
//         {/* Left (main) */}
//         <div className="space-y-6">
//           {/* Header / Score container */}
//           <div className="rounded-2xl bg-indigo-50/60 p-6 shadow-inner border border-indigo-100">
//             <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 items-center">
//               <div>
//                 <Gauge score={result.ats?.score || 0} issues={totalIssues} />
//               </div>

//               {/* summary / filters */}
//               <div className="p-4">
//                 <div className="mb-4">
//                   <div className="text-sm text-gray-600">Suggestions</div>
//                   <div className="mt-2 flex gap-2">
//                     <button onClick={() => setFilter("all")} className={`px-3 py-2 rounded-full text-sm ${filter==='all' ? 'bg-indigo-600 text-white' : 'bg-white border'}`}>All</button>
//                     <button onClick={() => setFilter("urgent")} className={`px-3 py-2 rounded-full text-sm ${filter==='urgent' ? 'bg-red-100 text-red-700' : 'bg-white border'}`}>Urgent</button>
//                     <button onClick={() => setFilter("warning")} className={`px-3 py-2 rounded-full text-sm ${filter==='warning' ? 'bg-yellow-100 text-yellow-700' : 'bg-white border'}`}>Warning</button>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <div className="text-sm text-gray-600">Quick Actions</div>
//                   <div className="flex flex-col gap-2 mt-2">
//                     <Link href="/resumeoptimizer/scan-resume" className="px-3 py-2 rounded-md bg-white border text-sm">Scan again</Link>
//                     <button onClick={() => { navigator.clipboard.writeText(JSON.stringify(result || {}, null, 2)); }} className="px-3 py-2 rounded-md bg-white border text-sm">Copy Result JSON</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* category list */}
//           <div className="space-y-4">
//             {filteredCategories.map((cat, idx) => (
//               <CategoryCard key={cat.name + idx} name={cat.name} items={cat.items} openByDefault={idx === 0} />
//             ))}
//           </div>
//         </div>

//         {/* Right (assistant / meta) */}
//         <aside className="sticky top-6">
//           <div className="bg-white rounded-xl p-4 shadow-md w-full">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">P</div>
//               <div>
//                 <div className="font-semibold">AutoPlaced.info</div>
//                 <div className="text-xs text-gray-500">Your AI partner</div>
//               </div>
//             </div>

//             <div className="mt-4 text-sm text-gray-600">
//               Hello, you can ask anything regarding resume optimization.
//             </div>

//             <div className="mt-4 flex gap-2">
//               <button className="flex-1 px-3 py-2 rounded-md bg-indigo-600 text-white text-sm">How to get a higher score</button>
//             </div>

//             <div className="mt-3">
//               <input placeholder="Ask anything" className="w-full border rounded-md px-3 py-2 text-sm" />
//             </div>
//           </div>

//           <div className="mt-4 text-xs text-gray-500">
//             File: <span className="text-sm text-gray-700">{result.meta?.filename || "—"}</span>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import Sidebar from "../../../components/sidebar/sidebar";
// import BreadcrumbNav from "../../../components/sidebar/BreadcrumbNav";
// import { motion } from "framer-motion";
// import Link from "next/link";

// export default function ResultPage() {
//   const [activeTab, setActiveTab] = useState("Resume Optimizer");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     const data = localStorage.getItem("resume_result");
//     if (data) setResult(JSON.parse(data));
//   }, []);

//   if (!result)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-600">
//         No data found.<br />
//         <Link href="/resumeoptimizer/scan-resume" className="text-indigo-600 underline">
//           Scan Again
//         </Link>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-white text-gray-800 font-inter flex">

//       {/* Sidebar */}
//       <Sidebar
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//       />

//       {/* Main */}
//       <main className="flex-1 md:ml-60 mt-16 md:mt-0 p-6 md:p-8">
//         <BreadcrumbNav activeTab={activeTab} />

//         {/* Title */}
//         <motion.h2
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className="text-2xl font-bold text-gray-800 mb-6"
//         >
//           Resume Optimization Results
//         </motion.h2>

//         {/* GRID */}
//         <div className="grid xl:grid-cols-2 gap-8">

//           {/* ATS SCORE CARD */}
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="
//               rounded-2xl p-6 backdrop-blur-xl bg-white/70
//               shadow-[0_8px_18px_rgba(0,0,0,0.08)]
//               hover:shadow-[0_14px_30px_rgba(0,0,0,0.16)]
//               hover:-translate-y-1
//               transition-all duration-300
//             "
//           >
//             <h3 className="text-xl font-semibold mb-3 text-gray-800">ATS Score</h3>
//             <p className="text-4xl font-bold text-indigo-600">{result.ats?.score ?? 0}/100</p>

//             <h4 className="mt-4 font-medium text-gray-700">Missing Keywords</h4>
//             <ul className="pl-4 list-disc text-gray-600">
//               {(result.ats?.missing_keywords || []).map((k, i) => (
//                 <li key={i}>{k}</li>
//               ))}
//             </ul>

//             <h4 className="mt-4 font-medium text-gray-700">Warnings</h4>
//             <ul className="pl-4 list-disc text-red-600">
//               {(result.ai?.ats_warnings || []).map((w, i) => (
//                 <li key={i}>{w}</li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* GRAMMAR FIXES */}
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="
//               rounded-2xl p-6 backdrop-blur-xl bg-white/70
//               shadow-[0_8px_18px_rgba(0,0,0,0.08)]
//               hover:shadow-[0_14px_30px_rgba(0,0,0,0.16)]
//               hover:-translate-y-1
//               transition-all duration-300
//             "
//           >
//             <h3 className="text-xl font-semibold mb-3 text-gray-800">Grammar Fixes</h3>

//             {(result.ai?.grammar_fixes || []).length ? (
//               <ul className="space-y-3">
//                 {result.ai.grammar_fixes.map((fix, i) => (
//                   <li key={i} className="border rounded-lg p-2 bg-white shadow">
//                     <b>Before:</b> {fix.before}<br />
//                     <b>After:</b> {fix.after}<br />
//                     <span className="text-gray-500 text-sm"><b>Reason:</b> {fix.reason}</span>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-green-600">No grammar issues ✅</p>
//             )}
//           </motion.div>

//           {/* WEAK SKILLS */}
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="
//               rounded-2xl p-6 backdrop-blur-xl bg-white/70
//               shadow-[0_8px_18px_rgba(0,0,0,0.08)]
//               hover:shadow-[0_14px_30px_rgba(0,0,0,0.16)]
//               hover:-translate-y-1
//               transition-all duration-300
//             "
//           >
//             <h3 className="text-xl font-semibold mb-3 text-gray-800">Weak Skills</h3>

//             {(result.ai?.weak_skills || []).length ? (
//               <ul className="pl-4 list-disc text-gray-600 space-y-1">
//                 {result.ai.weak_skills.map((s, i) => (
//                   <li key={i}>{s}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-green-600">No weak skills ✅</p>
//             )}
//           </motion.div>

//           {/* IMPROVED SUMMARIES */}
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="
//               rounded-2xl p-6 backdrop-blur-xl bg-white/70
//               shadow-[0_8px_18px_rgba(0,0,0,0.08)]
//               hover:shadow-[0_14px_30px_rgba(0,0,0,0.16)]
//               hover:-translate-y-1
//               transition-all duration-300
//             "
//           >
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">
//               Improved Summary (Short)
//             </h3>
//             <p className="text-gray-600 bg-white border rounded-lg p-3 shadow">
//               {result.ai?.summary_improved_short || "—"}
//             </p>

//             <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
//               Improved Summary (Long)
//             </h3>
//             <p className="text-gray-600 bg-white border rounded-lg p-3 shadow">
//               {result.ai?.summary_improved_long || "—"}
//             </p>
//           </motion.div>

//         </div>

//         {/* META */}
//         <div className="pt-6 text-xs text-gray-500">
//           File: {result.meta?.filename}
//         </div>

//         {/* BACK BUTTON */}
//         <Link
//           href="/resumeoptimizer/scan-resume"
//           className="inline-block mt-6 px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md"
//         >
//           Go Back
//         </Link>
//       </main>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/sidebar";
import BreadcrumbNav from "../../../components/sidebar/BreadcrumbNav";
import { motion } from "framer-motion";
import Link from "next/link";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

import { Chart } from "chart.js/auto";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function ResultPage() {
  const [activeTab, setActiveTab] = useState("Resume Optimizer");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [result, setResult] = useState(null);
  

  useEffect(() => {
    const data = localStorage.getItem("resume_result");
    if (data) setResult(JSON.parse(data));
  }, []);

  if (!result)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        No data found.<br />
        <Link href="/resumeoptimizer/scan-resume" className="text-indigo-600 underline">
          Scan Again
        </Link>
      </div>
    );

  const score = result?.ats?.score ?? 0;

  // 🍩 Donut Chart
  const doughnutData = {
    labels: ["Score", "Remaining"],
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: ["#5E43F3", "#E5E7EB"], // <-- COLORS ADDED
        borderWidth: 0,
        hoverBackgroundColor: ["#6B4CFF", "#F3F4F6"],
        cutout: "70%",
      },
    ],
  };


  const doughnutOptions = {
    plugins: {
      legend: { display: false },
    },
    maintainAspectRatio: false,
  };


  // 📊 Skill Impact
  const skillData = result.ai?.skill_impact || [];

  const skillChartData = {
    labels: skillData.map((i) => i.skill),
    datasets: [
      {
        data: skillData.map((i) => i.score),
        borderWidth: 0,
      },
    ],
  };

  const skillChartOptions = {
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { ticks: { stepSize: 20 } },
    },
  };
  const centerTextPlugin = {
  id: "centerText",
  afterDraw(chart) {
    const { ctx, chartArea: { width, height } } = chart;
    ctx.save();
    ctx.font = "bold 28px Inter";
    ctx.fillStyle = "#4F46E5";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${chart.data.datasets[0].data[0]}`, width / 2, height / 2);
  }
};
Chart.register(centerTextPlugin);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-white text-gray-800 font-inter flex">

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main */}
      <main className="flex-1 md:ml-60 mt-16 md:mt-0 p-6 md:p-8">
        <BreadcrumbNav activeTab={activeTab} />

        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-bold text-gray-800 mb-6"
        >
          Resume Optimization Results
        </motion.h2>

        {/* DONUT + ISSUE COUNTS */}
        {/* <div className="bg-white rounded-2xl p-6 mb-10 shadow-lg flex flex-col items-center">
          <h3 className="font-semibold text-xl mb-3">Your Score</h3>

          <div className="w-44">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>

          <p className="text-center mt-3 text-red-500 text-sm">
            {100 - score} Issues to solve
          </p>


          <div className="flex gap-4 mt-4">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-xl text-sm">
              All {result.ai?.suggestions?.length || 11}
            </span>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-xl text-sm">
              Urgent {result.ai?.urgent?.length || 3}
            </span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-xl text-sm">
              Warning {result.ai?.warning?.length || 3}
            </span>
          </div>
        </div> */}

        {/* GRID CONTENT */}
        <div className="grid xl:grid-cols-2 gap-8">

          {/* ATS SCORE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6 bg-white shadow-lg transition duration-300"
          >
            {/* <h3 className="text-xl font-semibold mb-3 text-gray-800">ATS Score</h3> */}
            {/* <p className="text-4xl font-bold text-indigo-600">{score}/100</p>
            <div className="w-44">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>

          <p className="text-center mt-3 text-red-500 text-sm">
            {100 - score} Issues to solve
          </p> */}
            <h3 className="text-xl font-semibold mb-3 text-gray-800 ml-30 lg:ml-55">ATS Score</h3>

            <div className="relative w-44 h-44 flex items-center justify-center ml-23 lg:ml-45">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>

            <p className="text-center mt-3 text-red-500 text-sm">
              {100 - score} Issues to solve
            </p>


            <h4 className="mt-4 font-medium text-gray-700">Missing Keywords</h4>
            <ul className="pl-4 list-disc text-yellow-600">
              {(result.ats?.missing_keywords || []).map((k, i) => (
                <li key={i}>{k}</li>
              ))}
            </ul>

            <h4 className="mt-4 font-medium text-gray-700">Warnings</h4>
            <ul className="pl-4 list-disc text-red-600">
              {(result.ai?.ats_warnings || []).map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </motion.div>

          {/* GRAMMAR FIXES */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6 bg-white shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Grammar Fixes
            </h3>

            {(result.ai?.grammar_fixes || []).length ? (
              <ul className="space-y-3">
                {result.ai.grammar_fixes.map((fix, i) => (
                  <li key={i} className="border rounded-lg p-2 bg-white shadow">
                    <b className="text-red-600">Before:</b> {fix.before}<br />
                    <b className="text-green-600">After:</b> {fix.after}<br />
                    <span className="text-gray-500 text-sm"><b>Reason:</b> {fix.reason}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-green-600">No grammar issues ✅</p>
            )}
          </motion.div>

          {/* WEAK SKILLS */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6 bg-white shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Weak Skills</h3>

            {(result.ai?.weak_skills || []).length ? (
              <ul className="pl-4 list-disc text-red-600 space-y-1">
                {result.ai.weak_skills.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            ) : (
              <p className="text-green-600">No weak skills ✅</p>
            )}
          </motion.div>

          {/* SKILL IMPACT BAR CHART */}
          {skillData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-6 bg-white shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Skill Impact Strength
              </h3>
              <Bar data={skillChartData} options={skillChartOptions} />
            </motion.div>
          )}

          {/* IMPROVED SUMMARIES */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6 bg-white shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Improved Summary (Short)
            </h3>
            <p className="text-gray-600 bg-white border rounded-lg p-3 shadow">
              {result.ai?.summary_improved_short || "—"}
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
              Improved Summary (Long)
            </h3>
            <p className="text-gray-600 bg-white border rounded-lg p-3 shadow">
              {result.ai?.summary_improved_long || "—"}
            </p>
          </motion.div>
        </div>

        {/* META */}
        <div className="pt-6 text-xs text-gray-500">
          File: {result.meta?.filename}
        </div>

        {/* BACK BUTTON */}
      

      </main>
    </div>
  );
}
