import { useEffect, useState } from "react";
import api from "../api/axios";
import TaskModal from "./TaskModal";
import TaskCard from "./TaskCard";

const AdminTaskPanel = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const loadTasks = () => {
    api.get("/tasks").then(res => setTasks(res.data));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const deleteTask = async (id) => {
    if (!confirm("Delete this task?")) return;
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Tasks</h2>
        <button
          onClick={() => {
            setEditTask(null);
            setOpen(true);
          }}
          className="bg-primary text-black px-4 py-2 rounded border bg-orange-300  hover:bg-orange-500"
        >
          + Create Task
        </button>
      </div>

      {tasks.map(task => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={(t) => {
            setEditTask(t);
            setOpen(true);
          }}
          onDelete={deleteTask}
        />
      ))}

      <TaskModal
        open={open}
        onClose={() => setOpen(false)}
        task={editTask}
        refresh={loadTasks}
      />
    </div>
  );
};

export default AdminTaskPanel;
