import { ModalForm, request } from "buerui"
import PropTypes from "prop-types"

const NewFlowGroup = props => {
  const newFlowGroupFormList = [
    {
      label: "请输入要添加的组名",
      key: "groupName",
      type: "input",
      required: true,
    }
  ]

  const extraFormProps = {
    layout: "vertical",
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  }

  const newHandler = values => {
    console.log("run me", values)
    return request("/api/bms/flowGroup/insert", values).then(() => {
      if (props.okFunc) {
        props.okFunc()
      }
    })
  }

  return (
    <ModalForm
      title="新建流程分组"
      visible={props.visible}
      formList={newFlowGroupFormList}
      onOk={newHandler}
      onCancel={props.hideFunc}
      extraFormProps={extraFormProps}
    />
  )
}

NewFlowGroup.propTypes = {
  visible: PropTypes.bool, // 弹窗是否可见
  hideFunc: PropTypes.func, // 隐藏弹窗的处理方法
  okFunc: PropTypes.func,
}

export default NewFlowGroup