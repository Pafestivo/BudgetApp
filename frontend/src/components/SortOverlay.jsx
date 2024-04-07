import { PropTypes } from 'prop-types';
import '../styles/sortOverlay.css';

const SortOverlay = ({ setSort, setIsSortOpen }) => {

  const changeSort = (sort) => {
    setSort(sort);
    setIsSortOpen(false);
  }

  return (
    <div className="sortOverlay">
      <div className="buttonsContainer">
        <p onClick={() => changeSort(null)} className="btn">All</p>
        <p onClick={() => changeSort("incomes")} className="btn">Incomes</p>
        <p onClick={() => changeSort("expenses")} className="btn">Expenses</p>
      </div>
    </div>
  )
}

SortOverlay.propTypes = {
  setSort: PropTypes.func.isRequired,
  setIsSortOpen: PropTypes.func.isRequired,
};

export default SortOverlay;