import {
  SearchList,
  obj2oplist,
  ModalForm,
  request,
  SwitchConfirm,
  cv,
} from "buerui"
import { Card, Button, message } from "antd"
import { account_status_map } from "@/utils/enum"
import { useState } from "react"
import {
  roleFunction,
  departmentFunction,
} from "@/utils/function"

const accountList = () => {
  const [showNewAccountModal, setShowNewAccountModal] = useState(false)
  const [activeAccount, setActiveAccount] = useState({})
  const [reloadList, setReloadList] = useState(false)
  const roleList = roleFunction.useRoleList()
  const departmentList = departmentFunction.useDepartmentList()

  const checkIsValidaActiveAccount = () => !!activeAccount["TODO:id字段名称"]

  const tableColumnList = [
    {
      title: "成员名称",
      dataIndex: "TODO:1",
    },
    {
      title: "联系方式",
      dataIndex: "TODO:2",
    },
    {
      title: "邮箱",
      dataIndex: "TODO:3",
    },
    {
      title: "创建时间",
      dataIndex: "TODO:4",
    },
    {
      title: "最后登录时间",
      dataIndex: "TODO:5",
    },
    {
      title: "关联角色",
      dataIndex: "TODO:6",
    },
    {
      title: "关联部门",
      dataIndex: "TODO:",
    },
    {
      title: "备注",
      dataIndex: "TODO:",
    },
    {
      title: "状态",
      dataIndex: "TODO:",
      render: (v, obj) => {
        return (
          <SwitchConfirm
            modelData={obj}
            extraAtomProps={{
              checked: !!v,
            }}
            openApi="/TODO:"
            cancelApi="/TODO:"
            openContent="是否确定启用该成员账号？启用之后可以通过账号密码登录后台。"
            cancelContent="是否确定禁用该成员账号？禁用之后无法登录后台。"
            reload={() => setReloadList(!reloadList)}
          />
        )
      }
    },
    {
      title: "操作",
      dataIndex: "TODO:",
      render: () => {
        const goDetail = event => {
          event.preventDefault()
        }

        return (
          <a onClick={goDetail} href="#">编辑</a>
        )
      }
    },
  ]

  const searchSchemaList = [
    {
      label: "成员名称",
      type: "input",
      key: "TODO:1",
    },
    {
      label: "联系方式",
      type: "input",
      key: "TODO:2",
    },
    {
      label: "状态",
      type: "select",
      key: "TODO:3",
      oplist: obj2oplist(account_status_map),
    },
  ]

  // 新增账号的时候触发
  const newAccount = () => {
    setShowNewAccountModal(true)
  }

  const returnModalTitle = () => {
    if (checkIsValidaActiveAccount()) {
      return "编辑账号"
    }
    return "新增账号"
  }

  const accountModalOkHandler = values => {
    const postData = {
      ...activeAccount,
      ...values,
    }
    let url = "TODO:/新增接口"
    if (checkIsValidaActiveAccount()) {
      url = "/TODO:编辑接口"
    }

    return request(url, postData, "post").then(res => {
      message.success("操作成功")
      setReloadList(!reloadList)
      cancelModalHandler()

      if (!checkIsValidaActiveAccount()) {
        // 新增账号的情况下，显示密码弹窗
        const password = res["TODO:密码字段"]
        Modal.info({
          title: "初始密码",
          content: `初始密码：${password}`,
          onOk: function() {
            cv(password)
          }
        })
      }
    })
  }

  const cancelModalHandler = () => {
    setShowNewAccountModal(false)
    setActiveAccount({})
  }

  const configFormList = [
    {
      label: "成员名称",
      key: "TODO:1",
      type: "input",
      required: true,
    },
    {
      label: "联系方式",
      key: "TODO:2",
      type: "input",
      required: true,
    },
    {
      label: "邮箱",
      key: "TODO:3",
      type: "input",
      required: true,
    },
    // 关联角色
    roleFunction.roleFormListConfigFun({ treeData: roleList, label: "关联角色" }),
    // 关联部门
    departmentFunction.departmentFormListConfigFun({ treeData: departmentList }),
    {
      label: "钉钉ID",
      key: "TODO:5",
      type: "input",
    },
    {
      label: "备注",
      key: "TODO:8",
      type: "textArea",
    }
  ]

  return (
    <Card>
      <SearchList
        url="/TODO:"
        tableColumns={tableColumnList}
        searchSchema={searchSchemaList}
        useCache={true}
        needReload={reloadList}
      >
        <Button onClick={newAccount} type="primary">新增账号</Button>
      </SearchList>
      <ModalForm
        visible={showNewAccountModal}
        title={returnModalTitle()}
        onOk={accountModalOkHandler}
        onCancel={cancelModalHandler}
        formList={configFormList}
        initValue={activeAccount}
      />
    </Card>
  )
}

export default accountList