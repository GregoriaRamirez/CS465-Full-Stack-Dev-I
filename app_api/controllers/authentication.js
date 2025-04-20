const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user');

// Controller to handle user registration
const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: "All fields required" });
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: ''
  });

  user.setPassword(req.body.password);
  const q = await user.save();

  if (!q) {
    return res
      .status(400)
      .json({ message: "Error saving user" });
  } else {
    const token = user.generateJWT();
    return res
      .status(200)
      .json({ token });
  }
};

// Controller to handle user login
const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Email and password required" });
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !user.validPassword(req.body.password)) {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    const token = user.generateJWT();
    return res
      .status(200)
      .json({ token });

  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err });
  }
};

module.exports = {
  register,
  login
};
