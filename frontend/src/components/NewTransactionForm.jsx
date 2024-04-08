import { useForm } from 'react-hook-form';
import { postData } from '../utils/serverRequests/serverRequests';
import { useNavigate } from "react-router-dom";

const NewTransactionForm = () => {
  const { 
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting } 
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await postData("/transactions", data);
      if (response.success) navigate(`/transactions/${response.data.id}`);
    } catch (error) {
      setError("root", {
        message: error.message
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", {
        required: "Name is required",
        maxLength: {
          value: 15,
          message: "Name must be less than 20 characters"
        },
        pattern: {
          value: /^[A-Za-z]+$/i,
          message: "Name must contain only letters"
        }
      })} type="text" placeholder='Name' />
      {errors.name && <div className="formError">{errors.name.message}</div>}

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
      })} type="number" placeholder='Amount' />
      {errors.amount && <div className="formError">{errors.amount.message}</div>}

      <input {...register("date", {
        required: "Date is required"
      })} type="date" defaultValue={new Date().toISOString().split('T')[0]} />
      {errors.date && <div className="formError">{errors.date.message}</div>}

      <button disabled={isSubmitting} className="btn" type="submit">{isSubmitting ? "Adding..." : "Add"}</button>
      {errors.root && <div className="formError">{errors.root.message}</div>}
    </form>
  )
}

export default NewTransactionForm;