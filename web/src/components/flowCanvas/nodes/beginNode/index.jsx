import { NodeCommon } from "../../base"
import { usePost } from "@/hooks/usePost"
import { arr2map } from "@/utils"

export const BeginNode = props => {
  const allSystemUserList = usePost("/user/all", {needContainAll: true})
  const roleList = usePost("/role/listAll", {needContainAll: true})

  const formList = [
    {
      label: "按人",
      type: "select",
      key: "user",
      oplist: allSystemUserList,
      opk: "userId",
      opv: "email",
      extraAtomProps: {
        mode: "multiple",
      },
    },
    {
      label: "按角色",
      type: "select",
      key: "role",
      oplist: roleList,
      opk: "id",
      opv: "name",
      extraAtomProps: {
        mode: "multiple",
      },
    }
  ]

  const contentRender = () => {
    if (!props.attr?.role?.length && !props.attr?.user?.length) {
      return <span className="warnColor">请设置发起人</span>
    }

    const o1SearchRoleMap = arr2map(roleList, "id")
    const o1SearchUserMap = arr2map(allSystemUserList, "userId")
    const { role=[], user=[] } = props.attr
    const userCnList = user.map(uid => {
      const uObj = o1SearchUserMap[uid]
      return uObj?.email
    })
    const roleCnList = role.map(roleId => {
      const rObj = o1SearchRoleMap[roleId]
      return rObj?.name
    })

    let ele = []
    if (userCnList.length) {
      ele.push(<div className="justOneRow smallFont">用户：{userCnList.join('、')}</div>)
    }
    if (roleCnList.length) {
      ele.push(<div className="justOneRow smallFont">角色：{roleCnList.join('、')}</div>)
    }
    return ele
  }

  return (
    <>
      <NodeCommon
        {...props}
        contentRender={contentRender}
        configSchema={formList}
      />
    </>
  )
}