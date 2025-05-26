package services

import (
	"errors"
	"strings"
	"golang.org/x/crypto/bcrypt"
	"takehometest_golang/models"
	"takehometest_golang/utils"
)

func GetAllUsers() ([]models.User, error) {
	return utils.LoadUsers()
}

func CreateUser(user models.User) error {
	users, _ := utils.LoadUsers()

	// Validasi input
	if user.Username == "" || user.Email == "" || user.Password == "" || user.Name == "" {
		return errors.New("Name, Username, Email dan Password wajib diisi")
	}
	// Validasi format email (sederhana)
	if !strings.Contains(user.Email, "@") {
		return errors.New("Format email tidak valid")
	}
	// Cek duplikat
	for _, u := range users {
		if u.Username == user.Username {
			return errors.New("Username sudah digunakan")
		}
		if u.Email == user.Email {
			return errors.New("Email sudah digunakan")
		}
	}

	// Generate auto-increment ID
	newId := 1
	for _, u := range users {
		if u.Id >= newId {
			newId = u.Id + 1
		}
	}
	user.Id = newId

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return errors.New("Gagal meng-hash password")
	}
	user.Password = string(hashedPassword)

	users = append(users, user)
	return utils.SaveUsers(users)
}


func UpdateUserById(id int, updated models.User) error {
	users, _ := utils.LoadUsers()

	if updated.Username == "" || updated.Email == "" || updated.Password == "" || updated.Name == "" {
		return errors.New("Name, Username, Email dan Password wajib diisi")
	}
	if !strings.Contains(updated.Email, "@") {
		return errors.New("Format email tidak valid")
	}

	for i, user := range users {
		if user.Id == id {
			for _, u := range users {
				if u.Id != id && (u.Username == updated.Username || u.Email == updated.Email) {
					return errors.New("Username atau Email sudah digunakan")
				}
			}

			hashedPassword, err := bcrypt.GenerateFromPassword([]byte(updated.Password), bcrypt.DefaultCost)
			if err != nil {
				return errors.New("Gagal meng-hash password")
			}
			updated.Password = string(hashedPassword)

			users[i] = updated
			return utils.SaveUsers(users)
		}
	}
	return errors.New("User tidak ditemukan")
}


func DeleteUserById(id int) error {
	users, _ := utils.LoadUsers()
	for i, user := range users {
		if user.Id == id {
			users = append(users[:i], users[i+1:]...)
			return utils.SaveUsers(users)
		}
	}
	return errors.New("User tidak ditemukan")
}
