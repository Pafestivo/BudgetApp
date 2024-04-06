const express = require("express");
const morgan = require("morgan");
const app = express();

// Routers
const transactionsRouter = require("./routes/transactions.routes");
const userSummary = require("./routes/userSummary.routes");

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api", transactionsRouter);
app.use("/api", userSummary);

module.exports = app;
