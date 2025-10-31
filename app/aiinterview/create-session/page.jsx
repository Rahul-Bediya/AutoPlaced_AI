// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import Sidebar from "../../../components/sidebar/sidebar";
// import BreadcrumbNav from "../../../components/sidebar/BreadcrumbNav";
// import { Upload, Lock, X } from "lucide-react";
// import { useRouter } from "next/navigation";

// export default function CreateSession() {
//   const [file, setFile] = useState(null);
//   const [activeTab, setActiveTab] = useState("Interview prep");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const router = useRouter();

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   router.push("/aiinterview/interview"); // ✅ redirect to interview page
//   // };
//   // inside CreateSession component
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // collect form data; you could use refs or controlled state. For brevity, grabbing from form elements:
//     const form = e.currentTarget;
//     const data = new FormData(form);
//     const payload = {
//       jobTitle: data.get("jobTitle") || "",
//       jobDescription: data.get("jobDescription") || "",
//       experienceLevel: data.get("experienceLevel") || "",
//       yearsOfExp: Number(data.get("yearsOfExp") || 0),
//       interviewType: data.get("interviewType") || "Technical",
//       programmingLanguage: data.get("programmingLanguage") || "",
//       numQuestions: Number(data.get("numQuestions") || 5),
//       resumeText: "" // optional: extract text from uploaded PDF server-side
//     };

//     try {
//       const res = await fetch("/api/generate-questions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//       });
//       const json = await res.json();
//       if (!res.ok) throw new Error(json.error || "Failed to generate questions");

//       // navigate to interview page with session id
//       router.push(`/aiinterview/interview?session=${json.sessionId}`);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to create interview: " + err.message);
//     }
//     //  e.preventDefault();
//     router.push("/aiinterview/interview");
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
//       <main
//         className="
//           flex-1 
//           md:ml-60 
//           p-4 sm:p-6 md:p-8 
//           mt-20 md:mt-0 
//           transition-all
//           duration-300
//           ease-in-out
//           overflow-x-hidden
//         "
//       >
//         {/* Breadcrumb Navbar */}
//         <BreadcrumbNav activeTab={activeTab} />

//         {/* Center Card */}
//         <div className="flex items-center justify-center">
//           <motion.div
//             className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl relative"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             {/* Close Button */}
//             <button
//               onClick={() => router.back()}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//             >
//               <X size={20} />
//             </button>

//             <h2 className="text-2xl font-bold text-center mb-6">
//               AI Interview Preparation
//             </h2>

//             {/* Upload Section */}
//             <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition mb-4">
//               <Upload className="mx-auto text-indigo-600 mb-3" size={40} />
//               <p className="font-medium text-gray-700">Upload New Resume</p>
//               <p className="text-sm text-gray-500">
//                 We accept PDF files max size 10MB
//               </p>
//               <input
//                 type="file"
//                 accept=".pdf"
//                 onChange={(e) => setFile(e.target.files[0])}
//                 className="hidden"
//                 id="resumeUpload"
//               />
//               <label
//                 htmlFor="resumeUpload"
//                 className="mt-4 inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-indigo-700 transition"
//               >
//                 Choose File
//               </label>
//               {file && (
//                 <p className="text-sm text-green-600 mt-2">
//                   {file.name} uploaded successfully
//                 </p>
//               )}
//             </div>

//             {/* Privacy Note */}
//             <p className="text-gray-500 text-sm flex items-center justify-center gap-2 mb-6">
//               <Lock size={14} /> We protect your resume and your{" "}
//               <span className="font-semibold">privacy</span>.
//             </p>

//             {/* Form Fields */}
//             <form className="space-y-4" onSubmit={handleSubmit}>
//               <input
//                 name="jobTitle"
//                 type="text"
//                 placeholder="Job Title (e.g., Software Engineer)"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               />

//               <textarea
//                 name="jobDescription"
//                 placeholder="Job Description (Optional)"
//                 rows="3"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               />

//               {/* Experience Section */}
//               <div className="flex gap-4">
//                 <select
//                   name="experienceLevel"
//                   className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                 >
//                   <option value="">Select Experience Level</option>
//                   <option value="Fresher">Fresher</option>
//                   <option value="Junior">Junior</option>
//                   <option value="Mid-Level">Mid-Level</option>
//                   <option value="Senior">Senior</option>
//                 </select>
//                 <input
//                   name="yearsOfExp"
//                   type="number"
//                   min="0"
//                   placeholder="Years of Exp"
//                   className="w-32 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                 />
//               </div>

