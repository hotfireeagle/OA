import { Card, message } from "antd"
import { BoolForm, request } from "buerui"
import { useState, useEffect, useRef } from "react"
import { useParams, history, useSearchParams } from "umi"
import { api_function } from "@/utils/enum"

const RoleForm = () => {
  const paramsObj = useParams()
  const [searchParams] = useSearchParams()
  const [allPermissionList, setAllPermissionList] = useState([]) // 功能权限树
  const detailRef = useRef()

  const functionValue = searchParams.get("modifyType")
  const isDetailMode = !!paramsObj.id

  const isApi = functionValue == api_function // 判断是修改功能还是修改菜单

  const roleFormSchema = [
    {
      label: "角色名称",
      key: "name",
      type: "input",
      readonly: true,
    },
    {
      label: isApi ? "功能权限" : "菜单权限",
      key: isApi ? "apis" : "menus",
      type: "permissionTree",
      required: true,
      list: allPermissionList,
      valueKey: "name",
    }
  ]

  const submitHandler = values => {
    const postData = {
      ...(detailRef.current || {}),
      ...values,
    }
    let updateApi = isApi ? "/role/update/api" : "/role/update/menu"
    return request(updateApi, postData).then(() => {
      message.success("操作成功")
      history.back(-1)
    })
  }

  // 加载权限列表数据
  useEffect(() => {
    let api = isApi ? "/permission/apiTree" : "/permission/menuTree"
    request(api).then(res => {
      setAllPermissionList(res || [])
    })
  }, [])

  return (
    <Card title={isApi ? "功能配置" : "菜单配置"}>
      <BoolForm
        detailConfig={{
          api: `/role/detail/${paramsObj.id}`,
          doRequest: isDetailMode,
          syncRes: res => detailRef.current = res,
        }}

        list={roleFormSchema}
        onSubmit={submitHandler}
        extraFormProps={{ labelCol: { span: 2, } }}
      />
    </Card>
  )
}

export default RoleForm