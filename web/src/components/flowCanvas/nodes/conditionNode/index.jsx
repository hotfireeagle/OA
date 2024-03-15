import { NextNode, NodeCommon } from "../../atom"
import styles from "../../atom.less"
import { useFlowStore } from "@/pages/flowModule/form/components/flow/store"
import { findTreeNode, appendCaseToSwitchNode } from "@/pages/flowModule/form/components/flow/tool"
import { CloseSquareOutlined } from "@ant-design/icons"
import { useLayoutEffect, useState } from "react"
import { uuid2id } from "@/utils"

const defaultPos = 110
export const SwitchNode = props => {
  const [left, setLeft] = useState(defaultPos)
  const [right, setRight] = useState(defaultPos)

  const { flowData, updateFlow } = useFlowStore()
  const caseList = props.attr.caseSchema

  // 新增case语句
  const newCaseHandler = () => {
    const newFlowData = { ...flowData }
    const switchNode = findTreeNode(newFlowData, props.id)
    appendCaseToSwitchNode(switchNode)
    updateFlow(newFlowData)
  }

  /**
   * 计算case节点的宽度，case节点的宽度不一定等于nodeWidth，可能被它的子元素给撑开了
   */
  const computeCaseNodeWidth = selector => {
    const dom = document.querySelector("#" + uuid2id(selector))
    if (dom) {
      return dom.getBoundingClientRect().width
    }
    return defaultPos
  }

  // 计算左边的距离
  const computeLeft = () => {
    const id = caseList[0]?.id
    return computeCaseNodeWidth(id) / 2
  }

  // 计算右边的距离
  const computeRight = () => {
    const id = caseList[caseList.length - 1]?.id
    return computeCaseNodeWidth(id) / 2
  }

  useLayoutEffect(() => {
    setLeft(computeLeft())
    setRight(computeRight())
  }, [props])

  return (
    <div className={styles.nodeWrapper}>
      <div onClick={newCaseHandler} className={styles.addConditionCls}>
        添加条件
      </div>
      <div id={props.id} className={styles.caseListContainer}>
        <div
          className={styles.topXLine}
          style={{
            left,
            right,
          }}
        />
        {
          caseList.map((caseObj, idx) => {
            return (
              <CaseNode
                key={idx}
                idx={idx}
                isLast={idx === caseList.length - 1}
                caseSchema={caseObj}
              />
            )
          })
        }
        <div
          className={styles.bottomXLine}
          style={{
            left,
            right,
          }}
        />
      </div>
      <NextNode {...props} />
    </div>
  )
}

const CaseNode = props => {
  const { isLast, idx, caseSchema } = props

  const [hovered, setHovered] = useState(false)

  return (
    <div id={uuid2id(caseSchema.id)} className={styles.caseNodeWrapper}>
      <div className={styles.fullYLine} />
      <NodeCommon
        {...caseSchema}
        title={isLast ? "默认条件" : `条件${idx+1}`}
        contentRender={() => "请设置条件逻辑"}
        onClick={() => {}}
      />
    </div>
  )
}