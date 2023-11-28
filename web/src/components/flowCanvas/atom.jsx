import {
  ApproveNode,
  BeginNode,
  CcNode,
  ConditionNode,
  EndNode,
} from "@/components/flowCanvas/nodes"
import { flowNodeType } from "@/utils/enum"

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
      return <ConditionNode {...props} />
    case flowNodeType.end:
      return <EndNode {...props} />
    default:
      console.log("wrong nodeType")
      return null
  }
}

export const ChildrenRender = props => {
  if (props.children) {
    return null
  }

  return <FlowAtom {...props.children} />
}