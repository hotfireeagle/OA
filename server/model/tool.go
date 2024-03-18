package model

import (
	"database/sql/driver"
	"errors"
	"time"

	"github.com/gin-gonic/gin"
)

type ResponseCode int

const (
	Err ResponseCode = iota
	Success
	NeedLogin
	UnAuth
)

const defaultLimit = 10
const defaultPage = 1

type Response struct {
	Code ResponseCode `json:"code"`
	Msg  string       `json:"msg"`
	Data interface{}  `json:"data"`
}

type CustomTime struct {
	time.Time
}

func (c CustomTime) MarshalJSON() ([]byte, error) {
	if c.IsZero() {
		return []byte("null"), nil
	}
	return []byte(`"` + c.Format("2006-01-02 15:04:05") + `"`), nil
}

func (c *CustomTime) UnmarshalJSON(b []byte) error {
	timeStr := string(b)
	if timeStr == "null" {
		c.Time = time.Time{}
		return nil
	}

	layout := "2006-01-02 15:04:05"
	timeStr = timeStr[1 : len(timeStr)-1]
	parsedTime, err := time.Parse(layout, timeStr)
	if err != nil {
		return err
	}
	c.Time = parsedTime
	return nil
}

func (ct CustomTime) Value() (driver.Value, error) {
	if ct.IsZero() {
		return nil, nil
	}
	return ct.Time, nil
}

func (ct *CustomTime) Scan(value interface{}) error {
	if value == nil {
		ct.Time = time.Time{}
		return nil
	}
	t, ok := value.(time.Time)
	if !ok {
		return errors.New("failed to scan CustomTime field")
	}
	ct.Time = t
	return nil
}

type BaseColumn struct {
	CreateTime CustomTime `json:"createTime" gorm:"column:create_time"`
	DeleteTime CustomTime `json:"deleteTime" gorm:"column:delete_time"`
	CreateUID  string     `json:"-" gorm:"column:create_uid"`
}
type Alias BaseColumn

func (b *BaseColumn) SetCreateTime() {
	b.CreateTime = CustomTime{
		Time: time.Now(),
	}
}

func (b *BaseColumn) SetDeleteTime() {
	b.DeleteTime = CustomTime{
		Time: time.Now(),
	}
}

func (b *BaseColumn) SetCreateUID(c *gin.Context) {
	b.CreateUID = c.GetString("uid")
}

type PaginationParam struct {
	Current  int `json:"current"`
	PageSize int `json:"pageSize"`
}

func (p PaginationParam) Limit() int {
	if p.PageSize == 0 {
		return defaultLimit
	}
	return p.PageSize
}

func (p PaginationParam) Offset() int {
	var (
		c  int
		ps int
	)
	if p.Current == 0 {
		c = defaultPage
	} else {
		c = p.Current
	}
	if p.PageSize == 0 {
		ps = defaultLimit
	} else {
		ps = p.PageSize
	}

	return (c - 1) * ps
}
