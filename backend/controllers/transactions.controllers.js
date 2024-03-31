const db = require("../config/db");
const getPaginationMetadata = require("../utils/getPaginationMetadata");

const createTransaction = async (req, res) => {
  res.status(200).json({ message: "createTransaction" });
};

const putTransaction = async (req, res) => {
  res.status(200).json({ message: "putTransaction" });
};

// @GET /api/transactions
// @desc get paginated transactions data
// @requiredParams: none
// @optionalParams: page, limit
const getPaginatedTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Requested page
    const limit = parseInt(req.query.limit) || 5; // Maximum entries per page
    const offset = (page - 1) * limit; // Offset to get the correct results

    // Query the database with pagination
    const response = await db.query(
      `SELECT * FROM transactions ORDER BY date DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    const paginationData = await getPaginationMetadata(
      page,
      limit,
      "transactions"
    );

    res.status(200).json({
      data: response[0],
      paginationData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @GET /api/transactions/expenses
// @desc get paginated expenses data
// @requiredParams: none
// @optionalParams: page, limit
const getPaginatedExpenses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Requested page
    const limit = parseInt(req.query.limit) || 5; // Maximum entries per page
    const offset = (page - 1) * limit; // Offset to get the correct results

    // Query the database with pagination
    const response = await db.query(
      `SELECT * FROM transactions WHERE type = ? ORDER BY date DESC LIMIT ? OFFSET ?`,
      ["expense", limit, offset]
    );

    const paginationData = await getPaginationMetadata(
      page,
      limit,
      "transactions",
      "type = 'expense'"
    );

    res.status(200).json({
      data: response[0],
      paginationData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @GET /api/transactions/incomes
// @desc get paginated incomes data
// @requiredParams: none
// @optionalParams: page, limit
const getPaginatedIncomes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Requested page
    const limit = parseInt(req.query.limit) || 5; // Maximum entries per page
    const offset = (page - 1) * limit; // Offset to get the correct results

    // Query the database with pagination
    const response = await db.query(
      `SELECT * FROM transactions WHERE type = ? ORDER BY date DESC LIMIT ? OFFSET ?`,
      ["income", limit, offset]
    );

    const paginationData = await getPaginationMetadata(
      page,
      limit,
      "transactions",
      "type = 'income'"
    );

    res.status(200).json({
      data: response[0],
      paginationData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTransaction,
  getPaginatedTransactions,
  getPaginatedExpenses,
  getPaginatedIncomes,
  putTransaction,
};
