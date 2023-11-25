package util

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal(err)
	}
}

func GetEnv(k string) string {
	return os.Getenv(k)
}
