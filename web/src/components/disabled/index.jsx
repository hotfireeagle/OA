import PropTypes from "prop-types"
import { Tooltip } from "antd"
import styles from "./index.less"

const Disabled = ({
  disabled,
  reason,
  is="a",
  ...restProps
}) => {
  const childrenResolver = () => {
    const returnOnClick = () => {
      if (disabled) {
        return () => {}
      }
      return restProps.onClick
    }

    const returnClassName = () => {
      const clsList = []
      if (restProps.className) {
        clsList.push(restProps.className)
      }
      if (disabled) {
        clsList.push(styles.disabledCls)
      }
      return clsList.join(" ")
    }

    if (is === "a") {
      return (
        <a {...restProps} onClick={returnOnClick()} className={returnClassName()}>
          {restProps.children}
        </a>
      )
    }

    const TrueEle = is
    return <TrueEle {...restProps} onClick={returnOnClick()} className={returnClassName()} />
  }

  if (disabled) {
    return (
      <Tooltip title={reason}>
        {childrenResolver()}
      </Tooltip>
    )
  }

  return childrenResolver()
}

Disabled.propTypes = {
  disabled: PropTypes.bool, // 是否禁止点击
  reason: PropTypes.string, // 禁止原因
}

export default Disabled