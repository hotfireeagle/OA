package main

import (
	"oa/router"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	router.InitRoute(r)

	r.Run(":9696")
}
