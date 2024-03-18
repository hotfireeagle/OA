// 状态管理
import { create } from "zustand"
import { flowNodeType } from "@/utils/enum"
import { v4 as uuidv4 } from "uuid"

export const initFlowData = {
  id: uuidv4(),
  nodeType: flowNodeType.begin,
  attr: {}, // 属性配置的地方
  next: {
    id: uuidv4(),
    nodeType: flowNodeType.end,
  },
}

export const useFlowStore = create((set) => ({
  flowData: null,
  updateFlow: newFlowData => set(() => ({ flowData: newFlowData }))
}))