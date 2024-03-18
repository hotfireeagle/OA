import {
  ApproveNode,
  BeginNode,
  CcNode,
  SwitchNode,
  EndNode,
} from "@/components/flowCanvas/nodes"
import { flowNodeType, nodes } from "@/utils/enum"
import styles from "./atom.less"
import { Tooltip } from "antd"
import { useFlowStore } from "@/pages/flowModule/form/components/flow/store"
import { v4 as uuidv4 } from "uuid"
import { componentColorMap, componentNameMap } from "./enum"
import { useState, useEffect } from "react"

// 根据节点类型返回其具体对应的节点
export const FlowAtom = props => {
  if (!("nodeType" in props)) {
    return null
  }

  switch (props.nodeType) {
    case flowNodeType.approve:
      return <ApproveNode {...props} />
    case flowNodeType.begin:
      return <BeginNode {...props} />
    case flowNodeType.cc:
      return <CcNode {...props} />
    case flowNodeType.condition:
      return <SwitchNode {...props} />
    case flowNodeType.end:
      return <EndNode {...props} />
    default:
      console.log("wrong nodeType", props.nodeType)
      return null
  }
}

/**
 * 渲染节点的下一个节点以及新增节点的图标
 * @param {*} props 
 * @returns 
 */
export const NextNode = props => {
  const { flowData, updateFlow } = useFlowStore()
  const [openStatus, setOpenStatus] = useState(false)

  if (props.nodeType === flowNodeType.end) {
    return (
      <div style={{ marginBottom: 90 }} />
    )
  }

  const appendNode = newNodeType => {
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

    let newFlowData = { ...flowData }
    let hit
    const findFlowData = node => {
      if (!node) {
        return
      }
      if (hit) {
        return
      }
      const { id } = node
      if (id === props.id) {
        hit = node
        return
      }
      findFlowData(node.next)
      if (node.nodeType === flowNodeType.condition && node.attr?.caseSchema?.length) {
        for (const caseNode of node.attr.caseSchema) {
          findFlowData(caseNode)
        }
      }
    }
    findFlowData(newFlowData)
    if (hit) {
      if (!hit.next) {
        hit.next = newNext
      } else {
        const oldNext = hit.next
        newNext.next = oldNext
        hit.next = newNext
      }
    }
    updateFlow(newFlowData)
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

/**
 * 所有节点都会使用它来进行渲染
 * @param {*} props 
 * @returns 
 */
export const NodeCommon = props => {
  const clickHandler = () => {
    // if (props.onClick) {
    //   props.onClick()
    // }
  }

  // 判断是否显示顶部的箭头
  const checkShowTopHeaderArrow = () => {
    const hide = [flowNodeType.begin]
    return !hide.includes(props?.nodeType)
  }

  return (
    <div onClick={clickHandler} className={styles.nodeWrapper}>
      <div className={styles.nodeContainer}>
        <div
          className={styles.nodeHeader}
          style={{
            background: componentColorMap[props.nodeType],
          }}
        >
          {
            checkShowTopHeaderArrow() ? (
              <div className={styles.withArrowInNodeHeader}></div>
            ) : null
          }
          <span>{props.title || componentNameMap[props.nodeType]}</span>
        </div>
        <div className={styles.nodeBody}>
          {props.contentRender()}
        </div>
      </div>
      {/** 下一个节点 */}
      <NextNode {...props} />
    </div>
  )
}