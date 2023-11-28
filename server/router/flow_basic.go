package router

import (
	"errors"
	"oa/model"
	"oa/util"

	"github.com/gin-gonic/gin"
)

func insertFlowBasicRoute(c *gin.Context) {
	flowBasic := new(model.FlowBasic)
	if !validate(c, flowBasic) {
		return
	}
	err, flowId := flowBasic.Insert()
	if err != nil {
		errRes(c, err)
		return
	}
	okRes(c, flowId)
}

func updateFlowBasicRoute(c *gin.Context) {
	flowBasic := new(model.FlowBasic)
	if !validate(c, flowBasic) {
		return
	}

	if flowBasic.Id == "" {
		errRes(c, errors.New("缺少ID"))
		return
	}

	errok(flowBasic.Update(), c)
}

func findFlowBasicDetailRoute(c *gin.Context) {
	id := c.Param("id")

	if id == "" {
		errRes(c, util.EmptyIdErr)
		return
	}

	basic, err := model.FindFlowBasicDetailById(id)
	if err != nil {
		errRes(c, err)
		return
	}

	okRes(c, basic)
}
