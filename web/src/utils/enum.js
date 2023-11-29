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
    nodeType: flowNodeType.condition,
    attr: {
      caseSchema: [
        {
          condition: {
            // 在条件配置数据里面可以是各种条件
          },
          next: {
            id: uuidv4(),
          },
        }, // case分支1
        {
          condition: {}
        }, // case分支2
        {
          condition: {},
        }, // 固定认为最后一个case分支就是default分支
      ]
    },
    next: {

    }, // 它的next应该是所有case节点有路可走时的最后一个节点的next
  }
}