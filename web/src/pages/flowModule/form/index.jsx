import styles from "./index.less"
import { LeftSquareOutlined, FileDoneOutlined, SendOutlined } from "@ant-design/icons"
import { Button } from "antd"
import Basic from "./components/basic"
import { useState, useMemo } from "react"

const FlowModuleDetail = () => {
  const [activeStep, setActiveStep] = useState(0) // 处于焦点的步骤

  const steps = [
    { stepName: "①基础信息", },
    { stepName: "②审批表单", },
    { stepName: "③审批流程", },
    { stepName: "④扩展设置", }
  ]

  const eleList = useMemo(() => [<Basic />], [])

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Button
            type="primary"
            icon={<LeftSquareOutlined />}
          >
            取消
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
          <Button
            className={styles.mr10}
            icon={<SendOutlined />}
            type="primary"
          >
            发布
          </Button>
          <Button
            icon={<FileDoneOutlined />}
          >
            保存
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