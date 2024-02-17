package router

import (
	"oa/model"

	"github.com/gin-gonic/gin"
)

func insertRoleRoute(c *gin.Context) {
	role := new(model.Role)

	if !validate(c, role) {
		return
	}

	role.SetCreateTime()
	role.SetCreateUID(c.GetString("uid"))

	// err := role.Stringify()
	// if err != nil {
	// 	errRes(c, err)
	// 	return
	// }

	errok(role.Insert(), c)
}
