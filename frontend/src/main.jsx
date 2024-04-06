import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state/store.js';
import DashboardPage from './pages/Dashboard';
import PageNotFound from './pages/ErrorElement';
import TransactionsPage from './pages/Transactions';
import SingleTransactionPage from './pages/SingleTransactionPage';

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
    path: '/transactions/:transactionId',
    element: <SingleTransactionPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
