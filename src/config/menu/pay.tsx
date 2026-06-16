import Authcodetoopenid from "@/pages/pay/Authcodetoopenid";
import Barcodepay from "@/pages/pay/Barcodepay";
import Bill from "@/pages/pay/bills/Bill";
import Cancel from "@/pages/pay/Cancel";
import Close from "@/pages/pay/Close";
import Faceinfo from "@/pages/pay/Faceinfo";
import Facepay from "@/pages/pay/Facepay";
import Jspay from "@/pages/pay/Jspay";
import Minipay from "@/pages/pay/Minipay";
import PayNotify from "@/pages/pay/PayNotify";
import PaySync from "@/pages/pay/PaySync";
import Qrpay from "@/pages/pay/Qrpay";
import Query from "@/pages/pay/Query";
import Queryrefund from "@/pages/pay/Queryrefund";
import Refund from "@/pages/pay/Refund";
import WapPay from "@/pages/pay/WapPay";

export const payMenuConfig = {
  key: 'payModules',
  label: '支付2.0接口',
  headerMenus: [
    {
      key: 'payApis',
      label: '支付接口',
      sidebarMenus: [
        { key: 'barcodepay', label: '付款码支付（B扫C）', path: '/pay/barcodepay', element: <Barcodepay /> },
        { key: 'jspay', label: '公众号下单', path: '/pay/jspay', element: <Jspay /> },
        { key: 'minipay', label: '小程序下单', path: '/pay/minipay', element: <Minipay /> },
        { key: 'query', label: '支付查询', path: '/pay/query', element: <Query /> },
        { key: 'refund', label: '支付退款', path: '/pay/refund', element: <Refund /> },
        { key: 'cancel', label: '支付撤销', path: '/pay/cancel', element: <Cancel /> },
        { key: 'close', label: '关闭订单', path: '/pay/close', element: <Close /> },
        { key: 'queryrefund', label: '退款订单查询', path: '/pay/queryrefund', element: <Queryrefund /> },
        { key: 'payNotify', label: '支付回调通知', path: '/pay/paynotify', element: <PayNotify /> },
        { key: 'qrpay', label: '聚合码支付', path: '/pay/qrpay', element: <Qrpay /> },
        { key: 'WapPay', label: 'wap支付', path: '/pay/wappay', element: <WapPay /> },
        { key: 'faceinfo', label: '(刷脸)自助收银SDK调用凭证获取接口', path: '/pay/faceinfo', element: <Faceinfo /> },
        { key: 'facepay', label: '(刷脸)自助收银支付接口', path: '/pay/facepay', element: <Facepay /> },
        { key: 'paySync', label: '交易实时同步', path: '/pay/paysync', element: <PaySync /> },
        { key: 'authcodetoopenid', label: '付款码查询 OPENID 接口', path: '/pay/authcodetoopenid', element: <Authcodetoopenid /> },

      ],
    },
    {
      key: 'billApis',
      label: '账单接口',
      sidebarMenus: [
        { key: 'bill', label: '收单对帐单下载', path: '/pay/bill', element: <Bill /> },
      ]
    }
  ]

};