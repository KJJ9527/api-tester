import axios, { AxiosInstance } from 'axios'
import { useConfigStore } from '@/stores/configStore'

let apiClient: AxiosInstance | null = null

export const getApiClient = () => {
  let { apiBaseURL } = useConfigStore.getState()

  // 开发环境强制使用 /api 代理（忽略用户配置的绝对地址）
  if (import.meta.env.DEV) {
    apiBaseURL = '/api';
  } else {
    // 生产环境必须配置绝对地址
    if (!apiBaseURL) {
      throw new Error('请先在页面配置后端地址');
    }
  }
  
  if (apiClient && apiClient.defaults.baseURL === apiBaseURL) {
    return apiClient
  }

  apiClient = axios.create({
    baseURL: apiBaseURL,
    timeout: 10000,
  })

  // 拦截器等
  apiClient.interceptors.request.use((config) => {
    // 可以动态添加 merchantId 等
    return config
  })

  return apiClient
}