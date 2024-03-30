const db = require("../config/db");

const createTransaction = async (req, res) => {
  res.status(200).json({ message: "createTransaction" });
};

const putTransaction = async (req, res) => {
  res.status(200).json({ message: "putTransaction" });
};

const getTransactions = async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM transactions");
    res.status(200).json(response[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  putTransaction,
};
