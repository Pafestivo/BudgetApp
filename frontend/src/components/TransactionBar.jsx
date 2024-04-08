import PropTypes from 'prop-types';
import "../styles/transactionBar.css";
import { formatDate } from '../utils/formatDate';

const TransactionBar = ({ transaction }) => {

  return (
    <div className="transactionBar">
      <div className="transactionBar__date">{formatDate(transaction.date)}</div>
      <div className="transactionBar__name">{transaction.name}</div>
      <div className="transactionBar__amount">{transaction.amount}$</div>
    </div>
  );
}

TransactionBar.propTypes = {
  transaction: PropTypes.shape({
    date: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }).isRequired,
};


export default TransactionBar;