import AdminNavbar from "../components/AdminNavbar";
import { useEffect, useState } from "react";
import api from "../api/axios";
import GanttChart from "../components/GanttChart";
import MemberPerformanceChart from "../components/MemberPerformanceChart";

const AnalyticsDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/tasks").then(res => setTasks(res.data));
    api.get("/users").then(res => setUsers(res.data));
  }, []);

  return (
    <>
      <AdminNavbar />

      <div className="p-6 space-y-8">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Project Timeline (Gantt)
          </h2>
          <GanttChart tasks={tasks} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Member Performance
          </h2>
          <MemberPerformanceChart users={users} tasks={tasks} />
        </div>
      </div>
    </>
  );
};

export default AnalyticsDashboard;
