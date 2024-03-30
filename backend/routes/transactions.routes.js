const express = require("express");
const {
  createTransaction,
  getTransactions,
  putTransaction,
} = require("../controllers/transactions.controllers");
const transactionsRouter = express.Router();

transactionsRouter.post("/transaction", createTransaction);
transactionsRouter.get("/transaction", getTransactions);
transactionsRouter.put("/transaction", putTransaction);

module.exports = transactionsRouter;
