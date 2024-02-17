package middleware

import (
	"oa/model"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/hotfireeagle/permissionbus"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		requestPath := c.Request.URL.Path

		if shouldExcludePath(requestPath) {
			c.Next()
			return
		}

		authorizationHeader := c.GetHeader("Authorization")

		if authorizationHeader == "" {
			c.JSON(200, model.Response{
				Code: model.UnAuth,
				Msg:  "不存在Authorization",
			})
			c.Abort()
			return
		}

		authParts := strings.Split(authorizationHeader, " ")
		if len(authParts) != 2 || authParts[0] != "Bearer" {
			c.JSON(200, model.Response{
				Code: model.UnAuth,
				Msg:  "Authorization不符合格式",
			})
			c.Abort()
			return
		}

		token := authParts[1]
		uid, err := permissionbus.ParseToken(token)
		if err != nil {
			c.JSON(200, model.Response{
				Code: model.NeedLogin,
				Msg:  err.Error(),
			})
			c.Abort()
			return
		}

		c.Set("uid", uid)
		c.Next()
	}
}

func shouldExcludePath(path string) bool {
	hashMap := map[string]bool{
		"/api/bms/user/login": true,
	}

	return hashMap[path]
}
