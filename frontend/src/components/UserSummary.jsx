import { useDispatch, useSelector } from "react-redux";
import "../styles/userSummary.css";
import { useCallback, useEffect } from "react";
import { getData } from "../utils/serverRequests/serverRequests";
import { initiateBudgetOverview } from "../state/budgetOverview/budgetOverviewSlice";

const UserSummary = () => {

  const dispatch = useDispatch();
  let budgetOverview = useSelector((state) => state.budgetOverview);

  const fetchBudgetOverview = useCallback(async () => {
    try {
      const currentBalanceResponse = await getData("/user/currentBalance");
      const monthlyIncomesResponse = await getData(`/user/monthlyIncomes/${new Date().getMonth() + 1}`);
      const monthlyExpensesResponse = await getData(`/user/monthlyExpenses/${new Date().getMonth() + 1}`);
      dispatch(initiateBudgetOverview({
        remainingBalance: currentBalanceResponse.data.balance,
        totalIncome: monthlyIncomesResponse.data.totalIncome,
        totalExpenses: monthlyExpensesResponse.data.totalExpense
      }));
    } catch (error) {
      console.error(`error fetching budgetOverview: ${error}`);
    }
  }, [dispatch]) 

  // initialize budgetOverview if missing
  useEffect(() => {
    if (!budgetOverview) {
      fetchBudgetOverview();
    }
  }, [fetchBudgetOverview, budgetOverview])

  return (
    <div className="userSummaryContainer">
      <h1>Summary</h1>
      <p>Current Balance: {budgetOverview ? budgetOverview.remainingBalance : '0'}</p>
      <p>Monthly Incomes: {budgetOverview ? budgetOverview.totalIncome : '0'}</p>
      <p>Monthly Expenses: {budgetOverview ? budgetOverview.totalExpenses : '0'}</p>
    </div>
  )
}

export default UserSummary;