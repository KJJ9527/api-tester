import Add from "@/pages/merchant/Add";


export const merchantConfig = {
  key: 'createModules',
  label: '商户接口',
  headerMenus: [
    {
      key: 'createApis',
      label: '商户进件接口',
      sidebarMenus: [
        { key: 'Add', label: '创建收单商户', path: '/merchant/200/add', element: <Add /> },
      ],
    }
  ]
};