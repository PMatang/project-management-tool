const TaskStatusCards = ({ tasks }) => {
  const total = tasks.length;
  const done = tasks.filter(t => t.status === "done").length;
  const progress = tasks.filter(t => t.status === "in-progress").length;
  const todo = tasks.filter(t => t.status === "todo").length;

  const Card = ({ title, value, color }) => (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card title="Total Tasks" value={total} color="text-gray-800" />
      <Card title="Completed" value={done} color="text-green-600" />
      <Card title="In Progress" value={progress} color="text-yellow-500" />
      <Card title="To Do" value={todo} color="text-gray-400" />
    </div>
  );
};

export default TaskStatusCards;
