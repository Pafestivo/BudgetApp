const db = require("../config/db");
const getPaginationMetadata = require("../utils/getPaginationMetadata");

// @POST /api/transactions
// @desc post new transaction
// @requiredBody: name, amount, date
const createTransaction = async (req, res) => {
  let connection;

  try {
    const { name, amount, date } = req.body;
    const userId = 1; // Hardcoded as there is no authentication implemented
    const type = amount < 0 ? "expense" : "income"; // infer type from amount

    // Validation
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!amount) return res.status(400).json({ message: "Amount is required" });
    if (!date) return res.status(400).json({ message: "Date is required" });

    // manually get a connection to execute multiple queries in a transaction
    // this is necessary because the db.query method does not support transactions
    connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      // Insert the transaction into the database
      const response = await connection.query(
        `INSERT INTO transactions (userId, name, amount, type, date) VALUES (?,?,?,?,?)`,
        [userId, name, amount, type, date]
      );

      // Update the user balance based on the transaction
      await connection.query(
        `UPDATE user SET balance = balance + ? WHERE id = ?`,
        [amount, userId]
      );

      // Commit the transaction if both queries succeed
      await connection.commit();

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
      // rollback the transaction if any of the queries fail
      await connection.rollback();
      res.status(500).json({ message: error.message });
    } finally {
      // manually release the connection
      connection.release();
    }
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
    const userId = 1; // Hardcoded as there is no authentication implemented
    const type = amount < 0 ? "expense" : "income"; // infer type from amount

    // Validation
    if (!id) return res.status(400).json({ message: "Id is required" });
    if (!name && !amount && !date)
      return res.status(400).json({ message: "No data received for update" });

    // manually get a connection to execute multiple queries in a transaction
    connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      // get the old transaction data to update the user balance
      const [oldTransaction] = await db.query(
        `SELECT amount FROM transactions WHERE id = ?`,
        [id]
      );
      if (oldTransaction.length === 0) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      const oldAmount = oldTransaction[0].amount;

      // Update the transaction in the database
      const response = await db.query(
        `UPDATE transactions SET name = ?, amount = ?, type = ?, date = ? WHERE id = ?`,
        [name, amount, type, date, id]
      );
      if (response[0].affectedRows === 0) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      // Update the user balance based on the transaction
      const balanceChange = amount - oldAmount;
      await connection.query(
        `UPDATE user SET balance = balance + ? WHERE id = ?`,
        [balanceChange, userId]
      );

      // Commit the transaction if both queries succeed
      await connection.commit();

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
      await connection.rollback();
      res.status(500).json({ message: error.message });
    } finally {
      connection.release();
    }
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

// @GET /api/transactions/:id
// @desc get single transaction
// @requiredParams: id
const getSingleTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "Id is required" });

    const response = await db.query(`SELECT * FROM transactions WHERE id = ?`, [
      id,
    ]);

    if (response[0].length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      success: true,
      data: response[0][0],
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
    const userId = 1; // Hardcoded as there is no authentication implemented

    // Validation
    if (!id) return res.status(400).json({ message: "Id is required" });

    connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      // get the old transaction data to update the user balance
      const [oldTransaction] = await db.query(
        `SELECT amount FROM transactions WHERE id = ?`,
        [id]
      );
      if (oldTransaction.length === 0) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      const transactionAmount = oldTransaction[0].amount;

      // Delete the transaction from the database
      const response = await db.query(`DELETE FROM transactions WHERE id = ?`, [
        id,
      ]);
      if (response[0].affectedRows === 0) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      // Update the user balance based on the transaction
      await connection.query(
        `UPDATE user SET balance = balance - ? WHERE id = ?`,
        [transactionAmount, userId]
      );

      // Commit the transaction if both queries succeed
      await connection.commit();

      res.status(200).json({
        success: true,
        message: "Transaction deleted",
      });
    } catch (error) {
      await connection.rollback();
      res.status(500).json({ message: error.message });
    } finally {
      connection.release();
    }
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
  getSingleTransaction,
};
