// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require("./routes"); 

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// All routes go under /api
app.use('/api', routes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(3001, () => console.log('Auth service running on port 3001'));
  })
  .catch((err) => console.error(err));
