import api from "../api/axios";
import TaskCard from "./TaskCard";

const KanbanBoard = ({ tasks, setTasks }) => {
  const columns = ["todo", "in-progress", "done"];

  const onDrop = async (e, newStatus) => {
    const id = e.dataTransfer.getData("id");

    setTasks(prev =>
      prev.map(task =>
        task._id === id ? { ...task, status: newStatus } : task
      )
    );

    try {
      await api.patch(`/tasks/${id}`, { status: newStatus });
    } catch {
      console.error("Update failed");
    }
  };

  return (
    <div className="overflow-x-auto">
      <div
        className="
          min-w-[320px] sm:min-w-full
          grid gap-4
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
        "
      >
        {columns.map(col => (
          <div
            key={col}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, col)}
            className="bg-gray-400 p-4 rounded min-h-300px flex flex-col"
          >
            <h2 className="font-bold capitalize mb-2 text-base sm:text-lg">
              {col.replace("-", " ")}
            </h2>

            {tasks
              .filter(task => task.status === col)
              .map(task => (
                <div
                  key={task._id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("id", task._id);
                    e.currentTarget.style.opacity = "0.5";
                  }}
                  onDragEnd={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  <TaskCard task={task} />
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
