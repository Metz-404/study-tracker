import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import TaskFormModal from '../components/TaskFormModal';
import api from '../api';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      if (editingTask) {
        const response = await api.put(`/tasks/${editingTask.id}`, formData);
        setTasks(tasks.map((t) => (t.id === editingTask.id ? response.data : t)));
      } else {
        const response = await api.post('/tasks', formData);
        setTasks([response.data, ...tasks]);
      }
      closeModal();
    } catch (err) {
      alert('Error saving task: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      alert('Error deleting task.');
    }
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'All') return true;
    return t.status === filter;
  });

  const priorityColor = {
    Low: 'bg-blue-100 text-blue-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    High: 'bg-red-100 text-red-700',
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8 animate-fade-in-down">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
            <p className="text-gray-500 mt-1">Manage all your assignments in one place.</p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-indigo-700 transition shadow-sm"
          >
            <Plus size={18} /> Add Task
          </button>
        </div>

        <div className="flex gap-2 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          {['All', 'Pending', 'Completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === f
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          {loading ? (
            <p className="p-8 text-center text-gray-500">Loading tasks...</p>
          ) : filteredTasks.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500 mb-4">
                No tasks found. {filter !== 'All' ? 'Try a different filter.' : 'Create your first one!'}
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Task</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Subject</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Due Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Priority</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50 transition-all duration-200 hover:shadow-sm">
                    <td className="px-6 py-4 font-medium text-gray-900">{task.title}</td>
                    <td className="px-6 py-4 text-gray-600">{task.subject}</td>
                    <td className="px-6 py-4 text-gray-600">{task.due_date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${priorityColor[task.priority]}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                          task.status === 'Completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(task)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-primary font-medium hover:bg-indigo-50 rounded-lg transition"
                      >
                        <Pencil size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 font-medium hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        task={editingTask}
      />
    </div>
  );
}

export default Tasks;