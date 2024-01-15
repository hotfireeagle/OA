import {
  SearchList,
  ModalForm,
  request,
} from "buerui"
import { Card, Button, message, Modal } from "antd"
import { useState } from "react"
import { departmentFunction } from "@/utils/function"

const departmentList = () => {
  const [modalVisible, setModalVisible] = useState(false) // 弹窗是否可见
  const [activeValue, setActiveValue] = useState({}) // 编辑的那一行数据
  const [reload, setReload] = useState(false) // 重新加载列表数据
  const [reloadDepartment, setReloadDepartment] = useState(false) // 是否需要重新加载部门列表
  const departmentTree = departmentFunction.useDepartmentList(reloadDepartment) // 部门列表数据

  const tableColumnList = [
    {
      title: "部门名称",
      dataIndex: "name",
    },
    {
      title: "上级部门",
      dataIndex: "parentDepartmentName",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
    },
    {
      title: "操作",
      dataIndex: "id",
      render: (v, recordObj) => {
        const isRoot = !recordObj.parentDepartmentId
        if (isRoot) {
          return "-"
        }

        const deleteHandler = event => {
          event.preventDefault()
          Modal.confirm({
            content: "是否确定删除该部门？删除之后该角色关联的数据权限也会对应被删除。",
            okText: "确认",
            cancelText: "取消",
            onOk: () => {
              return request(`/api/bms/department/delete/${v}`, {}, "delete").then(() => {
                message.success("操作成功")
                setReload(!reload)
              })
            }
          })
        } 

        return (
          <div className="table-operation-btn-container">
            <a onClick={event => editHandler(event, recordObj)} href="#">编辑</a>
            <a onClick={deleteHandler} href="#">删除</a>
          </div>
        )
      }
    }
  ]

  const searchSchemaList = [
    {
      label: "部门名称",
      type: "input",
      key: "name",
    },
  ]

  const newHandler = () => {
    setModalVisible(true)
  }

  const checkIsEditScene = () => activeValue["id"]

  // 返回弹窗标题
  const returnModalTitle = () => {
    if (checkIsEditScene()) {
      return "编辑数据"
    }
    return "新增数据"
  }

  // 点击弹窗的确认按钮时触发
  const modalOkHandler = values => {
    const postData = {
      ...(activeValue || {}),
      ...values,
    }
    let api = "/api/bms/department/insert"
    if (checkIsEditScene()) {
      api = "/api/bms/department/update"
    }
    return request(api, postData, "post").then(() => {
      message.success("操作成功")
      setReloadDepartment(!reloadDepartment)
      setReload(!reload)
      modalCancelHandler()
    })
  }

  // 点击弹窗的取消按钮时触发
  const modalCancelHandler = () => {
    setModalVisible(false)
    setActiveValue({})
  }

  // 编辑的时候触发
  const editHandler = (event, rowObj) => {
    event.preventDefault()
    setActiveValue(rowObj)
    setModalVisible(true)
  }

  const configFormList = [
    {
      label: "部门名称",
      key: "name",
      type: "input",
      required: true,
    },
    departmentFunction.departmentFormListConfigFun({
      treeData: departmentTree,
      label: "上级部门",
      key: "parentDepartmentId",
    }),
  ]

  return (
    <Card>
      <SearchList
        url="/api/bms/department/list"
        tableColumns={tableColumnList}
        searchSchema={searchSchemaList}
        useCache={true}
        needReload={reload}
      >
        <Button onClick={newHandler} type="primary">新增部门管理</Button>
      </SearchList>

      <ModalForm
        visible={modalVisible}
        title={returnModalTitle()}
        onOk={modalOkHandler}
        onCancel={modalCancelHandler}
        formList={configFormList}
        initValue={activeValue}
      />
    </Card>
  )
}

export default departmentList