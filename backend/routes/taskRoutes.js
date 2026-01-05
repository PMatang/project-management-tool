const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

router.post("/", auth, admin, createTask);
router.get("/", auth, getTasks);
router.patch("/:id", auth, admin, updateTask);
router.delete("/:id", auth, admin, deleteTask);

module.exports = router;
