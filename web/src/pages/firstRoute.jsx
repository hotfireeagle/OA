import routeConfigData from "../../config/routes"
import { history } from "umi"
import { tokenStore, permissionStore } from "buerui"

const FirstRoute = () => {
  if (!tokenStore.get()) {
    history.replace("/user/login")
  }

  let userAuths = []
  try {
    userAuths = permissionStore.get() || []
  } catch(err) {
    console.error(err)
    history.replace("/user/login")
  }

  // 判断是不是关于菜单的配置项
  const checkIsMenu = configData => {
    if (!configData) {
      return false
    }

    const { component, path, name, hideInMenu, routes } = configData

    // 不会在菜单中显示的不算
    if (hideInMenu === true) {
      return false
    }

    // 是个菜单组
    if (routes && routes.length) {
      return false
    }

    return component && path && name
  }

  // 从菜单数组中找出第一个存在权限的菜单
  const findFirstHasAuthRoute = () => {
    let answer = null

    const dfs = data => {
      if (answer) {
        return
      }

      if (!data) {
        return
      }

      if (data.layout === false) {
        return
      }

      if (checkIsMenu(data)) {
        const { access } = data

        if (!access || userAuths.includes(access)) {
          answer = data.path
          return
        }
      }

      if (data.routes && data.routes.length) {
        for (const i2 of data.routes) {
          dfs(i2)
        }
      }
    }

    for (const item of routeConfigData) {
      dfs(item)
    }

    return answer
  }

  const firstHasAuthRoute = findFirstHasAuthRoute() || "/unAuth"

  history.replace(firstHasAuthRoute)

  return <div>...</div>
}

export default FirstRoute