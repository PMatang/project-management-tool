import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const MemberNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const role = localStorage.getItem("role");

  const goHome = () => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/member");
    }
  };

  // Logged-in user id from JWT
  const myId = JSON.parse(
    atob(localStorage.getItem("token").split(".")[1])
  ).id;

  return (
    <nav className="bg-white shadow px-4 sm:px-6 py-3 flex justify-between">
      {/* Left */}
      <h1
        onClick={goHome}
        className="font-bold text-lg cursor-pointer"
      >
        Project Manager
      </h1>

      {/* Right */}
      <div className="flex gap-2 sm:gap-4">
        <button
          onClick={() => navigate(`/profile/${myId}`)}
          className="px-4 py-2 bg-white hover:bg-gray-300 text-black border rounded hover:opacity-90 text-xs sm:text-sm"
        >
          My Profile
        </button>

        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="px-4 py-2 border rounded text-white bg-red-500 hover:bg-red-600 text-xs sm:text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default MemberNavbar;
