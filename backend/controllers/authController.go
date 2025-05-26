package controllers

import (
	"net/http"
	"time"
	"os"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"github.com/golang-jwt/jwt/v5"

	"takehometest_golang/models"
	"takehometest_golang/utils"
)

var jwtKey = []byte(os.Getenv("API_KEY"))

func Login(c *gin.Context) {
	var credentials models.LoginRequest
	if err := c.ShouldBindJSON(&credentials); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	users, _ := utils.LoadUsers()
	for _, user := range users {
		if user.Username == credentials.Username {
			err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(credentials.Password))
			if err == nil {
				token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
					"user_id": user.Id,
					"exp":     time.Now().Add(2 * time.Hour).Unix(),
				})
				tokenString, _ := token.SignedString(jwtKey)
				c.JSON(http.StatusOK, gin.H{"token": tokenString})
				return
			}
		}
	}
	c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
}
