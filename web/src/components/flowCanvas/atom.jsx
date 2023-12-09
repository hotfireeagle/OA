import {
  ApproveNode,
  BeginNode,
  CcNode,
  SwitchNode,
  EndNode,
} from "@/components/flowCanvas/nodes"
import { flowNodeType, nodes, initCaseSchema } from "@/utils/enum"
import styles from "./atom.less"
import { Tooltip } from "antd"
import { useFlowStore } from "@/pages/flowModule/form/components/flow/store"
import { v4 as uuidv4 } from "uuid"

export const FlowAtom = props => {
  if (!props) {
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

export const NextNode = props => {
  const { flowData, updateFlow } = useFlowStore()

  if (props.nodeType === flowNodeType.end) {
    return null
  }

  const appendNode = newNodeType => {
    const newNext = {
      id: uuidv4(),
      nodeType: newNodeType,
      attr: {},
    }

    if (newNodeType === flowNodeType.condition) {
      newNext.attr = {
        caseSchema: [...initCaseSchema],
      }
    }

    // 设计成树形结构会好些
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

  let line2Cls = `${styles.line} ${styles.line2}`
  let containerStyle = { marginBottom: 3 }
  if (props.hideArrow) {
    line2Cls = styles.line
    containerStyle.marginBottom = 0
  }

  return (
    <>
      <div style={containerStyle} className={styles.newContainer}>
        <div className={`${styles.line} ${styles.line1}`} />
        <Tooltip
          color="#fff"
          title={returnNodes()}
          trigger="click"
          placement="right"
        >
          <div className={styles.roundCls}>
            <span className={styles.plusCls}>+</span>
          </div>
        </Tooltip>
        <div className={line2Cls} />
      </div>

      {
        props.next ? (
          <FlowAtom {...props.next} />
        ) : null
      }
    </>
  )
}

export const NodeCommon = props => {
  return (
    <div className={styles.nodeWrapper}>
      <div className={styles.nodeContainer}>
        <div className={`${styles.nodeHeader} ${styles.beginNodeHeader}`}>
          <span>{props.title}</span>
        </div>
        <div className={styles.nodeBody}>
          {props.contentRender()}
        </div>
      </div>
      <NextNode {...props} />
    </div>
  )
}