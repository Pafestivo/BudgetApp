const db = require("../config/db");
const getPaginationMetadata = require("../utils/getPaginationMetadata");

// @POST /api/transactions
// @desc post new transaction
// @requiredBody: name, amount, date
const createTransaction = async (req, res) => {
  try {
    const { name, amount, date } = req.body;
    const userId = 1; // Hardcoded as there is no authentication implemented
    const type = amount < 0 ? "expense" : "income"; // infer type from amount

    // Validation
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!amount) return res.status(400).json({ message: "Amount is required" });
    if (!date) return res.status(400).json({ message: "Date is required" });

    // Insert the transaction into the database
    const response = await db.query(
      `INSERT INTO transactions (userId, name, amount, type, date) VALUES (?,?,?,?,?)`,
      [userId, name, amount, type, date]
    );

    res.status(201).json({
      success: true,
      message: "Transaction created",
      data: {
        id: response[0].insertId,
        userId,
        name,
        amount,
        type,
        date,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @PUT /api/transactions
// @desc update transaction
// @requiredBody: id
// @optionalBody: name, amount, date
const putTransaction = async (req, res) => {
  try {
    const { id, name, amount, date } = req.body;
    const type = amount < 0 ? "expense" : "income"; // infer type from amount

    // Validation
    if (!id) return res.status(400).json({ message: "Id is required" });
    if (!name && !amount && !date)
      return res.status(400).json({ message: "No data received for update" });

    // Update the transaction in the database
    const response = await db.query(
      `UPDATE transactions SET name = ?, amount = ?, type = ?, date = ? WHERE id = ?`,
      [name, amount, type, date, id]
    );

    if (response[0].affectedRows === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      success: true,
      message: "Transaction updated",
      data: {
        id,
        name,
        amount,
        type,
        date,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @GET /api/transactions
// @desc get paginated transactions data
// @optionalQuery: page, limit
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
      success: true,
      data: response[0],
      paginationData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @GET /api/transactions/expenses
// @desc get paginated expenses data
// @optionalQuery: page, limit
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
      success: true,
      data: response[0],
      paginationData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @GET /api/transactions/incomes
// @desc get paginated incomes data
// @optionalQuery: page, limit
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
      success: true,
      data: response[0],
      paginationData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @DELETE /api/transactions/:id
// @desc delete a transaction
// @requiredParams: id
const deleteTransaction = async (req, res) => {
  try {
    const id = req.params.id;

    // Validation
    if (!id) return res.status(400).json({ message: "Id is required" });

    const response = await db.query(`DELETE FROM transactions WHERE id = ?`, [
      id,
    ]);

    if (response[0].affectedRows === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      success: true,
      message: "Transaction deleted",
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
  deleteTransaction,
};
