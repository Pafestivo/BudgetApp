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
      if (state === null) return;
      state.totalIncome += action.payload;
      state.remainingBalance += action.payload;
    },
    decrementTotalIncome: (state, action) => {
      if (state === null) return;
      state.totalIncome -= action.payload;
      state.remainingBalance -= action.payload;
    },
    incrementTotalExpenses: (state, action) => {
      if (state === null) return;
      console.log(state.totalExpenses, action.payload);
      state.totalExpenses -= action.payload;
      state.remainingBalance -= action.payload;
    },
    decrementTotalExpenses: (state, action) => {
      if (state === null) return;
      console.log(state.totalExpenses, action.payload);
      state.totalExpenses += action.payload;
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
