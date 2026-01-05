import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const myId = JSON.parse(
    atob(localStorage.getItem("token").split(".")[1])
  ).id;

  const NavButton = ({ label, path }) => (
    <button
      onClick={() => navigate(path)}
      className={`px-3 py-1 rounded text-sm border
        ${
          location.pathname === path
            ? "bg-gray-200 font-semibold"
            : "hover:bg-gray-100"
        }
      `}
    >
      {label}
    </button>
  );

  return (
    <nav className="bg-white shadow px-4 sm:px-6 py-3 flex justify-between items-center">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <h1
          onClick={() => navigate("/admin")}
          className="font-bold text-lg cursor-pointer"
        >
          Project Manager
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        

        <NavButton label="Dashboard" path="/admin" />
        <NavButton label="Analytics" path="/analytics" />
        <button
          onClick={() => navigate(`/profile/${myId}`)}
          className="px-4 py-2 bg-white hover:bg-gray-300 text-black border rounded hover:opacity-90"
        >
          My Profile
        </button>

        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="px-4 py-2 border rounded bg-red-500 hover:bg-red-600 text-white"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
