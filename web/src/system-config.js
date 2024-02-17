import { message as antdMessage } from "antd"
import { tokenStore } from "buerui"
import { history } from "@umijs/max"

export default {
  systemName: "flow-system",
  apiTokenKey: "Authorization", // 请求头中的token名称
  extraAxiosCreateInstanceConfig: {
    baseURL: "/api/bms",
  },
  listApiPageSizeKey: "pageSize",
  responseInterceptor: (response) => {
    const responseType = response?.headers?.["content-type"]

    // 不是json格式数据的直接返回，比如说验证码接口
    if (responseType && !responseType.includes("application/json")) {
      return response?.data
    }

    let res = response.data // 接口返回的最外层响应体

    const { code, msg, data } = res

    // 一些需要重新进行登录的code
    const needLoginCode = [
      2, // 不存在token
    ]

    if (needLoginCode.includes(code)) {
      const loginRoute = "/user/login"

      if (!window.location.pathname.includes(loginRoute)) {
        antdMessage.error(msg || "登录失败！请重新登录")
        history.replace(loginRoute)
        tokenStore.remove()
      }
      return Promise.reject(res)
    }

    const successCode = 1 // 成功的code

    if (code != successCode) {
      antdMessage.error(msg || "系统出现错误");
      return Promise.reject(code)
    } else {
      return data
    }
  }, // 请求响应拦截器
}