import { SettingDrawer } from "@ant-design/pro-components"
import { history } from "@umijs/max"
import defaultSettings from "../config/defaultSettings"
import { ProBreadcrumb } from "@ant-design/pro-components"
import { tokenStore, permissionStore } from "buerui"
import { LogoutOutlined } from "@ant-design/icons"
import { fetchUserInfo } from "@/utils/ajax"

const loginPath = "/user/login"

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState() {
  const { location } = history
  if (!location.pathname.includes(loginPath)) {
    let currentUser = {}
    try {
      currentUser = await fetchUserInfo() || {}
    } catch (err) {}
    const { menus=[] } = currentUser
    permissionStore.set(menus)
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
      menus,
    }
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  }
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout = ({ initialState, setInitialState }) => {
  return {
    actionsRender: () => [],
    avatarProps: {
      render: () => {
        const exitHandler = () => {
          tokenStore.remove()
          history.replace("/user/login")
        }

        return (
          <div onClick={exitHandler}>
            <div>{initialState?.currentUser?.email}</div>
            <div className="logoutContainer">
              <LogoutOutlined />
              <div className="exitCnCls">退出登录</div>
            </div>
          </div>
        )
      },
    },
    footerRender: () => null,
    onPageChange: () => {
      if (!tokenStore.get() && location.pathname !== loginPath) {
        history.push(loginPath)
      }
    },
    layoutBgImgList: [
      {
        src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr",
        left: 85,
        bottom: 100,
        height: "303px",
      },
      {
        src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr",
        bottom: -68,
        right: -45,
        height: "303px",
      },
      {
        src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr",
        bottom: 0,
        left: 0,
        width: "331px",
      },
    ],
    links: [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />
      return (
        <>
          <div className="bool-bread-container">
            <ProBreadcrumb />
          </div>
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings,
              }))
            }}
          />
        </>
      )
    },
    ...initialState?.settings,
  }
}
