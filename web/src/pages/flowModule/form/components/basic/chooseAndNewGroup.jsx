import { useState, useEffect } from "react"
import { Select, Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import styles from "./index.less"
import NewFlowGroup from "@/components/newFlowGroup"
import { request } from "buerui"

const ChooseAndNewGroup = () => {
  const [showNewModal, setShowNewModal] = useState(false)
  const [reload, setReload] = useState(false)
  const [loadingGroupList, setLoadingGroupList] = useState(true)
  const [groupList, setGroupList] = useState([])

  useEffect(() => {
    setLoadingGroupList(true)
    request("/api/bms/flowGroup/list", {}, "get").then(res => {
      setGroupList(res)
    }).finally(() => {
      setLoadingGroupList(false)
    })
  }, [reload])

  return (
    <>
      <div className={styles.selectWrapper}>
        <Select
          className={styles.selectCls}
          placeholder="请选择分组"
          loading={loadingGroupList}
        >
          {
            groupList.map(groupObj => (
              <Select.Option key={groupObj.id} value={groupObj.id}>{groupObj.groupName}</Select.Option>
            ))
          }
        </Select>
        <Button
          className={styles.btncls}
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowNewModal(true)}
        >
          新建分组
        </Button>
      </div>
      <NewFlowGroup
        visible={showNewModal}
        hideFunc={() => setShowNewModal(false)}
        okFunc={() => setReload(v => !v)}
      />
    </>
  )
}

export default ChooseAndNewGroup