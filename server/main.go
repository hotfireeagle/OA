package main

import (
	"oa/router"
	"oa/util"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/hotfireeagle/permissionbus"
)

func main() {
	r := gin.Default()

	permissionbus.SetTokenSecretKey(util.GetEnv("tokenSecretKey"))
	permissionFilePath := filepath.Join(".", "permission.json")
	pb, err := permissionbus.Load(permissionFilePath)
	if err != nil {
		panic(err)
	}
	util.PermissionBus = pb

	router.InitRoute(r)

	r.Run(":9696")
}
