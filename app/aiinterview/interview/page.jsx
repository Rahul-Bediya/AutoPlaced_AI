

// "use client";

// import { useState,useEffect,useRef } from "react";
// import { Mic, SkipForward, CircleDot, Play } from "lucide-react";

// import { motion } from "framer-motion";
// import Sidebar from "../../../components/sidebar/sidebar";
// import BreadcrumbNav from "../../../components/sidebar/BreadcrumbNav";


// export default function Interview() {
//   const [activeTab, setActiveTab] = useState("interview-prep");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const [timeLeft, setTimeLeft] = useState(60);
//   const [recording, setRecording] = useState(false);
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const videoRef = useRef(null);

//   const questions = [
//     {
//       id: 1,
//       level: "Medium",
//       type: "Technical",
//       text: "Can you explain how Tailwind CSS improves the workflow in React projects?",
//     },
//     {
//       id: 2,
//       level: "Hard",
//       type: "System Design",
//       text: "How would you design a scalable video interview system?",
//     },
//   ];
//   const currentQuestion = questions[questionIndex];

//   useEffect(() => {
//     async function initCamera() {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });
//         if (videoRef.current) videoRef.current.srcObject = stream;
//       } catch (err) {
//         console.error("Camera access denied:", err);
//       }
//     }
//     initCamera();
//     return () => {
//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
//       }
//     };
//   }, []);

//   // countdown timer
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((t) => (t > 0 ? t - 1 : 0));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [questionIndex]);

//   const handleNext = () => {
//     if (questionIndex < questions.length - 1) {
//       setQuestionIndex(questionIndex + 1);
//       setTimeLeft(60);
//     } else {
//       alert("Interview Completed!");
//     }
//   };


//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-pink-50 to-white text-gray-800 font-inter">
//       {/* Sidebar */}
//       <Sidebar
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//       />

//       {/* Main Content */}
//       <main
//         className="
//           flex-1 
//           md:ml-60 
//           p-4 sm:p-6 md:p-8 
//           mt-20 md:mt-0 
//           transition-all
//           duration-300
//           ease-in-out
//           overflow-x-hidden
//         "
//       >
//         {/* Breadcrumb Navbar */}
//         <BreadcrumbNav activeTab={activeTab} />


//          <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8"
//         >
//           {/* Left: Camera + Controls */}
//           <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 flex flex-col">
//             {/* Header */}
//             <div className="flex justify-between items-center mb-4">
//               <div className="flex items-center gap-2">
//                 <CircleDot className="text-red-500 animate-pulse" size={16} />
//                 <span className="font-medium text-gray-700">Live Interview</span>
//               </div>
//               <div className="text-sm text-gray-600 font-semibold bg-indigo-50 px-3 py-1 rounded-lg">
//                 ⏱ {timeLeft}s
//               </div>
//             </div>

//             {/* Camera Preview */}
//             <div className="flex-1 bg-gray-900 rounded-xl overflow-hidden">
//               <video
//                 ref={videoRef}
//                 autoPlay
//                 muted
//                 playsInline
//                 className="w-full h-[400px] object-cover"
//               />
//             </div>

//             {/* Controls */}
//             <div className="flex justify-between mt-6">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 onClick={() => setRecording(!recording)}
//                 className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-medium shadow-md transition-all ${
//                   recording ? "bg-red-500 hover:bg-red-600" : "bg-indigo-600 hover:bg-indigo-700"
//                 }`}
//               >
//                 <Mic size={18} />
//                 {recording ? "Recording..." : "Answer"}
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 onClick={handleNext}
//                 className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2.5 rounded-lg hover:bg-gray-900 transition"
//               >
//                 Next Question <SkipForward size={18} />
//               </motion.button>
//             </div>
//           </div>

//           {/* Right: Question Panel */}
//           <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 flex flex-col">
//             <div className="flex items-center gap-2 mb-2">
//               <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
//                 {currentQuestion.type}
//               </span>
//               <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
//                 {currentQuestion.level}
//               </span>
//             </div>

