const express = require("express");
const router = express.Router();
const { addInvestment, getInvestments, getInvestmentById} = require("../controllers/investmentControllers");
const { verifyToken } = require("../../common/middleware/authMiddleware");

router.post("/investments", verifyToken, addInvestment);
router.get("/investments", verifyToken, getInvestments);
router.get("/investments/:id", verifyToken, getInvestmentById);

module.exports = router;

