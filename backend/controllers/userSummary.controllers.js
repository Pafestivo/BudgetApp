const db = require("../config/db");

// @GET /api/user/currentBalance
// @desc get the user's current balance
const getUserBalance = async (req, res) => {
  try {
    const userId = 1; // Hardcoded as there is no authentication implemented

    // Get the user balance
    const response = await db.query(`SELECT balance FROM user WHERE id = ?`, [
      userId,
    ]);

    res.status(200).json({
      success: true,
      data: response[0][0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @GET /api/user/monthlyIncomes
// @desc get total monthly incomes for user
// @requiredBody: requestedMonth(number between 1-12)
const getUserMonthlyIncomes = async (req, res) => {
  try {
    const { requestedMonth } = req.body;
    const userId = 1; // Hardcoded as there is no authentication implemented

    // Get the user total income in specific month
    const response = await db.query(
      `SELECT SUM(amount) AS totalIncome
      FROM transactions
      WHERE type = 'income'
      AND MONTH(date) = ?
      AND YEAR(date) = YEAR(CURRENT_DATE())
      AND userId = ?;`,
      [requestedMonth, userId]
    );

    res.status(200).json({
      success: true,
      data: response[0][0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @GET /api/user/monthlyExpenses
// @desc get total monthly expenses for user
// @requiredBody: requestedMonth(number between 1-12)
const getUserMonthlyExpenses = async (req, res) => {
  try {
    const { requestedMonth } = req.body;
    const userId = 1; // Hardcoded as there is no authentication implemented

    // Get the user total expenses in specific month
    const response = await db.query(
      `SELECT SUM(amount) AS totalExpense
      FROM transactions
      WHERE type = 'expense'
      AND MONTH(date) = ?
      AND YEAR(date) = YEAR(CURRENT_DATE())
      AND userId = ?;`,
      [requestedMonth, userId]
    );

    res.status(200).json({
      success: true,
      data: response[0][0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserMonthlyIncomes,
  getUserMonthlyExpenses,
  getUserBalance,
};
