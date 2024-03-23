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

	if !validate(c, userObj) {
		return
	}

	r, e := model.FindRole(userObj.RoleId)
	if e != nil {
		errRes(c, e)
		return
	}

	if r.IsAdminRole == model.IsAdminRole {
		errRes(c, errors.New("不合法"))
		return
	}

	p := util.Random(12)
	userObj.Password = util.Sha256(p)
	err := userObj.Insert()
	if err != nil {
		errRes(c, err)
		return
	}

	okRes(c, p)
}

func updateBmsUserRoute(c *gin.Context) {
	u := new(model.BmsUser)
	if !validate(c, u) {
		return
	}
	errok(u.Update(), c)
}

// 后台用户进行登录的路由
func bmsUserLoginRoute(c *gin.Context) {
	postUser := new(model.BmsUserLoginBody)
	if !validate(c, postUser) {
		return
	}

	u := model.BmsUser{
		Email: postUser.Email,
	}

	// 根据用户邮箱查找数据库用户
	dbUser, err := u.SearchByEmail()
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
	okRes(c, userDetail)
}

func userListRoute(c *gin.Context) {
	q := new(model.BmsUserQueryParam)
	if !validate(c, q) {
		return
	}
	u := &model.BmsUser{}
	a, e := u.Pagination(q)
	if e != nil {
		errRes(c, e)
		return
	}
	okRes(c, a)
}

func allUserRoute(c *gin.Context) {
	query := new(model.QueryAllUserParam)
	if !validate(c, query) {
		return
	}

	u := new(model.BmsUser)
	answer, err := u.All(query)
	if err != nil {
		errRes(c, err)
		return
	}
	okRes(c, answer)
}
