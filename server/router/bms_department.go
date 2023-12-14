package router

import (
	"oa/model"
	"oa/util"

	"github.com/gin-gonic/gin"
)

func insertDepartmentRoute(c *gin.Context) {
	department := new(model.Department)

	if !validate(c, department) {
		return
	}

	err := department.Insert()
	errok(err, c)
}

func updateDepartmentRoute(c *gin.Context) {
	department := new(model.Department)

	if !validate(c, department) {
		return
	}

	if department.Id == 0 {
		errRes(c, util.EmptyIdErr)
		return
	}

	err := department.Update()
	errok(err, c)
}

func getDepartmentListRoute(c *gin.Context) {
	query := new(model.DepartmentPaginationQuery)
	if !validate(c, query) {
		return
	}

	list, total, err := model.SelectDepartmentList(query)

	if err != nil {
		errRes(c, err)
		return
	}

	res := &model.DepartmentPaginationResponse{
		Current:  query.Current,
		PageSize: query.PageSize,
		Total:    total,
		List:     list,
	}

	okRes(c, res)
}

func getDepartmentTreeRoute(c *gin.Context) {
	res, err := model.SelectDepartmentTree()

	if err != nil {
		errRes(c, err)
		return
	}

	okRes(c, res)
}
