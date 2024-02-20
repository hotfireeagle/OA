package router

import (
	"errors"
	"oa/model"
	"strconv"

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

// 更新角色名称
func updateRoleNameRoute(c *gin.Context) {
	role := new(model.Role)

	if !validate(c, role) {
		return
	}

	errok(role.UpdateName(), c)
}

// 获取角色详情
func fetchRoleDetailRoute(c *gin.Context) {
	roleId, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		errRes(c, errors.New("ID不合法"))
		return
	}

	role := &model.Role{Id: roleId}
	detail, err := role.Detail() // 查询角色详情数据
	if err != nil {
		errRes(c, err)
		return
	}

	okRes(c, detail)
}

func updateRoleApi(c *gin.Context) {
	roleDetail := new(model.RoleDetail)
	if !validate(c, roleDetail) {
		return
	}

	errok(roleDetail.UpateApis(), c)
}
