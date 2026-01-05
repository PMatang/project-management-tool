const daysBetween = (start, end) =>
  Math.max(
    1,
    Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24))
  );

const GanttChart = ({ tasks }) => {
  const startDate = new Date();

  return (
    <div className="space-y-3">
      {tasks.map(task => {
        if (!task.dueDate) return null;

        const duration = daysBetween(startDate, task.dueDate);

        return (
          <div key={task._id}>
            <p className="text-sm font-medium">{task.title}</p>
            <div className="bg-gray-200 h-4 rounded relative">
              <div
                className="bg-primary h-4 rounded"
                style={{ width: `${Math.min(duration * 10, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500">
              Assigned to:{" "}
              {task.assignedTo.map(u => u.name).join(", ")}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default GanttChart;
