package router

import (
	"oa/model"

	"github.com/gin-gonic/gin"
)

// 新增角色
func insertRoleRoute(c *gin.Context) {
	role := new(model.Role)

	if !validate(c, role) {
		return
	}

	role.SetCreateTime()
	role.SetCreateUID(c.GetString("uid"))

	errok(role.Insert(), c)
}

// 查询角色列表
func fetchRoleListRoute(c *gin.Context) {
	searchData := new(model.RoleListSearchParam)

	if !validate(c, searchData) {
		return
	}

	roleListRes, err := searchData.Pagination()
	if err != nil {
		errRes(c, err)
		return
	}

	okRes(c, roleListRes)
}
