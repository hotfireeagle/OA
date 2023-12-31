package router

import (
	"errors"
	"oa/model"

	"github.com/gin-gonic/gin"
)

func insertBmsUserRoute(c *gin.Context) {
	userObj := new(model.BmsUser)
	userObj.IsAdmin = 0 // 不允许通过API的形式新增超级管理员用户

	if !validate(c, userObj) {
		return
	}

	err := userObj.Insert()
	if err != nil {
		errRes(c, err)
		return
	}

	okRes(c, "")
}

// 后台用户进行登录的路由
func bmsUserLoginRoute(c *gin.Context) {
	postUser := new(model.BmsUser)
	if !validate(c, postUser) {
		return
	}

	// 根据用户邮箱查找数据库用户
	dbUser, err := postUser.Search()
	if err != nil {
		errRes(c, err)
		return
	}

	if dbUser.Password != postUser.Password {
		errRes(c, errors.New("密码错误"))
		return
	}

	okRes(c, "")
}

// 利用token获取用户的详情信息
func fetchUserDetailRoute(c *gin.Context) {
	token := c.GetHeader("token")

	if token == "" {
		errRes(c, errors.New("请先登录"))
		return
	}

	dbUser, err := model.FindBmsUserByToken(token)
	if err != nil {
		errRes(c, err)
		return
	}

	dbUser.Password = "" // 重置密码，struct tag中json也配置了omitempty，所以不会返回
	okRes(c, dbUser)
}
