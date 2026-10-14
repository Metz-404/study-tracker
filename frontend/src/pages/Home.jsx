import { Link } from "react-router-dom";
import { PencilLine, Clock, BarChart3, Check } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FeatureCard from "../components/FeatureCard";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight animate-fade-in-down">
            Beat Procrastination.
            <br />
            <span className="text-primary">Ace Your Studies.</span>
          </h1>
          <p
            className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            Study Tracker helps you organize assignments, track deadlines, and
            stay on top of every subject — all in one simple dashboard.
          </p>
          <div
            className="mt-10 flex justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            {/* ...buttons stay the same... */}
          </div>
        </div>
      </section>

      {/* SUB-CONTENT / FEATURES SECTION */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Everything You Need to Stay Organized
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Built for students who want to focus on learning, not on managing
              chaos.
            </p>
          </div>

          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <FeatureCard
              icon={<PencilLine size={24} />}
              title="Track Assignments"
              description="..."
            />
          </div>
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <FeatureCard
              icon={<Clock size={24} />}
              title="Manage Deadlines"
              description="..."
            />
          </div>
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            <FeatureCard
              icon={<BarChart3 size={24} />}
              title="Boost Productivity"
              description="..."
            />
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Your Studies, Fully Organized
              </h2>
              <p className="text-gray-600 mb-4">
                Study Tracker was built with students in mind. Whether you're
                managing a single subject or juggling a full semester, our
                intuitive dashboard gives you clarity at a glance.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <Check className="text-secondary" size={20} /> Simple, clean
                  interface
                </li>
                <li className="flex items-center gap-3">
                  <Check className="text-secondary" size={20} /> Real-time task
                  updates
                </li>
                <li className="flex items-center gap-3">
                  <Check className="text-secondary" size={20} /> Priority-based
                  tracking
                </li>
                <li className="flex items-center gap-3">
                  <Check className="text-secondary" size={20} /> Track your
                  progress effortlessly
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="text-center">
                <div className="text-6xl mb-4">🎓</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Trusted by Students
                </h3>
                <p className="text-gray-600 italic">
                  "Study Tracker helped me stay on top of every deadline this
                  semester. I can't imagine going back."
                </p>
                <p className="mt-4 text-sm font-medium text-primary">
                  — A Very Happy Student
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
