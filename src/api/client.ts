import axios, { InternalAxiosRequestConfig } from 'axios';
import { useConfigStore } from '@/stores/configStore';

let apiClient: any = null;

export const getApiClient = () => {
  const { apiBaseURL } = useConfigStore.getState();
  if (!apiBaseURL) {
    throw new Error('请先在页面配置后端地址');
  }

  // 每次都重新创建实例，确保使用最新的 apiBaseURL 作为请求头
  apiClient = axios.create({
    baseURL: '/api-proxy',           // 固定代理路径，由 Nginx 处理
    timeout: 10000,
    headers: {
      'X-API-Target': apiBaseURL,   // 携带目标后端地址，Nginx 会读取这个头并转发
    },
  });

  // 可选：添加请求拦截器，打印实际请求 URL（方便调试）
  apiClient.interceptors.request.use((config:InternalAxiosRequestConfig) => {
    console.log(`[Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url} -> target: ${apiBaseURL}`);
    return config;
  });

  return apiClient;
};