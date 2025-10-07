import Image from "next/image";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center  px-6">
      <div className="bg-white px-4 py-1 rounded-full text-sm mb-2 ">
        ⭐ AI Powered career platform
      </div>

   <h1 className="text-4xl md:text-8xl font-bold leading-tight">
  <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-text">
    AI Career Platform
  </span>
  <br />
  <span className="text-gray-900">For Job Seekers</span>
</h1>



      <p className="mt-6 text-lg text-gray-600 max-w-2xl">
        Find your ideal job faster with AI-driven matching and personalized recommendations
        based on your skills and preferences.
      </p>

      {/* Features */}
      <div className="flex flex-wrap justify-center gap-6 mt-8 text-gray-600 font-bold text-sm">
        <span className="flex items-center gap-2">⚡ Set up in minutes</span>
        <span className="flex items-center gap-2">🎯 No training required</span>
        <span className="flex items-center gap-2">🔗 LinkedIn Integration</span>
      </div>

      {/* CTA */}
      <Link href="/dashboard">
      <button className="mt-10 px-8 py-4 bg-indigo-600 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-[#E9E4F0] hover:text-black transition duration-300">
        Get Placed for Free →
      </button>
    </Link>

      {/* Active Users */}
      <div className="flex items-center gap-3 mt-6 text-gray-600">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="user"
          className="w-10 h-10 rounded-full border"
        />
        <img
          src="https://randomuser.me/api/portraits/women/65.jpg"
          alt="user"
          className="w-10 h-10 rounded-full border -ml-4"
        />
        <img
          src="https://randomuser.me/api/portraits/men/52.jpg"
          alt="user"
          className="w-10 h-10 rounded-full border -ml-4"
        />
        <span className="ml-2">250+ Active Users</span>
      </div>
    </section>

  );
}
