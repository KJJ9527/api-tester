import Barcodepay from "@/pages/pay/Barcodepay";

export const payMenuConfig = {
  key: 'payModules',
  label: '支付2.0接口',
  headerMenus: [
    {
      key: 'payApis',
      label: '支付接口',
      sidebarMenus: [
        { key: 'barcodepay', label: '付款码支付（B扫C）', path: '/pay/barcodepay', element: <Barcodepay /> },
      ],
    },
  ],
};