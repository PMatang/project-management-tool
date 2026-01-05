import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const MemberProgressChart = ({ tasks }) => {
  const completed = tasks.filter(t => t.status === "done").length;
  const progress = tasks.filter(t => t.status === "in-progress").length;
  const todo = tasks.filter(t => t.status === "todo").length;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Progress Overview</h2>

      <Doughnut
        data={{
          labels: ["Completed", "In Progress", "To Do"],
          datasets: [
            {
              data: [completed, progress, todo],
              backgroundColor: ["#22c55e", "#facc15", "#e5e7eb"]
            }
          ]
        }}
      />
    </div>
  );
};

export default MemberProgressChart;
