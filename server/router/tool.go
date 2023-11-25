package router

import (
	"oa/model"

	"github.com/gin-gonic/gin"
)

// 业务逻辑运行正常时的响应数据
func okRes(ctx *gin.Context, data interface{}) {
	res := model.Response{
		Code: model.Success,
		Data: data,
	}
	ctx.JSON(200, res)
}

// 业务逻辑运行错误时的响应数据
func errRes(ctx *gin.Context, err error) {
	errMsg := err.Error()
	if errMsg == "EOF" {
		errMsg = "wrong request body"
	}

	res := model.Response{
		Code: model.Err,
		Msg:  errMsg,
	}
	ctx.JSON(200, res)
}

// 未登录时响应
func unLoginRes(ctx *gin.Context, err string) {
	res := model.Response{
		Code: model.NeedLogin,
		Msg:  err,
	}
	ctx.JSON(200, res)
}

// 权限不足时的响应
func unAuthRes(ctx *gin.Context) {
	res := model.Response{
		Code: model.UnAuth,
	}
	ctx.JSON(200, res)
}

func validate(ctx *gin.Context, data interface{}) bool {
	if err := ctx.ShouldBindJSON(data); err != nil {
		errRes(ctx, err)
		return false
	}

	return true
}
