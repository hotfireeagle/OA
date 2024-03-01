import {
  SearchList,
  ModalForm,
  request,
} from "buerui"
import { Card, Button, message, Modal } from "antd"
import { useState } from "react"
import { useRoleList } from "@/utils/ajax"
import ToClipboard from "@/components/copy"

const accountList = () => {
  const roleList = useRoleList()

  const [showNewAccountModal, setShowNewAccountModal] = useState(false)
  const [activeAccount, setActiveAccount] = useState({})
  const [reloadList, setReloadList] = useState(false)

  const checkIsValidaActiveAccount = () => !!activeAccount["userId"]

  const tableColumnList = [
    {
      title: "账号",
      dataIndex: "email",
    },
    {
      title: "角色",
      dataIndex: "roleName",
    },
  ]

  const searchSchemaList = [
    {
      label: "账号",
      type: "input",
      key: "email",
    },
    {
      label: "角色",
      type: "select",
      key: "roleId",
      oplist: roleList,
      opk: "id",
      opv: "name",
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
    let url = "/user/insert"
    if (checkIsValidaActiveAccount()) {
      url = "/user/update"
    }

    return request(url, postData, "post").then(res => {
      message.success("操作成功")
      setReloadList(!reloadList)
      cancelModalHandler()

      if (!checkIsValidaActiveAccount()) {
        // 新增账号的情况下，显示密码弹窗
        const password = res
        const modalIns = Modal.info({
          title: "初始密码",
          content: `初始密码：${password}`,
          maskClosable: false,
          footer: () => {
            const close = () => {
              modalIns.destroy()
            }
            return (
              <ToClipboard text={password} cb={close}>
                <Button type="primary">复制</Button>
              </ToClipboard>
            )
          }
          // onOk: function() {
          //   cv(password)
          // }
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
      label: "账号",
      key: "email",
      type: "input",
      required: true,
    },
    {
      label: "角色",
      key: "roleId",
      type: "select",
      oplist: roleList,
      opk: "id",
      opv: "name",
      required: true,
    },
  ]

  return (
    <Card>
      <SearchList
        url="/user/list"
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