import PropTypes from 'prop-types';
import "../styles/pageNav.css";

const PageNav = ({page, totalPages = 1, setPage, setLimit}) => {

  const changePage = (direction) => {
    if (direction === "next") {
      if (page < totalPages) {
        setPage(page + 1);
      }
    } else {
      if (page > 1) {
        setPage(page - 1);
      }
    }
  }

  return (
    <div className="pageNav">
      <div className="top">
        <p className="btn" onClick={() => changePage("prev")}>Prev</p>
        <p className='currentPage'>{page}/{totalPages}</p>
        <p className="btn" onClick={() => changePage("next")}>Next</p>
      </div>
      <div className="bottom">
        <label>Per page:</label>
        <select onChange={(e) => setLimit(e.target.value)}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
        
      </div>
  )
}

PageNav.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  setLimit: PropTypes.func.isRequired,
};


export default PageNav;