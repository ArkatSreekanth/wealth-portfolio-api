const Investment = require("../models/Investment");

const addInvestment = async (req, res) => {
  const { type, name, amountInvested, currentValue } = req.body;

  try {
    const newInvestment = new Investment({
      userId: req.user.userId,
      type,
      name,
      amountInvested,
      currentValue
    });

    await newInvestment.save();
    res.status(201).json(newInvestment);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const getInvestments = async (req, res) => {
  try {
    const investments = await Investment.find({ userId: req.user.userId });
    res.status(200).json(investments);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const getInvestmentById = async (req, res) => {
  try {
    const investment = await Investment.findOne({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!investment) {
      return res.status(404).json({ msg: "Investment not found" });
    }

    res.json(investment);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

module.exports = {
  addInvestment,
  getInvestments,
  getInvestmentById
};
