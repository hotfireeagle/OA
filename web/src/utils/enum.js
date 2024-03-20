export const flowNodeType = {
  begin: 1, // 发起人节点
  condition: 2, // 条件节点
  approve: 3, // 审批节点
  cc: 4, // 抄送节点
  caseBranch: 5, // case节点
  end: 999, // 终止节点
}

export const nodes = [
  {
    type: flowNodeType.begin,
    cn: "发起人",
    addable: false,
  },
  {
    type: flowNodeType.condition,
    cn: "条件分支",
    addable: true,
  },
  {
    type: flowNodeType.approve,
    cn: "审批人",
    addable: true,
  },
  {
    type: flowNodeType.cc,
    cn: "抄送人",
    addable: true,
  },
  {
    type: flowNodeType.caseBranch,
    cn: "条件分支",
    addable: false,
  },
  {
    type: flowNodeType.end,
    cn: "结束",
    addable: true,
  },
]

export const account_status_map = {
  "TODO:1": "正常",
  "TODO:2": "被禁用",
}

export const api_function = 1
export const menu_function = 2