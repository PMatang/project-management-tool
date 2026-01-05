const ProfileTaskCard = ({ task }) => {
  const statusColor = {
    todo: "bg-gray-200",
    "in-progress": "bg-yellow-200",
    done: "bg-green-200"
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <div className="flex justify-between">
        <h3 className="font-semibold">{task.title}</h3>
        <span
          className={`text-xs px-2 py-1 rounded ${statusColor[task.status]}`}
        >
          {task.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 mt-1">{task.description}</p>

      <p className="text-xs text-gray-500 mt-2">
        Due: {task.dueDate ? task.dueDate.substring(0, 10) : "Select Date"}
      </p>
    </div>
  );
};

export default ProfileTaskCard;
