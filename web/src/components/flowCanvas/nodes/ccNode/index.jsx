import { ChildrenRender } from "../../atom"

export const CcNode = props => {
  return (
    <div>
      <ChildrenRender {...props} />
    </div>
  )
}