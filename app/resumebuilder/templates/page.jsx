"use client";

import { useRouter } from "next/navigation";
import { FileText, CheckCircle2 } from "lucide-react";
import Sidebar from "../../../components/sidebar/sidebar";
import BreadcrumbNav from "../../../components/sidebar/BreadcrumbNav";
import { useState } from "react";
import { motion } from "framer-motion";

const templates = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean and contemporary design perfect for tech roles.",
    features: ["ATS-Friendly", "Two-Column", "Icon Integration"],
  },
  {
    id: "classic",
    name: "Classic Executive",
    description: "Traditional format ideal for corporate positions.",
    features: ["ATS-Friendly", "Single-Column", "Professional Styling"],
  },
  {
    id: "minimal",
    name: "Minimal Clean",
    description: "Simplified design that highlights content.",
    features: ["ATS-Friendly", "Minimalist", "Easy to Scan"],
  },
  {
    id: "creative",
    name: "Creative Bold",
    description: "Stand-out design for creative professionals.",
    features: ["ATS-Friendly", "Unique Layout", "Color Accents"],
  },
  {
    id: "technical",
    name: "Technical Developer",
    description: "Developer-focused layout with projects section.",
    features: ["ATS-Friendly", "Projects Section", "Tech Stack Display"],
  },
];

export default function TemplatesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Templates");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-white text-gray-800 font-inter flex">
      {/* ✅ Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* ✅ Main Content */}
      <main className="flex-1 md:ml-60 mt-16 md:mt-0 p-6 md:p-8">
        <BreadcrumbNav activeTab={activeTab} />

        <div className="text-center mb-12 mt-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-sm">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
              Template
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            All templates are ATS-friendly and professionally designed.
          </p>
        </div>

        {/* ✅ Templates Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() =>
                router.push(`/resumebuilder/builder?template=${template.id}`)
              }
              className="group p-6 bg-white  rounded-xl shadow-xl hover:shadow-2xl transition duration-300 cursor-pointer transform hover:-translate-y-2 hover:rotate-1 hover:border-indigo-400 hover:ring-2 hover:ring-pink-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-indigo-100 group-hover:bg-indigo-200 transition shadow-inner">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition">
                    {template.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3 group-hover:text-gray-700 transition">
                    {template.description}
                  </p>

                  <div className="space-y-1">
                    {template.features.map((feature) => (
                      <p
                        key={feature}
                        className="flex items-center gap-2 text-sm text-gray-500"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {feature}
                      </p>
                    ))}
                  </div>

                  <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition transform hover:scale-[1.04] shadow">
                    Use This Template
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
