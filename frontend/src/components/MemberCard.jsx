import { useNavigate } from "react-router-dom";
import RoleToggle from "./RoleToggle";

const MemberCard = ({ member, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{member.name}</h3>
        <p className="text-sm text-gray-500">{member.email}</p>
        <span className="text-xs bg-gray-200 px-2 py-1 rounded">
          {member.role}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => navigate(`/profile/${member._id}`)}
          className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          View
        </button>

        <button
          onClick={() => onDelete(member._id)}
          className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Remove
        </button>

        <RoleToggle member={member} refresh={() => window.location.reload()} />
      </div>
    </div>
  );
};

export default MemberCard;
