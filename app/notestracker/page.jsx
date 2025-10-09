"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../components/sidebar/sidebar";
import BreadcrumbNav from "../../components/sidebar/BreadcrumbNav";
import VideoSection from "@/components/CreateNotes/VideoSection";
import ActionCards from "@/components/CreateNotes/ActionCards";
import NotesSection from "@/components/CreateNotes/NotesSection";

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

        {/* Header Section */}
        {/* <motion.div
          className="
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
          "
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        > */}
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


// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import Sidebar from "../../components/sidebar/sidebar";
// import BreadcrumbNav from "../../components/sidebar/BreadcrumbNav";
// import VideoSection from "@/components/CreateNotes/VideoSection";
// import ActionCards from "@/components/CreateNotes/ActionCards";
// import NotesSection from "@/components/CreateNotes/NotesSection";
// import Modal from "@/components/createnotes/model";

// export default function CreateNotesPage() {
//   const [activeTab, setActiveTab] = useState("Note Tracker");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [activeAction, setActiveAction] = useState(null);

//   const openModal = (action) => {
//     setActiveAction(action);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setActiveAction(null);
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
//       <main className="flex-1 md:ml-60 p-4 sm:p-6 md:p-8 mt-20 md:mt-0">
//         <BreadcrumbNav activeTab={activeTab} />

//         <motion.div
//           className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6 sm:p-8 min-h-[180px] flex flex-col md:flex-row items-start md:items-center justify-between shadow-lg gap-4"
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="space-y-2 max-w-2xl">
//             <h2 className="text-xl sm:text-2xl font-bold leading-tight">
//               Create Notes Effortlessly ✍️
//             </h2>
//             <p className="text-sm sm:text-base text-gray-200">
//               Generate, analyze, and organize your study materials with ease.
//             </p>
//           </div>

//           <button className="bg-white text-indigo-600 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-gray-100 transition flex items-center gap-2">
//             Start Creating
//           </button>
//         </motion.div>

//         <div className="mt-10 space-y-10">
//           <VideoSection />
//           <ActionCards openModal={openModal} />
//           <NotesSection />
//         </div>

//         <Modal
//           isOpen={isModalOpen}
//           onClose={closeModal}
//           title={activeAction?.title}
//           description={
//             activeAction?.title === "Analyze Video"
//               ? "Paste a YouTube URL to generate study materials from video content"
//               : activeAction?.title === "Extract PDF Insights"
//                 ? "Upload a PDF document to summarize key points and concepts."
//                 : ""
//           }
//         >
//           {activeAction?.title === "Extract PDF Insights" && (
//             <div>
//               <input
//                 type="file"
//                 accept="application/pdf"
//                 className="border border-gray-300 rounded-lg p-3 w-full"
//               />
//             </div>
//           )}

//           {activeAction?.title === "Analyze Video" && (
//             <div>
//               <input
//                 type="text"
//                 placeholder="e.g., https://youtu.be/..."
//                 className="border border-gray-300 rounded-lg p-3 w-full"
//               />
//               <p className="text-xs text-blue-500 mt-2">
//                 Tip: Paste any YouTube URL to analyze the video content and generate study materials.
//               </p>
//             </div>
//           )}

//           {activeAction?.title === "Record Your Voice" && (
//             <div>
//               <button className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg">
//                 Start Recording
//               </button>
//             </div>
//           )}

//           {activeAction?.title === "Transcribe Audio" && (
//             <div>
//               <input
//                 type="file"
//                 accept="audio/*"
//                 className="border border-gray-300 rounded-lg p-3 w-full"
//               />
//             </div>
//           )}
//         </Modal>

//       </main>
//     </div>
//   );
// }
