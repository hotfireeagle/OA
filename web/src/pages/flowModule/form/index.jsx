import styles from "./index.less"
import { LeftSquareOutlined, FileDoneOutlined } from "@ant-design/icons"
import { Button, Spin } from "antd"
import { Flow } from "./components/flow"
import { useState, useEffect } from "react"
import { useParams } from "umi"
import { request } from "buerui"
import { pubsub, saveKeys } from "./tool"

const FlowModuleDetail = () => {
  const { id } = useParams()

  const [activeStep, setActiveStep] = useState(0) // 处于焦点的步骤
  const [flowDetail, setFlowDetail] = useState({}) // flow详情数据
  const [loadingDetail, setLoadingDetail] = useState(false) // 是否加载详情数据中

  const steps = [
    { stepName: "②审批表单", key: saveKeys.form },
    { stepName: "③审批流程", key: saveKeys.config },
  ]

  const eleList = [
    <Flow detail={flowDetail} />,
    null,
  ]

  const saveCurrentStepHandler = () => {
    const keyName = steps[activeStep].key
    pubsub.publish(keyName)
  }

  useEffect(() => {
    if (!id) {
      // 不是处在详情模式下面
      return
    }
    setLoadingDetail(true)
    request(`/flow/detail/${id}`).then(res => {
      setFlowDetail(res)
    }).finally(() => {
      setLoadingDetail(false)
    })
  }, [id])

  return (
    <Spin spinning={loadingDetail}>
      <div className={styles.pageContainer}>
        <div className={styles.header}>
          <div className={styles.left}>
            <Button
              type="primary"
              icon={<LeftSquareOutlined />}
            >
              回到列表
            </Button>
            <span className={styles.formNameCls}>{flowDetail?.name}</span>
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
    </Spin>
  )
}

export default FlowModuleDetail