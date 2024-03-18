import { FlowCanvas } from "@/components/flowCanvas"
import styles from "./index.less"
import { useFlowStore } from "./store"
import PropTypes from "prop-types"

export const Flow = props => {
  const { flowData } = useFlowStore()

  return (
    <div className={styles.flowCanvasContainer}>
      <FlowCanvas schema={flowData} />
    </div>
  )
}

Flow.propTypes = {
  detail: PropTypes.object, // 配置详情数据
}