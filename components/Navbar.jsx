export default function Navbar() {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[90%] lg:w-[80%] h-[61px] rounded-full shadow-lg bg-white flex justify-between items-center px-4 z-[1000] font-onest">
     
      <div className="flex items-center gap-2">
        <img
          src="/logo.png"
          alt="Placed Logo"
          className="h-[120px] w-[200px] object-contain"
        />
      </div>

    
      <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
        <a
          href="#"
          className="hover:text-blue-500 transition-colors duration-300"
        >
          Home
        </a>
        <a
          href="#"
          className="hover:text-blue-500 transition-colors duration-300"
        >
          AI Tools
        </a>
        <a
          href="#"
          className="hover:text-blue-500 transition-colors duration-300"
        >
          Pricing
        </a>
        <a
          href="#"
          className="hover:text-blue-500 transition-colors duration-300"
        >
          Blogs
        </a>
      </nav>

     
      <div className="flex gap-4">
        <button className="px-4 py-2 rounded-full border border-gray-300 hover:border-blue-500 hover:text-blue-500 transition-all duration-300">
          Login
        </button>
        <button className="px-4 py-2 rounded-full bg-[#081b3a] text-white font-medium hover:text-sky-300 transition-colors duration-300">
          Sign up for free
        </button>
      </div>
    </header>
  );
}
