import { NodeCommon } from "../../base"

export const EndNode = props => {
  return (
    <div>
      <NodeCommon
        {...props}
        contentRender={() => "流程结束"}
      />
    </div>
  )
}