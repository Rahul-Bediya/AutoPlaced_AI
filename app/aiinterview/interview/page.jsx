

"use client";

import { useState,useEffect,useRef } from "react";
import { Mic, SkipForward, CircleDot, Play } from "lucide-react";

import { motion } from "framer-motion";
import Sidebar from "../../../components/sidebar/sidebar";
import BreadcrumbNav from "../../../components/sidebar/BreadcrumbNav";


export default function Interview() {
  const [activeTab, setActiveTab] = useState("interview-prep");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [timeLeft, setTimeLeft] = useState(60);
  const [recording, setRecording] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const videoRef = useRef(null);

  const questions = [
    {
      id: 1,
      level: "Medium",
      type: "Technical",
      text: "Can you explain how Tailwind CSS improves the workflow in React projects?",
    },
    {
      id: 2,
      level: "Hard",
      type: "System Design",
      text: "How would you design a scalable video interview system?",
    },
  ];
  const currentQuestion = questions[questionIndex];

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

  // countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [questionIndex]);

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setTimeLeft(60);
    } else {
      alert("Interview Completed!");
    }
  };
   

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-pink-50 to-white text-gray-800 font-inter">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <main
        className="
          flex-1 
          md:ml-60 
          p-4 sm:p-6 md:p-8 
          mt-20 md:mt-0 
          transition-all
          duration-300
          ease-in-out
          overflow-x-hidden
        "
      >
        {/* Breadcrumb Navbar */}
        <BreadcrumbNav activeTab={activeTab} />

       
         <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8"
        >
          {/* Left: Camera + Controls */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <CircleDot className="text-red-500 animate-pulse" size={16} />
                <span className="font-medium text-gray-700">Live Interview</span>
              </div>
              <div className="text-sm text-gray-600 font-semibold bg-indigo-50 px-3 py-1 rounded-lg">
                ⏱ {timeLeft}s
              </div>
            </div>

            {/* Camera Preview */}
            <div className="flex-1 bg-gray-900 rounded-xl overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* Controls */}
            <div className="flex justify-between mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setRecording(!recording)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-medium shadow-md transition-all ${
                  recording ? "bg-red-500 hover:bg-red-600" : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                <Mic size={18} />
                {recording ? "Recording..." : "Answer"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleNext}
                className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2.5 rounded-lg hover:bg-gray-900 transition"
              >
                Next Question <SkipForward size={18} />
              </motion.button>
            </div>
          </div>

          {/* Right: Question Panel */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                {currentQuestion.type}
              </span>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                {currentQuestion.level}
              </span>
            </div>

            <h2 className="text-lg font-semibold text-gray-800 mb-3">Question</h2>
            <p className="text-gray-600 text-sm leading-relaxed flex-1">
              {currentQuestion.text}
            </p>

            <div className="mt-6 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setTimeLeft(60)}
                className="text-indigo-600 flex items-center gap-2 text-sm font-medium"
              >
                <Play size={16} /> Replay Question
              </motion.button>
            </div>
          </div>
        </motion.div>
        
      </main>
    </div>
  );
}