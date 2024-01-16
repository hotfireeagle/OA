package util

import (
	"crypto/sha256"
	"encoding/hex"
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
