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
import QueryAccount from "@/pages/cbkv2/accounts/QueryAccount";
import CloseAccount from "@/pages/cbkv2/accounts/CloseAccount";
import BindCard from "@/pages/cbkv2/cards/BindCard";
import UpdateAccount from "@/pages/cbkv2/accounts/UpdateAccount";
import ApplyActiveCard from "@/pages/cbkv2/cards/ApplyActiveCard";
import CheckActiveCard from "@/pages/cbkv2/cards/CheckActiveCard";
import SetDefaultCard from "@/pages/cbkv2/cards/setDefaultCard";
import UnBindCard from "@/pages/cbkv2/cards/UnBindCard";
import UpdateCard from "@/pages/cbkv2/cards/UpdateCard";
import QueryCard from "@/pages/cbkv2/cards/QueryCard";

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
        { key: 'queryAccount', label: '账户查询', path: '/cbkv2/account/queryAccount', element: <QueryAccount /> },
        { key: 'closeAccount', label: '注销账户', path: '/cbkv2/account/closeAccount', element: <CloseAccount /> },
        { key: 'updateAccount', label: '修改账户', path: '/cbkv2/account/updateAccount', element: <UpdateAccount /> },
      ],
    },
    {
      key: 'CardApis',
      label: '结算卡接口',
      sidebarMenus: [
        { key: 'bindCard', label: '绑定结算卡', path: '/cbkv2/card/bindCard', element: <BindCard /> },
        { key: 'applyActiveCard', label: '发起银行卡激活', path: '/cbkv2/card/applyActiveCard', element: <ApplyActiveCard /> },
        { key: 'checkActiveCard', label: '验证银行卡激活', path: '/cbkv2/card/checkActiveCard', element: <CheckActiveCard /> },
        { key: 'setDefaultCard', label: '设置默认结算卡', path: '/cbkv2/card/setDefaultCard', element: <SetDefaultCard /> },
        { key: 'unBindCard', label: '解绑结算卡', path: '/cbkv2/card/unBindCard', element: <UnBindCard /> },
        { key: 'updateCard', label: '修改结算卡', path: '/cbkv2/card/updateCard', element: <UpdateCard /> },
        { key: 'queryCard', label: '查询结算卡', path: '/cbkv2/card/queryCard', element: <QueryCard /> },
      ],
    },
    {
      key: 'tradeApis',
      label: '账户分账接口',
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
      label: '归集接口',
      sidebarMenus: [
        { key: 'applyicreceipt', label: '申请电子回单', path: '/cbkv2/receipt/applyicreceipt', element: <Applyicreceipt /> },
        { key: 'apply', label: '中信交易明细电子回单申请', path: '/cbkv2/receipt/apply', element: <Apply /> },
        { key: 'download', label: '中信交易明细电子回单下载', path: '/cbkv2/receipt/download', element: <Download /> },
      ],
    },
    {
      key: 'billApis',
      label: '对账单接口',
      sidebarMenus: [
        { key: 'billDownload', label: '分账数据对账单下载', path: '/cbkv2/bill/bill', element: <Bill /> },
        { key: 'billBalanceDownload', label: '日终余额对账单下载', path: '/cbkv2/bill/billBalance', element: <BillBalance /> },
      ],
    },

  ]
};