import { useState, useEffect } from "react"
import { initFlowData } from "@/utils/enum"
import FlowCanvas from "@/components/flowCanvas"

const Flow = props => {
  const [flowSchema, setFlowSchema] = useState(initFlow)

  return (
    <div>
      <FlowCanvas schema={flowSchema} />
    </div>
  )
}

export default Flow