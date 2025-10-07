"use client";

import { motion } from "framer-motion";
import { Upload, Settings, BarChart3, FileText, NotebookPen, Briefcase, Rocket } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-inter">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-60 bg-white shadow-md p-5 flex flex-col justify-between">
        <div>
          {/* <h1 className="text-2xl font-bold text-indigo-600 mb-8">Placed</h1> */}
          <img
          src="/logo.png"
          alt="Placed Logo"
          className="h-[120px] w-[200px] object-contain mr-1"
        />
          <nav className="space-y-3">
            <SidebarItem icon={<BarChart3 size={18} />} text="Dashboard" active />
            <SidebarItem icon={<Settings size={18} />} text="Resume Optimizer" />
            <SidebarItem icon={<FileText size={18} />} text="Resume Builder" />
            <SidebarItem icon={<NotebookPen size={18} />} text="Note Tracker" />
            <SidebarItem icon={<Rocket size={18} />} text="Interview Prep" />
            <SidebarItem icon={<Briefcase size={18} />} text="Applications" />
          </nav>
        </div>
        <div>
          <SidebarItem text="Pricing" />
          <div className="flex items-center mt-4">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
              R
            </div>
            <p className="ml-2 font-medium">Rahul Bedia</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-60 p-8">
        {/* Header Section */}
        <motion.div
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-2xl flex items-center justify-between shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h2 className="text-xl font-semibold">100% Interview Prep With Accurate Tools</h2>
            <p className="text-sm text-gray-200">Get your job today!</p>
          </div>
          <button className="bg-white text-indigo-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition flex items-center gap-2">
            Start Preparation <Rocket size={16} />
          </button>
        </motion.div>

        {/* Resume Upload */}
        <motion.div
          className="mt-6 bg-white rounded-xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold mb-3">Recent Resume</h3>
          <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
            <p className="text-gray-500 mb-4">No resume uploaded</p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 mx-auto">
              <Upload size={16} /> Upload Resume
            </button>
          </div>
        </motion.div>

        {/* Overview Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Interview Sessions" count="01/01" delay={0.2} />
          <StatCard title="Resume Optimization" count="01/01" delay={0.3} />
          <StatCard title="Create Notes" count="03/03" delay={0.4} />
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
          className="mt-8 bg-white rounded-xl p-6 shadow-sm"
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
      </main>
    </div>
  );
}

/* 🔹 Sidebar Item Component */
function SidebarItem({ icon, text, active }) {
  return (
    <div
      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${
        active ? "bg-indigo-100 text-indigo-600 font-medium" : "hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}

/* 🔹 Stat Card Component */
function StatCard({ title, count, delay }) {
  return (
    <motion.div
      className="bg-white rounded-xl p-5 shadow-sm flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <p className="text-gray-600">{title}</p>
      <h4 className="text-2xl font-bold mt-2">{count}</h4>
      <button className="mt-4 text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg hover:bg-indigo-100">
        Get More Attempts
      </button>
    </motion.div>
  );
}

/* 🔹 Bar Component */
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

/* 🔹 Tag Component */
function Tag({ text }) {
  return (
    <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-sm font-medium">
      {text}
    </span>
  );
}



