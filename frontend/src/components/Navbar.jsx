import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-primary transition-transform duration-300 hover:scale-105"
          >
            <BookOpen size={28} className="animate-float" />
            Study Tracker
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <a
              href="#features"
              className="text-gray-600 hover:text-primary transition"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-gray-600 hover:text-primary transition"
            >
              About
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex space-x-3">
            <Link
              to="/login"
              className="px-4 py-2 text-primary font-medium border border-primary rounded-lg hover:bg-primary hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-indigo-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
