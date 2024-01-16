package router

import (
	"oa/middleware"

	"github.com/gin-gonic/gin"
)

func InitRoute(g *gin.Engine) {
	gateway := g.Group("/api")
	bmsGroup := gateway.Group("/bms")
	bmsGroup.Use(middleware.AuthMiddleware())

	bmsUserModule := bmsGroup.Group("/user")
	bmsUserModule.POST("/insert", insertBmsUserRoute)
	bmsUserModule.POST("/login", bmsUserLoginRoute)
	bmsUserModule.GET("/detail", fetchUserDetailRoute)

	flowGroup := bmsGroup.Group("/flowGroup")
	flowGroup.POST("/insert", insertFlowGroupRoute)
	flowGroup.GET("/list", fetchAllFlowGroupRoute)

	flowBasic := bmsGroup.Group("/flowBasic")
	flowBasic.POST("/insert", insertFlowBasicRoute)
	flowBasic.GET("/:id", findFlowBasicDetailRoute)

	flow := bmsGroup.Group("/flow")
	flow.GET("/:id", findFlowDetailRoute)

	permissionGroup := bmsGroup.Group("/permission")
	permissionGroup.GET("/tree", getPermissonTree)

	commonGroup := bmsGroup.Group("/common")
	commonGroup.GET("/notifyMethodList", fetchNotifyMethodListRoute)
}
