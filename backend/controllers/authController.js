const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // 2️⃣ Check duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Account already exists with this email"
      });
    }

    // 3️⃣ Determine role (FIRST USER = ADMIN)
    const userCount = await User.countDocuments();
    const role = userCount === 0 ? "admin" : "member";

    // 4️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    // 6️⃣ Response
    res.status(201).json({
      message:
        role === "admin"
          ? "Admin account created successfully"
          : "Account created successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Registration failed"
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({
      message: "Login failed"
    });
  }
};

// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       // Do NOT reveal user existence
//       return res.json({
//         message: "If the email exists, a reset link has been sent"
//       });
//     }

//     // Generate token
//     const resetToken = crypto.randomBytes(32).toString("hex");

//     // Hash token for DB
//     const hashedToken = crypto
//       .createHash("sha256")
//       .update(resetToken)
//       .digest("hex");

//     user.resetPasswordToken = hashedToken;
//     user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min
//     await user.save();

//     // Reset link (email-ready)
//     const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

//     // TEMP: log instead of email
//     console.log("RESET LINK:", resetUrl);

//     res.json({
//       message: "If the email exists, a reset link has been sent"
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Forgot password failed" });
//   }
// };

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      // 🔒 Security: don't reveal user existence
      return res.json({
        message: "If the email exists, a reset link has been sent"
      });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const message = `
      <h2>Password Reset</h2>
      <p>You requested a password reset.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}" target="_blank">${resetUrl}</a>
      <p>This link will expire in 15 minutes.</p>
      <br/>
      <p>If you did not request this, please ignore this email.</p>
    `;

    await sendEmail({
      to: user.email,
      subject: "Reset your password",
      html: message
    });

    res.json({
      message: "If the email exists, a reset link has been sent"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Email could not be sent"
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token"
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Reset password failed" });
  }
};
