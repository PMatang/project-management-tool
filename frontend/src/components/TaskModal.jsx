import { useEffect, useState } from "react";
import api from "../api/axios";

const TaskModal = ({ open, onClose, task, refresh }) => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: [],
    dueDate: ""
  });

  useEffect(() => {
    api.get("/users").then(res => setUsers(res.data));
    if (task) {
      setForm({
        ...task,
        assignedTo: task.assignedTo?.map(u => u._id) || []
      });
    }
  }, [task]);

  if (!open) return null;

  const toggleUser = (id) => {
    setForm(prev => ({
      ...prev,
      assignedTo: prev.assignedTo.includes(id)
        ? prev.assignedTo.filter(u => u !== id)
        : [...prev.assignedTo, id]
    }));
  };

  const submit = async () => {
    if (task) {
      await api.patch(`/tasks/${task._id}`, form);
    } else {
      await api.post("/tasks", form);
    }
    refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-420px p-6 rounded-xl shadow-xl">
        <h2 className="text-xl text-black font-bold mb-4">
          {task ? "Update Task" : "Create Task"}
        </h2>

        <input
          placeholder="Title"
          className="border p-2 w-full mb-3 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="border p-2 w-full mb-3 rounded"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        {/* MULTI MEMBER SELECT */}
        <div className="mb-4">
          <p className="text-sm font-semibold mb-2">Assign Members</p>
          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
            {users.map(u => (
              <label
                key={u._id}
                className="flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={form.assignedTo.includes(u._id)}
                  onChange={() => toggleUser(u._id)}
                />
                {u.name}
              </label>
            ))}
          </div>
        </div>

        <input
          type="date"
          className="border p-2 w-full mb-4 rounded"
          value={form.dueDate?.substring(0, 10)}
          onChange={(e) =>
            setForm({ ...form, dueDate: e.target.value })
          }
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded bg-red-500 hover:bg-red-600 text-white"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="px-4 py-2 bg-primary text-black rounded border bg-orange-300 hover:bg-orange-500"
          >
            {task ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
