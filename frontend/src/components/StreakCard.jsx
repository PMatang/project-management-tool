import { useEffect, useState } from "react";

const StreakCard = ({ tasks }) => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const today = new Date().toDateString();

    const completedToday = tasks.some(
      t =>
        t.status === "done" &&
        t.updatedAt &&
        new Date(t.updatedAt).toDateString() === today
    );

    let storedStreak = Number(localStorage.getItem("streak")) || 0;
    const lastDate = localStorage.getItem("lastDate");

    if (completedToday && lastDate !== today) {
      storedStreak += 1;
      localStorage.setItem("streak", storedStreak);
      localStorage.setItem("lastDate", today);
    }

    setStreak(storedStreak);
  }, [tasks]);

  return (
    <div className="bg-orange-100 p-4 rounded-xl shadow text-center">
      <p className="text-sm text-gray-600">🔥 Daily Streak</p>
      <p className="text-3xl font-bold text-orange-600">
        {streak} days
      </p>
    </div>
  );
};

export default StreakCard;
