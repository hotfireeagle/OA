import { Card, message, notification, Button } from "antd"
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

  const submitHandler = (values, forceMenu=false) => {
    const postData = {
      ...(detailRef.current || {}),
      ...values,
    }
    let isApi2 = forceMenu ? false : isApi
    let updateApi = isApi2 ? "/role/update/api" : "/role/update/menu"
    return request(updateApi, postData).then(res => {
      if (isApi2) {
        const clickCb = () => {
          const datas = {
            menus: res,
          }
          submitHandler(datas, true)
        }
        // 修改功能权限时，会根据功能权限推荐默认的菜单权限
        if (detailRef.current.hasSetPermission == 0) {
          // 之前从来没有设置过，第一次一定要进行覆盖
          clickCb()
        } else {
          // 菜单已经设置过了，那么这里只是提醒一下是否要按照推荐方案进行更新
          notification.info({
            message: "是否按照推荐方案更新菜单权限",
            description: (<Button type="primary" size="small" onClick={clickCb}>应用推荐方案</Button>),
          })
        } 
      }
      message.success("操作成功")
      if (!forceMenu) {
        history.back(-1)
      }
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