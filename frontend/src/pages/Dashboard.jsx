import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, CheckCircle, Clock, Flame, Plus } from "lucide-react";
import Sidebar from "../components/Sidebar";
import api from "../api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token) {
      navigate("/login");
      return;
    }

    if (storedUser) setUser(JSON.parse(storedUser));

    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [navigate]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const pendingTasks = tasks.filter((t) => t.status === "Pending").length;
  const highPriorityTasks = tasks.filter(
    (t) => t.priority === "High" && t.status === "Pending",
  ).length;

  const metrics = [
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: <ClipboardList size={36} strokeWidth={1.8} />,
      color: "text-blue-500",
      hoverBg: "hover:bg-blue-50",
    },
    {
      label: "Completed",
      value: completedTasks,
      icon: <CheckCircle size={36} strokeWidth={1.8} />,
      color: "text-green-500",
      hoverBg: "hover:bg-green-50",
    },
    {
      label: "Pending",
      value: pendingTasks,
      icon: <Clock size={36} strokeWidth={1.8} />,
      color: "text-yellow-500",
      hoverBg: "hover:bg-yellow-50",
    },
    {
      label: "High Priority",
      value: highPriorityTasks,
      icon: <Flame size={36} strokeWidth={1.8} />,
      color: "text-red-500",
      hoverBg: "hover:bg-red-50",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in-down">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back{user ? `, ${user.name}` : ""}! 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Here's an overview of your study progress.
          </p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`group bg-white rounded-xl shadow-sm p-6 border border-gray-100 
            transition-all duration-300 ease-out
            hover:shadow-lg hover:-translate-y-1 ${metric.hoverBg}
            animate-fade-in-up`}
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "forwards",
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {metric.label}
                  </p>
                  <p className="text-4xl font-bold text-gray-900 mt-3 transition-transform duration-300 group-hover:scale-105">
                    {loading ? "—" : metric.value}
                  </p>
                </div>
                <div
                  className={`${metric.color} transition-all duration-500 ease-out 
                              group-hover:scale-125 group-hover:rotate-6`}
                >
                  {metric.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Tasks Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Tasks
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                You don't have any tasks yet.
              </p>
              <button
                onClick={() => navigate("/tasks")}
                className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700 transition"
              >
                <Plus size={18} /> Create Your First Task
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {tasks.slice(0, 5).map((task) => (
                <li
                  key={task.id}
                  className="py-3 flex justify-between items-center hover:bg-gray-50 -mx-6 px-6 transition"
                >
                  <div>
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <p className="text-sm text-gray-500">
                      {task.subject} · Due {task.due_date}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
