import { useState, useEffect } from "react"
import { initFlowData } from "@/utils/enum"
import { FlowCanvas } from "@/components/flowCanvas"
import styles from "./index.less"

export const Flow = props => {
  const [flowSchema, setFlowSchema] = useState(initFlowData)

  return (
    <div className={styles.flowCanvasContainer}>
      <FlowCanvas schema={flowSchema} />
    </div>
  )
}
