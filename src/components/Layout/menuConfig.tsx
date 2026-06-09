import AccountAuthentication from "@/pages/cbk/accounts/AccountAuthentication";
import AddAccountIn from "@/pages/cbk/accounts/AddAccountIn";
import AddBindCard from "@/pages/cbk/accounts/AddBindCard";
import CreateAccount from "@/pages/cbk/accounts/Createaccount";
import Openaccount from "@/pages/cbk/accounts/Openaccount";
import Queryaccount from "@/pages/cbk/accounts/Queryaccount";
import QueryAccountIn from "@/pages/cbk/accounts/QueryAccountIn";
import Querybalance from "@/pages/cbk/accounts/Querybalance";
import Updateaccount from "@/pages/cbk/accounts/Updateaccount";
import Bill from "@/pages/cbk/bills/Bill";
import BillBalance from "@/pages/cbk/bills/BillBalance";
import DatchAllocate from "@/pages/cbk/trade/DatchAllocate";
import Dotrans from "@/pages/cbk/trade/Dotrans";
import { ReactNode } from "react";

// 侧边栏菜单项
export interface SidebarMenuItem {
  key: string;       // 唯一标识，也作为路由 key
  label: string;     // 显示文本
  path: string;      // 路由路径
  element: ReactNode;   // 新增：页面组件
}

// 顶部菜单项（HeaderMenu 上的一个选项卡）
export interface HeaderMenuItem {
  key: string;
  label: string;
  sidebarMenus: SidebarMenuItem[];
}

// 单选框（Segmented）选项：每个选项对应一组顶部菜单列表
export interface SegmentedOption {
  key: string;
  label: string;
  headerMenus: HeaderMenuItem[];
}

// ========== 配置数据 ==========
export const segmentedOptions: SegmentedOption[] = [
  {
    key: 'cbkModules',
    label: 'CBK',
    headerMenus: [
      {
        key: 'accountApis',
        label: '账户接口',
        sidebarMenus: [
          { key: 'createaccount', label: 'CBK账户开户', path: '/cbk/account/createaccount', element: <CreateAccount /> },
          { key: 'openaccount', label: 'CBK账户激活', path: '/cbk/account/openaccount', element: <Openaccount /> },
          { key: 'accountAuthentication', label: 'CBK账户鉴权', path: '/cbk/account/accountAuthentication', element: <AccountAuthentication /> },
          { key: 'addAccountIn', label: '添加分账关系', path: '/cbk/account/addAccountIn', element: <AddAccountIn /> },
          { key: 'queryaccount', label: '账户查询', path: '/cbk/account/queryaccount', element: <Queryaccount /> },
          { key: 'querybalance', label: '账户余额查询', path: '/cbk/account/querybalance', element: <Querybalance /> },
          { key: 'updateaccount', label: '结算信息修改', path: '/cbk/account/updateaccount', element: <Updateaccount /> },
          { key: 'queryAccountIn', label: '分账关系查询', path: '/cbk/account/queryAccountIn', element: <QueryAccountIn /> },
          { key: 'addBindCard', label: '新增绑定结算信息', path: '/cbk/account/addBindCard', element: <AddBindCard /> },
        ],
      },
      {
        key: 'billApis',
        label: '账单接口',
        sidebarMenus: [
          { key: 'billDownload', label: '分账数据对账单下载', path: '/cbk/bill/bill', element: <Bill /> },
          { key: 'billBalanceDownload', label: '日终余额对账单下载', path: '/cbk/bill/billBalance', element: <BillBalance /> },
        ],
      },
      {
        key: 'tradeApis',
        label: '交易接口',
        sidebarMenus: [
          { key: 'dotrans', label: '账户余额分账', path: '/cbk/trade/dotrans', element: <Dotrans /> },
          { key: 'batchAllocate', label: '扫呗订单预分账', path: '/cbk/trade/batchAllocate', element: <DatchAllocate /> },
        ],
      },
    ],
  },
  {
    key: 'payModules',
    label: '支付2.0接口',
    headerMenus: [
      {
        key: 'accountApis',
        label: '账户类接口',
        sidebarMenus: [
          { key: 'openAccount', label: 'CBK账户开户', path: '/cbk/account/open', element: <CreateAccount /> },
          { key: 'activateAccount', label: 'CBK账户激活', path: '/cbk/account/activate', element: <Openaccount /> },
          // 可继续添加：账户查询、冻结等
        ],
      },
      {
        key: 'billApis',
        label: '账单类接口',
        sidebarMenus: [
          { key: 'billQuery', label: '账单查询', path: '/cbk/bill/query', element: <Bill /> },
          { key: 'billDownload', label: '账单下载', path: '/cbk/bill/download', element: <Bill /> },
        ],
      },
    ],
  }
];