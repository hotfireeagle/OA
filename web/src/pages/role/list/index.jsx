import { Card, Button } from "antd"
import { SearchList } from "buerui"
import { history } from "umi"

const Role = () => {
  const clickNewRole = () => {
    history.push("/permission/role/new")
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

  return (
    <Card>
      <SearchList
        url="/TODO:"
        tableColumns={tableColumnList}
        searchSchema={searchSchemaList}
        useCache={true}
      >
        <Button onClick={clickNewRole} type="primary">新增角色</Button>
      </SearchList>
    </Card>
  )
}

export default Role