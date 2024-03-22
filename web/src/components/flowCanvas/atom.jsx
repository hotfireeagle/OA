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
import { findTreeNode, findSomeNodeParentNode } from "./tool"

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

/**
 * 所有节点都会使用它来进行渲染
 * @param {*} props 
 * @returns 
 */
export const NodeCommon = props => {
  const { flowData, updateFlow } = useFlowStore()

  const clickHandler = event => {
    event.stopPropagation()
    if (props.onClick) {
      props.onClick()
    }
  }

  // 判断是否显示指向节点的箭头（上一个节点指向下一个节点的）
  const checkShowTopHeaderArrow = () => {
    const hide = [flowNodeType.begin]
    return !hide.includes(props?.nodeType)
  }

  // 删除节点的处理方法
  const deleteNodeHandler = () => {
    const parentNode = findSomeNodeParentNode(flowData, props)
    if (parentNode) {
      parentNode.next = props.next
      updateFlow(flowData)
    }
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
          {
            checkShowTopHeaderArrow() ? (
              <img
                onClick={deleteNodeHandler}
                className={styles.deleteIcon}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAb5JREFUeF7tms8qRVEUxn9fGSoDJXNFyUTdqXgGSZnJI3gPj6CYKXkHSZlJlCRzxUiZGSxObmTg3s5e53ZOne+M92+vtb+99vpTR/T8U8/PjwVwBPRcAT+BngeAk+DEn0BErAIXwHTNaHsH1iVd1+RqLZ+oABGxAlwCM7W8+l38BqxJuivkx2JFAkTEMjA3Zvfqxo+A2bFejF7wCuwBVUSM+l4k3de1VSrAKbBV19iE159+CbBd14YFqKtYtT4iHAF+An3OASXPpqtMURLs6mFK/EoLEBEbJYabYiSdZ/ZqQoDIOJBlJaXOkIKHJdECZG8xwzsC/AScA1J5LAU7CX4PRq4CmSyeZV0FXAVcBVKJPAW7CrgKuAy6D3Aj5E7QrbBngWw/n+E9C3gW8CyQaudTsGcBzwKeBTwLeBbwLOBZoPezwBOwkOnnE+yjpKUEn/9ZOiLOgM2MEwn2RNJOgm9EgAFwBUxlHClgP4CBpNsC9gdJt8LDdrj6l/cw40gBuyvpuID7gzQiwFCEKhIOgEVgPuvYP/wz8ADsS7ppwkZjAjThTBt7WIA2VO+STUdAl26jDV8cAW2o3iWbvY+AT8zozUHlYySaAAAAAElFTkSuQmCC"
              />
            ) : null
          }
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