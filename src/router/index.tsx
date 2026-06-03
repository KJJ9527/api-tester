// src/router/index.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';

// 页面组件
import CreateAccount from '@pages/cbk/accounts/Createaccount';
import Openaccount from '@pages/cbk/accounts/Openaccount';
import AccountAuthentication from '@pages/cbk/accounts/AccountAuthentication';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // 默认首页重定向
      { index: true, element: <Navigate to="/cbk/account/createaccount" replace /> },

      { path: 'cbk/account/createaccount', element: <CreateAccount /> },

      { path: 'cbk/account/openaccount', element: <Openaccount /> },

      { path: 'cbk/bill/query', element: <AccountAuthentication /> },
    ],
  },
]);