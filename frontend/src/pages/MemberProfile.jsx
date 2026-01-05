import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import ProfileTaskCard from "../components/ProfileTaskCard";
import ProfileInfoCard from "../components/ProfileInfoCard";
import { AuthContext } from "../context/AuthContext";
import ChangePasswordCard from "../components/ChangePasswordCard";
import MemberNavbar from "../components/MemberNavbar";

const MemberProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const role = localStorage.getItem("role");
  const tokenPayload = JSON.parse(
    atob(localStorage.getItem("token").split(".")[1])
  );

  useEffect(() => {
  const loadData = async () => {
    // load profile
    if (role === "admin") {
      const res = await api.get(`/users/${id}`);
      setUser(res.data);
    } else {
      const res = await api.get("/users/me");
      setUser(res.data);
    }

    // load tasks
    const taskRes = await api.get("/tasks");
    setTasks(taskRes.data);
  };

  loadData();
}, []);


  const myId = tokenPayload.id;
  const userId = role === "admin" ? id : myId;


  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  const loadData = async () => {
    const loadUser = async () => {
  if (role === "admin") {
    const res = await api.get(`/users/${id}`);
    setUser(res.data);
  } else {
    const res = await api.get("/users/me");
    setUser(res.data);
  }
};

    const found = users.data.find(u => u._id === userId);
    setUser(found);

    const res = await api.get("/tasks");
    const filtered = res.data.filter(task =>
  task.assignedTo?.some(u => u._id === userId)
);

    setTasks(filtered);
  };

  useEffect(() => {
    loadData();
  }, [userId]);

  if (!user) return null;

  const stats = {
    total: tasks.length,
    progress: tasks.filter(t => t.status === "in-progress").length,
    done: tasks.filter(t => t.status === "done").length
  };

  return (
    <>
    <MemberNavbar />
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Member Profile</h1>
      </div>

      {/* Profile Info */}
      <ProfileInfoCard
        user={user}
        isAdmin={role === "admin"}
        refresh={loadData}
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {["total", "progress", "done"].map(key => (
          <div
            key={key}
            className="bg-white p-4 rounded shadow text-center"
          >
            <p className="text-sm text-gray-500 capitalize">{key}</p>
            <p className="text-2xl font-bold">{stats[key]}</p>
          </div>
        ))}
      </div>

      {/* Task History */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Task History</h2>
        {tasks.map(task => (
          <ProfileTaskCard key={task._id} task={task} />
        ))}
      </div>
      <ChangePasswordCard />

      
    </div>
    </>
  );
};

export default MemberProfile;
