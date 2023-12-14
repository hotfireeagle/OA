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
	flowBasic.GET("/:id", findFlowBasicDetailRoute)

	flow := bmsGroup.Group("/flow")
	flow.GET("/:id", findFlowDetailRoute)

	departmentGroup := bmsGroup.Group("/department")
	departmentGroup.POST("/insert", insertDepartmentRoute)
	departmentGroup.POST("/update", updateDepartmentRoute)
	departmentGroup.POST("/list", getDepartmentListRoute)
	departmentGroup.GET("/tree", getDepartmentTreeRoute)

	commonGroup := bmsGroup.Group("/common")
	commonGroup.GET("/notifyMethodList", fetchNotifyMethodListRoute)
}
