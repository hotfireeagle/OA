// 用于复制内容到剪切板
import CopyToClipboard from "react-copy-to-clipboard"
import { message } from "antd"

const ToClipboard = (props) => {
  const onCopy = (e) => {
    message.destroy()
    message.success("复制成功")
    if (props.cb) {
      props.cb()
    }
  }

  return (
    <CopyToClipboard text={props.text} onCopy={onCopy}>
      {props.children}
    </CopyToClipboard>
  )
}

export default ToClipboard