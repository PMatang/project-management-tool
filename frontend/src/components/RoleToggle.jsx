import api from "../api/axios";

const RoleToggle = ({ member, refresh }) => {
  // 🔑 Get logged-in user id from token
  const myId = JSON.parse(
    atob(localStorage.getItem("token").split(".")[1])
  ).id;

  const isSelf = myId === member._id;

  const toggleRole = async () => {
    if (isSelf) return; // extra safety

    try {
      const newRole = member.role === "admin" ? "member" : "admin";
      await api.patch(`/users/${member._id}/role`, { role: newRole });
      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Role update failed");
    }
  };

  return (
    <button
      onClick={toggleRole}
      disabled={isSelf}
      className={`px-3 py-1 text-sm rounded transition
        ${
          isSelf
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-600 text-white hover:bg-gray-800"
        }
      `}
      title={isSelf ? "You cannot change your own role" : ""}
    >
      {member.role === "admin" ? "Demote" : "Promote"}
    </button>
  );
};

export default RoleToggle;
