import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state/store.js';
import DashboardPage from './pages/Dashboard';
import PageNotFound from './pages/ErrorElement';
import TransactionsPage from './pages/Transactions';
import SingleTransactionPage from './pages/SingleTransactionPage';
import './styles/globals.css';
import Layout from './layout.jsx';
import NewTransactionFormPage from './pages/NewTransactionFormPage.jsx';
import EditTransactionFormPage from './pages/EditTransactionFormPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
    errorElement: <PageNotFound />
  }, 
  {
    path: '/transactions',
    element: <TransactionsPage />,
  },
  {
    path: '/transactions/new',
    element: <NewTransactionFormPage />,
  },
  {
    path: '/transactions/:transactionId',
    element: <SingleTransactionPage />,
  },
  {
    path: '/transactions/:transactionId/edit',
    element: <EditTransactionFormPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </Provider>
  </React.StrictMode>,
)
