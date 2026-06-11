// src/components/Layout/index.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Tabs, Select, Switch, Space, Typography, ConfigProvider, theme as antdTheme, Breadcrumb } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import ConfigPanel from '@/components/Config/ConfigPanel';
import { segmentedOptions } from '@/config/menu';

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const lightTheme = {
    algorithm: antdTheme.defaultAlgorithm,
    token: { colorBgContainer: '#ffffff', borderRadiusLG: 8 },
  };
  const darkTheme = {
    algorithm: antdTheme.darkAlgorithm,
    token: { colorBgContainer: '#141414', colorBgElevated: '#1f1f1f', borderRadiusLG: 8 },
  };

  const currentPath = location.pathname;

  // ========== 派生状态：根据当前路径计算选中项 ==========
  const activeSegmentedKey = useMemo(() => {
    for (const opt of segmentedOptions) {
      for (const header of opt.headerMenus) {
        if (header.sidebarMenus.some(item => item.path === currentPath)) {
          return opt.key;
        }
      }
    }
    return segmentedOptions[0]?.key || '';
  }, [currentPath]);

  const activeHeaderMenuKey = useMemo(() => {
    const currentSegmented = segmentedOptions.find(opt => opt.key === activeSegmentedKey);
    if (!currentSegmented) return '';
    for (const header of currentSegmented.headerMenus) {
      if (header.sidebarMenus.some(item => item.path === currentPath)) {
        return header.key;
      }
    }
    return currentSegmented.headerMenus[0]?.key || '';
  }, [activeSegmentedKey, currentPath]);

  const currentSidebarMenus = useMemo(() => {
    const currentSegmented = segmentedOptions.find(opt => opt.key === activeSegmentedKey);
    if (!currentSegmented) return [];
    const headerMenu = currentSegmented.headerMenus.find(menu => menu.key === activeHeaderMenuKey);
    return headerMenu?.sidebarMenus || [];
  }, [activeSegmentedKey, activeHeaderMenuKey]);

  const selectedSidebarKey = useMemo(() => {
    const menu = currentSidebarMenus.find(item => item.path === currentPath);
    return menu ? menu.key : undefined;
  }, [currentPath, currentSidebarMenus]);

  // ========== 动态生成面包屑 ==========
  const breadcrumbItems = useMemo(() => {
    // 找到当前选中的模块、顶部菜单、侧边栏菜单
    const currentSegmented = segmentedOptions.find(opt => opt.key === activeSegmentedKey);
    const currentHeader = currentSegmented?.headerMenus.find(menu => menu.key === activeHeaderMenuKey);
    const currentMenuItem = currentSidebarMenus.find(item => item.path === currentPath);

    const items = [];
    if (currentSegmented) {
      items.push({ title: currentSegmented.label });
    }
    if (currentHeader) {
      items.push({ title: currentHeader.label });
    }
    if (currentMenuItem) {
      items.push({ title: currentMenuItem.label });
    }
    return items;
  }, [activeSegmentedKey, activeHeaderMenuKey, currentPath, currentSidebarMenus]);

  // ========== 交互处理 ==========
  const handleSelectChange = (value: string) => {
    const newSegmented = segmentedOptions.find(opt => opt.key === value);
    if (newSegmented && newSegmented.headerMenus.length > 0) {
      const firstHeader = newSegmented.headerMenus[0];
      if (firstHeader.sidebarMenus.length > 0) {
        navigate(firstHeader.sidebarMenus[0].path);
      }
    }
  };

  const handleHeaderTabChange = (activeKey: string) => {
    const currentSegmented = segmentedOptions.find(opt => opt.key === activeSegmentedKey);
    if (!currentSegmented) return;
    const headerMenu = currentSegmented.headerMenus.find(menu => menu.key === activeKey);
    if (headerMenu && headerMenu.sidebarMenus.length > 0) {
      navigate(headerMenu.sidebarMenus[0].path);
    }
  };

  const handleSidebarClick = ({ key }: { key: string }) => {
    const menuItem = currentSidebarMenus.find(item => item.key === key);
    if (menuItem) {
      navigate(menuItem.path);
    }
  };

  const sidebarMenuItems = currentSidebarMenus.map((item, index) => ({
    key: item.key,
    label: (
      <span>
        <span style={{ width: 24, display: 'inline-block', opacity: 0.6 }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        {item.label}
      </span>
    ),
    onClick: () => handleSidebarClick({ key: item.key }),
  }));

  const selectOptions = segmentedOptions.map(opt => ({ label: opt.label, value: opt.key }));

  const currentSegmentedObj = segmentedOptions.find(opt => opt.key === activeSegmentedKey);
  const headerTabItems = (currentSegmentedObj?.headerMenus || []).map(menu => ({
    key: menu.key,
    label: menu.label,
  }));


  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ConfigProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: isDarkMode ? '#141414' : '#f5f5f5',
            borderBottom: `1px solid ${isDarkMode ? '#303030' : '#e8e8e8'}`,
          }}
        >
          <Space size="large">
            <Select
              value={activeSegmentedKey}
              options={selectOptions}
              onChange={handleSelectChange}
              style={{ width: 120 }}
            />
          </Space>

          <div>
            <Tabs
              activeKey={activeHeaderMenuKey}
              items={headerTabItems}
              onChange={handleHeaderTabChange}
              style={{ marginBottom: 0 }}
              tabBarStyle={{ margin: 0 }}
            />
          </div>

          <Space>
            <Text type="secondary">{currentTime}</Text>

            <Switch
              checkedChildren={<BulbFilled />}
              unCheckedChildren={<BulbOutlined />}
              checked={isDarkMode}
              onChange={setIsDarkMode}
            />
            <ConfigPanel />
          </Space>
        </Header>

        <Layout>
          <Sider width={260} style={{ background: isDarkMode ? '#141414' : '#ffffff' }}>

            <div style={{ padding: '16px 0 8px 16px', fontWeight: 500, borderBottom: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}` }}>
              接口列表
            </div>
            <Menu
              mode="inline"
              selectedKeys={selectedSidebarKey ? [selectedSidebarKey] : []}
              style={{ height: '100%', borderInlineEnd: 0, display: 'inline-block', textAlign: 'left' }}
              items={sidebarMenuItems}
            />
          </Sider>

          <Layout>
            <Content
              style={{
                background: isDarkMode ? '#141414' : '#ffffff',
                minHeight: 280,
                padding: 24,
              }}
            >
              {/* 面包屑导航 */}
              <div style={{ padding: '16px 16px 0 16px' }}>
                <Breadcrumb items={breadcrumbItems} />
              </div>
              <Outlet context={{ isDarkMode }} />
            </Content>
          </Layout>
        </Layout>

        <Footer style={{ textAlign: 'center', background: isDarkMode ? '#141414' : '#ffffff' }}>
          利楚接口调试工具 ©{currentYear}
          <br />
          <Text>by：柯建军</Text>&nbsp;|&nbsp;
          <Text>v1.0.0</Text>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default AppLayout;