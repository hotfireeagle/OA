package router

import "github.com/gin-gonic/gin"

func InitRoute(g *gin.Engine) {
	gateway := g.Group("/api")
	bmsGroup := gateway.Group("/bms")

	bmsUserModule := bmsGroup.Group("/user")
	bmsUserModule.POST("/insert", insertBmsUserRoute)
	bmsUserModule.POST("/login", bmsUserLoginRoute)
	bmsUserModule.GET("/detail", fetchUserDetailRoute)

	flowGroup := bmsGroup.Group("/flowGroup")
	flowGroup.POST("/insert", insertFlowGroupRoute)
	flowGroup.GET("/list", fetchAllFlowGroupRoute)

	flowBasic := bmsGroup.Group("/flowBasic")
	flowBasic.POST("/insert", insertFlowBasicRoute)

	commonGroup := bmsGroup.Group("/common")
	commonGroup.GET("/notifyMethodList", fetchNotifyMethodListRoute)
}
