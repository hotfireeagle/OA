import { NodeCommon } from "../../base"

export const BeginNode = props => {
  const formList = [
    {
      label: "发起人",
      type: "select",
      key: "user",
      remote: {
        api: "/user/all",
        requestData: { needContainAll: true },
        nameKey: "email",
        valueKey: "userId",
      },
      extraAtomProps: {
        mode: "multiple",
      },
    },
    {
      label: "发起角色",
      type: "select",
      key: "role",
      remote: {
        api: "/role/listAll",
        requestData: { needContainAll: true },
        nameKey: "name",
        valueKey: "id",
      },
      extraAtomProps: {
        mode: "multiple",
      },
    }
  ]

  return (
    <>
      <NodeCommon
        {...props}
        contentRender={() => "所有人"}
        configSchema={formList}
      />
    </>
  )
}