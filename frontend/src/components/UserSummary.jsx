import { useDispatch, useSelector } from "react-redux";
import "../styles/userSummary.css";
import { useCallback, useEffect } from "react";
import { getData } from "../utils/serverRequests/serverRequests";
import { initiateBudgetOverview } from "../state/budgetOverview/budgetOverviewSlice";
import { formatNumber } from "../utils/formatNumber";
import { Link } from "react-router-dom";

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
        totalIncome: monthlyIncomesResponse.data,
        totalExpenses: monthlyExpensesResponse.data
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
      <h1 className="highlight-text">Summary</h1>
      <div className="summaryDetails">
        <p>
          <span className="title">Current Balance:</span>
          <span className="value">{formatNumber(budgetOverview ? budgetOverview.remainingBalance : '0')}$</span>
        </p>
        <p>
          <span className="title">Monthly Incomes:</span>
          <span className="value">{formatNumber(budgetOverview ? budgetOverview.totalIncome : '0')}$</span>
        </p>
        <p>
          <span className="title">Monthly Expenses:</span>
          <span className="value">{formatNumber(budgetOverview ? budgetOverview.totalExpenses : '0')}$</span>
        </p>
      </div>
      <Link to="/transactions" className="btn">View Transactions</Link>
    </div>
  );
}

export default UserSummary;