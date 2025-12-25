
"use client";
import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = ["Home", "AI Tools", "Pricing", "Blogs"];

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[90%] lg:w-[80%] h-[64px] rounded-full shadow-lg bg-white flex items-center px-4 z-[1000] font-onest">
      {/* logo */}
      <div className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="Placed Logo"
          className="h-8 md:h-10 lg:h-12 w-auto object-contain"
        />
      </div>

      {/* desktop nav */}
      <nav className="hidden md:flex gap-6 text-gray-700 font-medium ml-6">
        {links.map((l) => (
          <a
            key={l}
            href="#"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            {l}
          </a>
        ))}
      </nav>

      {/* spacer */}
      <div className="flex-1" />

      {/* actions (desktop) */}
      <div className="hidden md:flex gap-4 items-center">
        <button className="px-4 py-2 rounded-full border border-gray-300 hover:border-blue-500 hover:text-blue-500 transition-all duration-300">
          Login
        </button>
        <button className="px-4 py-2 rounded-full bg-[#081b3a] text-white font-medium hover:text-sky-300 transition-colors duration-300">
          Sign up for free
        </button>
      </div>

      {/* mobile hamburger */}
      <div className="md:hidden flex items-center">
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* mobile menu panel */}
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-[74px] w-[92%] max-w-xl bg-white rounded-2xl shadow-lg p-4 md:hidden">
          <nav className="flex flex-col gap-3 text-gray-700 font-medium">
            {links.map((l) => (
              <a
                key={l}
                href="#"
                onClick={() => setOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-gray-100 transition-colors duration-200"
              >
                {l}
              </a>
            ))}
          </nav>

          <div className="mt-3 flex flex-col gap-2">
            <button
              onClick={() => setOpen(false)}
              className="w-full px-4 py-2 rounded-full border border-gray-300 hover:border-blue-500 hover:text-blue-500 transition-all duration-300"
            >
              Login
            </button>
            <button
              onClick={() => setOpen(false)}
              className="w-full px-4 py-2 rounded-full bg-[#081b3a] text-white font-medium hover:text-sky-300 transition-colors duration-300"
            >
              Sign up for free
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
