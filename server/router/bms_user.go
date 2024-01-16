package router

import (
	"errors"
	"oa/model"
	"oa/util"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/hotfireeagle/permissionbus"
)

func insertBmsUserRoute(c *gin.Context) {
	userObj := new(model.BmsUser)
	userObj.IsAdmin = 0 // 不允许通过API的形式新增超级管理员用户

	if !validate(c, userObj) {
		return
	}

	userObj.Password = util.Sha256(userObj.Password)
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

	if !util.Sha256Check(postUser.Password, dbUser.Password) {
		errRes(c, errors.New("密码错误"))
		return
	}

	token, err := permissionbus.GenerateToken(dbUser.UserId, time.Now().Add(2*24*time.Hour))
	if err != nil {
		errRes(c, err)
		return
	}

	okRes(c, token)
}

// 利用token获取用户的详情信息
func fetchUserDetailRoute(c *gin.Context) {
	uid := c.GetString("uid")
	userDetail, err := model.BmsUser{UserId: uid}.Search()
	if err != nil {
		errRes(c, err)
		return
	}
	userDetail.Password = ""
	okRes(c, userDetail)
}
