import { configureStore } from "@reduxjs/toolkit";
import budgetOverviewReducer from "./budgetOverview/budgetOverviewSlice";
import selectedTransactionReducer from "./selectedTransaction/selectedTransactionSlice";
import selectedTheme from "./selectedTheme/selectedThemeSlice";
import fetchedTransactionsSlice from "./fetchedTransactions/fetchedTransactionsSlice";
import { localStorageMiddleware } from "./middlewares/localStorageMiddleware";

export const store = configureStore({
  reducer: {
    budgetOverview: budgetOverviewReducer,
    selectedTransaction: selectedTransactionReducer,
    selectedTheme: selectedTheme,
    fetchedTransactions: fetchedTransactionsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
