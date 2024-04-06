import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const budgetOverviewSlice = createSlice({
  name: "budgetOverview",
  initialState,
  reducers: {
    initiateBudgetOverview: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
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
  initiateBudgetOverview,
  incrementTotalIncome,
  decrementTotalIncome,
  incrementTotalExpenses,
  decrementTotalExpenses,
} = budgetOverviewSlice.actions;
export default budgetOverviewSlice.reducer;
