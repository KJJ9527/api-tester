import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ConfigState {
  apiBaseURL: string
  setApiBaseURL: (url: string) => void
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      apiBaseURL: '', // 初始为空，用户必须配置
      setApiBaseURL: (url) => set({ apiBaseURL: url }),
    }),
    {
      name: 'pay-debugger-config', // localStorage key
    }
  )
)