//             <h2 className="text-lg font-semibold text-gray-800 mb-3">Question</h2>
//             <p className="text-gray-600 text-sm leading-relaxed flex-1">
//               {currentQuestion.text}
//             </p>

//             <div className="mt-6 flex justify-center">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 onClick={() => setTimeLeft(60)}
//                 className="text-indigo-600 flex items-center gap-2 text-sm font-medium"
//               >
//                 <Play size={16} /> Replay Question
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>

//       </main>
//     </div>
//   );
// }

// "use client"
// import { useState, useEffect, useRef } from "react";
// import { Mic, SkipForward, CircleDot, Play } from "lucide-react";
// import { motion } from "framer-motion";
// import Sidebar from "../../../components/sidebar/sidebar";
// import BreadcrumbNav from "../../../components/sidebar/BreadcrumbNav";
// import { useSearchParams } from "next/navigation";

// export default function Interview() {
//   const [activeTab, setActiveTab] = useState("interview-prep");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [session, setSession] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(60);
//   const [recording, setRecording] = useState(false);
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState({}); // { [questionId]: { text } }
//   const videoRef = useRef(null);
//   const searchParams = useSearchParams();
//   const sessionId = searchParams.get("session");

//   // Speech recognition
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
//       console.warn("Speech recognition not supported in this browser");
//       return;
//     }
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.lang = "en-US";

//     recognition.onresult = (event) => {
//       const transcript = Array.from(event.results)
//         .map((r) => r[0].transcript)
//         .join(" ");
//       const qid = session?.questions[questionIndex]?.id;
//       if (qid) {
//         setAnswers((prev) => ({
//           ...prev,
//           [qid]: { ...(prev[qid] || {}), text: transcript },
//         }));
//       }
//     };

//     recognitionRef.current = recognition;
//   }, [session, questionIndex]);

//   const toggleRecording = () => {
//     if (!recognitionRef.current) return;

//     if (!recording) {
//       recognitionRef.current.start();
//       setRecording(true);
//     } else {
//       recognitionRef.current.stop();
//       setRecording(false);
//     }
//   };

//   useEffect(() => {
//     // fetch session questions
//     if (!sessionId) return;
//     fetch(`/api/session?id=${encodeURIComponent(sessionId)}`)
//       .then((r) => r.json())
//       .then((data) => {
//         if (data.error) throw new Error(data.error);
//         setSession(data);
//       })
//       .catch((err) => {
//         console.error("session fetch", err);
//         alert("Failed to fetch session: " + err.message);
//       });
//   }, [sessionId]);

//   useEffect(() => {
//     async function initCamera() {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });
//         if (videoRef.current) videoRef.current.srcObject = stream;
//       } catch (err) {
//         console.error("Camera access denied:", err);
//       }
//     }
//     initCamera();
//     return () => {
//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
//       }
//     };
//   }, []);

//   // countdown
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((t) => (t > 0 ? t - 1 : 0));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [questionIndex]);

//   if (!session) return <div className="p-8">Loading interview...</div>;

//   const questions = session.questions || [];
//   const current = questions[questionIndex];

//   const handleAnswerTextChange = (qid, value) => {
//     setAnswers((prev) => ({ ...prev, [qid]: { ...(prev[qid] || {}), text: value } }));
//   };

//   const handleNext = () => {
//     if (questionIndex < questions.length - 1) {
//       setQuestionIndex((q) => q + 1);
//       setTimeLeft(60);
//     } else {
//       submitInterview();
//     }
//   };

