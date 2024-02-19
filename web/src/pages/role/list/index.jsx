import { Card, Button } from "antd"
import { SearchList, ModalForm, request } from "buerui"
import { history } from "umi"
import { useState } from "react"

const Role = () => {
  const [showNewModal, setShowNewModal] = useState(false)
  const [activeRole, setActiveRole] = useState({})

  const clickNewRole = () => {
    setShowNewModal(true)
  }

  const newRoleHandler = data => {
    return request("/role/insert", data)
  }

  const tableColumnList = [
    {
      title: "角色名称",
      dataIndex: "TODO:1",
    },
    {
      title: "创建时间",
      dataIndex: "TODO:2",
    },
    {
      title: "操作",
      dataIndex: "id",
      render: (v) => {
        const goEdit = event => {
          event.preventDefault()
          history.push(`/permission/role/edit/${v}`)
        }
        return <a onClick={goEdit} href="#">编辑</a>
      }
    }
  ]

  const searchSchemaList = [
    {
      label: "角色名称",
      key: "TODO:1",
      type: "input",
    }
  ]

  const createRoleFormList = [
    {
      label: "角色名称",
      key: "name",
      type: "input",
      required: true,
    }
  ]

  return (
    <Card>
      <SearchList
        url="/role/list"
        tableColumns={tableColumnList}
        searchSchema={searchSchemaList}
        useCache={true}
      >
        <Button onClick={clickNewRole} type="primary">新增角色</Button>
      </SearchList>
      <ModalForm
        visible={showNewModal}
        title="新增角色"
        formList={createRoleFormList}
        initValue={activeRole}
        onOk={newRoleHandler}
        onCancel={() => setShowNewModal(false)}
      />
    </Card>
  )
}

export default Role