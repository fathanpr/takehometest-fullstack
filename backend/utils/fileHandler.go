package utils

import (
	"encoding/json"
	"os"
	"takehometest_golang/models"
)

var DataFile = getFilePath()

func getFilePath() string {
	if path := os.Getenv("FILE_USER"); path != "" {
		return path
	}
	return "data/users.json"
}

func LoadUsers() ([]models.User, error) {
	if _, err := os.Stat(DataFile); os.IsNotExist(err) {
		empty := []models.User{}
		SaveUsers(empty)
		return empty, nil
	}

	data, err := os.ReadFile(DataFile)
	if err != nil {
		return nil, err
	}

	var users []models.User
	err = json.Unmarshal(data, &users)
	return users, err
}

func SaveUsers(users []models.User) error {
	data, err := json.MarshalIndent(users, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(DataFile, data, 0644)
}

// func LoadUsers() ([]models.User, error) {
// 	file, err := os.OpenFile(DataFile, os.O_RDONLY|os.O_CREATE, 0644)
// 	if err != nil {
// 		return nil, err
// 	}
// 	defer file.Close()

// 	var users []models.User
// 	data, _ := ioutil.ReadAll(file)
// 	if len(data) == 0 {
// 		return users, nil
// 	}

// 	err = json.Unmarshal(data, &users)
// 	return users, err
// }

// func SaveUsers(users []models.User) error {
// 	data, err := json.MarshalIndent(users, "", "  ")
// 	if err != nil {
// 		return err
// 	}
// 	return ioutil.WriteFile(DataFile, data, 0644)
// }