import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const MemberPerformanceChart = ({ users, tasks }) => {
  const labels = users.map(u => u.name);

  const completed = users.map(
    u =>
      tasks.filter(
        t =>
          t.status === "done" &&
          t.assignedTo.some(a => a._id === u._id)
      ).length
  );

  const pending = users.map(
    u =>
      tasks.filter(
        t =>
          t.status !== "done" &&
          t.assignedTo.some(a => a._id === u._id)
      ).length
  );

  return (
    <Bar
      data={{
        labels,
        datasets: [
          { label: "Completed", data: completed },
          { label: "Pending", data: pending }
        ]
      }}
    />
  );
};

export default MemberPerformanceChart;
