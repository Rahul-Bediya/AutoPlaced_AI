

// "use client";

// import { useEffect, useState } from "react";
// import Sidebar from "../../../components/sidebar/sidebar";
// import BreadcrumbNav from "../../../components/sidebar/BreadcrumbNav";

// export default function NotesResultPage() {
//   const [data, setData] = useState(null);
//   const [activeTab, setActiveTab] = useState("summary");
//     const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     const raw = localStorage.getItem("notes_result");
//     if (raw) setData(JSON.parse(raw));
//   }, []);

//   if (!data) {
//     return (
//       <div className="p-6 text-gray-600">
//         No generated notes found. Please upload again.
//       </div>
//     );
//   }

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
//         <BreadcrumbNav activeTab={"Smart Notes"} />

//         <div className="min-h-screen px-4 md:px-8 py-8 space-y-8 bg-white">

//           {/* PAGE TITLE */}
//           <h1 className="text-2xl font-bold text-gray-800">
//             Note Tracker
//           </h1>

//           {/* Tabs */}
//           <div className="flex items-center gap-3 text-sm">
//             {["summary", "flashcards", "quizzes"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`
//               px-4 py-2 rounded-xl transition font-medium
//               ${activeTab === tab
//                     ? "bg-indigo-600 text-white shadow"
//                     : "bg-gray-100 hover:bg-gray-200 text-gray-700"}
//             `}
//               >
//                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               </button>
//             ))}
//           </div>

//           {/* CONTENT SWITCH */}
//           {activeTab === "summary" && (
//             <div className="space-y-6">

//               {/* Short Summary */}
//               <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-2xl shadow-sm">
//                 <h2 className="font-semibold text-indigo-700 text-lg mb-2">
//                   Short Summary
//                 </h2>
//                 <p className="text-gray-700 leading-relaxed">
//                   {data.summaryShort}
//                 </p>
//               </div>

//               {/* Long Summary */}
//               <div className="bg-purple-50 border border-purple-200 p-5 rounded-2xl shadow-sm">
//                 <h2 className="font-semibold text-purple-700 text-lg mb-2">
//                   Detailed Summary
//                 </h2>
//                 <p className="text-gray-700 whitespace-pre-line leading-relaxed">
//                   {data.summaryLong}
//                 </p>
//               </div>

//             </div>
//           )}

//           {/* Flashcards */}
//           {activeTab === "flashcards" && (
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold text-gray-800 mb-3">Flashcards</h2>
//               <div className="grid md:grid-cols-2 gap-5">
//                 {data.flashcards?.map((fc, i) => (
//                   <div
//                     key={i}
//                     className="bg-white border p-5 rounded-2xl shadow-sm hover:shadow-md transition"
//                   >
//                     <div className="font-semibold text-gray-800">{fc.term}</div>
//                     <div className="text-gray-600 mt-2 text-sm leading-relaxed">
//                       {fc.definition}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Quizzes */}
//           {activeTab === "quizzes" && (
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold text-gray-800 mb-3">
//                 Quiz Questions
//               </h2>
//               {data.quizzes && data.quizzes.length > 0 ? (
//                 data.quizzes.map((q, i) => (
//                   <div
//                     key={i}
//                     className="bg-yellow-50 border border-yellow-200 p-5 rounded-2xl shadow-sm"
//                   >
//                     <div className="font-medium text-gray-800 mb-2">
//                       {i + 1}. {q.question}
//                     </div>
//                     <div className="text-gray-700 leading-relaxed">
//                       {q.answer}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500">No quizzes generated.</p>
//               )}
//             </div>
//           )}

//         </div>
//       </main>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import Sidebar from "../../../components/sidebar/sidebar";
// import BreadcrumbNav from "../../../components/sidebar/BreadcrumbNav";
// import { useRouter } from "next/navigation";

// export default function NotesResultPage() {
//   const [data, setData] = useState(null);
//   const [activeTab, setActiveTab] = useState("summary");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//    const router = useRouter();

//  useEffect(() => {
//   const raw = localStorage.getItem("notes_result");

//   // prevent stale output
//   if (!raw || raw.length < 10) {
//     router.push("/notestracker/notesresult");
//     return;
//   }

//   setData(JSON.parse(raw));
// }, []);


//   if (!data) {
//     return (
//       <div className="p-6 text-gray-600">
//         No generated notes found. Please upload again.
//       </div>
//     );
//   }

//   const tabs = ["summary", "keyPoints", "definitions", "flashcards", "quizzes"];

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
//         <BreadcrumbNav activeTab={"Smart Notes"} />

//         <div className="min-h-screen px-4 md:px-8 py-8 space-y-8 bg-white rounded-xl">

