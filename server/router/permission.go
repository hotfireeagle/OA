package router

import (
	"oa/util"

	"github.com/gin-gonic/gin"
)

// 获取api树
func getPermissonTree(c *gin.Context) {
	apis := util.PermissionBus.GetApiTree()
	okRes(c, apis)
}

// 获取菜单树
func fetchMenuTreeRoute(c *gin.Context) {
	menus := util.PermissionBus.GetMenuTree()
	okRes(c, menus)
}
