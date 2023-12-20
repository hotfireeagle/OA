import { Card, message } from "antd"
import { request, ModalForm } from "buerui"
import { useState, useEffect, useRef } from "react"
import { FileAddOutlined, EditOutlined } from "@ant-design/icons"
import styles from "./index.less"

const PermissionSetting = () => {
  const [permissionTree, setPermissionTree] = useState([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    request("/api/bms/permission/tree", {}, "get").then(res => {
      setPermissionTree(res)
    })
  }, [reload])

  return (
    <Card>
      <div className={styles.cardContainer}>
        <SameLevel
          permissions={permissionTree}
          reloadHandler={() => setReload(!reload)}
        />
      </div>
    </Card>
  )
}

const SameLevel = props => {
  const { permissions } = props

  const parentIdRef = useRef()

  const [activeIdx, setActiveIdx] = useState(0)
  const [showNewModal, setShowNewModal] = useState(false)
  const [activeDetail, setActiveDetail] = useState({})

  const activePermission = permissions[activeIdx]
  const childPermission = activePermission?.children || []

  const permissionFormList = [
    {
      label: "备注",
      key: "remark",
      type: "input",
      required: true,
    }
  ]

  // 在同一层级下进行新增操作
  const sameLevelNew = event => {
    event.preventDefault()
    parentIdRef.current = permissions?.[0]?.parentId
    setShowNewModal(true)
  }

  const returnCardTitle = () => {
    return (
      <div>
        <a onClick={sameLevelNew} href="#">同层级新增</a>
      </div>
    )
  }

  const returnModalTitle = () => {
    if (activeDetail?.id) {
      return "编辑权限"
    }
    return "新增权限"
  }

  const permissionModalOkHandler = values => {
    const postData = {
      ...activeDetail,
      ...values,
    }
    if (parentIdRef.current) {
      postData.parentId = parentIdRef.current
    }
    let api = "/api/bms/permission/insert"
    if (activeDetail.id) {
      api = "/api/bms/permission/update"
    }
    return request(api, postData).then(() => {
      message.success("操作成功")
      props.reloadHandler()
    })
  }

  const permissionModalCancelHandler = () => {
    setShowNewModal(false)
    setActiveDetail({})
    parentIdRef.current = null
  }

  const appendToNextLevel = pobj => {
    parentIdRef.current = pobj.id
    setShowNewModal(true)
  }

  const editHandler = pobj => {
    setActiveDetail(pobj)
    setShowNewModal(true)
  }

  return (
    <>
      <Card title={returnCardTitle()}>
        {
          permissions.map((permission, idx) => {
            let rowClsName = [styles.permissionRowCls]
            if (idx === activeIdx) {
              rowClsName.push(styles.activePermissionRowCls)
            }
            return (
              <div onClick={() => setActiveIdx(idx)} key={permission.id} className={rowClsName.join(" ")}>
                <span>{permission.remark}</span>
                <EditOutlined onClick={() => editHandler(permission)} className={styles.new} />
                <FileAddOutlined onClick={() => appendToNextLevel(permission)} className={styles.new} />
              </div>
            )
          })
        }
      </Card>
      {
        childPermission.length ? (
          <SameLevel
            permissions={childPermission}
            reloadHandler={props.reloadHandler}
          />
        ) : null
      }
      <ModalForm
        visible={showNewModal}
        title={returnModalTitle()}
        onOk={permissionModalOkHandler}
        onCancel={permissionModalCancelHandler}
        formList={permissionFormList}
        initValue={activeDetail}
      />
    </>
  )
}

export default PermissionSetting