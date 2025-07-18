// index.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const investmentRoutes = require("./routes/investmentRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", investmentRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Portfolio service connected to MongoDB");
    app.listen(3002, () => console.log("Portfolio service running on port 3002"));
  })
  .catch((err) => console.error(err));
