



"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Mic, Volume2, Redo2, CircleDot, Play } from "lucide-react";
import { motion } from "framer-motion";

import Sidebar from "../../../components/sidebar/sidebar";
import BreadcrumbNav from "../../../components/sidebar/BreadcrumbNav";
import { useSearchParams, useRouter } from "next/navigation";

export default function Interview() {
  const [activeTab, setActiveTab] = useState("interview-prep");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [recording, setRecording] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [speakingQuestion, setSpeakingQuestion] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const videoRef = useRef(null);
  const recognitionRef = useRef(null);
  const latestQuestionIdRef = useRef(null);
  const mountedRef = useRef(true);

  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session");

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Fetch session
  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    fetch(`/api/session?id=${encodeURIComponent(sessionId)}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.error) throw new Error(data.error);
        setSession(data);
      })
      .catch((err) => {
        console.error("session fetch", err);
        alert("Failed to fetch session: " + err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  useEffect(() => {
    latestQuestionIdRef.current = session?.questions?.[questionIndex]?.id ?? null;
  }, [session, questionIndex]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let interim = "";
      let final = "";
      for (let i = 0; i < event.results.length; i++) {
        const res = event.results[i];
        const text = Array.from(res).map((alt) => alt.transcript).join("");
        if (res.isFinal) final += text + " ";
        else interim += text + " ";
      }

      const qid = latestQuestionIdRef.current;
      if (qid) {
        setAnswers((prev) => {
          const prevText = (prev[qid]?.text || "").trim();
          const newText = (prevText ? prevText + " " : "") + (final ? final.trim() : interim.trim());
          return {
            ...prev,
            [qid]: { ...(prev[qid] || {}), text: newText.trim() },
          };
        });
      }
    };

    recognition.onend = () => {
      setRecording(false);
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error:", err);
      setRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.onresult = null;
        recognition.onerror = null;
        recognition.onend = null;
        recognition.stop?.();
      } catch (e) {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleRecording = useCallback(() => {
    if (typeof window === "undefined") return;
    const recognition = recognitionRef.current;
    if (!recognition) {
      alert("Speech recognition not available in this browser.");
      return;
    }

    if (!recording) {
      try {
        const qid = latestQuestionIdRef.current;
        if (qid) {
          setAnswers((prev) => ({
            ...prev,
            [qid]: { ...(prev[qid] || {}), text: (prev[qid]?.text || "").trim() },
          }));
        }
        recognition.start();
        setRecording(true);
      } catch (err) {
        console.error("Failed to start recognition:", err);
      }
    } else {
      try {
        recognition.stop();
      } catch (e) {
        console.warn("Error stopping recognition", e);
      } finally {
        setRecording(false);
      }
    }
  }, [recording]);

  // Camera setup
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    let mounted = true;
    let localStream = null;
    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localStream = stream;
        if (mounted && videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    }
    initCamera();
    return () => {
      mounted = false;
      if (localStream) {
        localStream.getTracks().forEach((t) => t.stop());
      }
      if (videoRef.current?.srcObject) {
        try {
          videoRef.current.srcObject.getTracks?.().forEach((t) => t.stop());
        } catch (e) {}
      }
    };
  }, []);

  // Timer
  useEffect(() => {
    setTimeLeft(60);
    const interval = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [questionIndex]);

  // Auto-advance or submit when timer reaches 0
  useEffect(() => {
    if (timeLeft > 0) return;
    const id = setTimeout(() => {
      if (!session?.questions?.length) return;
      if (questionIndex < session.questions.length - 1) {
        setQuestionIndex((q) => q + 1);
      } else {
        submitInterview();
      }
    }, 200);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const speakQuestion = (text) => {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) {
      console.warn("Speech synthesis not supported");
      return;
    }

    setSpeakingQuestion(true);
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onend = () => setSpeakingQuestion(false);
    utterance.onerror = () => setSpeakingQuestion(false);

    window.speechSynthesis.speak(utterance);
  };

  // SUBMIT: save to localStorage and redirect to review, also stop recognition
  const submitInterview = useCallback(async () => {
    if (!session || submitting) return;
    setSubmitting(true);

    // Build payload answers (trimmed)
    const questions = session.questions || [];
    const payload = {};
    for (const q of questions) {
      payload[q.id] = (answers[q.id]?.text || "").trim();
    }

    try {
      // Stop recording if running
      try {
        recognitionRef.current?.stop?.();
      } catch (e) {}

      setRecording(false);

      const res = await fetch("/api/submit-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: session.id || session.sessionId || sessionId, answers: payload }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed");

      // Merge results into session object
      const updatedSession = { ...session, results: json.results, answers: payload };
      setSession(updatedSession);

      // Save to localStorage so the review page can read it (key includes session id)
      try {
        const key = `interview_result_${updatedSession.id || updatedSession.sessionId || sessionId || Date.now()}`;
        localStorage.setItem(key, JSON.stringify(updatedSession));
        // also store a pointer so review page can easily find it
        localStorage.setItem("last_interview_result_key", key);
      } catch (e) {
        console.warn("Failed to save results to localStorage", e);
      }

      // Redirect to review page with session id in query
      const redirectId = updatedSession.id || updatedSession.sessionId || sessionId;
      router.push(`/aiinterview/interview/review?session=${encodeURIComponent(redirectId)}`);
    } catch (err) {
      console.error(err);
      alert("Failed to submit interview: " + err.message);
    } finally {
      setSubmitting(false);
    }
  }, [session, answers, router, sessionId, submitting]);

  if (!session) return <div className="p-8">Loading interview...</div>;

  const questions = session.questions || [];
  const current = questions[questionIndex];

  const handleNext = () => {
    if (recording) {
      alert("Please stop recording before moving to the next question.");
      return;
    }
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((q) => q + 1);
      setTimeLeft(60);
    } else {
      submitInterview();
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

      <main className="flex-1 md:ml-60 p-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
        <BreadcrumbNav activeTab={activeTab} />

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 mt-8">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-white to-indigo-50 border border-indigo-100 rounded-2xl shadow-2xl p-6 hover:shadow-indigo-200 hover:-translate-y-1 transition-all duration-300"
          >
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

            <div className="flex justify-between items-center mt-5">
              <div className="text-sm text-gray-700 font-medium bg-white/60 px-3 py-1 rounded-md shadow-sm">
                {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                {String(timeLeft % 60).padStart(2, "0")}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={toggleRecording}
                  className={`group border px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg transition-all duration-300 ${recording
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white border-red-500 shadow-red-300 hover:shadow-red-400"
                    : "bg-gradient-to-r from-indigo-100 to-purple-100 text-gray-800 border border-indigo-200 hover:shadow-indigo-200 hover:-translate-y-[1px]"
                    }`}
                >
                  <Mic size={18} className={recording ? "animate-pulse" : ""} />
                  {recording ? "Recording..." : "Answer"}
                </button>

                <button
                  onClick={handleNext}
                  disabled={recording || submitting}
                  className={`px-8 py-2.5 rounded-xl font-semibold shadow-lg transition-all duration-300 ${recording || submitting
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:shadow-indigo-400"
                    }`}
                >
                  {questionIndex < questions.length - 1 ? "Next →" : submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-gradient-to-br from-white to-purple-50 border border-purple-100 rounded-2xl shadow-xl p-6 flex flex-col hover:shadow-purple-200 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-2 py-1 rounded-md shadow-sm">
                {current?.category || "Technical"}
              </span>
              <span className="text-xs font-semibold bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 px-2 py-1 rounded-md shadow-sm">
                {current?.level || "Medium"}
              </span>
            </div>

            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800 text-lg">Question</h3>
              <button
                onClick={() => speakQuestion(current?.text)}
                disabled={speakingQuestion}
                className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border font-medium transition-all ${speakingQuestion
                  ? "bg-gray-100 text-gray-400"
                  : "bg-gradient-to-r from-indigo-100 to-purple-100 text-gray-700 hover:shadow-md hover:-translate-y-[1px]"
                  }`}
              >
                <Play size={14} />
                {speakingQuestion ? "Speaking..." : "Listen again"}
              </button>
            </div>

            <p className="text-sm text-gray-700 mb-5 leading-relaxed">
              {current?.text || "Explain the difference between synchronous and asynchronous programming in JavaScript."}
            </p>

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
