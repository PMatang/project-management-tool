const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ["todo", "in-progress", "done"],
    default: "todo"
  },

  // 👇 MULTIPLE MEMBERS
  assignedTo: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ],

  comments: [
    {
      user: String,
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],

  dueDate: Date
});

module.exports = mongoose.model("Task", taskSchema);
