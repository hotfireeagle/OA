package router

import (
	"errors"
	"oa/model"

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
