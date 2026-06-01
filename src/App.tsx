// src/App.tsx
import { Outlet } from 'react-router-dom'
import { ConfigProvider } from 'antd'  // 可选，全局 Ant Design 配置
import zhCN from 'antd/locale/zh_CN'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Outlet />  {/* 路由渲染出口，Layout 已在路由配置中 */}
    </ConfigProvider>
  )
}

export default App