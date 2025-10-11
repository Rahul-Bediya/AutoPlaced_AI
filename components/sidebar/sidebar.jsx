

// "use client";

// import { motion } from "framer-motion";
// import { Menu, X } from "lucide-react";
// import SidebarItem from "./sidebarItem";
// import { getIcon } from "@/utils/getIcon";
// // import { getIcon } from "@/components/Sidebar/getIcon";
// import { useState } from "react";

// export default function Sidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) {
//   const tabs = [
//     "Dashboard",
//     "Resume Optimizer",
//     "Resume Builder",
//     "Note Tracker",
//     "Interview Prep",
//     "Applications",
//      // Added Create Notes tab
//   ];

//   return (
//     <>
//       {/* 🟣 Sidebar (Desktop) */}
//       <aside className="hidden md:flex flex-col justify-between w-60 bg-white shadow-md p-5 fixed left-0 top-0 h-full">
//         <div>
//           <img
//             src="/logo.png"
//             alt="Placed Logo"
//             className="h-[100px] w-[180px] object-contain mb-4"
//           />
//           <nav className="space-y-3">
//             {tabs.map((tab) => (
//               <SidebarItem
//                 key={tab}
//                 icon={getIcon(tab)}
//                 text={tab}
//                 active={activeTab === tab}
//                 onClick={() => setActiveTab(tab)}
//               />
//             ))}
//           </nav>
//         </div>

//         <div>
//           <SidebarItem text="Pricing" />
//           <div className="flex items-center mt-4">
//             <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
//               R
//             </div>
//             <p className="ml-2 font-medium">Rahul Bedia</p>
//           </div>
//         </div>
//       </aside>

//       {/* 🟢 Mobile Navbar */}
//       <div className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center md:hidden z-40">
//         <h2 className="text-lg font-semibold">{activeTab}</h2>
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
//         >
//           <Menu size={22} />
//         </button>
//       </div>

//       {/* 🟣 Mobile Sidebar Overlay */}
//       {sidebarOpen && (
//         <motion.div
//           initial={{ x: "-100%" }}
//           animate={{ x: 0 }}
//           exit={{ x: "-100%" }}
//           transition={{ duration: 0.3 }}
//           className="fixed inset-0 bg-black/30 z-50 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         >
//           <motion.div
//             initial={{ x: "-100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "-100%" }}
//             transition={{ duration: 0.3 }}
//             className="bg-white w-64 h-full p-5 shadow-lg flex flex-col justify-between"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div>
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-lg font-semibold">Menu</h2>
//                 <button
//                   onClick={() => setSidebarOpen(false)}
//                   className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
//                 >
//                   <X size={22} />
//                 </button>
//               </div>

//               <nav className="space-y-3">
//                 {tabs.map((tab) => (
//                   <SidebarItem
//                     key={tab}
//                     icon={getIcon(tab)}
//                     text={tab}
//                     active={activeTab === tab}
//                     onClick={() => {
//                       setActiveTab(tab);
//                       setSidebarOpen(false);
//                     }}
//                   />
//                 ))}
//               </nav>
//             </div>

//             <div>
//               <SidebarItem text="Pricing" />
//               <div className="flex items-center mt-4">
//                 <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
//                   R
//                 </div>
//                 <p className="ml-2 font-medium">Rahul Bedia</p>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </>
//   );
// }



"use client";

import { useRouter } from "next/navigation"; // For Next.js App Router
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import SidebarItem from "./sidebarItem";
import { getIcon } from "@/utils/getIcon";
import { useState } from "react";

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) {
  const router = useRouter();

  const tabs = [
    { text: "Dashboard", route: "/dashboard" },
    { text: "Resume Optimizer", route: "/resume-optimizer" },
    { text: "Resume Builder", route: "/resume-builder" },
    { text: "Note Tracker", route: "/notestracker" },
    { text: "Interview Prep", route: "/aiinterview" },
    { text: "Applications", route: "/applications" },
  ];

  const handleNavigation = (tab) => {
    setActiveTab(tab.text);
    router.push(tab.route); // Navigate programmatically
    setSidebarOpen(false); // Close mobile sidebar if open
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col justify-between w-60 bg-white shadow-md p-5 fixed left-0 top-0 h-full">
        <div>
          <img
            src="/logo.png"
            alt="Placed Logo"
            className="h-[100px] w-[180px] object-contain mb-4"
          />
          <nav className="space-y-3">
            {tabs.map((tab) => (
              <SidebarItem
                key={tab.text}
                icon={getIcon(tab.text)}
                text={tab.text}
                active={activeTab === tab.text}
                onClick={() => handleNavigation(tab)}
              />
            ))}
          </nav>
        </div>

        <div>
          <SidebarItem text="Pricing" onClick={() => router.push("/pricing")} />
          <div className="flex items-center mt-4">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
              R
            </div>
            <p className="ml-2 font-medium">Rahul Bedia</p>
          </div>
        </div>
      </aside>

      {/* Mobile Navbar */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center md:hidden z-40">
        <h2 className="text-lg font-semibold">{activeTab}</h2>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/30 z-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="bg-white w-64 h-full p-5 shadow-lg flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="space-y-3">
                {tabs.map((tab) => (
                  <SidebarItem
                    key={tab.text}
                    icon={getIcon(tab.text)}
                    text={tab.text}
                    active={activeTab === tab.text}
                    onClick={() => handleNavigation(tab)}
                  />
                ))}
              </nav>
            </div>

            <div>
              <SidebarItem text="Pricing" onClick={() => router.push("/pricing")} />
              <div className="flex items-center mt-4">
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
                  R
                </div>
                <p className="ml-2 font-medium">Rahul Bedia</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
