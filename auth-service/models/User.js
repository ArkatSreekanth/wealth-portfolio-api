const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'user' },
  preferences: {
    currency: { type: String, default: 'INR' },
    darkMode: { type: Boolean, default: false }
  },
  lastLogin: Date
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
