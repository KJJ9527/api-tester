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