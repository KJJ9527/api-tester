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
import Apply from "@/pages/cbk/receipt/Apply";
import Applyicreceipt from "@/pages/cbk/receipt/Applyicreceipt";
import Download from "@/pages/cbk/receipt/download";
import AllocateRefund from "@/pages/cbk/trade/AllocateRefund";
import DatchAllocate from "@/pages/cbk/trade/DatchAllocate";
import Dotrans from "@/pages/cbk/trade/Dotrans";
import DotransNotify from "@/pages/cbk/trade/DotransNotify";
import QueryChannelTransIn from "@/pages/cbk/trade/QueryChannelTransIn";
import Queryorder from "@/pages/cbk/trade/Queryorder";
import QueryTradesByDate from "@/pages/cbk/trade/QueryTradesByDate";
import Withdrawapply from "@/pages/cbk/trade/Withdrawapply";
import WithdrawapplyNotify from "@/pages/cbk/trade/withdrawapplyNotify";
import HandleQueryUnknownAccount from "@/pages/cbk/unknownBills/HandleQueryUnknownAccount";
import HandleUnknownAccount from "@/pages/cbk/unknownBills/HandleUnknownAccount";
import QueryUnknownAccounts from "@/pages/cbk/unknownBills/QueryUnknownAccounts";
import { SegmentedOption } from "@/types/menu";

export const cbkMenuConfig: SegmentedOption = {
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
        { key: 'withdrawapply', label: 'CBK账户提现', path: '/cbk/trade/withdrawapply', element: <Withdrawapply /> },
        { key: 'queryorder', label: 'CBK交易详情查询', path: '/cbk/trade/queryorder', element: <Queryorder /> },
        { key: 'withdrawapplyNotify', label: 'CBK提现回调通知', path: '/cbk/trade/withdrawapplyNotify', element: <WithdrawapplyNotify /> },
        { key: 'dotransNotify', label: '分账交易回调通知', path: '/cbk/trade/dotransNotify', element: <DotransNotify /> },
        { key: 'queryTradesByDate', label: 'CBK分账数据列表查询', path: '/cbk/trade/queryTradesByDate', element: <QueryTradesByDate /> },
        { key: 'allocateRefund', label: 'CBK分账交易退回', path: '/cbk/trade/allocateRefund', element: <AllocateRefund /> },
        { key: 'queryChannelTransIn', label: 'CBK查询渠道入金交易明细', path: '/cbk/trade/queryChannelTransIn', element: <QueryChannelTransIn /> },
      ],
    },
    {
      key: 'receiptApis',
      label: '回单接口',
      sidebarMenus: [
        { key: 'applyicreceipt', label: '申请电子回单', path: '/cbk/receipt/applyicreceipt', element: <Applyicreceipt /> },
        { key: 'apply', label: '中信交易明细电子回单申请', path: '/cbk/receipt/apply', element: <Apply /> },
        { key: 'download', label: '中信交易明细电子回单下载', path: '/cbk/receipt/download', element: <Download /> },
      ],
    },
    {
      key: 'unknownBillsApis',
      label: '不明来帐接口',
      sidebarMenus: [
        { key: 'queryUnknownAccounts', label: '查询不明来账', path: '/cbk/unknownBills/queryUnknownAccounts', element: <QueryUnknownAccounts /> },
        { key: 'handleUnknownAccount', label: '处理不明来账', path: '/cbk/unknownBills/handleUnknownAccount', element: <HandleUnknownAccount /> },
        { key: 'HandleQueryUnknownAccount', label: '查询不明来账处理状态', path: '/cbk/unknownBills/handleQueryUnknownAccount', element: <HandleQueryUnknownAccount /> },
      ],
    },
  ]
};