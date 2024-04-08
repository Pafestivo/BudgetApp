const express = require("express");
const {
  createTransaction,
  putTransaction,
  getPaginatedTransactions,
  getPaginatedExpenses,
  getPaginatedIncomes,
  deleteTransaction,
  getSingleTransaction,
} = require("../controllers/transactions.controllers");
const transactionsRouter = express.Router();

transactionsRouter.post("/transactions", createTransaction);
transactionsRouter.get("/transactions", getPaginatedTransactions);
transactionsRouter.get("/transactions/expenses", getPaginatedExpenses);
transactionsRouter.get("/transactions/incomes", getPaginatedIncomes);
transactionsRouter.get("/transactions/:id", getSingleTransaction);
transactionsRouter.put("/transactions", putTransaction);
transactionsRouter.delete("/transactions/:id", deleteTransaction);

module.exports = transactionsRouter;
