import { NodeCommon } from "../../base"

export const ApproveNode = props => {
  return (
    <div>
      <NodeCommon
        {...props}
        contentRender={() => "请设置审批人"}
        // onClick={() => setShowDrawer(true)}
      />
    </div>
  )
}