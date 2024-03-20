import { v4 as uuidv4 } from "uuid"
import { flowNodeType } from "@/utils/enum"

/**
 * 找出指定节点
 * @param {*} treeRoot : 树的根节点
 * @param {*} targetId : 目标节点ID
 * @return node : 目标节点，没找到的时候返回null
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

    const { id, next, nodeType, attr } = node
    if (id === targetId) {
      answer = node
      return
    }

    find(next)

    if (nodeType === flowNodeType.condition && attr?.caseSchema?.length) {
      for (const caseNode of attr?.caseSchema) {
        find(caseNode)
      }
    }
  }
  
  find(treeRoot)

  return answer
}

/**
 * 找出某个节点的上级节点
 * @param {*} rootNode : 树的根节点
 * @param {*} targetNode : 目标节点
 * @return node : 目标节点的上级节点，没找到的时候返回null
 */
export const findSomeNodeParentNode = (rootNode, targetNode) => {
  let answer = null

  const find = node => {
    if (answer) {
      return
    }

    if (!node) {
      return
    }

    const { next, nodeType, attr } = node
    if (next && next.id == targetNode.id) {
      answer = node
      return
    }

    find(next)

    if (nodeType === flowNodeType.condition && attr?.caseSchema?.length) {
      for (const caseNode of attr?.caseSchema) {
        find(caseNode)
      }
    }
  }
  
  find(rootNode)

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