import {
  ApproveNode,
  BeginNode,
  CcNode,
  SwitchNode,
  EndNode,
} from "@/components/flowCanvas/nodes"
import { flowNodeType, flowNodeCn } from "@/utils/enum"
import styles from "./atom.less"
import { Tooltip } from "antd"

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
  if (props.nodeType === flowNodeType.end) {
    return null
  }

  const appendNode = newNodeType => {
    const newNext = {
      nodeType: newNodeType,
      attr: {},
    }
    // TODO:
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