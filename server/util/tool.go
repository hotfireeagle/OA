package util

import (
	"crypto/sha256"
	"encoding/hex"
	"math/rand"
	"time"
)

func Sha256Check(originStr string, expectStr string) bool {
	hash := sha256.New()
	hash.Write([]byte(originStr))
	hashInBytes := hash.Sum(nil)
	hashString := hex.EncodeToString(hashInBytes)
	return hashString == expectStr
}

func Sha256(originStr string) string {
	hash := sha256.New()
	hash.Write([]byte(originStr))
	hashInBytes := hash.Sum(nil)
	hashString := hex.EncodeToString(hashInBytes)
	return hashString
}

func Random(length int) string {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	charsetLength := len(charset)
	var password string = ""
	for i := 0; i < length; i++ {
		rand.Seed(time.Now().UnixNano())
		randomNumber := rand.Intn(charsetLength)
		password += string(charset[randomNumber])
	}
	return password
}
