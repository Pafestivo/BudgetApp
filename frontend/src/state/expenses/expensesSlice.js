import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expensesList: [],
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expensesList.push(action.payload);
    },
    editExpense: (state, action) => {
      const { id, name, amount, date } = action.payload;
      const expense = state.expensesList.find((expense) => expense.id === id);
      if (expense) {
        expense.name = name;
        expense.amount = amount;
        expense.date = date;
      }
    },
    deleteExpense: (state, action) => {
      const { id } = action.payload;
      state.expensesList = state.expensesList.filter(
        (expense) => expense.id !== id
      );
    },
  },
});

export const { addExpense, editExpense, deleteExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