//           {/* Page TITLE */}
//           <h1 className="text-2xl font-bold text-gray-800">
//             AI-Generated Smart Notes
//           </h1>

//           {/* Tabs */}
//           <div className="flex items-center gap-3 text-sm flex-wrap">
//             {tabs.map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`
//                   px-4 py-2 rounded-xl transition font-medium
//                   ${activeTab === tab
//                     ? "bg-indigo-600 text-white shadow"
//                     : "bg-gray-100 hover:bg-gray-200 text-gray-700"}
//               `}
//               >
//                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               </button>
//             ))}
//           </div>

//           {/* SUMMARY TAB */}
//           {activeTab === "summary" && (
//             <div className="space-y-6">

//               <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-2xl shadow-sm">
//                 <h2 className="font-semibold text-indigo-700 text-lg mb-2">
//                   Short Summary
//                 </h2>
//                 <p className="text-gray-700">
//                   {data.summaryShort}
//                 </p>
//               </div>

//               <div className="bg-purple-50 border border-purple-200 p-5 rounded-2xl shadow-sm">
//                 <h2 className="font-semibold text-purple-700 text-lg mb-2">
//                   Detailed Summary
//                 </h2>
//                 <p className="text-gray-700 whitespace-pre-line">
//                   {data.summaryLong}
//                 </p>
//               </div>

//             </div>
//           )}

//           {/* KEY POINTS */}
//           {activeTab === "keyPoints" && (
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold text-gray-800 mb-3">
//                 Key Points
//               </h2>

//               <div className="space-y-3">
//                 {data.keyPoints?.map((point, i) => (
//                   <div
//                     key={i}
//                     className="bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-sm text-gray-700"
//                   >
//                     ✅ {point}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* DEFINITIONS */}
//           {activeTab === "definitions" && (
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold text-gray-800 mb-3">
//                 Definitions
//               </h2>

//               <div className="grid md:grid-cols-2 gap-5">
//                 {data.definitions?.map((def, i) => (
//                   <div
//                     key={i}
//                     className="bg-green-50 border border-green-200 p-5 rounded-2xl shadow-sm"
//                   >
//                     <div className="font-semibold text-gray-800">{def.term}</div>
//                     <div className="text-gray-700 text-sm mt-2">
//                       {def.meaning}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* FLASHCARDS */}
//           {activeTab === "flashcards" && (
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold text-gray-800 mb-3">
//                 Flashcards
//               </h2>

//               <div className="grid md:grid-cols-2 gap-5">
//                 {data.flashcards?.map((fc, i) => (
//                   <div
//                     key={i}
//                     className="bg-white border p-5 rounded-2xl shadow-sm hover:shadow-md transition"
//                   >
//                     <div className="font-semibold text-gray-800">
//                       {fc.term}
//                     </div>
//                     <div className="text-gray-600 mt-2 text-sm">
//                       {fc.definition}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* QUIZZES */}
//           {activeTab === "quizzes" && (
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold text-gray-800 mb-3">
//                 Conceptual Quizzes
//               </h2>

//               {data.quizzes?.length > 0 ? (
//                 data.quizzes.map((q, i) => (
//                   <div
//                     key={i}
//                     className="bg-yellow-50 border border-yellow-200 p-5 rounded-2xl shadow-sm space-y-3"
//                   >
//                     <div className="font-medium text-gray-800">
//                       {i + 1}. {q.question}
//                     </div>

//                     <div className="grid grid-cols-2 gap-3 text-sm">
//                       {q.options.map((opt, oi) => (
//                         <div
//                           key={oi}
//                           className="border bg-white px-3 py-2 rounded-lg text-gray-700 hover:bg-yellow-100 transition"
//                         >
//                           {String.fromCharCode(65 + oi)}. {opt}
//                         </div>
//                       ))}
//                     </div>

//                     <div className="text-sm font-semibold text-green-600">
//                       Correct Answer: {q.answer}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500">No quizzes generated.</p>
//               )}
//             </div>
//           )}

//         </div>
//       </main>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";

export default function ResultPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("smartNotesData");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) {
    return <div>No generated notes found. Please upload again.</div>;
  }

  return (
    <div>
      <h2>Summary</h2>
      <p>{data.summary}</p>

      <h2>Key Points</h2>
      <pre>{data.keypoints}</pre>

      <h2>Definitions</h2>
      <pre>{data.definitions}</pre>

      <h2>Flashcards</h2>
      {data.flashcards.map((f,i)=>(
        <div key={i}>
          <b>Q:</b> {f.question}
          <br/>
          <b>A:</b> {f.answer}
        </div>
      ))}
    </div>
  );
}
