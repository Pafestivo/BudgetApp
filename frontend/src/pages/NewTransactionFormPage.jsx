import NewTransactionForm from "../components/NewTransactionForm";

const NewTransactionFormPage = () => {

  // use react-hook-form for the form
  // make sure to increment/decrement the totalIncome/totalExpenses in redux
  // also make sure to add the transaction in fetchedTransactionsSlice
  
  return (
    <NewTransactionForm />
  )
}

export default NewTransactionFormPage;