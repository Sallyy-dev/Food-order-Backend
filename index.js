
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); 
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


app.set('view engine', 'ejs');


// const seedInitialData = require("./seeds/seedData");
const connectDB = require("./config/db");

const user = require("./routes/user");
const foodItem = require("./routes/foodItem");
const order = require("./routes/order");
const payments = require("./routes/payments");
const webhooks = require("./routes/webhooks");
const menuRoutes = require("./routes/menuRoutes");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/users', user);
app.use('/api/foodItems', foodItem);
app.use('/api/orders', order);
app.use('/api/payments', payments);
app.use('/webhooks', webhooks);
app.use('/api/menu', menuRoutes);


connectDB().then(() => {
  // seedInitialData();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});


app.use(express.static(path.join(__dirname, "build")));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
