const express = require("express");
const router = express.Router();
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({
      name: name.trim(),
      email: email.trim(),
      password: password.trim()
    });

    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.trim() });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password.trim()) {
      return res.status(400).json({ message: "Wrong password" });
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;