package router

import (
	"oa/model"

	"github.com/gin-gonic/gin"
)

func insertFlowGroupRoute(c *gin.Context) {
	flowGroup := new(model.FlowGroup)

	if !validate(c, flowGroup) {
		return
	}

	err := flowGroup.Insert()
	if err != nil {
		errRes(c, err)
		return
	}

	okRes(c, "")
}

func fetchAllFlowGroupRoute(c *gin.Context) {
	flowGroup, err := model.SearchAllFlowGroup()
	if err != nil {
		errRes(c, err)
	} else {
		okRes(c, flowGroup)
	}
}
