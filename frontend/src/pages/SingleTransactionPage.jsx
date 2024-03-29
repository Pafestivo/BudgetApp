import { useParams } from "react-router-dom";

const SingleTransactionPage = () => {
  const params = useParams();

  return (
    <div>
      <h1>Transaction: {params.transactionId}</h1>
    </div>
  );
}

export default SingleTransactionPage;