package router

import (
	"oa/model"

	"github.com/gin-gonic/gin"
)

// 获取通知方式枚举值列表
func fetchNotifyMethodListRoute(c *gin.Context) {
	res := []model.OptionItem{
		{Value: 1, Name: "钉钉"},
		{Value: 2, Name: "微信"},
		{Value: 3, Name: "邮箱"},
	}
	okRes(c, res)
}
