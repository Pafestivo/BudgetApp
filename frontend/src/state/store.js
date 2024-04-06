import { configureStore } from "@reduxjs/toolkit";
import budgetOverviewReducer from "./budgetOverview/budgetOverviewSlice";
import expensesReducer from "./expenses/expensesSlice";
import selectedTransactionReducer from "./selectedTransaction/selectedTransactionSlice";

export const store = configureStore({
  reducer: {
    budgetOverview: budgetOverviewReducer,
    expenses: expensesReducer,
    selectedTransaction: selectedTransactionReducer,
  },
});
