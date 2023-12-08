import { SearchList } from "buerui"
import { Card, Button } from "antd"
import { history } from "umi"
import styles from "./index.less"

const flowModuleList = () => {
  const tableColumnList = [
    {
      title: "TODO:",
      dataIndex: "TODO:",
    },
  ]

  const searchSchemaList = [
    {
      label: "TODO:",
      type: "input",
      key: "TODO:",
    },
  ]

  const newHandler = () => {
    history.push("/flowModule/new")
  }

  return (
    <Card>
      <SearchList
        url="/TODO:"
        tableColumns={tableColumnList}
        searchSchema={searchSchemaList}
      >
        <Button onClick={newHandler} type="primary">新增流程</Button>
      </SearchList>
    </Card>
  )
}

export default flowModuleList