import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminNavbar from "../components/AdminNavbar";
import MemberManagement from "../components/MemberManagement";
import AdminTaskPanel from "../components/AdminTaskPanel";
import KanbanBoard from "../components/KanbanBoard";

const AdminDashboard = () => {
  // ✅ DEFINE TASKS STATE
  const [tasks, setTasks] = useState([]);

  // ✅ GET ADMIN ID FROM TOKEN
  const myId = JSON.parse(
    atob(localStorage.getItem("token").split(".")[1])
  ).id;

  // ✅ LOAD TASKS
  useEffect(() => {
    api.get("/tasks").then(res => setTasks(res.data));
  }, []);


  return (
    <>
      <AdminNavbar />

      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>

        {/* Members */}
        <MemberManagement />

        {/* Task Management */}
        <AdminTaskPanel />

        {/* Kanban Board */}
        <KanbanBoard
  tasks={tasks}
  setTasks={setTasks}
/>

      </div>
    </>
  );
};

export default AdminDashboard;

