const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');  //Remove if not neccessary
const User = require('../models/User');
const { generateToken } = require("../../common/utils/jwt");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: 'User already exists' });

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, passwordHash: hash });
    await user.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Error registering user', error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

    const token = generateToken(user._id);
    user.lastLogin = new Date();
    await user.save();

    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: 'Login failed', error: err.message });
  }
};

module.exports = { register, login };