//   const submitInterview = async () => {
//     const payload = {};
//     for (const q of questions) {
//       payload[q.id] = (answers[q.id]?.text || "").trim();
//     }
//     try {
//       const res = await fetch("/api/submit-interview", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ sessionId: session.id, answers: payload }),
//       });
//       const json = await res.json();
//       if (!res.ok) throw new Error(json.error || "Submission failed");
//       setSession((prev) => ({ ...prev, results: json.results }));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to submit interview: " + err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-pink-50 to-white text-gray-800 font-inter">
//       <Sidebar
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//       />
//       <main className="flex-1 md:ml-60 p-6 mt-20">
//         <BreadcrumbNav activeTab={activeTab} />
//         <motion.div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
//           <div className="bg-white border rounded-2xl p-6">
//             <div className="flex justify-between items-center mb-4">
//               <div className="flex items-center gap-2">
//                 <CircleDot className="text-red-500 animate-pulse" size={16} />
//                 <span className="font-medium text-gray-700">Live Interview</span>
//               </div>
//               <div className="text-sm text-gray-600 font-semibold bg-indigo-50 px-3 py-1 rounded-lg">
//                 ⏱ {timeLeft}s
//               </div>
//             </div>

//             <div className="bg-gray-900 rounded-xl overflow-hidden mb-4">
//               <video ref={videoRef} autoPlay muted playsInline className="w-full h-[320px] object-cover" />
//             </div>

//             <div>
//               <h3 className="font-semibold mb-2">
//                 Q{current.id}: {current.text}
//               </h3>
//               <textarea
//                 rows={5}
//                 value={answers[current.id]?.text || ""}
//                 onChange={(e) => handleAnswerTextChange(current.id, e.target.value)}
//                 className="w-full border rounded-lg p-3 mb-4"
//                 placeholder="Type your answer here (or record audio using the Answer button)..."
//               />
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={toggleRecording}
//                 className={`px-4 py-2 rounded-lg text-white ${recording ? "bg-red-500" : "bg-indigo-600"}`}
//               >
//                 {recording ? "Recording..." : "Answer (Speak)"}
//               </button>

//               <button onClick={handleNext} className="px-4 py-2 rounded-lg bg-gray-800 text-white">
//                 {questionIndex < questions.length - 1 ? "Next Question" : "Submit Interview"}
//               </button>
//             </div>
//           </div>

//           {/* Right Panel */}
//           <div className="bg-white border rounded-2xl p-6">
//             <div className="mb-4">
//               <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded inline-block mr-2">
//                 {current.type}
//               </div>
//               <div className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded inline-block">
//                 {current.level}
//               </div>
//             </div>

//             <h4 className="font-semibold mb-2">Question List</h4>
//             <ol className="space-y-2 text-sm">
//               {questions.map((q, idx) => (
//                 <li key={q.id} className={`p-2 rounded ${idx === questionIndex ? "bg-indigo-50" : ""}`}>
//                   <div className="font-medium">Q{q.id} — {q.level}</div>
//                   <div className="text-gray-600">
//                     {q.text.slice(0, 80)}
//                     {q.text.length > 80 ? "..." : ""}
//                   </div>
//                 </li>
//               ))}
//             </ol>

//             {session.results && (
//               <div className="mt-6">
//                 <h4 className="font-semibold">Results</h4>
//                 <pre className="text-xs p-2 bg-gray-50 rounded max-h-60 overflow-auto">
//                   {JSON.stringify(session.results, null, 2)}
//                 </pre>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       </main>
//     </div>
//   );
// }
"use client";
import { useState, useEffect, useRef } from "react";
import { Mic, Volume2, Redo2, CircleDot, Play } from "lucide-react";
import { motion } from "framer-motion";

import Sidebar from "../../../components/sidebar/sidebar";
import BreadcrumbNav from "../../../components/sidebar/BreadcrumbNav";
import { useSearchParams } from "next/navigation";

