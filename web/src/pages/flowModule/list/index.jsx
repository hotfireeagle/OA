import { SearchList, ModalForm, request } from "buerui"
import { Card, Button, message } from "antd"
import { history } from "umi"
import { useState } from "react"

const flowModuleList = () => {
  const [showModal, setShowModal] = useState(false)
  const [activeFlow, setActiveFlow] = useState({})
  const [reload, setReload] = useState(false)

  const tableColumnList = [
    {
      title: "ID",
      dataIndex: "id",
      width: "40%",
    },
    {
      title: "流程名称",
      dataIndex: "name",
      width: "30%",
    },
    {
      title: "操作",
      dataIndex: "id",
      render: (v, r) => {
        const editBasic = event => {
          event.preventDefault()
          setActiveFlow(r)
          setShowModal(true)
        }

        const setDetail = event => {
          event.preventDefault()
          history.push(`/flowModule/detail/${v}`)
        }

        return (
          <div className="table-operation-btn-container">
            <a onClick={editBasic} href="#">修改基本信息</a>
            <a onClick={setDetail} href="#">详情信息</a>
          </div>
        )
      }
    }
  ]

  const searchSchemaList = [
    {
      label: "流程名称",
      type: "input",
      key: "name",
    },
  ]

  const returnModalTitle = () => {
    if (activeFlow.id) {
      return "编辑流程"
    }
    return "新建流程"
  }

  const modalOkHandler = values => {
    let url = "/flow/insert"
    if (activeFlow.id) {
      url = "/flow/updateBasic"
    }
    const postData = {
      ...activeFlow,
      ...values,
    }
    return request(url, postData).then(() => {
      message.success("操作成功")
      setReload(!reload)
    })
  }

  const modalFormList = [
    {
      label: "流程名称",
      type: "input",
      key: "name",
      required: true,
    },
  ]

  return (
    <Card>
      <SearchList
        url="/flow/list"
        tableColumns={tableColumnList}
        searchSchema={searchSchemaList}
        needReload={reload}
      >
        <Button onClick={() => {setShowModal(true)}} type="primary">新增流程</Button>
      </SearchList>

      <ModalForm
        visible={showModal}
        title={returnModalTitle()}
        onOk={modalOkHandler}
        onCancel={() => setShowModal(false)}
        formList={modalFormList}
        initValue={activeFlow}
      />
    </Card>
  )
}

export default flowModuleList