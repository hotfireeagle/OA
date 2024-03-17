import { NodeCommon } from "../../atom"

export const CcNode = props => {
  return (
    <div>
      <NodeCommon
        {...props}
        contentRender={() => "请设置抄送人"}
      />
    </div>
  )
}