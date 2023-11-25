import { SearchList } from "buerui"
import { Card } from "antd"
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

  return (
    <Card>
      <SearchList
        url="TODO:"
        tableColumns={tableColumnList}
        searchSchema={searchSchemaList}
      />
    </Card>
  )
}

export default flowModuleList