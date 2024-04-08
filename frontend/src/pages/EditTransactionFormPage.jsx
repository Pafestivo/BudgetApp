import { useCallback, useEffect } from "react";
import EditTransactionForm from "../components/EditTransactionForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getData } from "../utils/serverRequests/serverRequests";
import { useDispatch } from "react-redux";
import { setSelectedItem } from "../state/selectedTransaction/selectedTransactionSlice";

const EditTransactionFormPage = () => {
  
  const selectedTransaction = useSelector((state) => state.selectedTransaction);
  
  const { transactionId } = useParams();
  const dispatch = useDispatch();

  const fetchTransaction = useCallback(async () => {
    try {
      const response = await getData(`/transactions/${transactionId}`);
      if (response.success) {
        dispatch(setSelectedItem(response.data));
      }
    } catch (err) {
      console.log(err);
    }
  }
  , [dispatch, transactionId]);

  useEffect(() => {
    if (selectedTransaction === null) {
      fetchTransaction();
    }
  }, [fetchTransaction, selectedTransaction])

  return (
    selectedTransaction && selectedTransaction.id ? (
    <EditTransactionForm selectedTransaction={selectedTransaction} />
  ) : "no transaction found"
  )
}

export default EditTransactionFormPage;