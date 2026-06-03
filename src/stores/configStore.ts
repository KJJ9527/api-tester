import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ConfigState {
  apiBaseURL: string
  secretKey: string          // 签名密钥
  setApiBaseURL: (url: string) => void
  setSecretKey: (key: string) => void
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      apiBaseURL: '', // 初始为空，用户必须配置
      secretKey: '', // 初始为空，用户必须配置
      setApiBaseURL: (url) => set({ apiBaseURL: url }),
      setSecretKey: (key) => set({ secretKey: key }),
    }),
    {
      name: 'pay-debugger-config', // localStorage key
    }
  )
)