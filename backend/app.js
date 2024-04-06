const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

// Routers
const transactionsRouter = require("./routes/transactions.routes");
const userSummary = require("./routes/userSummary.routes");

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors()); // usually, i would specify the origin, but for this project, i will leave it open

// Routes
app.use("/api", transactionsRouter);
app.use("/api", userSummary);

module.exports = app;
