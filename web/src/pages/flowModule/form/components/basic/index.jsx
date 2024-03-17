import { BoolForm, request } from "buerui"
import styles from "./index.less"
import ChooseAndNewGroup from "./chooseAndNewGroup"
import { history } from "umi"
import { pubsub, saveKeys } from "../../tool"
import { useEffect, useRef } from "react"

export const Basic = props => {
  const formRef = useRef()

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
      key: "groupId",
      render: () => <ChooseAndNewGroup />,
      required: true,
    },
    {
      label: "消息通知方式",
      type: "select",
      key: "msgNotifyWay",
      required: true,
      remote: {
        api: "/api/bms/common/notifyMethodList",
        method: "get",
      },
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
      required: true,
    }
  ]

  const extraFormProps = {
    layout: "vertical",
  }

  useEffect(() => {
    const submitHandler = async () => {
      const values = await formRef.current.submit()
      return request("/api/bms/flowBasic/insert", values).then(flowId => {
        history.replace(`/flowModule/detail/${flowId}`)
      })
    }
  
    pubsub.register(saveKeys.basic, submitHandler)

    return () => {
      pubsub.unRegister(saveKeys.basic)
    }
  }, [])

  return (
    <div className={styles.container}>
      <BoolForm
        ref={formRef}
        detailConfig={{
          api: `/api/bms/flowBasic/${props.basicId}`,
          requestMethod: "get",
          doRequest: !!props.basicId,
        }}
        list={basicFormList}
        extraFormProps={extraFormProps}
        hideBtn={true}
      />
    </div>
  )
}
