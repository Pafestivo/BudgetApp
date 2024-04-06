const express = require("express");
const {
  getUserMonthlyIncomes,
  getUserMonthlyExpenses,
  getUserBalance,
} = require("../controllers/userSummary.controllers");
const userSummary = express.Router();

userSummary.get("/user/currentBalance", getUserBalance);
userSummary.get("/user/monthlyIncomes/:requestedMonth", getUserMonthlyIncomes);
userSummary.get(
  "/user/monthlyExpenses/:requestedMonth",
  getUserMonthlyExpenses
);

module.exports = userSummary;
