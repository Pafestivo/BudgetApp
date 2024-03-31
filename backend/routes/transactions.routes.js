const express = require("express");
const {
  createTransaction,
  putTransaction,
  getPaginatedTransactions,
  getPaginatedExpenses,
  getPaginatedIncomes,
} = require("../controllers/transactions.controllers");
const transactionsRouter = express.Router();

transactionsRouter.post("/transactions", createTransaction);
transactionsRouter.get("/transactions", getPaginatedTransactions);
transactionsRouter.get("/transactions/expenses", getPaginatedExpenses);
transactionsRouter.get("/transactions/incomes", getPaginatedIncomes);
transactionsRouter.put("/transactions", putTransaction);

module.exports = transactionsRouter;
