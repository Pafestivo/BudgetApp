import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <Link to="/">Send me back to my dashboard.</Link>
    </div>
  );
}

export default PageNotFound;