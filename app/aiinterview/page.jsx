"use client";

import { motion } from "framer-motion";
import { Plus, User, Clock, Video } from "lucide-react";
import Sidebar from "../../components/sidebar/sidebar";
import BreadcrumbNav from "../../components/sidebar/BreadcrumbNav";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import router

export default function InterviewPrep() {
  const [activeTab, setActiveTab] = useState("Interview Prep");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter(); // ✅ Initialize router

  const demoInterviews = [
    {
      id: 1,
      role: "Frontend Developer",
      interviewer: "Priya Sharma",
      date: "Oct 8, 2025",
      status: "Completed",
      time: "45 min",
    },
    {
      id: 2,
      role: "Data Analyst",
      interviewer: "Rahul Mehta",
      date: "Oct 5, 2025",
      status: "Completed",
      time: "30 min",
    },
    {
      id: 3,
      role: "Backend Engineer",
      interviewer: "Neha Kapoor",
      date: "Oct 1, 2025",
      status: "Upcoming",
      time: "Scheduled",
    },
  ];

  // ✅ Redirect handler
  const handleNewSession = () => {
    router.push("/aiinterview/create-session");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-white text-gray-800 font-inter flex">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Section */}
      <main className="flex-1 md:ml-60 mt-16 md:mt-0 p-6 md:p-8">
        <BreadcrumbNav activeTab={activeTab} />

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 mt-6">
          {/* Left Section */}
          <div>
            {/* Banner */}
            <motion.div
              className="bg-[#4A5D8C] text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between shadow-lg"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h2 className="text-2xl font-bold">
                  One to One Interview <br /> With Industry Experts
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleNewSession} // ✅ Redirect on click
                className="bg-[#5E43F3] px-6 py-3 mt-6 md:mt-0 rounded-xl font-semibold hover:bg-indigo-600 transition flex items-center gap-2 shadow-md"
              >
                New Session <Plus size={18} />
              </motion.button>
            </motion.div>

            {/* Recent Interviews */}
            <motion.div
              className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Recent Interviews
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleNewSession} // ✅ Redirect on click
                  className="bg-[#5E43F3] px-5 py-2 text-white rounded-xl font-semibold hover:bg-indigo-600 transition flex items-center gap-2 shadow-md"
                >
                  New Session <Plus size={16} />
                </motion.button>
              </div>

              {/* Demo Current Interview History */}
              <div className="space-y-4">
                {demoInterviews.map((interview, index) => (
                  <motion.div
                    key={interview.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between hover:shadow-md transition"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-800 text-base">
                        {interview.role}
                      </h4>
                      <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                        <User size={14} /> {interview.interviewer}
                      </p>
                      <p className="text-gray-400 text-xs mt-1 flex items-center gap-2">
                        <Clock size={12} /> {interview.date} • {interview.time}
                      </p>
                    </div>
                    <div className="mt-3 md:mt-0 flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          interview.status === "Upcoming"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {interview.status}
                      </span>
                      <button className="text-[#5E43F3] hover:text-indigo-600 transition flex items-center gap-1 text-sm font-semibold">
                        <Video size={14} /> Join
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Section */}
          <motion.div
            className="bg-[#2D1B69] text-white rounded-2xl p-10 flex flex-col items-center justify-center shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-medium text-indigo-200 mb-2">
              One to One Meeting
            </h4>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
              With Our Experts
            </h2>
            <p className="text-sm text-indigo-200 mb-6 text-center">
              As like real environment
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleNewSession} // ✅ Redirect on click
              className="bg-white text-[#2D1B69] px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-gray-100 transition"
            >
              Join Now
            </motion.button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
