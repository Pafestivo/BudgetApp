import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
};

const fetchedTransactionsSlice = createSlice({
  name: "fetchedTransactions",
  initialState,
  reducers: {
    addTransactions: (state, action) => {
      const newTransactions = action.payload.filter(
        (transaction) =>
          !state.transactions.some((t) => t.id === transaction.id)
      );
      return {
        ...state,
        transactions: [...state.transactions, ...newTransactions],
      };
    },
    removeTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload
      );
    },
    updateTransaction: (state, action) => {
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload.id
      );
      if (index !== -1) {
        return {
          ...state,
          transactions: [
            ...state.transactions.slice(0, index),
            action.payload,
            ...state.transactions.slice(index + 1),
          ],
        };
      }
      return state;
    },
  },
});

export const { addTransactions, removeTransaction, updateTransaction } =
  fetchedTransactionsSlice.actions;
export default fetchedTransactionsSlice.reducer;
