const Task = require("../models/Task");

exports.dashboardStats = async (req, res) => {
  const total = await Task.countDocuments();
  const done = await Task.countDocuments({ status: "done" });
  const pending = total - done;

  res.json({ total, done, pending });
};
