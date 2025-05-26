package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"takehometest_golang/controllers"
	"takehometest_golang/middleware"
	"time"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()
	gin.SetMode(gin.ReleaseMode)

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"https://takehometest-nextjs.vercel.app", "https://takehometest-nextjs-al6tdufd8-fathanprs-projects.vercel.app"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.GET("/", func(c *gin.Context) {
		c.String(200, "API Created by : Fathan Pebrilliestyo Ridwan")
	})

	r.POST("/login", controllers.Login)
	protected := r.Group("/")
	protected.Use(middleware.AuthMiddleware())
	{
		// protected.GET("/users", controllers.GetUsers)
		protected.GET("/users/:id", controllers.GetUserById)
		protected.PUT("/users/:id", controllers.UpdateUser)
		protected.DELETE("/users/:id", controllers.DeleteUser)
	}
	r.POST("/users", controllers.CreateUser)

	return r
}
