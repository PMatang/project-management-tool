const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/userController");


// ✅ IMPORTS MUST BE AT TOP
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const User = require("../models/User"); // ✅ THIS WAS MISSING OR NOT LOADED





// ==============================
// GET own profile (MEMBER + ADMIN)
// ==============================
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




// 1️⃣ ROLE ROUTE FIRST
router.patch("/:id/role", auth, admin, async (req, res) => {
  console.log("ROLE ROUTE HIT", req.params.id, req.body);

  const { role } = req.body;

  if (!["admin", "member"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  if (role === "member") {
    const adminCount = await User.countDocuments({ role: "admin" });
    if (adminCount <= 1) {
      return res.status(400).json({
        message: "At least one admin is required"
      });
    }
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  );

  return res.json(user);
});


// ==============================
// GET member by ID (ADMIN)
// ==============================
router.get("/:id", auth, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/", auth, admin, getAllUsers);

// ==============================
// DELETE member (ADMIN)
// ==============================
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==============================
// UPDATE member info (ADMIN)
// ==============================
router.patch("/:id", auth, admin, async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




module.exports = router;
