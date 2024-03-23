import { NodeCommon } from "../../atom"
import { useState } from "react"
import { Drawer, Form } from "antd"
import { FormList } from "buerui"

export const BeginNode = props => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [formInstance] = Form.useForm()

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
        onClick={() => setShowDrawer(true)}
      />

      <Drawer
        title="设置"
        placement="right"
        onClose={() => setShowDrawer(false)}
        open={showDrawer}
      >
        <Form form={formInstance} layout="vertical">
          <FormList
            span={24}
            list={formList}
          />
        </Form>
      </Drawer>
    </>
  )
}