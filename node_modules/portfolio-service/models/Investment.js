const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  type: {
    type: String,
    enum: ["Stock", "Crypto", "Mutual Fund", "Other"],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  amountInvested: {
    type: Number,
    required: true
  },
  currentValue: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Investment", investmentSchema);
