const express = require("express");
const router = express.Router();
const { addTransaction, getTransactions } = require("../controllers/transactionController");
const { verifyToken } = require("../../common/middleware/authMiddleware");

router.post("/transactions", verifyToken, addTransaction);
router.get("/transactions", verifyToken, getTransactions);

module.exports = router;
