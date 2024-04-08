import { useForm } from 'react-hook-form';
import { putData } from '../utils/serverRequests/serverRequests';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../styles/transactionForm.css";
import { updateTransaction } from '../state/fetchedTransactions/fetchedTransactionsSlice';
import { decrementTotalExpenses, decrementTotalIncome, incrementTotalExpenses, incrementTotalIncome } from '../state/budgetOverview/budgetOverviewSlice';
import PropTypes from 'prop-types';
import { setSelectedItem } from '../state/selectedTransaction/selectedTransactionSlice';

const EditTransactionForm = ({ selectedTransaction }) => {

  const { 
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting } 
  } = useForm({
    defaultValues: {
      name: selectedTransaction.name,
      amount: selectedTransaction.amount,
      date: new Date(selectedTransaction.date).toISOString().split('T')[0]
    }
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const response = await putData("/transactions", {
        id: selectedTransaction.id,
        ...data
      });
      if (response.success) {
        dispatch(updateTransaction(response.data))

        const previousAmount = selectedTransaction.amount;
        const newAmount = Number(response.data.amount);
        const difference = newAmount - previousAmount;
        const previousSign = Math.sign(previousAmount);
        const newSign = Math.sign(newAmount);
        
        // A lot of math to get the redux update right
        if (difference > 0) { // amount increased
          if (previousSign === newSign) {
            if (newAmount > 0) dispatch(incrementTotalIncome(Math.abs(difference)));
            else dispatch(decrementTotalExpenses(Math.abs(difference)));
          } else { // Changing from expense to income, or vice versa
            const expenseAdjustment = previousSign < 0 ? previousAmount : 0;
            const incomeAdjustment = newSign > 0 ? newAmount : 0;
            dispatch(incrementTotalIncome(Math.abs(incomeAdjustment)));
            dispatch(decrementTotalExpenses(Math.abs(expenseAdjustment)));
          }
        } else if (difference < 0) { // amount decreased
          if (previousSign === newSign) {
            if (newAmount > 0) dispatch(decrementTotalIncome(Math.abs(difference)));
            else dispatch(incrementTotalExpenses(Math.abs(difference)));
          } else { // Changing from expense to income, or vice versa
            const expenseAdjustment = newSign < 0 ? newAmount : 0;
            const incomeAdjustment = previousAmount;
            dispatch(decrementTotalIncome(Math.abs(incomeAdjustment)));
            dispatch(incrementTotalExpenses(Math.abs(expenseAdjustment)));
          }
        }

        dispatch(setSelectedItem(response.data));
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
          <button className="btn" onClick={() => navigate(`/transactions/${selectedTransaction.id}`)}>Cancel</button>
          <button disabled={isSubmitting} className="btn" type="submit">{isSubmitting ? "Editing..." : "Edit"}</button>
        </div>
          {errors.root && <div className="formError">{errors.root.message}</div>}
      </form>
    </div>
  )
}

EditTransactionForm.propTypes = {
  selectedTransaction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
};

export default EditTransactionForm;