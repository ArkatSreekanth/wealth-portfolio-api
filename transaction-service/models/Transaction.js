const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  investmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Investment",
    required: true
  },
  type: {
    type: String,
    enum: ["BUY", "SELL"],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  note: {
    type: String
  }
});

module.exports = mongoose.model("Transaction", transactionSchema);
