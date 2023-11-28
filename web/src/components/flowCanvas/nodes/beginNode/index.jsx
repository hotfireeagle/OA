import { ChildrenRender } from "../../atom"

export const BeginNode = props => {
  return (
    <div>

      <ChildrenRender {...props} />
    </div>
  )
}