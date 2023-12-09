import { NodeCommon } from "../../atom"
import { useState } from "react"
import { Drawer, Form } from "antd"
import { FormList } from "buerui"
import { DepartmentAndUserSelect } from "@/components/departmentAndUserSelect"

export const BeginNode = props => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [formInstance] = Form.useForm()

  const formList = [
    {
      label: "设置发起人",
      type: "custom",
      key: "whoCanBegin",
      required: true,
      render: () => <DepartmentAndUserSelect />,
    }
  ]

  return (
    <>
      <NodeCommon
        {...props}
        title="发起人"
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