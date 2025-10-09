"use client";

import { motion } from "framer-motion";

export default function ActionCard({ title, desc, color }) {
 
  return (
    <motion.div
      className={`p-6 rounded-xl shadow-lg ${color} cursor-pointer hover:shadow-xl transition-all`}
      whileHover={{ scale: 1.05 }}
      
    >
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </motion.div>
  );
}

// "use client";

// import { motion } from "framer-motion";

// export default function ActionCard({ title, desc, color,onClick }) {
//   const handleClick = () => {
//     console.log("Hello, I am working"); // Fixed typo
//      if (onClick) onClick();
//     // Call parent click handler if provided
//   };

//   return (
//     <motion.div
//       className={`p-6 rounded-xl shadow-lg ${color} cursor-pointer hover:shadow-xl transition-all`}
//       whileHover={{ scale: 1.05 }}
//       onClick={handleClick} // Pass handler directly
//     >
//       <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
//       <p className="text-sm text-gray-600">{desc}</p>
//     </motion.div>
//   );
// }
