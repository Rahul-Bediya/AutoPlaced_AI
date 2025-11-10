"use client";

import { useRouter } from "next/navigation";

export default function BreadcrumbNav({ activeTab }) {
  const router = useRouter();

  const tabRoutes = {
    Dashboard: "/dashboard",
    "Resume Optimizer": "/resumeoptimizer",
    "Resume Builder": "/resumebuilder",
    "Note Tracker": "/createnotes",
    "Interview Prep": "/interviewprep",
    Applications: "/applications",
  };

  // Avoid duplicate "Dashboard"
  const tabs =
    activeTab === "Dashboard" ? ["Dashboard"] : ["Dashboard", activeTab];

  return (
    <div className="hidden md:flex gap-3 mb-6 items-center flex-wrap">
      {tabs.map((tab, index) => (
        <div key={tab} className="flex items-center">
          <button
            onClick={() => router.push(tabRoutes[tab])}
            className={`px-3 py-2 rounded-lg font-medium transition ${
              activeTab === tab
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
          {index < tabs.length - 1 && (
            <span className="mx-2 text-gray-400">{">"}</span>
          )}
        </div>
      ))}
    </div>
  );
}
