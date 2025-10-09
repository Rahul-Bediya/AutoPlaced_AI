// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// export default function VideoSection() {
//   const [videos, setVideos] = useState([]);
//   const [error, setError] = useState(null);
//   const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const query = "programming, reactjs, java, interview preparation";
//         const maxResults = 12;

//         const response = await fetch(
//           `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(
//             query
//           )}&key=${API_KEY}`
//         );

//         if (!response.ok) throw new Error(`Error: ${response.status}`);
//         const data = await response.json();

//         if (!data.items || data.items.length === 0)
//           throw new Error("No videos found");

//         const formattedVideos = data.items.map((item) => ({
//           title: item.snippet.title,
//           thumbnail: item.snippet.thumbnails.medium.url,
//           channel: item.snippet.channelTitle,
//           url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
//         }));

//         setVideos(formattedVideos);
//       } catch (err) {
//         console.error("Error fetching videos:", err);
//         setError(err.message);
//       }
//     };

//     fetchVideos();
//   }, [API_KEY]);

//   return (
//     <section className="mt-6 w-full overflow-hidden">
//       <h2 className="text-2xl font-bold mb-4">Study Videos</h2>

//       {error ? (
//         <p className="text-red-600 text-sm">{error}</p>
//       ) : videos.length === 0 ? (
//         <p className="text-gray-500">Loading videos...</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <div className="flex gap-6 pb-4 w-max">
//             {videos.map((video, index) => (
//               <motion.div
//                 key={index}
//                 className="min-w-[280px] max-w-[280px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all flex-shrink-0"
//                 whileHover={{ scale: 1.03 }}
//               >
//                 <a href={video.url} target="_blank" rel="noopener noreferrer">
//                   <img
//                     src={video.thumbnail}
//                     alt={video.title}
//                     className="w-full h-44 object-cover"
//                   />
//                   <div className="p-4">
//                     <h3 className="text-sm font-semibold line-clamp-2 text-gray-800">
//                       {video.title}
//                     </h3>
//                     <p className="text-xs text-gray-500 mt-1">
//                       {video.channel}
//                     </p>
//                   </div>
//                 </a>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function VideoSection() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const query = "programming, reactjs, java, interview preparation";
        const maxResults = 12;

        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(
            query
          )}&key=${API_KEY}`
        );

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();

        if (!data.items || data.items.length === 0)
          throw new Error("No videos found");

        const formattedVideos = data.items.map((item) => ({
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          channel: item.snippet.channelTitle,
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        }));

        setVideos(formattedVideos);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError(err.message);
      }
    };

    fetchVideos();
  }, [API_KEY]);

  return (
    <section className="mt-6 w-full overflow-hidden">
      <h2 className="text-2xl font-bold mb-4">Study Videos</h2>

      {error ? (
        <p className="text-red-600 text-sm">{error}</p>
      ) : videos.length === 0 ? (
        <p className="text-gray-500">Loading videos...</p>
      ) : (
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <div className="flex gap-4 sm:gap-6 pb-4 w-max">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                className="
                  bg-white rounded-xl shadow-md overflow-hidden 
                  hover:shadow-lg transition-all flex-shrink-0
                  min-w-[220px] sm:min-w-[230px] md:min-w-[230px]
                  max-w-[280px]
                "
                whileHover={{ scale: 1.03 }}
              >
                <a href={video.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-40 sm:h-44 object-cover"
                  />
                  <div className="p-3 sm:p-4">
                    <h3 className="text-xs sm:text-sm font-semibold line-clamp-2 text-gray-800">
                      {video.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                      {video.channel}
                    </p>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
