// src/router/index.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';

// 页面组件
import CreateAccount from '@pages/cbk/accounts/Createaccount';
import Openaccount from '@pages/cbk/accounts/Openaccount';
import AccountAuthentication from '@pages/cbk/accounts/AccountAuthentication';
import AddAccountIn from '@/pages/cbk/accounts/AddAccountIn';
import Queryaccount from '@/pages/cbk/accounts/Queryaccount';
import Querybalance from '@/pages/cbk/accounts/Querybalance';
import Updateaccount from '@/pages/cbk/accounts/Updateaccount';
import QueryAccountIn from '@/pages/cbk/accounts/QueryAccountIn';
import Bill from '@/pages/cbk/bills/Bill';
import BillBalance from '@/pages/cbk/bills/BillBalance';
import Dotrans from '@/pages/cbk/trade/Dotrans';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // 默认首页重定向
      { index: true, element: <Navigate to="/cbk/account/createaccount" replace /> },
      { path: 'cbk/account/createaccount', element: <CreateAccount /> },
      { path: 'cbk/account/openaccount', element: <Openaccount /> },
      { path: 'cbk/account/accountAuthentication', element: <AccountAuthentication /> },
      { path: 'cbk/account/addaccountin', element: <AddAccountIn /> },
      { path: 'cbk/account/queryaccount', element: <Queryaccount /> },
      { path: 'cbk/account/querybalance', element: <Querybalance /> },
      { path: 'cbk/account/updateaccount', element: <Updateaccount /> },
      { path: 'cbk/account/queryAccountIn', element: <QueryAccountIn /> },
      // 账单接口
      { path: 'cbk/bill/bill', element: <Bill /> },
      { path: 'cbk/bill/billbalance', element: <BillBalance /> },
      // 交易接口
      { path: 'cbk/trade/dotrans', element: <Dotrans /> },
    ],
  },
]);