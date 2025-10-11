

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../../components/sidebar/sidebar";
import BreadcrumbNav from "../../../components/sidebar/BreadcrumbNav";
import { Upload, Lock, X } from "lucide-react";
import { useRouter } from "next/navigation";



export default function CreateSession() {
  const [file, setFile] = useState(null);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Note Tracker");
  const [sidebarOpen, setSidebarOpen] = useState(false);
 

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    router.push("/aiinterview/interview"); // ✅ redirect to interview page
  };
   

  return (
    <div className="min-h-screen flex bg-gradient-to-br  from-blue-50 via-pink-50 to-white text-gray-800 font-inter">
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

       <div className="flex items-center justify-center">
        <motion.div
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Close Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          AI Interview Preparation
        </h2>

        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition mb-4">
          <Upload className="mx-auto text-indigo-600 mb-3" size={40} />
          <p className="font-medium text-gray-700">Upload New Resume</p>
          <p className="text-sm text-gray-500">
            We accept PDF files max size 10MB
          </p>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
            id="resumeUpload"
          />
          <label
            htmlFor="resumeUpload"
            className="mt-4 inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-indigo-700 transition"
          >
            Choose File
          </label>
          {file && (
            <p className="text-sm text-green-600 mt-2">
              {file.name} uploaded successfully
            </p>
          )}
        </div>

        {/* Privacy Note */}
        <p className="text-gray-500 text-sm flex items-center justify-center gap-2 mb-6">
          <Lock size={14} /> We protect your resume and your{" "}
          <span className="font-semibold">privacy</span>.
        </p>

        {/* Form Fields */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Job Title (e.g., Software Engineer)"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <textarea
            placeholder="Job Description (Optional)"
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <div className="flex gap-4">
            <select className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
              <option value="">Select Experience Level</option>
              <option>Fresher</option>
              <option>Junior</option>
              <option>Mid-Level</option>
              <option>Senior</option>
            </select>
            <input
              type="number"
              min="0"
              placeholder="Years of Exp"
              className="w-32 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <input
            type="number"
            min="1"
            placeholder="Number of Questions"
            defaultValue={5}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition mt-2"
          >
            Start Interview 🚀
          </button>
        </form>
      </motion.div>
      </div>
        
      </main>
    </div>
  );
}

