import axios, { AxiosInstance } from 'axios'
import { useConfigStore } from '@/stores/configStore'

let apiClient: AxiosInstance | null = null

export const getApiClient = () => {
  const { apiBaseURL } = useConfigStore.getState()
  
  if (!apiBaseURL) {
    throw new Error('请先在页面配置后端地址')
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