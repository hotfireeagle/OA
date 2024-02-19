package model

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
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

type CustomTime struct {
	time.Time
}

func (c CustomTime) MarshalJSON() ([]byte, error) {
	if c.IsZero() {
		return []byte("null"), nil
	}

	formatted := c.Format("2024-02-19 23:02:25")
	return json.Marshal(formatted)
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

func (b *BaseColumn) SetCreateUID(uid string) {
	b.CreateUID = uid
}

type PaginationParam struct {
	Current  int `json:"current"`
	PageSize int `json:"pageSize"`
}

// TODO: any better expression?
func (p *PaginationParam) UnmarshalJSON(data []byte) error {
	type Alias PaginationParam
	alias := &Alias{
		Current:  p.Current,
		PageSize: p.PageSize,
	}

	if err := json.Unmarshal(data, alias); err != nil {
		return err
	}

	if alias.Current == 0 {
		alias.Current = 1
	}

	if alias.PageSize == 0 {
		alias.PageSize = 10
	}

	p.Current = alias.Current
	p.PageSize = alias.PageSize

	return nil
}
