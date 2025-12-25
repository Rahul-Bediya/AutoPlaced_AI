"use client";

import { useState } from "react";
// import { motion } from "framer-motion";
import Sidebar from "../../components/sidebar/sidebar";
import BreadcrumbNav from "../../components/sidebar/BreadcrumbNav";
import VideoSection from "../../components/Createnotes/VideoSection";
import ActionCards from "../../components/createnotes/ActionCards";
import NotesSection from "../../components/createnotes/NotesSection";

export default function CreateNotesPage() {
  const [activeTab, setActiveTab] = useState("Note Tracker");
  const [sidebarOpen, setSidebarOpen] = useState(false);
   

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

       
        <div  className="
            bg-gradient-to-r 
            from-indigo-600 
            to-purple-600 
            text-white 
            rounded-2xl 
            p-6 sm:p-8 
            min-h-[180px] 
            flex flex-col md:flex-row 
            items-start md:items-center 
            justify-between 
            shadow-lg 
            gap-4
          ">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-bold leading-tight">
              Create Notes Effortlessly ✍️
            </h2>
            <p className="text-sm sm:text-base text-gray-200">
              Generate, analyze, and organize your study materials with ease.
            </p>
          </div>

          <button
            className="
              bg-white 
              text-indigo-600 
              px-5 sm:px-6 
              py-2.5 sm:py-3 
              rounded-xl 
              font-semibold 
              hover:bg-gray-100 
              transition 
              flex items-center gap-2
            "
          >
            Start Creating
          </button>
          </div>
        {/* </motion.div> */}

        {/* Page Sections */}
        <div className="mt-10 space-y-10">
          <VideoSection />
          <ActionCards />
          <NotesSection />
        </div>
        
      </main>
    </div>
  );
}

