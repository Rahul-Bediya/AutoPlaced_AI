"use client";

import { motion } from "framer-motion";

export default function NotesSection() {
  const notes = [
    { title: "React Hooks Summary", content: "Hooks let you use state and other React features..." },
    { title: "CSS Grid Notes", content: "CSS Grid is a powerful layout system..." },
    { title: "Node.js Basics", content: "Node.js allows JavaScript to run on the server..." },
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">My Notes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
            <p className="text-gray-600">{note.content}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
