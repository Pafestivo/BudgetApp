const express = require("express");
const morgan = require("morgan");
const app = express();

// Routers
const transactionsRouter = require("./routes/transactions.routes");

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api", transactionsRouter);

module.exports = app;
