import { useForm } from 'react-hook-form';
import { postData } from '../utils/serverRequests/serverRequests';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../styles/transactionForm.css";
import { addTransactions } from '../state/fetchedTransactions/fetchedTransactionsSlice';
import { incrementTotalExpenses, incrementTotalIncome } from '../state/budgetOverview/budgetOverviewSlice';
import { setSelectedItem } from '../state/selectedTransaction/selectedTransactionSlice';

const NewTransactionForm = () => {
  const { 
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting } 
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      setSelectedItem(null);
      const response = await postData("/transactions", data);
      if (response.success) {
        dispatch(addTransactions([response.data]))
        if(response.data.type === "income") dispatch(incrementTotalIncome(Number(response.data.amount)))
        if(response.data.type === "expense") dispatch(incrementTotalExpenses(Number(Math.abs(response.data.amount))))
        navigate(`/transactions/${response.data.id}`);
      }
    } catch (error) {
      setError("root", {
        message: error.message
      })
    }
  }

  return (
    <div className="newTransactionFormContainer">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='inputContainer'>
          <input {...register("name", {
            required: "Name is required",
            maxLength: {
              value: 15,
              message: "Name must be less than 20 characters"
            },
            pattern: {
              value: /^[A-Za-z\s]+$/i,
              message: "Name must contain only letters"
            }
          })} autoComplete="off" type="text" placeholder='Name' />
          {errors.name && <div className="formError">{errors.name.message}</div>}
        </div>
        
        <div className='inputContainer'>
          <input {...register("amount", {
            required: "Amount is required",
            min: {
              value: -1000000,
              message: "Amount must be greater than -1000000"
            },
            max: {
              value: 1000000,
              message: "Amount must be less than 1000000"
            }
          })} autoComplete="off" type="number" placeholder='Amount' />
          {errors.amount && <div className="formError">{errors.amount.message}</div>}
        </div>
        
        <div className='inputContainer'>
          <input {...register("date", {
          required: "Date is required"
          })} autoComplete="off" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
          {errors.date && <div className="formError">{errors.date.message}</div>}
        </div>

        <div className='buttonsContainer'>
          <button className="btn" onClick={() => navigate("/transactions")}>Cancel</button>
          <button disabled={isSubmitting} className="btn" type="submit">{isSubmitting ? "Adding..." : "Add"}</button>
        </div>
          {errors.root && <div className="formError">{errors.root.message}</div>}
      </form>
    </div>
    
  )
}

export default NewTransactionForm;