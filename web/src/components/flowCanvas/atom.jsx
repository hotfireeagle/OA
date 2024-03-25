import {
  ApproveNode,
  BeginNode,
  CcNode,
  SwitchNode,
  EndNode,
} from "@/components/flowCanvas/nodes"
import { flowNodeType } from "@/utils/enum"

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
