import UserSummary from '../components/UserSummary';
import '../styles/dashboard.css';

const DashboardPage = () => {
  return (
    <div className="dashboardContainer">
      <UserSummary />
    </div>
  );
}

export default DashboardPage;