import { NodeCommon } from "../../atom"

export const ApproveNode = props => {
  return (
    <div>
      <NodeCommon
        {...props}
        title="审批人"
        contentRender={() => "请设置审批人"}
        // onClick={() => setShowDrawer(true)}
      />
    </div>
  )
}