package model

import (
	"fmt"
	"time"
)

type ResponseCode int

const (
	Err ResponseCode = iota
	Success
	NeedLogin
	UnAuth
)

type Response struct {
	Code ResponseCode `json:"code"`
	Msg  string       `json:"msg"`
	Data interface{}  `json:"data"`
}

type CustomeTime struct {
	time.Time
}

func (ct CustomeTime) MarshalJSON() ([]byte, error) {
	formatted := ct.Format("2024-01-16 14:54:34")
	return []byte(fmt.Sprintf("%s", formatted)), nil
}

type BaseColumn struct {
	CreateTime CustomeTime `json:"createTime" gorm:"column:create_time"`
	DeleteTime CustomeTime `json:"deleteTime" gorm:"column:delete_time"`
	CreateUID  string      `json:"_" gorm:"column:create_uid"`
}
