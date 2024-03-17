import { flowNodeType } from "@/utils/enum"

export const componentColorMap = {
  [flowNodeType.begin]: "#52c41a",
  [flowNodeType.end]: "#1677ff",
  [flowNodeType.approve]: "#13c2c2",
  [flowNodeType.cc]: "#722ed1",
  [flowNodeType.condition]: "#fa8c16",
  [flowNodeType.caseBranch]: "#fa8c16",
}

export const componentNameMap = {
  [flowNodeType.begin]: "发起人",
  [flowNodeType.end]: "结束",
  [flowNodeType.approve]: "审批人",
  [flowNodeType.cc]: "抄送人",
}