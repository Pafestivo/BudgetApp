import ThemeSwitch from "./ThemeSwitch";
import '../styles/header.css'

const Header = () => {
  return (
    <div className="header">
      <h1 className="highlight-text">BudgetApp</h1>
      <div className="switchContainer">
        <ThemeSwitch />
      </div>
    </div>
  );
}

export default Header;