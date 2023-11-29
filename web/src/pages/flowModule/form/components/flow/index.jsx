import { FlowCanvas } from "@/components/flowCanvas"
import styles from "./index.less"
import { useFlowStore } from "./store"

export const Flow = props => {
  const { flowData } = useFlowStore()

  return (
    <div className={styles.flowCanvasContainer}>
      <FlowCanvas schema={flowData} />
    </div>
  )
}
