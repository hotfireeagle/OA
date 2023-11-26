import { BoolForm, request } from "buerui"
import styles from "./index.less"
import ChooseAndNewGroup from "./chooseAndNewGroup"
import { history } from "umi"

const Basic = () => {
  const basicFormList = [
    {
      label: "表单名称",
      type: "input",
      key: "flowName",
      required: true,
    },
    {
      label: "所在分组",
      type: "custom",
      key: "group",
      render: () => <ChooseAndNewGroup />,
      required: true,
    },
    {
      label: "消息通知方式",
      type: "select",
      key: "msgNotifyWay",
      required: true,
    },
    {
      label: "消息通知标题",
      type: "input",
      key: "msgNotifyTitle",
      required: true,
    },
    {
      label: "表单说明",
      type: "textArea",
      key: "flowDesc",
    }
  ]

  const extraFormProps = {
    layout: "vertical",
  }

  const submitHandler = values => {
    return request("/api/bms/flowBasic/insert", values).then(flowId => {
      history.replace(`/flowModule/detail/${flowId}`)
    })
  }

  return (
    <div className={styles.container}>
      <BoolForm
        list={basicFormList}
        extraFormProps={extraFormProps}
        submitBtnText="保存并进入下一步"
        onSubmit={submitHandler}
      />
    </div>
  )
}

export default Basic