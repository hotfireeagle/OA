import { Card, message } from "antd"
import { BoolForm, request } from "buerui"
import { useState, useEffect } from "react"
import { useParams, history } from "umi"

const RoleForm = () => {
  const paramsObj = useParams()
  const [allPermissionList, setAllPermissionList] = useState([]) // 功能权限树

  const isDetailMode = !!paramsObj.id

  const roleFormSchema = [
    {
      label: "角色名称",
      key: "TODO:1",
      type: "input",
      required: true,
    },
    {
      label: "角色权限",
      key: "TODO:2",
      type: "permissionTree",
      required: true,
      list: allPermissionList,
      valueKey: "id",
    }
  ]

  const submitHandler = values => {
    return request("/TODO:", values).then(() => {
      message.success("操作成功")
      history.back(-1)
    })
  }

  // 加载权限列表数据
  useEffect(() => {
    request("/api/bms/permission/tree", {}, "get").then(res => {
      setAllPermissionList(res || [])
    })
  }, [])

  return (
    <Card>
      <BoolForm
        detailConfig={{
          api: "/TODO:",
          doRequest: isDetailMode,
        }}
        list={roleFormSchema}
        onSubmit={submitHandler}
      />
    </Card>
  )
}

export default RoleForm