import { componentColorMap, componentNameMap } from "./enum"
import { findSomeNodeParentNode, findTreeNode } from "./tool"
import { message, Drawer, Form, Button } from "antd"
import { NextNode } from "./nextNode"
import styles from "./style.less"
import { useFlowStore } from "@/pages/flowModule/form/components/flow/store"
import { useState } from "react"
import { FormList } from "buerui"
import PropTypes from "prop-types"

/**
 * 所有节点都会使用它来进行渲染
 * @param {*} props 
 * @returns 
 */
export const NodeCommon = props => {
  const { flowData, updateFlow } = useFlowStore()
  const [formInstance] = Form.useForm()

  const [showDrawer, setShowDrawer] = useState(false)

  // 点击显示配置弹窗，如果需要进行配置的话
  const clickHandler = event => {
    event.stopPropagation()
    setShowDrawer(true)
  }

  // 判断是否显示指向节点的箭头（上一个节点指向下一个节点的）
  const checkShowTopHeaderArrow = () => {
    const hide = [flowNodeType.begin]
    return !hide.includes(props?.nodeType)
  }

  // 删除节点的处理方法
  const deleteNodeHandler = () => {
    const parentNode = findSomeNodeParentNode(flowData, props)
    if (parentNode) {
      if (props.nodeType == flowNodeType.caseBranch) {
        if (parentNode?.attr?.caseSchema?.length <= 2) {
          message.warning("条件节点必须至少包含有两个分支")
          return
        }
        const idx = parentNode.attr.caseSchema.findIndex(obj => {
          return obj.id == props.id
        })
        if (idx != -1) {
          parentNode.attr.caseSchema.splice(idx, 1)
          updateFlow(flowData)
        }
      } else {
        parentNode.next = props.next
        updateFlow(flowData)
      }
    }
  }

  // 保存的处理方法
  const saveHandler = async () => {
    const values = await formInstance.validateFields()
    // 保存到节点的attr里面
    const node = findTreeNode(flowData, props.id)
    node.attr = {
      ...(node.attr || {}),
      ...values,
    }
    updateFlow(flowData) // TODO: 测试配置数据能不能正常到达attr里面
    closeDrawerHandler()
  }

  const closeDrawerHandler = () => {
    setShowDrawer(false)
  }

  // 渲染保存按钮和取消按钮
  const renderSaveAndCloseArea = () => {
    return (
      <div className={styles.saveAndCloseContainer}>
        <div className={styles.flexg} />
        <Button onClick={saveHandler} type="primary" className={styles.saveCls}>保存</Button>
        <Button onClick={closeDrawerHandler} className={styles.cancelCls}>取消</Button>
      </div>
    )
  }

  return (
    <>
      <div className={styles.nodeWrapper}>
        <div onClick={clickHandler} className={styles.nodeContainer}>
          <div
            className={styles.nodeHeader}
            style={{
              background: componentColorMap[props.nodeType],
            }}
          >
            {
              checkShowTopHeaderArrow() ? (
                <div className={styles.withArrowInNodeHeader}></div>
              ) : null
            }
            <span>{props.title || componentNameMap[props.nodeType]}</span>
            {
              checkShowTopHeaderArrow() ? (
                <img
                  onClick={deleteNodeHandler}
                  className={styles.deleteIcon}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAb5JREFUeF7tms8qRVEUxn9fGSoDJXNFyUTdqXgGSZnJI3gPj6CYKXkHSZlJlCRzxUiZGSxObmTg3s5e53ZOne+M92+vtb+99vpTR/T8U8/PjwVwBPRcAT+BngeAk+DEn0BErAIXwHTNaHsH1iVd1+RqLZ+oABGxAlwCM7W8+l38BqxJuivkx2JFAkTEMjA3Zvfqxo+A2bFejF7wCuwBVUSM+l4k3de1VSrAKbBV19iE159+CbBd14YFqKtYtT4iHAF+An3OASXPpqtMURLs6mFK/EoLEBEbJYabYiSdZ/ZqQoDIOJBlJaXOkIKHJdECZG8xwzsC/AScA1J5LAU7CX4PRq4CmSyeZV0FXAVcBVKJPAW7CrgKuAy6D3Aj5E7QrbBngWw/n+E9C3gW8CyQaudTsGcBzwKeBTwLeBbwLOBZoPezwBOwkOnnE+yjpKUEn/9ZOiLOgM2MEwn2RNJOgm9EgAFwBUxlHClgP4CBpNsC9gdJt8LDdrj6l/cw40gBuyvpuID7gzQiwFCEKhIOgEVgPuvYP/wz8ADsS7ppwkZjAjThTBt7WIA2VO+STUdAl26jDV8cAW2o3iWbvY+AT8zozUHlYySaAAAAAElFTkSuQmCC"
                />
              ) : null
            }
          </div>
          <div className={styles.nodeBody}>
            {props.contentRender()}
          </div>
        </div>
        {/** 下一个节点 */}
        <NextNode {...props} />
      </div>

      {
        props.configSchema ? (
          <Drawer
            title="设置"
            placement="right"
            onClose={() => setShowDrawer(false)}
            open={showDrawer}
            closeIcon={renderSaveAndCloseArea()}
            maskClosable={false}
          >
            <Form form={formInstance} layout="vertical">
              <FormList
                span={24}
                list={props.configSchema || []}
              />
            </Form>
          </Drawer>
        ) : null
      }
    </>
  )
}

NodeCommon.propTypes = {
  configSchema: PropTypes.any, // 配置数据
}