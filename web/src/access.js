/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState) {
  const menus = initialState?.menus || []
  const permissionObj = {}
  for (const menuName of menus) {
    permissionObj[menuName] = true
  }
  return permissionObj
}
