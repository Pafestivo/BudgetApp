import { configureStore } from "@reduxjs/toolkit";
import budgetOverviewReducer from "./budgetOverview/budgetOverviewSlice";
import expensesReducer from "./expenses/expensesSlice";
import selectedTransactionReducer from "./selectedTransaction/selectedTransactionSlice";
import selectedTheme from "./selectedTheme/selectedThemeSlice";
import { localStorageMiddleware } from "./middlewares/localStorageMiddleware";

export const store = configureStore({
  reducer: {
    budgetOverview: budgetOverviewReducer,
    expenses: expensesReducer,
    selectedTransaction: selectedTransactionReducer,
    selectedTheme: selectedTheme,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
