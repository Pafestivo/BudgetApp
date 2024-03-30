import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalIncome: 0,
  totalExpenses: 0,
  remainingBalance: 0,
};

const budgetOverviewSlice = createSlice({
  name: "budgetOverview",
  initialState,
  reducers: {
    incrementTotalIncome: (state, action) => {
      state.totalIncome += action.payload;
      state.remainingBalance += action.payload;
    },
    decrementTotalIncome: (state, action) => {
      state.totalIncome -= action.payload;
      state.remainingBalance -= action.payload;
    },
    incrementTotalExpenses: (state, action) => {
      state.totalExpenses += action.payload;
      state.remainingBalance -= action.payload;
    },
    decrementTotalExpenses: (state, action) => {
      state.totalExpenses -= action.payload;
      state.remainingBalance += action.payload;
    },
  },
});

export const {
  incrementTotalIncome,
  decrementTotalIncome,
  incrementTotalExpenses,
  decrementTotalExpenses,
} = budgetOverviewSlice.actions;
export default budgetOverviewSlice.reducer;
