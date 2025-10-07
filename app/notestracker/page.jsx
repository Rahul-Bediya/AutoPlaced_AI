// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Menu, X } from "lucide-react";
// import Sidebar from "../../components/sidebar/sidebar";

// import VideoSection from "@/components/CreateNotes/VideoSection";
// import ActionCards from "@/components/CreateNotes/ActionCards";
// import NotesSection from "@/components/CreateNotes/NotesSection";

// export default function CreateNotesPage() {
//   const [activeTab, setActiveTab] = useState("Create Notes");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-800 font-inter flex">
//       <Sidebar
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//       />

//       {/* Mobile Navbar */}
//       <div className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center md:hidden z-40">
//         <h2 className="text-lg font-semibold">{activeTab}</h2>
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
//         >
//           <Menu size={22} />
//         </button>
//       </div>

//       {/* Main Content */}
//       <main className="flex-1 md:ml-60 mt-16 md:mt-0 p-6 md:p-8 space-y-10">
//         <VideoSection />
//         <ActionCards />
//         <NotesSection />
//       </main>
//     </div>
//   );
// }
