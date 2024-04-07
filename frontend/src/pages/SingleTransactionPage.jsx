import { useDispatch, useSelector } from "react-redux";
import '../styles/singleTransactionPage.css'
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";
import { deleteData } from "../utils/serverRequests/serverRequests";
import { useNavigate } from "react-router-dom";
import { decrementTotalExpenses, decrementTotalIncome } from "../state/budgetOverview/budgetOverviewSlice";
import { removeTransaction } from "../state/fetchedTransactions/fetchedTransactionsSlice";

const SingleTransactionPage = () => {
  const selectedTransaction = useSelector((state) => state.selectedTransaction.selectedTransaction);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteTransaction = async () => {
    if(window.confirm("Are you sure you want to delete this transaction?") === false) return;
    try {
      const response = await deleteData(`/transactions/${selectedTransaction.id}`);
      if (response.success) {
        console.log("Transaction deleted successfully");
        if (selectedTransaction.type === "income") dispatch(decrementTotalIncome(selectedTransaction.amount));
        else if (selectedTransaction.type === "expense") dispatch(decrementTotalExpenses(selectedTransaction.amount));
        dispatch(removeTransaction(selectedTransaction.id));
        navigate("/transactions");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="singleTransactionContainer">
      <h1 className="highlight-text">{selectedTransaction.name}</h1>
      <div className="singleTransactionDetails">
        <p>
          <span className="title">Date</span>
          <span className="value">{formatDate(selectedTransaction.date)}</span>
        </p>
        <p>
          <span className="title">Type:</span>
          <span className="value">{selectedTransaction.type}</span>
        </p>
        <p>
          <span className="title">Amount</span>
          <span className="value">{selectedTransaction.amount}$</span>
        </p>
      </div>
      <div className="crudOptions">
        <p className="btn" style={{ backgroundColor: "#CD5C5C"}} onClick={() => deleteTransaction()}>Delete</p>
        <Link to={`/transactions/${selectedTransaction.id}/edit`} className="btn">Edit</Link>
      </div>
      <Link style={{ width: "90%", marginBottom: "10px" }} to="/transactions" className="btn">Back to transactions</Link>
    </div>
  );
}

export default SingleTransactionPage;