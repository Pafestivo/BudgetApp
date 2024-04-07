import { useCallback, useEffect, useState } from "react";
import TransactionBar from "../components/TransactionBar";
import { getData } from "../utils/serverRequests/serverRequests";
import "../styles/transactionsPage.css"
import PageNav from "../components/PageNav";
import { Link } from 'react-router-dom';
import SortOverlay from "../components/SortOverlay";
import { useDispatch } from "react-redux";
import { setSelectedItem } from "../state/selectedTransaction/selectedTransactionSlice";
import { useSelector } from "react-redux";
import { addTransactions } from "../state/fetchedTransactions/fetchedTransactionsSlice";

const TransactionsPage = () => {

  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(null);
  const [sort, setSort] = useState(null);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const dispatch = useDispatch();
  const storedTransactions = useSelector((state) => state.fetchedTransactions.transactions);

  const fetchTransactions = useCallback(async (page, limit, sortChanged) => {
    // when sort is changed I force an API call to get the updated pagination data
    if (!sortChanged) {
      // check if we have enough transactions to show from the store
      if (sort) {
        let filteredTransactions;
        if (sort === "incomes") filteredTransactions = storedTransactions.filter((transaction) => transaction.type === "income");
        if (sort === "expenses") filteredTransactions = storedTransactions.filter((transaction) => transaction.type === "expense");
        if (filteredTransactions.length >= page * limit) {
          setTransactions(filteredTransactions.slice((page - 1) * limit, (page * limit) - 1));
          return;
        }
      } else {
        if (storedTransactions.length >= page * limit) {
          setTransactions(storedTransactions.slice((page - 1) * limit, (page * limit) - 1));
          return;
        }
      }
    }
    // if not, fetch the proper page from the api and store it on redux
    try {
      let response;
      if (!sort) response = await getData(`/transactions?page=${page}&limit=${limit}`);
      if (sort === "incomes") response = await getData(`/transactions/incomes?page=${page}&limit=${limit}`);
      if (sort === "expenses") response = await getData(`/transactions/expenses?page=${page}&limit=${limit}`);
      setTransactions(response.data);
      setTotalPages(response.paginationData.totalPages)
      // store on redux
      dispatch(addTransactions(response.data));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, sort, storedTransactions]) 

  useEffect(() => {
    fetchTransactions(page, limit, false)
  }, [fetchTransactions, limit, page])
  
  useEffect(() => { // read first comment in fetchedTransactions() for explanation
    fetchTransactions(page, limit, true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort])

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
              <Link onClick={() => dispatch(setSelectedItem(transaction))} to={`/transactions/${transaction.id}`} key={transaction.id}>
                <TransactionBar key={transaction.id} transaction={transaction} />
              </Link> 
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