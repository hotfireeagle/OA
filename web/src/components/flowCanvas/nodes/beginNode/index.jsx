import { NodeCommon } from "../../atom"

export const BeginNode = props => {
  return (
    <>
      <NodeCommon
        {...props}
        title="发起人"
        contentRender={() => "所有人"}
      />
    </>
  )
}