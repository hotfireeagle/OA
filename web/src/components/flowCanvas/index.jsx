import { FlowAtom } from "./atom"

export const FlowCanvas = props => {
  return (
    <div>
      <FlowAtom {...props.schema} />
    </div>
  )
}