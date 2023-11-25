import { BoolForm } from "buerui"
import styles from "./index.less"
import ChooseAndNewGroup from "./chooseAndNewGroup"

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

  return (
    <div className={styles.container}>
      <BoolForm
        list={basicFormList}
        extraFormProps={extraFormProps}
        submitBtnText="保存并进入下一步"
      />
    </div>
  )
}

export default Basic