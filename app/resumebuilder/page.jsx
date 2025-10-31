"use client";

import { motion } from "framer-motion";
import { Plus, User, Clock, FileText, Download } from "lucide-react";
import Sidebar from "../../components/sidebar/sidebar";
import BreadcrumbNav from "../../components/sidebar/BreadcrumbNav";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResumeBuilderDashboard() {
  const [activeTab, setActiveTab] = useState("Resume Builder");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const resumeHistory = [
    {
      id: 1,
      name: "Frontend Resume",
      updatedBy: "You",
      date: "Oct 20, 2025",
      status: "Completed",
      time: "PDF Generated",
    },
    {
      id: 2,
      name: "Data Analyst Resume",
      updatedBy: "You",
      date: "Oct 15, 2025",
      status: "Draft",
      time: "Editing",
    },
    {
      id: 3,
      name: "Backend Resume",
      updatedBy: "You",
      date: "Oct 12, 2025",
      status: "Completed",
      time: "PDF Generated",
    },
  ];

  const handleNewResume = () => {
    router.push("resumebuilder/templates");
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
          {/* Left */}
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
                  Build Professional <br /> ATS-Friendly Resumes
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleNewResume}
                className="bg-[#5E43F3] px-6 py-3 mt-6 md:mt-0 rounded-xl font-semibold hover:bg-indigo-600 transition flex items-center gap-2 shadow-md"
              >
                New Resume <Plus size={18} />
              </motion.button>
            </motion.div>

            {/* Recent */}
            <motion.div
              className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Recent Resumes
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleNewResume}
                  className="bg-[#5E43F3] px-5 py-2 text-white rounded-xl font-semibold hover:bg-indigo-600 transition flex items-center gap-2 shadow-md"
                >
                  New Resume <Plus size={16} />
                </motion.button>
              </div>

              <div className="space-y-4">
                {resumeHistory.map((resume, index) => (
                  <motion.div
                    key={resume.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between hover:shadow-md transition"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-800 text-base">
                        {resume.name}
                      </h4>
                      <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                        <User size={14} /> {resume.updatedBy}
                      </p>
                      <p className="text-gray-400 text-xs mt-1 flex items-center gap-2">
                        <Clock size={12} /> {resume.date} • {resume.time}
                      </p>
                    </div>

                    <div className="mt-3 md:mt-0 flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          resume.status === "Draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {resume.status}
                      </span>

                      <button className="text-[#5E43F3] hover:text-indigo-600 transition flex items-center gap-1 text-sm font-semibold">
                        <Download size={14} /> Open
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right */}
          <motion.div
            className="bg-[#2D1B69] text-white rounded-2xl p-10 flex flex-col items-center justify-center shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-medium text-indigo-200 mb-2">
              Expert-Designed Templates
            </h4>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
              Stand Out Professionally
            </h2>
            <p className="text-sm text-indigo-200 mb-6 text-center">
              ATS-friendly, clean & modern
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleNewResume}
              className="bg-white text-[#2D1B69] px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-gray-100 transition"
            >
              Create Now
            </motion.button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
