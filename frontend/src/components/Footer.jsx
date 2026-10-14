import { BookOpen } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 text-white font-semibold mb-4 md:mb-0">
          <BookOpen size={20} />
          Study Tracker
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Study Tracker. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition">Privacy</a>
          <a href="#" className="hover:text-white transition">Terms</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;