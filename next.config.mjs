// /** @type {import('next').NextConfig} */
// const nextConfig = {};
// // next.config.js


// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      crypto: false,
      ...config.resolve.fallback,
    };
    return config;
  },
};

export default nextConfig;



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack: (config, { isServer }) => {
//     // Prevent pdfjs-dist from requiring Node canvas
//     if (!isServer) {
//       config.resolve.fallback = {
//         ...config.resolve.fallback,
//         canvas: false,
//         fs: false,
//         path: false,
//         crypto: false,
//       };
//     }

//     return config;
//   },
// };

// export default nextConfig;
