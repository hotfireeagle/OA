import { Card, Button } from "antd"
import { SearchList, ModalForm, request } from "buerui"
import { history } from "umi"
import { useState } from "react"

const Role = () => {
  const [showNewModal, setShowNewModal] = useState(false) // 是否显示新增角色弹窗
  const [activeRole, setActiveRole] = useState({}) // 编辑的角色
  const [reloadList, setReloadList] = useState(false) // 重新加载列表数据的标志

  const clickNewRole = () => {
    setShowNewModal(true)
  }

  const newOrEditRoleHandler = data => {
    let postData = {
      ...(activeRole || {}),
      ...data,
    }
    let url = "/role/insert"
    if (activeRole?.id) {
      url = "/role/updateName"
    }
    return request(url, postData).then(() => {
      setReloadList(v => !v)
    })
  }

  const tableColumnList = [
    {
      title: "角色名称",
      dataIndex: "name",
      width: "30%",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      width: "30%",
    },
    {
      title: "操作",
      dataIndex: "id",
      render: (v, obj) => {
        const goEdit = event => {
          event.preventDefault()
          history.push(`/permission/role/edit/${v}`)
        }

        const editRole = () => {
          setActiveRole(obj)
          setShowNewModal(true)
        }

        return (
          <div className="tableOperationAList">
            <a onClick={editRole} href="#">修改</a>
            <a onClick={goEdit} href="#">编辑功能权限</a>
            <a href="#">编辑菜单权限</a>
          </div>
        )
      }
    }
  ]

  const searchSchemaList = [
    {
      label: "角色名称",
      key: "name",
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
        needReload={reloadList}
      >
        <Button onClick={clickNewRole} type="primary">新增角色</Button>
      </SearchList>
      <ModalForm
        visible={showNewModal}
        title="新增角色"
        formList={createRoleFormList}
        initValue={activeRole}
        onOk={newOrEditRoleHandler}
        onCancel={() => setShowNewModal(false)}
      />
    </Card>
  )
}

export default Role