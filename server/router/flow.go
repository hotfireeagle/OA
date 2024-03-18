package router

import (
	"oa/model"
	"oa/util"

	"github.com/gin-gonic/gin"
)

func findFlowDetailRoute(c *gin.Context) {
	id := c.Param("id")

	if id == "" {
		errRes(c, util.EmptyIdErr)
		return
	}

	flow, err := model.FindFlowDetailById(id)
	if err != nil {
		errRes(c, err)
		return
	}

	okRes(c, flow)
}

func insertFlowRoute(c *gin.Context) {
	flow := new(model.Flow)
	if !validate(c, flow) {
		return
	}
	flow.SetCreateUID(c)
	errok(flow.Insert(), c)
}

func selectFlowListRoute(c *gin.Context) {
	data := new(model.QueryFlowData)
	if !validate(c, data) {
		return
	}

	flow := new(model.Flow)
	list, err := flow.Pagaination(data)

	if err != nil {
		errRes(c, err)
		return
	}

	okRes(c, list)
}

func updateFlowBasicRoute(c *gin.Context) {
	flow := new(model.Flow)
	if !validate(c, flow) {
		return
	}

	errok(flow.UpdateFlowBasic(), c)
}

func updateFlowCofigRoute(c *gin.Context) {
	flow := new(model.Flow)
	if !validate(c, flow) {
		return
	}
	errok(flow.UpdateFlowConfig(), c)
}
