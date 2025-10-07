import { Menu } from "lucide-react";

export default function MobileNavbar({ setSidebarOpen }) {
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center md:hidden z-40">
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <button
        onClick={() => setSidebarOpen(true)}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
      >
        <Menu size={22} />
      </button>
    </div>
  );
}
