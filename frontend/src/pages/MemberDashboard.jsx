import { useEffect, useState } from "react";
import api from "../api/axios";
import MemberLayout from "../layouts/MemberLayout";
import TaskStatusCards from "../components/TaskStatusCards";
import MemberProgressChart from "../components/MemberProgressChart";
import StreakCard from "../components/StreakCard";
import ProductivityCard from "../components/ProductivityCard";
import KanbanBoard from "../components/KanbanBoard";

const MemberDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("/tasks").then(res => setTasks(res.data));
  }, []);

  return (
    <MemberLayout>
      <h1 className="text-xl sm:text-2xl font-bold mb-6">
        My Dashboard
      </h1>

      {/* TOP STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StreakCard tasks={tasks} />
        <ProductivityCard tasks={tasks} />
      </div>

      <TaskStatusCards tasks={tasks} />

      <div className="my-8">
        <KanbanBoard tasks={tasks} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <MemberProgressChart tasks={tasks} />
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Task Overview
        </h2>
        <ul className="space-y-2 text-sm">
          <li>✅ Completed: {tasks.filter(t => t.status === "done").length}</li>
          <li>🟡 In Progress: {tasks.filter(t => t.status === "in-progress").length}</li>
          <li>⚪ To Do: {tasks.filter(t => t.status === "todo").length}</li>
        </ul>
      </div>
      </div>
    </MemberLayout>
  );
};

export default MemberDashboard;


