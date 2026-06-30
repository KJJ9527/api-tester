import CreateAccount from "@/pages/cbkv2/accounts/Createaccount";
import Bill from "@/pages/cbk/bills/Bill";
import BillBalance from "@/pages/cbk/bills/BillBalance";
import Apply from "@/pages/cbk/receipt/Apply";
import Applyicreceipt from "@/pages/cbk/receipt/Applyicreceipt";
import Download from "@/pages/cbk/receipt/download";
import AllocateRefund from "@/pages/cbk/trade/AllocateRefund";
import DatchAllocate from "@/pages/cbk/trade/DatchAllocate";
import Dotrans from "@/pages/cbkv2/trade/dotrans";
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
import GetSignUrl from "@/pages/cbkv2/accounts/GetSignUrl";

export const cbkv2MenuConfig: SegmentedOption = {
  key: 'cbkv2Modules',
  label: 'CBKv2',
  headerMenus: [
    {
      key: 'accountApis',
      label: '账户接口',
      sidebarMenus: [
        { key: 'createaccount', label: 'CBK账户开户', path: '/cbkv2/account/createaccount', element: <CreateAccount /> },
        { key: 'getSignUrl', label: '生成签约链接', path: '/cbkv2/account/getSignUrl', element: <GetSignUrl /> },
      ],
    },
    {
      key: 'cardApis',
      label: '账单接口',
      sidebarMenus: [
        { key: 'billDownload', label: '分账数据对账单下载', path: '/cbkv2/bill/bill', element: <Bill /> },
        { key: 'billBalanceDownload', label: '日终余额对账单下载', path: '/cbkv2/bill/billBalance', element: <BillBalance /> },
      ],
    },
    {
      key: 'tradeApis',
      label: '交易接口',
      sidebarMenus: [
        { key: 'dotrans', label: '账户余额分账', path: '/cbkv2/trade/dotrans', element: <Dotrans /> },
        { key: 'batchAllocate', label: '扫呗订单预分账', path: '/cbkv2/trade/batchAllocate', element: <DatchAllocate /> },
        { key: 'withdrawapply', label: 'CBK账户提现', path: '/cbkv2/trade/withdrawapply', element: <Withdrawapply /> },
        { key: 'queryorder', label: 'CBK交易详情查询', path: '/cbkv2/trade/queryorder', element: <Queryorder /> },
        { key: 'withdrawapplyNotify', label: 'CBK提现回调通知', path: '/cbkv2/trade/withdrawapplyNotify', element: <WithdrawapplyNotify /> },
        { key: 'dotransNotify', label: '分账交易回调通知', path: '/cbkv2/trade/dotransNotify', element: <DotransNotify /> },
        { key: 'queryTradesByDate', label: 'CBK分账数据列表查询', path: '/cbkv2/trade/queryTradesByDate', element: <QueryTradesByDate /> },
        { key: 'allocateRefund', label: 'CBK分账交易退回', path: '/cbkv2/trade/allocateRefund', element: <AllocateRefund /> },
        { key: 'queryChannelTransIn', label: 'CBK查询渠道入金交易明细', path: '/cbkv2/trade/queryChannelTransIn', element: <QueryChannelTransIn /> },
      ],
    },
    {
      key: 'receiptApis',
      label: '回单接口',
      sidebarMenus: [
        { key: 'applyicreceipt', label: '申请电子回单', path: '/cbkv2/receipt/applyicreceipt', element: <Applyicreceipt /> },
        { key: 'apply', label: '中信交易明细电子回单申请', path: '/cbkv2/receipt/apply', element: <Apply /> },
        { key: 'download', label: '中信交易明细电子回单下载', path: '/cbkv2/receipt/download', element: <Download /> },
      ],
    },
    {
      key: 'unknownBillsApis',
      label: '不明来帐接口',
      sidebarMenus: [
        { key: 'queryUnknownAccounts', label: '查询不明来账', path: '/cbkv2/unknownBills/queryUnknownAccounts', element: <QueryUnknownAccounts /> },
        { key: 'handleUnknownAccount', label: '处理不明来账', path: '/cbkv2/unknownBills/handleUnknownAccount', element: <HandleUnknownAccount /> },
        { key: 'HandleQueryUnknownAccount', label: '查询不明来账处理状态', path: '/cbkv2/unknownBills/handleQueryUnknownAccount', element: <HandleQueryUnknownAccount /> },
      ],
    },
  ]
};