const GanttTimeline = ({ tasks }) => {
  return (
    <div className="space-y-2">
      {tasks.map(task => (
        <div key={task._id}>
          <p className="text-sm">{task.title}</p>
          <div className="bg-gray-600 h-3 rounded">
            <div className="bg-primary h-3 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GanttTimeline;
