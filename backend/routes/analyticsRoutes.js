const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const { dashboardStats } = require("../controllers/analyticsController");

router.get("/", auth, admin, dashboardStats);

module.exports = router;
