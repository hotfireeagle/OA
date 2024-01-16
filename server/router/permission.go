package router

import (
	"oa/util"

	"github.com/gin-gonic/gin"
)

// 获取permission树
func getPermissonTree(c *gin.Context) {
	menus := util.PermissionBus.GetMenuTree()
	okRes(c, menus)
}
