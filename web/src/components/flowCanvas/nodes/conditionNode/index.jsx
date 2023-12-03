import { NextNode } from "../../atom"
import styles from "../index.less"
import { useFlowStore } from "@/pages/flowModule/form/components/flow/store"
import { findTreeNode, appendCaseToSwitchNode } from "@/pages/flowModule/form/components/flow/tool"
import { CloseSquareOutlined } from "@ant-design/icons"
import { useState } from "react"

// case应该建模在switchNode的schema里面还是怎么样好？

export const SwitchNode = props => {
  const { flowData, updateFlow } = useFlowStore()
  const caseList = props.attr.caseSchema

  // 新增case语句
  const newCaseHandler = () => {
    const newFlowData = { ...flowData }
    const switchNode = findTreeNode(newFlowData, props.id)
    appendCaseToSwitchNode(switchNode)
    updateFlow(newFlowData)
  }

  return (
    <div className={styles.nodeWrapper}>
      <div onClick={newCaseHandler} className={styles.addConditionCls}>
        添加条件
      </div>
      <div className={styles.caseListContainer}>
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
      </div>
      <NextNode {...props} />
    </div>
  )
}

const CaseNode = props => {
  const { isLast, idx, caseSchema } = props

  const [hovered, setHovered] = useState(false)

  return (
    <div className={`${styles.nodeWrapper} ${styles.caseNodeWrapper}`}>
      <div key={idx} className={styles.caseCls}>
        {
          hovered ? (
            <CloseSquareOutlined />
          ) : null
        }
        <div className={styles.caseTitleCls}>
          <div className={styles.lineCls} />
          <div>{ isLast ? "默认条件" : `条件${idx+1}` }</div>
        </div>
        <div className={styles.caseValueCls}>请设置条件</div>
      </div>
      <NextNode {...caseSchema} hideArrow={true} />
    </div>
  )
}