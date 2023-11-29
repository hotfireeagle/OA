import { v4 as uuidv4 } from "uuid"

export const flowNodeType = {
  begin: 1, // 发起人节点
  condition: 2, // 条件节点
  approve: 3, // 审批节点
  cc: 4, // 抄送节点
  end: 999, // 终止节点
}

export const flowNodeCn = {
  [flowNodeType.begin]: "发起人",
  [flowNodeType.condition]: "条件分支",
  [flowNodeType.approve]: "审批人",
  [flowNodeType.cc]: "抄送人",
  [flowNodeType.end]: "结束",
}

export const initFlowData = {
  id: uuidv4(),
  nodeType: flowNodeType.begin,
  attr: {

  },
  next: {
    id: uuidv4(),
    nodeType: flowNodeType.begin,
    attr: {

    },
  }
}