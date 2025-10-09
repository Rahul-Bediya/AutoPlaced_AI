// "use client";

// import { motion } from "framer-motion";
// import { FaYoutube, FaFilePdf, FaMicrophone, FaFileAudio } from "react-icons/fa";

// export default function ActionCards() {
//   const actions = [
//     {
//       title: "Analyze Video",
//       desc: "Paste a YouTube URL to extract insights and generate study materials.",
//       color: "bg-indigo-100",
//       icon: <FaYoutube size={28} className="text-red-600" />,
//     },
//     {
//       title: "Extract PDF Insights",
//       desc: "Upload a PDF document to summarize key points and concepts.",
//       color: "bg-green-100",
//       icon: <FaFilePdf size={28} className="text-red-500" />,
//     },
//     {
//       title: "Record Your Voice",
//       desc: "Speak your notes and get automatic transcription and summaries.",
//       color: "bg-yellow-100",
//       icon: <FaMicrophone size={28} className="text-yellow-600" />,
//     },
//     {
//       title: "Transcribe Audio",
//       desc: "Upload an audio file to convert speech to text and study notes.",
//       color: "bg-pink-100",
//       icon: <FaFileAudio size={28} className="text-pink-600" />,
//     },
//   ];

//   const handleClick = (title) => {
//     alert(`Clicked: ${title}`);
//   };

//   return (
//     <section>
//       <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {actions.map((action, i) => (
//           <motion.div
//             key={i}
//             className={`p-6 rounded-xl shadow-lg ${action.color} cursor-pointer hover:shadow-xl transition-all flex flex-col items-start gap-3`}
//             whileHover={{ scale: 1.05 }}
//             onClick={() => handleClick(action.title)}
//           >
//             {/* Icon */}
//             <div>{action.icon}</div>

//             <h3 className="text-lg font-semibold mb-2 text-gray-800">{action.title}</h3>
//             <p className="text-sm text-gray-600">{action.desc}</p>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }


"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaYoutube, FaFilePdf, FaMicrophone, FaFileAudio } from "react-icons/fa";

export default function ActionCards() {
  const [modalAction, setModalAction] = useState(null);

  const actions = [
    { title: "Analyze Video", desc: "Paste a YouTube URL", color: "bg-indigo-100", icon: <FaYoutube size={28} className="text-red-600" /> },
    { title: "Extract PDF Insights", desc: "Upload a PDF document", color: "bg-green-100", icon: <FaFilePdf size={28} className="text-red-500" /> },
    { title: "Record Your Voice", desc: "Speak your notes", color: "bg-yellow-100", icon: <FaMicrophone size={28} className="text-yellow-600" /> },
    { title: "Transcribe Audio", desc: "Upload an audio file", color: "bg-pink-100", icon: <FaFileAudio size={28} className="text-pink-600" /> },
  ];

  const handleClick = (action) => {
    setModalAction(action);
  };

  const closeModal = () => setModalAction(null);

  return (
    <section >
      <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action, i) => (
          <motion.div
            key={i}
            className={`p-6 rounded-xl shadow-lg ${action.color} cursor-pointer hover:shadow-xl transition-all flex flex-col items-start gap-3`}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleClick(action)}
          >
            <div>{action.icon}</div>
            <h3 className="text-lg font-semibold">{action.title}</h3>
            <p className="text-sm">{action.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalAction && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={closeModal} // click outside to close
            />

            {/* Modal Content */}
            <motion.div
              className="fixed top-1/2 left-1/2 z-50 w-full max-w-md p-6 bg-white rounded-2xl shadow-xl -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <h3 className="text-xl font-bold mb-4">{modalAction.title}</h3>

              {/* Modal form based on action */}
              {modalAction.title === "Analyze Video" && (
                <div className="flex flex-col gap-3">
                  <input type="text" placeholder="Paste YouTube URL" className="border p-3 rounded-lg" />
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">Generate Notes</button>
                </div>
              )}

              {modalAction.title === "Extract PDF Insights" && (
                <div className="flex flex-col gap-3">
                  <input type="file" accept="application/pdf" className="border p-3 rounded-lg" />
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">Generate Notes</button>
                </div>
              )}

              {modalAction.title === "Record Your Voice" && (
                <div className="flex flex-col gap-3">
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">Start Recording</button>
                </div>
              )}

              {modalAction.title === "Transcribe Audio" && (
                <div className="flex flex-col gap-3">
                  <input type="file" accept="audio/*" className="border p-3 rounded-lg" />
                  <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">Generate Notes</button>
                </div>
              )}

              <button onClick={closeModal} className="mt-4 text-gray-500 hover:text-gray-800">Close</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
