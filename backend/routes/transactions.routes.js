const express = require("express");
const {
  createTransaction,
  putTransaction,
  getPaginatedTransactions,
  getPaginatedExpenses,
  getPaginatedIncomes,
} = require("../controllers/transactions.controllers");
const transactionsRouter = express.Router();

transactionsRouter.post("/transaction", createTransaction);
transactionsRouter.get("/transaction", getPaginatedTransactions);
transactionsRouter.get("/transaction/expenses", getPaginatedExpenses);
transactionsRouter.get("/transaction/incomes", getPaginatedIncomes);
transactionsRouter.put("/transaction", putTransaction);

module.exports = transactionsRouter;