//               {/* Interview Type */}
//               <select
//                 name="interviewType"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               >
//                 <option value="">Select Interview Type</option>
//                 <option value="Technical">Technical</option>
//                 <option value="HR">HR</option>
//                 <option value="Both">Both</option>
//               </select>

//               {/* Programming Language */}
//               <select
//                 name="programmingLanguage"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               >
//                 <option value="">Select Programming Language</option>
//                 <option value="Python">Python</option>
//                 <option value="Java">Java</option>
//                 <option value="C++">C++</option>
//                 <option value="JavaScript">JavaScript</option>
//                 <option value="Go">Go</option>
//                 <option value="C#">C#</option>
//                 <option value="Ruby">Ruby</option>
//                 <option value="PHP">PHP</option>
//               </select>

//               {/* Number of Questions */}
//               <input
//                 name="numQuestions"
//                 type="number"
//                 min="1"
//                 placeholder="Number of Questions"
//                 defaultValue={5}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               />

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition mt-2"
//               >
//                 Start Interview 🚀
//               </button>
//             </form>

//           </motion.div>
//         </div>
//       </main>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../../components/sidebar/sidebar";
import BreadcrumbNav from "../../../components/sidebar/BreadcrumbNav";
import { Upload, Lock, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateSession() {
  const [file, setFile] = useState(null);
  const [activeTab, setActiveTab] = useState("Interview prep");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ loading state
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      jobTitle: data.get("jobTitle") || "",
      jobDescription: data.get("jobDescription") || "",
      experienceLevel: data.get("experienceLevel") || "",
      yearsOfExp: Number(data.get("yearsOfExp") || 0),
      interviewType: data.get("interviewType") || "Technical",
      programmingLanguage: data.get("programmingLanguage") || "",
      numQuestions: Number(data.get("numQuestions") || 5),
      resumeText: "" // optional
    };

    try {
      const res = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API Error ${res.status}: ${text}`);
      }

      const json = await res.json();

      // ✅ redirect after receiving session
      router.push(`/aiinterview/interview?session=${json.sessionId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create interview: " + err.message);
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-pink-50 to-white text-gray-800 font-inter">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="flex-1 md:ml-60 p-4 sm:p-6 md:p-8 mt-20 md:mt-0 transition-all duration-300 ease-in-out overflow-x-hidden">
        <BreadcrumbNav activeTab={activeTab} />

        <div className="flex items-center justify-center">
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => router.back()}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-center mb-6">
              AI Interview Preparation
            </h2>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition mb-4">
              <Upload className="mx-auto text-indigo-600 mb-3" size={40} />
              <p className="font-medium text-gray-700">Upload New Resume</p>
              <p className="text-sm text-gray-500">We accept PDF files max size 10MB</p>
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
              {file && <p className="text-sm text-green-600 mt-2">{file.name} uploaded successfully</p>}
            </div>

            <p className="text-gray-500 text-sm flex items-center justify-center gap-2 mb-6">
              <Lock size={14} /> We protect your resume and your <span className="font-semibold">privacy</span>.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input name="jobTitle" type="text" placeholder="Job Title" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
              <textarea name="jobDescription" placeholder="Job Description" rows="3" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />

              <div className="flex gap-4">
                <select name="experienceLevel" className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                  <option value="">Select Experience Level</option>
                  <option value="Fresher">Fresher</option>
                  <option value="Junior">Junior</option>
                  <option value="Mid-Level">Mid-Level</option>
                  <option value="Senior">Senior</option>
                </select>
                <input name="yearsOfExp" type="number" min="0" placeholder="Years of Exp" className="w-32 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
              </div>

              <select name="interviewType" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                <option value="">Select Interview Type</option>
                <option value="Technical">Technical</option>
                <option value="HR">HR</option>
                <option value="Both">Both</option>
              </select>

              <select name="programmingLanguage" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                <option value="">Select Programming Language</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C++">C++</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Go">Go</option>
                <option value="C#">C#</option>
                <option value="Ruby">Ruby</option>
                <option value="PHP">PHP</option>
              </select>

              <input name="numQuestions" type="number" min="1" placeholder="Number of Questions" defaultValue={5} className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />

              <button
                type="submit"
                disabled={loading} // disable during loading
                className={`w-full py-3 rounded-lg font-semibold text-white transition mt-2 ${
                  loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3 3 3h-4z"></path>
                    </svg>
                    Loading...
                  </div>
                ) : (
                  "Start Interview 🚀"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
