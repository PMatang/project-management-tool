const Task = require("../models/Task");

// CREATE
exports.createTask = async (req, res) => {
  try {
    const data = { ...req.body };

    if (!data.assignedTo) {
      delete data.assignedTo;
    }

    const task = await Task.create(data);
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// READ
exports.getTasks = async (req, res) => {
  const tasks =
    req.user.role === "admin"
      ? await Task.find().populate("assignedTo", "name")
      : await Task.find({ assignedTo: req.user.id });

  res.json(tasks);
};

// UPDATE (THIS WAS MISSING OR NOT EXPORTED)
exports.updateTask = async (req, res) => {
  try {
    const data = { ...req.body };

    if (!data.assignedTo) {
      delete data.assignedTo;
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};

exports.getTasks = async (req, res) => {
  const tasks =
    req.user.role === "admin"
      ? await Task.find().populate("assignedTo", "name email")
      : await Task.find({ assignedTo: req.user.id });

  res.json(tasks);
};

