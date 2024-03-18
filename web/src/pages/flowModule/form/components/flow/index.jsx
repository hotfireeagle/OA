import { FlowCanvas } from "@/components/flowCanvas"
import styles from "./index.less"
import { useFlowStore, initFlowData } from "./store"
import PropTypes from "prop-types"
import { pubsub, saveKeys } from "@/pages/flowModule/form/tool"
import { useLayoutEffect, useEffect, useCallback, useRef } from "react"
import { request } from "buerui"
import { message } from "antd"

export const Flow = props => {
  const { flowData, updateFlow } = useFlowStore()
  const loadingRef = useRef(false)

  const saveConfigHandler = useCallback(() => {
    if (loadingRef.current) {
      return
    }
    const postData = {
      ...props.detail,
      flowConfig: JSON.stringify(flowData)
    }
    loadingRef.current = true
    request("/flow/updateConfig", postData).then(() => {
      message.success("保存成功")
    }).finally(() => {
      loadingRef.current = false
    })
  }, [props.detail, flowData])

  // 监听点击保存按钮
  useEffect(() => {
    pubsub.register(saveKeys.config, saveConfigHandler)
    return () => {
      pubsub.unRegister(saveKeys.config)
    }
  }, [saveConfigHandler])

  // 监听数据变化
  useLayoutEffect(() => {
    let obj = initFlowData
    try {
      obj = JSON.parse(props.detail?.flowConfig)
    } catch (err) {}
    updateFlow(obj)
  }, [props.detail])

  return (
    <div className={styles.flowCanvasContainer}>
      <FlowCanvas schema={flowData} />
    </div>
  )
}

Flow.propTypes = {
  detail: PropTypes.object, // 配置详情数据
}