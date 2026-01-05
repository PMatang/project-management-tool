import OverdueBadge from "./OverdueBadge";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const role = localStorage.getItem("role");

  const isOverdue =
    task.status !== "done" &&
    task.dueDate &&
    new Date(task.dueDate) < new Date();

  return (
    <div
  className={`p-4 rounded shadow mb-2 border
    transition-all duration-300 ease-in-out
    bg-white sm:p-4
    
    text-sm sm:text-base
    ${isOverdue ? "border-red-500 bg-red-50" : "bg-white"}
  `}
>

      {/* Title + Overdue */}
      <h3 className="font-semibold flex items-center gap-2">
        {task.title}
        {isOverdue && <OverdueBadge />}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-1">
        {task.description}
      </p>

      {/* Assigned Members */}
      {task.assignedTo?.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {task.assignedTo.map(user => (
            <span
              key={user._id}
              className="text-xs bg-gray-200 px-2 py-1 rounded"
            >
              {user.name}
            </span>
          ))}
        </div>
      )}

      {/* Admin Actions */}
      {role === "admin" && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onEdit?.(task)}
            className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete?.(task._id)}
            className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
