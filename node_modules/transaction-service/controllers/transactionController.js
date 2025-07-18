const Transaction = require("../models/Transaction");

const addTransaction = async (req, res) => {
  try {
    const transaction = new Transaction({
      ...req.body,
      userId: req.user.userId
    });
    const saved = await transaction.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ msg: "Failed to add transaction", error: err.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const { investmentId, type, startDate, endDate, page = 1, limit = 10 } = req.query;

    const filter = {
      userId: req.user.userId
    };

    if (investmentId) {
      filter.investmentId = investmentId;
    }

    if (type) {
      filter.type = type.toUpperCase();
    }

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [transactions, total] = await Promise.all([
      Transaction.find(filter)
        .sort({ date: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Transaction.countDocuments(filter)
    ]);

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      transactions
    });
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch transactions", error: err.message });
  }
};


module.exports = { addTransaction, getTransactions };
