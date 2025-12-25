

"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  FileText,
  GraduationCap,
  Linkedin,
  Zap,
  Bot,
  Brain,
} from "lucide-react";

const cards = [
  {
    id: 1,
    icon: <Search className="w-6 h-6 text-indigo-600" />,
    title: "AI AUTO APPLY",
    desc: "Effortless job applications and streamlined job search.",
    details: {
      tag: "Effortless Application Process",
      heading: "Smart Apply Makes Job Searching Faster, Easier, and More Effective",
      subtext:
        "Effortless job applications and streamlined job search with intelligent automation tools.",
      points: [
        {
          icon: <Zap className="w-5 h-5 text-yellow-500" />,
          text: "Emphasizes speed and action, perfect for job seekers wanting quick results.",
        },
        {
          icon: <Bot className="w-5 h-5 text-pink-500" />,
          text: "Highlights automation and ease — letting AI take the wheel.",
        },
        {
          icon: <Brain className="w-5 h-5 text-blue-500" />,
          text: "Focuses on the intelligence of the system and relevance of job suggestions.",
        },
      ],
      button: "START FOR FREE",
      image: "/aiapply.png",
    },
  },
  {
    id: 2,
    icon: <FileText className="w-6 h-6 text-indigo-600" />,
    title: "RESUME INTELLIGENCE",
    desc: "Build, analyze, and improve your resume with AI-driven feedback.",
    details: {
      tag: "Smarter Resume Building",
      heading: "Resume Intelligence Helps You Stand Out Effortlessly",
      subtext:
        "AI-powered resume analysis and suggestions to improve impact and clarity.",
      points: [
        {
          icon: <img src="/emphasizes-img.png" alt="emphasizes" className="w-5 h-5" />,
          text: "Real-time feedback on formatting and keywords.",
        },
        {
          icon: <img src="/highlights-img.png" alt="highlights" className="w-5 h-5" />,
          text: "AI-generated recommendations tailored to the job description.",
        },
        {
          icon: <img src="/focuses-img.png" alt="focuses" className="w-5 h-5" />,
          text: "Boosts your chances of landing interviews with data-driven insights.",
        },
      ],
      button: "START FOR FREE",
      image: "/resume.png",
    },
  },
  {
    id: 3,
    icon: <GraduationCap className="w-6 h-6 text-indigo-600" />,
    title: "INTERVIEW INTELLIGENCE",
    desc: "Get ready with smart questions and AI-driven interview feedback.",
    details: {
      tag: "AI-Powered Prep",
      heading: "Interview Intelligence Prepares You for Success",
      subtext:
        "Practice with AI-driven mock interviews and tailored feedback.",
      points: [
        {
          icon: <img src="/emphasizes-img.png" alt="emphasizes" className="w-5 h-5" />,
          text: "Generates relevant practice questions based on role.",
        },
        {
          icon: <img src="/highlights-img.png" alt="highlights" className="w-5 h-5" />,
          text: "Simulates real-time Q&A sessions with AI interviewer.",
        },
        {
          icon: <img src="/focuses-img.png" alt="focuses" className="w-5 h-5" />,
          text: "Provides detailed performance analysis and improvement tips.",
        },
      ],
      button: "START FOR FREE",
      image: "/interview.png",
    },
  },
  {
    id: 4,
    icon: <Linkedin className="w-6 h-6 text-indigo-600" />,
    title: "STUDY & LEARN",
    desc: "Boost your personal brand and career skills.",
    details: {
      tag: "Learning Made Simple",
      heading: "Study & Learn Helps You Grow Professionally",
      subtext:
        "Make Learning Useful By Turning It Into Clear Notes. Use advanced tools to capture key points, summarize materials, and create study-ready content.",
      points: [
        {
          icon: <img src="/emphasizes-img.png" alt="emphasizes" className="w-5 h-5" />,
          text: "Start fresh and organize all your ideas in one place.",
        },
        {
          icon: <img src="/highlights-img.png" alt="highlights" className="w-5 h-5" />,
          text: "Upload your PDF, audio, or paste a YouTube link to get instant study notes.",
        },
        {
          icon: <img src="/focuses-img.png" alt="focuses" className="w-5 h-5" />,
          text: "Speak your notes and let the tool transcribe and organize them.",
        },
      ],
      button: "START FOR FREE",
      image: "/ainotes.png",
    },
  },
];

export default function ServiceCards() {
  const [selected, setSelected] = useState(1);

  // Auto-change card every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSelected((prev) => (prev === cards.length ? 1 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const activeCard = cards.find((c) => c.id === selected);

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* === Card Selector Row === */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelected(card.id)}
              className={`group text-center border-b-2 pb-4 transition-all cursor-pointer ${selected === card.id
                  ? "border-indigo-600"
                  : "border-transparent hover:border-indigo-400"
                }`}
            >
              <div className="flex justify-center">
                <div
                  className={`bg-gray-50 rounded-xl p-3 mb-3 flex items-center justify-center shadow-sm transition ${selected === card.id ? "shadow-md scale-105" : ""
                    }`}
                >
                  {card.icon}
                </div>
              </div>
              <h3 className="text-sm font-extrabold tracking-wide text-gray-900 mb-1">
                {card.title}
              </h3>
              <p className="text-gray-500 text-sm">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* === Details Section === */}
        {activeCard?.details && (
          <div className="relative bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-10 flex flex-col md:flex-row items-center gap-10 shadow-lg border border-gray-100 transition-all duration-500">
            {/* Left: Text */}
            <div className="flex-1">
              <span className="inline-block text-sm font-semibold text-indigo-600 mb-2">
                {activeCard.details.tag}
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                {activeCard.details.heading}
              </h2>
              <p className="text-gray-600 mb-6">{activeCard.details.subtext}</p>

              <ul className="space-y-4 mb-6">
                {activeCard.details.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="bg-white rounded-full p-2 shadow-sm flex items-center justify-center">
                      {p.icon}
                    </div>
                    <p className="text-gray-700 text-sm">{p.text}</p>
                  </li>
                ))}
              </ul>

              <button className="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition">
                {activeCard.details.button} →
              </button>
            </div>

            {/* Right: Image */}
            <div className="flex-1 flex justify-center items-center">
              <Image
                src={activeCard.details.image}
                alt={activeCard.title}
                width={450}
                height={350}
                className="rounded-2xl shadow-md w-full max-w-md object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
