require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

// DB connection
const connectDB = require("./config/db");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
const user = require("./routes/user");
const foodItem = require("./routes/foodItem");
const order = require("./routes/order");
const payments = require("./routes/payments");
const webhooks = require("./routes/webhooks");
const menuRoutes = require("./routes/menuRoutes");

app.use("/api/users", user);
app.use("/api/foodItems", foodItem);
app.use("/api/orders", order);
app.use("/api/payments", payments);
app.use("/webhooks", webhooks);
app.use("/api/menu", menuRoutes);


app.get("/", (req, res) => {
  res.json({ message: "API is working on Vercel" });
});


// DB connect
connectDB();

module.exports = app;
