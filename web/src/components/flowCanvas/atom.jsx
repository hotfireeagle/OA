import {
  ApproveNode,
  BeginNode,
  CcNode,
  SwitchNode,
  EndNode,
} from "@/components/flowCanvas/nodes"
import { flowNodeType, flowNodeCn, initCaseSchema } from "@/utils/enum"
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
      console.log("wrong nodeType")
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
    // TODO: 后面新增了case节点的话，那么从case节点找数据的方法又会发生变化
    let newFlowData = { ...flowData }
    let hit
    const findFlowData = node => {
      if (!node) {
        return
      }
      const { id } = node
      if (id === props.id) {
        hit = node
        return
      }
      findFlowData(node.next)
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
    const nodeNameList = Object.keys(flowNodeType)

    return (
      <div className={styles.addNodeModal}>
        <div className={styles.titleCls}>添加流程节点</div>
        <div className={styles.nodeTypeList}>
          {
            nodeNameList.map(k => {
              const nodeType = flowNodeType[k]
              return (
                <div
                  onClick={() => appendNode(nodeType)}
                  className={styles.node}
                  key={k}
                >
                  <span>{flowNodeCn[nodeType]}</span>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={styles.newContainer}>
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
        <div className={`${styles.line} ${styles.line2}`} />
      </div>

      {
        props.next ? (
          <FlowAtom {...props.next} />
        ) : null
      }
    </>
  )
}