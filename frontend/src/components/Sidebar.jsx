import { Link, useNavigate, useLocation } from "react-router-dom";
import { BookOpen, LayoutDashboard, ClipboardList, LogOut } from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-gray-900 text-gray-300 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800 flex items-center gap-2">
        <BookOpen size={24} className="text-primary" />
        <h1 className="text-xl font-bold text-white">Study Tracker</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:translate-x-1 ${
            isActive("/dashboard")
              ? "bg-primary text-white"
              : "hover:bg-gray-800 hover:text-white"
          }`}
        >
          <LayoutDashboard size={20} /> Dashboard
        </Link>

        <Link
          to="/tasks"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            isActive("/tasks")
              ? "bg-primary text-white"
              : "hover:bg-gray-800 hover:text-white"
          }`}
        >
          <ClipboardList size={20} /> My Tasks
        </Link>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 hover:text-white transition text-left"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
