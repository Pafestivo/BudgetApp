import UserSummary from '../components/UserSummary';
import '../styles/dashboard.css';

const DashboardPage = () => {
  return (
    <div className="dashboardContainer">
      <div className="infoContainer">
        <h1 className='highlight-text'>Info</h1>
        <div className="info-text">
          <p>The dashboard screen contains general information regarding your budget.</p>
          <p>You can view your summary on your right, or under this section for smaller screens.</p>
          <p>You can toggle dark/light theme on the right side of the header.</p>
        </div>
      </div>
      <UserSummary />
    </div>
  );
}

export default DashboardPage;