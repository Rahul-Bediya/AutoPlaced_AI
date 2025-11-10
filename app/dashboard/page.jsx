"use client";

import { motion } from "framer-motion";
import {
  Upload,
  Settings,
  BarChart3,
  FileText,
  NotebookPen,
  Briefcase,
  Rocket,
  Menu,
  X,
} from "lucide-react";
import Sidebar from "../../components/sidebar/sidebar";
import BreadcrumbNav from "../../components/sidebar/BreadcrumbNav";
import Link from "next/link";

import { useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-white text-gray-800 font-inter flex">

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />



      {/* Main Content */}
      <main className="flex-1 md:ml-60 mt-16 md:mt-0 p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* 🔹 Left Column (Main Content) */}
          <div>
          
             <BreadcrumbNav activeTab={activeTab} />

            {/* Header Section */}
            <motion.div
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white min-h-48 p-8 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between shadow-lg"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div>
                <h2 className="text-2xl font-bold">
                  100% Interview Prep With Accurate Tools
                </h2>
                <p className="text-base text-gray-200">Get your job today!</p>
              </div>
              <button className="bg-white text-indigo-600 px-6 py-3 mt-4 md:mt-0 rounded-xl font-semibold hover:bg-gray-100 transition flex items-center gap-2">
              <Link href="/aiinterview"> Start Preparation</Link> <Rocket size={18} />
              </button>
            </motion.div>

            {/* Resume Upload */}
            <motion.div
              className="mt-6 bg-white rounded-xl p-6 shadow-lg shadow-indigo-100 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Recent Resume</h3>
              <div className="border border-dashed border-indigo-300 rounded-lg p-6 text-center bg-gray-50">
                <p className="text-gray-500 mb-4">No resume uploaded</p>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 mx-auto shadow-md hover:shadow-lg transition-all">
                  <Upload size={16} /> Upload Resume
                </button>
              </div>
            </motion.div>


            {/* Overview Section */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard title="Interview Sessions" count="01/01" delay={0.2} />
              <StatCard title="Resume Optimization" count="01/01" delay={0.3} />
              <StatCard title="NotesTracker" count="01/01" delay={0.3} />

            </div>

            {/* Auto Application */}
            <motion.div
              className="mt-8 bg-blue-50 rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-2">Auto application on</h3>
              <p className="text-2xl font-bold">70+ Applications</p>
              <p className="text-green-500 text-sm mt-1">+11.01%</p>

              <div className="flex items-end gap-4 mt-4">
                <Bar label="Dice" value={20} color="bg-red-400" />
                <Bar label="LinkedIn" value={25} color="bg-blue-500" />
                <Bar label="Monster" value={18} color="bg-purple-400" />
                <Bar label="ZipRecruiter" value={25} color="bg-gray-600" />
                <Bar label="Others" value={20} color="bg-indigo-300" />
              </div>
            </motion.div>

            {/* Activity Feed */}
            <motion.div
              className="mt-8 bg-white rounded-xl p-6 shadow-sm mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-lg font-semibold mb-3">Activity Feed</h3>
              <div className="flex gap-2 flex-wrap">
                <Tag text="Resume Optimization" />
                <Tag text="Interview Preparation" />
                <Tag text="Notes Tracker" />
              </div>
            </motion.div>
          </div>

          {/* 🔹 Right Column (Job Postings — hidden on mobile) */}
          <div className="hidden lg:block ">
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg shadow-indigo-100 border border-gray-200 h-fit mt-14"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="text-lg font-semibold mb-2">Job Postings</h3>
              <p className="text-gray-500">Currently no jobs available.</p>
            </motion.div>
          </div>
        </div>
      </main>

    </div>
  );
}



/* 🔹 Stat Card */
function StatCard({ title, count, delay }) {
  return (
    <motion.div
      className="bg-white rounded-xl p-5 shadow-lg shadow-indigo-100 border border-gray-200 flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <p className="text-black">{title}</p>
      <h4 className="text-2xl font-bold mt-2">{count}</h4>
      <button className="mt-4 text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg hover:bg-indigo-100">
        create session
      </button>
    </motion.div>
  );
}

/* 🔹 Job Card */


/* 🔹 Bar */
function Bar({ label, value, color }) {
  return (
    <div className="text-center">
      <div
        className={`w-6 ${color} rounded-t-lg transition-all`}
        style={{ height: `${value * 3}px` }}
      ></div>
      <p className="text-xs mt-1 text-gray-600">{label}</p>
    </div>
  );
}

/* 🔹 Tag */
function Tag({ text }) {
  return (
    <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-sm font-medium">
      {text}
    </span>
  );
}
