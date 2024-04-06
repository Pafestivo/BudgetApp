import PropTypes from 'prop-types';
import ThemeSwitch from './components/ThemeSwitch';

const Layout = ({ children }) => {
  return (
    <div>
      <ThemeSwitch />
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
