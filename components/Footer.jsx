"use client";


export default function Footer() {
  return (
    <footer className="bg-[#081b3a] text-white rounded-t-3xl mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* === Column 1 === */}
        <div>
          <h3 className="text-lg font-semibold mb-4">AI Job Tools</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Tailored Auto Apply</li>
            <li>Interview Q&amp;A</li>
            <li>Job GPT</li>
            <li>Resume GPT</li>
          </ul>
        </div>

        {/* === Column 2 === */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Cover Letters</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Cover Letter Examples</li>
            <li>Cover Letter Generator</li>
            <li>Product Manager Cover Letter</li>
          </ul>
        </div>

        {/* === Column 3 === */}
        <div>
          <h3 className="text-lg font-semibold mb-4">LinkedIn Tools</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Post Generator</li>
            <li>Bio Generator</li>
            <li>Recommendation Generator</li>
            <li>Job Description Generator</li>
          </ul>
        </div>

        {/* === Column 4 === */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Sales</li>
            <li>Support</li>
            <li>Feature Request</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* === Column 5 (Logo + Description) === */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-extrabold mb-2 text-white font-sans">AutoPlaced</h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              We are at the forefront of AI chatbot development,
              revolutionizing the way businesses engage with their customers.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="bg-white/10 rounded-lg px-4 py-2 text-sm flex items-center gap-2">
              <span className="text-green-400">★</span> Trustpilot
            </div>
            {/* <img
              src="/product-hunt-badge.png"
              alt="Product Hunt"
              className="h-10 rounded-lg"
            /> */}
          </div>
        </div>
      </div>

      {/* === Social Icons === */}
      <div className="flex justify-center flex-wrap gap-4 border-t border-white/10 py-6">
        <button className="border border-white/30 text-white px-4 py-2 rounded-full text-sm hover:bg-white/10 transition">
          Facebook
        </button>
        <button className="border border-white/30 text-white px-4 py-2 rounded-full text-sm hover:bg-white/10 transition">
          Tiktok
        </button>
        <button className="border border-white/30 text-white px-4 py-2 rounded-full text-sm hover:bg-white/10 transition">
          LinkedIn
        </button>
        <button className="border border-white/30 text-white px-4 py-2 rounded-full text-sm hover:bg-white/10 transition">
          Instagram
        </button>
      </div>

      {/* === Bottom Text === */}
      <div className="border-t border-white/10 text-center text-gray-400 text-sm py-4">
        © AutoPlaced 2025. All rights reserved
      </div>
    </footer>
  );
}
