const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    // 🔥 RETURN ALL USERS (admins + members)
    const users = await User.find({}, "name email role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};


exports.removeUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User removed" });
};

exports.addMember = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({
        message: "User with this email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "member"
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to add member" });
  }
};
