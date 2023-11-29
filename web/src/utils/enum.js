export const flowNodeType = {
  begin: 1, // 发起人节点
  condition: 2, // 条件节点
  approve: 3, // 审批节点
  cc: 4, // 抄送节点
  end: 999, // 终止节点
}

export const initFlowData = {
  nodeType: flowNodeType.begin,
  attr: {

  },
  next: {
    nodeType: flowNodeType.end,
  }
}