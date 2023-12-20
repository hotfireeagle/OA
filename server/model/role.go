package model

import "time"

type Role struct {
	Id         int       `json:"id" gorm:"column:id"`
	Name       string    `json:"name" gorm:"column:name"`
	CreateTime time.Time `json:"createTime" gorm:"column:create_time"`
}
