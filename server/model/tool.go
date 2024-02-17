package model

import (
	"encoding/json"
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

type BaseColumn struct {
	CreateTime time.Time  `json:"createTime" gorm:"column:create_time"`
	DeleteTime *time.Time `json:"deleteTime" gorm:"column:delete_time"`
	CreateUID  string     `json:"_" gorm:"column:create_uid"`
}
type Alias BaseColumn

func (b *BaseColumn) SetCreateTime() {
	b.CreateTime = time.Now()
}

func (b *BaseColumn) SetDeleteTime() {
	now := time.Now()
	b.DeleteTime = &now
}

func (b *BaseColumn) SetCreateUID(uid string) {
	b.CreateUID = uid
}

func formatTime(t *time.Time) string {
	if t == nil {
		return ""
	}
	return t.Format("2006-01-02 15:04:05")
}

func (b *BaseColumn) MarshalJSON() ([]byte, error) {
	return json.Marshal(&struct {
		CreateTime string `json:"createTime"`
		DeleteTime string `json:"deleteTime,omitempty"`
		*Alias
	}{
		CreateTime: formatTime(&b.CreateTime),
		DeleteTime: formatTime(b.DeleteTime),
		Alias:      (*Alias)(b),
	})
}
