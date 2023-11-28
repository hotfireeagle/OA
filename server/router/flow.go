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
