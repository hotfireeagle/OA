package router

import (
	"errors"
	"oa/model"
	"regexp"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/go-sql-driver/mysql"
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

	if isDuplicateEntryError(err) {
		column := extractDuplicateField(errMsg)
		errMsg = column + "重复"
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

func errok(operationResult error, c *gin.Context) {
	if operationResult != nil {
		errRes(c, operationResult)
	} else {
		okRes(c, "")
	}
}

func isDuplicateEntryError(err error) bool {
	var mysqlErr *mysql.MySQLError

	if ok := errors.As(err, &mysqlErr); ok {
		return mysqlErr.Number == 1062
	}

	return false
}

func extractDuplicateField(errorMessage string) string {
	re := regexp.MustCompile(`Duplicate entry '.*' for key '(.*)'`)
	match := re.FindStringSubmatch(errorMessage)
	if len(match) > 1 {
		field := match[1]
		return strings.Split(field, ".")[1]
	}
	return "数据"
}
