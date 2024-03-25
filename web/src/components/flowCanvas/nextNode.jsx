import styles from "./style.less"
import { Tooltip } from "antd"
import { useFlowStore } from "@/pages/flowModule/form/components/flow/store"
import { v4 as uuidv4 } from "uuid"
import { useState, useEffect } from "react"
import { findTreeNode } from "./tool"
import { nodes } from "@/utils/enum"
import { flowNodeType } from "@/utils/enum"
import { FlowAtom } from "./atom"

/**
 * 渲染节点的下一个节点以及新增节点的图标
 * @param {*} props 
 * @returns 
 */
export const NextNode = props => {
  const { flowData, updateFlow } = useFlowStore()
  const [openStatus, setOpenStatus] = useState(false)

  // 往指定节点下面插入一个新节点
  const appendNode = newNodeType => {
    // 新节点的基本数据
    const newNext = {
      id: uuidv4(),
      nodeType: newNodeType,
      attr: {},
    }

    if (newNodeType === flowNodeType.condition) {
      newNext.attr = {
        caseSchema: [
          {
            id: uuidv4(),
            nodeType: flowNodeType.caseBranch,
          },
          {
            id: uuidv4(),
            nodeType: flowNodeType.caseBranch,
          },
        ],
      }
    }
  
    // 找当前节点
    const hit = findTreeNode(flowData, props.id)
    
    // 往当前节点下新增节点
    if (hit) {
      if (!hit.next) {
        hit.next = newNext
      } else {
        const oldNext = hit.next
        newNext.next = oldNext
        hit.next = newNext
      }
    }
    updateFlow(flowData)
  }

  const returnNodes = () => {
    return (
      <div className={styles.addNodeModal}>
        <div className={styles.titleCls}>添加流程节点</div>
        <div className={styles.nodeTypeList}>
          {
            nodes.map(nodeObj => {
              if (!nodeObj.addable) {
                return null
              }
              return (
                <div
                  onClick={() => appendNode(nodeObj.type)}
                  className={styles.node}
                  key={nodeObj.type}
                >
                  <span>{nodeObj.cn}</span>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

  const showTooltip = event => {
    event.stopPropagation()
    setOpenStatus(true)
  }

  useEffect(() => {
    const clickCb = () => {
      setOpenStatus(false)
    }
  
    document.addEventListener("click", clickCb)

    return () => document.removeEventListener("click", clickCb)
  }, [])

  // 当前节点是结束节点，而且这个结束节点不存在下一个节点
  if (
    props.nodeType === flowNodeType.end &&
    props.next == null
  ) {
    return (
      <div style={{ marginBottom: 90 }} />
    )
  }

  return (
    <>
      <div className={styles.newContainer}>
        <div className={`${styles.line} ${styles.line1}`} />
        <Tooltip
          color="#fff"
          title={returnNodes()}
          open={openStatus}
          placement="right"
        >
          <div className={styles.roundCls} onClick={showTooltip}>
            <span className={styles.plusCls}>+</span>
          </div>
        </Tooltip>
        <div className={styles.line} />
      </div>

      {
        props.next ? (
          <FlowAtom {...props.next} />
        ) : null
      }
    </>
  )
}