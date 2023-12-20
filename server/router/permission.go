package router

import (
	"oa/model"

	"github.com/gin-gonic/gin"
)

func insertPermissionRoute(c *gin.Context) {
	permission := new(model.Permission)

	if !validate(c, permission) {
		return
	}

	errok(permission.Insert(), c)
}

func updatePermissionRoute(c *gin.Context) {
	permission := new(model.Permission)

	if !validate(c, permission) {
		return
	}

	errok(permission.Update(), c)
}

// 获取permission树
func getPermissonTree(c *gin.Context) {
	allPermissions, err := model.SelectAllPermission()

	if err != nil {
		errRes(c, err)
		return
	}

	// 把数组改成树形结构
	answer := make([]*model.PermissionTreeItem, 0)
	topIds := make([]int, 0)
	cache := make(map[int]*model.PermissionTreeItem)

	for _, permission := range *allPermissions {
		if permission.ParentId == 0 {
			topIds = append(topIds, permission.Id)
		}

		cache[permission.Id] = &model.PermissionTreeItem{
			Permission: permission,
			Children:   make([]*model.PermissionTreeItem, 0),
		}
	}

	for _, permission := range *allPermissions {
		if permission.ParentId == 0 {
			continue
		}

		parentNode := cache[permission.ParentId]
		parentNode.Children = append(parentNode.Children, &model.PermissionTreeItem{
			Permission: permission,
			Children:   make([]*model.PermissionTreeItem, 0),
		})
	}

	for _, topId := range topIds {
		top := cache[topId]
		answer = append(answer, top)
	}

	okRes(c, answer)
}
