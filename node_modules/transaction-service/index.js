const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const transactionRoutes = require("./routes/transactionRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", transactionRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected - Transaction Service");
    app.listen(3003, () => console.log("Transaction Service running on port 3003"));
  })
  .catch((err) => console.error("MongoDB Error:", err));
