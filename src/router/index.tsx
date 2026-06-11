import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { segmentedOptions } from '@/config/menu';

// 递归收集所有 sidebarMenus 中的路由配置
const collectRoutes = () => {
  const routes: { path: string; element: React.ReactNode }[] = [];
  for (const opt of segmentedOptions) {
    for (const header of opt.headerMenus) {
      for (const menu of header.sidebarMenus) {
        routes.push({ path: menu.path, element: menu.element });
      }
    }
  }
  return routes;
};

const routes = collectRoutes();

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to={routes[0]?.path || '/'} replace /> },
      ...routes.map(route => ({
        path: route.path,
        element: route.element,
      })),
    ],
  },
]);