import styles from "./index.less"
import { LeftSquareOutlined, FileDoneOutlined, SendOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { Basic } from "./components/basic"
import { Flow } from "./components/flow"
import { useState, useMemo, useEffect } from "react"
import { useParams } from "umi"
import { request } from "buerui"
import { pubsub, saveKeys } from "./tool"

const FlowModuleDetail = () => {
  const { id } = useParams()
  const [activeStep, setActiveStep] = useState(0) // 处于焦点的步骤
  const [flowDetail, setFlowDetail] = useState({})

  const steps = [
    { stepName: "①基础信息", key: saveKeys.basic },
    { stepName: "②审批表单", key: saveKeys.form },
    { stepName: "③审批流程", key: saveKeys.config },
  ]

  const eleList = useMemo(() => [
    <Basic basicId={flowDetail?.flowBasicId} />,
    null,
    <Flow />,
  ], [flowDetail])

  const saveCurrentStepHandler = () => {
    const keyName = steps[activeStep].key
    pubsub.publish(keyName)
  }

  useEffect(() => {
    if (!id) {
      // 不是处在详情模式下面
      return
    }

    request(`/api/bms/flow/${id}`, {}, "get").then(res => {
      setFlowDetail(res)
    })
  }, [id])

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Button
            type="primary"
            icon={<LeftSquareOutlined />}
          >
            回到列表
          </Button>
          <span className={styles.formNameCls}>未命名表单</span>
        </div>
        <div className={styles.center}>
          {
            steps.map(((stepObj, idx) => (
              <div
                onClick={() => setActiveStep(idx)}
                key={idx}
                className={`${styles.stepCls} ${activeStep == idx ? styles.activeStepCls : ''}`}
              >
                {stepObj.stepName}
              </div>
            )))
          }
        </div>
        <div className={styles.right}>
          {/* <Button
            className={styles.mr10}
            icon={<SendOutlined />}
            type="primary"
          >
            发布
          </Button> */}
          <Button
            icon={<FileDoneOutlined />}
            type="primary"
            onClick={saveCurrentStepHandler}
          >
            保存当前步骤
          </Button>
        </div>
      </div>

      <div className={styles.formContainer}>
        {eleList[activeStep]}
      </div>
    </div>
  )
}

export default FlowModuleDetail