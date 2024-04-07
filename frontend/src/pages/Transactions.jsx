import { useCallback, useEffect, useState } from "react";
import TransactionBar from "../components/TransactionBar";
import { getData } from "../utils/serverRequests/serverRequests";
import "../styles/transactionsPage.css"
import PageNav from "../components/PageNav";
import { Link } from 'react-router-dom';
import SortOverlay from "../components/SortOverlay";

const TransactionsPage = () => {

  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(null);
  const [sort, setSort] = useState(null);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const fetchTransactions = useCallback(async (page, limit) => {
    let response;
    if (!sort) response = await getData(`/transactions?page=${page}&limit=${limit}`);
    if (sort === "incomes") response = await getData(`/transactions/incomes?page=${page}&limit=${limit}`);
    if (sort === "expenses") response = await getData(`/transactions/expenses?page=${page}&limit=${limit}`);
    setTransactions(response.data);
    setTotalPages(response.paginationData.totalPages)
  }, [sort]) 

  useEffect(() => {
    fetchTransactions(page, limit)
  }, [fetchTransactions, limit, page])

  return (
    <>
      {isSortOpen && <SortOverlay setSort={setSort} setIsSortOpen={setIsSortOpen} />}
  
      <div className="transactionsPageContainer">
        <div className="info">
          <h1>Recent Transactions</h1>
          <p>Click to edit or delete.</p>
        </div>
        <div className="transactionsContainer">
          {transactions.map((transaction) => (
            <TransactionBar key={transaction.id} transaction={transaction} />
          ))}
          <Link className="btn newTransactionBtn" to="/transactions/new">Create New Transaction</Link>
          <div className="sortContainer">
            <Link to="/" className="btn">Back to dashboard</Link>
            <p onClick={() => setIsSortOpen(!isSortOpen)} className="btn sortBtn">Sort</p>
          </div>
        </div>
        {totalPages && <PageNav page={page} totalPages={totalPages} setPage={setPage} setLimit={setLimit} />}
      </div>
    </>
  );
}

export default TransactionsPage;