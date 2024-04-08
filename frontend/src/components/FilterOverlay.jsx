import { PropTypes } from 'prop-types';
import '../styles/filterOverlay.css';

const FilterOverlay = ({ setFilter, setIsFilterOpen }) => {

  const changeFilter = (filter) => {
    setFilter(filter);
    setIsFilterOpen(false);
  }

  return (
    <div className="filterOverlay">
      <div className="buttonsContainer">
        <p onClick={() => changeFilter(null)} className="btn">All</p>
        <p onClick={() => changeFilter("incomes")} className="btn">Incomes</p>
        <p onClick={() => changeFilter("expenses")} className="btn">Expenses</p>
      </div>
    </div>
  )
}

FilterOverlay.propTypes = {
  setFilter: PropTypes.func.isRequired,
  setIsFilterOpen: PropTypes.func.isRequired,
};

export default FilterOverlay;