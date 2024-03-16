import { v4 as uuidv4 } from "uuid"
import { flowNodeType } from "@/utils/enum"

/**
 * 找出指定节点
 * @param {*} treeRoot : 树的根节点
 * @param {*} targetId : 目标节点ID
 */
export const findTreeNode = (treeRoot, targetId) => {
  let answer = null

  const find = node => {
    if (answer) {
      return
    }

    if (!node) {
      return
    }

    const { id, next } = node
    if (id === targetId) {
      answer = node
      return
    }

    find(next)
  }
  
  find(treeRoot)

  return answer
}

export const appendCaseToSwitchNode = switchNode => {
  if (!switchNode.attr) {
    switchNode.attr = {}
  }

  if (!switchNode.attr.caseSchema) {
    switchNode.attr.caseSchema = []
  }

  switchNode.attr.caseSchema.push({
    id: uuidv4(),
    nodeType: flowNodeType.caseBranch,
  })
}