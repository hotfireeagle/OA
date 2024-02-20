import PropTypes from "prop-types"

const permissionCheck = () => {
  // TODO:
  return true
}

const P = ({
  code,
  is="a", // 默认是a标签，如果不是的话，那么传组件函数进来，注意不能是Element
  ...otherProps
}) => {
  const hasCode = permissionCheck(code)

  if (!hasCode) {
    // 没有这个权限
    return null
  }

  const nota = is != "a"

  if (nota) {
    const TrueEle = is
    return <TrueEle {...otherProps} />
  }

  const clickHandler = event => {
    event.preventDefault()
    otherProps.onClick(event)
  }

  const styleObj = otherProps.style || {}

  return (
    <a style={styleObj} onClick={clickHandler} href="#">
      {otherProps.children}
    </a>
  )
}

P.propTypes = {
  code: PropTypes.string, // 权限的code
  onClick: PropTypes.func, // 点击的回调方法
}

export default P