// 状态管理
import { create } from "zustand"
import { initFlowData } from "@/utils/enum"

export const useFlowStore = create((set) => ({
  flowData: initFlowData,
  updateFlow: newFlowData => set(() => ({ flowData: newFlowData }))
}))