package handler

import (
	"takehometest_golang/routes"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	gin.SetMode(gin.ReleaseMode)
	router := routes.SetupRouter()

	router.ServeHTTP(w, r)
}