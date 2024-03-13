import { Result } from "antd"
import { history } from "umi"

const UnAuth = () => {
  const subTitleRender = () => {
    const clickHandler = event => {
      event.preventDefault()
      history.replace("/user/login")
    }

    return (
      <div>
        抱歉，您的账号不存在任何权限。
        <a onClick={clickHandler} href="#">重新进行登录</a>
      </div>
    )
  }

  return (
    <Result
      status="404"
      title="401"
      subTitle={subTitleRender()}
    />
  )
}

export default UnAuth