export default function Interview() {
  const [activeTab, setActiveTab] = useState("interview-prep");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [recording, setRecording] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [speakingQuestion, setSpeakingQuestion] = useState(false);

  const videoRef = useRef(null);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session");
  const recognitionRef = useRef(null);

  // 🎤 Setup speech recognition
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      console.warn("Speech recognition not supported");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join(" ");
      const qid = session?.questions[questionIndex]?.id;
      if (qid) {
        setAnswers((prev) => ({
          ...prev,
          [qid]: { ...(prev[qid] || {}), text: transcript },
        }));
      }
    };

    recognitionRef.current = recognition;
  }, [session, questionIndex]);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;
    if (!recording) {
      recognitionRef.current.start();
      setRecording(true);
    } else {
      recognitionRef.current.stop();
      setRecording(false);
    }
  };

  // 🎥 Camera setup
  useEffect(() => {
    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    }
    initCamera();
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // ⏱ Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [questionIndex]);

  // 🧠 Fetch questions
  useEffect(() => {
    if (!sessionId) return;
    fetch(`/api/session?id=${encodeURIComponent(sessionId)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setSession(data);
      })
      .catch((err) => {
        console.error("session fetch", err);
        alert("Failed to fetch session: " + err.message);
      });
  }, [sessionId]);

  // 🗣️ Speak question automatically when it appears
  useEffect(() => {
    if (!session) return;
    const current = session.questions?.[questionIndex];
    if (!current?.text) return;

    speakQuestion(current.text);

    return () => {
      // stop previous speech when question changes
      window.speechSynthesis.cancel();
    };
  }, [questionIndex, session]);

  // 🗣️ Text-to-speech function
  const speakQuestion = (text) => {
    if (!("speechSynthesis" in window)) {
      console.warn("Speech synthesis not supported");
      return;
    }

    setSpeakingQuestion(true);
    window.speechSynthesis.cancel(); // stop previous speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1; // speed
    utterance.pitch = 1;
    utterance.onend = () => setSpeakingQuestion(false);
    utterance.onerror = () => setSpeakingQuestion(false);

    window.speechSynthesis.speak(utterance);
  };

  if (!session) return <div className="p-8">Loading interview...</div>;

  const questions = session.questions || [];
  const current = questions[questionIndex];

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((q) => q + 1);
      setTimeLeft(60);
    } else {
      submitInterview();
    }
  };

  const submitInterview = async () => {
    const payload = {};
    for (const q of questions) {
      payload[q.id] = (answers[q.id]?.text || "").trim();
    }
    try {
      const res = await fetch("/api/submit-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: session.id, answers: payload }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed");
      setSession((prev) => ({ ...prev, results: json.results }));
    } catch (err) {
      console.error(err);
      alert("Failed to submit interview: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800 font-inter">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* <main className="flex-1 md:ml-60 p-8">
        <BreadcrumbNav activeTab={activeTab} />

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 mt-6">
          {/* 🎥 Left Section 
          <div className="bg-white border rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="logo"
                  className="h-6 w-6 rounded-full"
                />
                <div>
                  <p className="font-semibold text-sm">AutoPlaced</p>
                  <p className="text-xs text-gray-500">Your AI partner</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Volume2 className="text-gray-500" size={18} />
                <Redo2 className="text-gray-500" size={18} />
                <div className="flex items-center gap-1 text-red-500 font-semibold text-sm">
                  <CircleDot size={10} className="animate-pulse" />
                  {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                  {String(timeLeft % 60).padStart(2, "0")}
                </div>
              </div>
            </div>

            {/* Video 
            <div className="bg-gray-900 rounded-xl overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* Controls 
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-600">
                {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                {String(timeLeft % 60).padStart(2, "0")}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={toggleRecording}
                  className={`border px-5 py-2 rounded-lg font-medium flex items-center gap-2 ${
                    recording
                      ? "bg-red-500 text-white border-red-500"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Mic size={16} />
                  {recording ? "Recording..." : "Answer"}
                </button>
                <button
                  onClick={handleNext}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* 🧠 Right Section 
          <div className="bg-white border rounded-xl shadow-sm p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-md">
                Technical
              </span>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-md">
                Medium
              </span>
            </div>

            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800">Question</h3>
              <button
                onClick={() => speakQuestion(current?.text)}
                disabled={speakingQuestion}
                className={`flex items-center gap-1 text-sm px-3 py-1 rounded-md border ${
                  speakingQuestion
                    ? "bg-gray-100 text-gray-400"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <Play size={14} />
                {speakingQuestion ? "Speaking..." : "Listen again"}
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              {current?.text ||
                "Explain the difference between synchronous and asynchronous programming in JavaScript."}
            </p>

            <h3 className="font-semibold text-gray-800 mt-4 mb-2">Answer</h3>
            <textarea
              readOnly
              rows={5}
              value={answers[current?.id]?.text || ""}
              className="w-full border rounded-lg p-3 text-sm text-gray-700 bg-gray-50 focus:outline-none resize-none"
              placeholder="Your answer will appear here as you speak..."
            />
          </div>
        </div>
      </main> */}

      <main className="flex-1 md:ml-60 p-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
  <BreadcrumbNav activeTab={activeTab} />

  <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 mt-8">
    {/* 🎥 Left Section */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-white to-indigo-50 border border-indigo-100 rounded-2xl shadow-2xl p-6 hover:shadow-indigo-200 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="logo" className="h-8 w-8 rounded-full border border-gray-200" />
          <div>
            <p className="font-semibold text-base text-gray-800">AutoPlaced</p>
            <p className="text-xs text-gray-500">Your AI Partner</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Volume2 className="text-indigo-500 hover:scale-110 transition-transform" size={18} />
          <Redo2 className="text-indigo-500 hover:rotate-180 transition-transform" size={18} />
          <div className="flex items-center gap-1 text-red-500 font-semibold text-sm">
            <CircleDot size={10} className="animate-pulse" />
            {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
            {String(timeLeft % 60).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Video */}
      <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-inner">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mt-5">
        <div className="text-sm text-gray-700 font-medium bg-white/60 px-3 py-1 rounded-md shadow-sm">
          {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
          {String(timeLeft % 60).padStart(2, "0")}
        </div>

        <div className="flex gap-3">
          {/* Record Button */}
          <button
            onClick={toggleRecording}
            className={`group border px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg transition-all duration-300 ${
              recording
                ? "bg-gradient-to-r from-red-500 to-red-600 text-white border-red-500 shadow-red-300 hover:shadow-red-400"
                : "bg-gradient-to-r from-indigo-100 to-purple-100 text-gray-800 border border-indigo-200 hover:shadow-indigo-200 hover:-translate-y-[1px]"
            }`}
          >
            <Mic size={18} className={recording ? "animate-pulse" : ""} />
            {recording ? "Recording..." : "Answer"}
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-indigo-400 transition-all duration-300"
          >
            Next →
          </button>
        </div>
      </div>
    </motion.div>

    {/* 🧠 Right Section */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="bg-gradient-to-br from-white to-purple-50 border border-purple-100 rounded-2xl shadow-xl p-6 flex flex-col hover:shadow-purple-200 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Tags */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-semibold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-2 py-1 rounded-md shadow-sm">
          Technical
        </span>
        <span className="text-xs font-semibold bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 px-2 py-1 rounded-md shadow-sm">
          Medium
        </span>
      </div>

      {/* Question Section */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-800 text-lg">Question</h3>
        <button
          onClick={() => speakQuestion(current?.text)}
          disabled={speakingQuestion}
          className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border font-medium transition-all ${
            speakingQuestion
              ? "bg-gray-100 text-gray-400"
              : "bg-gradient-to-r from-indigo-100 to-purple-100 text-gray-700 hover:shadow-md hover:-translate-y-[1px]"
          }`}
        >
          <Play size={14} />
          {speakingQuestion ? "Speaking..." : "Listen again"}
        </button>
      </div>

      <p className="text-sm text-gray-700 mb-5 leading-relaxed">
        {current?.text ||
          "Explain the difference between synchronous and asynchronous programming in JavaScript."}
      </p>

      {/* Answer Section */}
      <h3 className="font-semibold text-gray-800 mt-4 mb-2 text-lg">Answer</h3>
      <textarea
        readOnly
        rows={6}
        value={answers[current?.id]?.text || ""}
        className="w-full border rounded-xl p-3 text-sm text-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 focus:outline-none resize-none shadow-inner"
        placeholder="Your answer will appear here as you speak..."
      />
    </motion.div>
  </div>
</main>

    </div>
  );
}
