import { useCallback, useEffect, useState } from "react";
import TransactionBar from "../components/TransactionBar";
import { getData } from "../utils/serverRequests/serverRequests";
import "../styles/transactionsPage.css"
import PageNav from "../components/PageNav";
import { Link } from 'react-router-dom';
import FilterOverlay from "../components/FilterOverlay";
import { useDispatch } from "react-redux";
import { setSelectedItem } from "../state/selectedTransaction/selectedTransactionSlice";
import { useSelector } from "react-redux";
import { addTransactions } from "../state/fetchedTransactions/fetchedTransactionsSlice";

const TransactionsPage = () => {

  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(null);
  const [filter, setFilter] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const dispatch = useDispatch();
  const storedTransactions = useSelector((state) => state.fetchedTransactions.transactions);

  const fetchTransactions = useCallback(async (page, limit, forceAPICall) => {
    // force api call when the pagination data change (i.e filter, limit)
    if (!forceAPICall) {
      // check if we have enough transactions to show from the store
      if (filter) {
        let filteredTransactions;
        if (filter === "incomes") filteredTransactions = storedTransactions.filter((transaction) => transaction.type === "income");
        if (filter === "expenses") filteredTransactions = storedTransactions.filter((transaction) => transaction.type === "expense");
        if (filteredTransactions.length >= page * limit) {
          setTransactions(filteredTransactions.slice((page - 1) * limit, (page * limit)));
          return;
        }
      } else {
        if (storedTransactions.length >= page * limit) {
          setTransactions(storedTransactions.slice((page - 1) * limit, (page * limit)));
          return;
        }
      }
    }
    // if not, fetch the proper page from the api and store it on redux
    try {
      let response;
      if (!filter) response = await getData(`/transactions?page=${page}&limit=${limit}`);
      if (filter === "incomes") response = await getData(`/transactions/incomes?page=${page}&limit=${limit}`);
      if (filter === "expenses") response = await getData(`/transactions/expenses?page=${page}&limit=${limit}`);

      // in case the limit was changed and the page is now out of bounds
      if(response.paginationData.totalPages < page) {
        setPage(response.paginationData.totalPages);
        return;
      }

      setTransactions(response.data);
      setTotalPages(response.paginationData.totalPages)
      // store on redux
      dispatch(addTransactions(response.data));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, filter, storedTransactions]) 

  useEffect(() => {
    fetchTransactions(page, limit, false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchTransactions, page])
  
  useEffect(() => { // read first comment in fetchedTransactions() for explanation
    setPage(1);
    fetchTransactions(1, limit, true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, limit])

  return (
    <>
      {isFilterOpen && <FilterOverlay setFilter={setFilter} setIsFilterOpen={setIsFilterOpen} />}
  
      <div className="transactionsPageContainer">
        <div className="info">
          <h1>Recent Transactions</h1>
          <p>Click to edit or delete.</p>
        </div>
        <div className="transactionsContainer">
            {transactions.map((transaction) => (
              <Link onClick={() => dispatch(setSelectedItem(transaction))} to={`/transactions/${transaction.id}`} key={transaction.id}>
                <TransactionBar key={transaction.id} transaction={transaction} />
              </Link> 
            ))}
          <Link className="btn newTransactionBtn" to="/transactions/new">Create New Transaction</Link>
          <div className="filterContainer">
            <Link to="/" className="btn">Back to dashboard</Link>
            <p onClick={() => setIsFilterOpen(!isFilterOpen)} className="btn filterBtn">Filter</p>
          </div>
        </div>
        {totalPages && <PageNav page={page} totalPages={totalPages} setPage={setPage} setLimit={setLimit} />}
      </div>
    </>
  );
}

export default TransactionsPage;