const express = require("express");
const router = express.Router();
const verifyToken = require("../../common/middleware/authMiddleware");

router.get("/me", verifyToken, (req, res) => {
  res.status(200).json({
    msg: "This is a protected route",
    userId: req.user.userId,
  });
});

module.exports = router;
