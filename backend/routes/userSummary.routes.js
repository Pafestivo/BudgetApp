const express = require("express");
const {
  getUserMonthlyIncomes,
  getUserMonthlyExpenses,
  getUserBalance,
} = require("../controllers/userSummary.controllers");
const userSummary = express.Router();

userSummary.get("/user/currentBalance", getUserBalance);
userSummary.get("/user/monthlyIncomes", getUserMonthlyIncomes);
userSummary.get("/user/monthlyExpenses", getUserMonthlyExpenses);

module.exports = userSummary;
