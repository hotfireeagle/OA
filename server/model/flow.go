package model

import (
	"time"

	"gorm.io/gorm"
)

type Flow struct {
	Id          string         `gorm:"column:id" json:"id"`
	FlowBasicId string         `gorm:"column:flow_basic_id" json:"flowBasicId"`
	FlowRuleId  string         `gorm:"column:flow_rule_id" json:"flowRuleId"`
	CreateTime  time.Time      `gorm:"column:create_time" json:"createTime"`
	DeleteTime  gorm.DeletedAt `gorm:"column:delete_time" json:"deleteTime"`
}

func (f Flow) TableName() string {
	return "flow"
}

func FindFlowDetailById(id string) (*Flow, error) {
	flow := new(Flow)
	return flow, DB.Where("id = ?", id).First(flow).Error
}

func (f *Flow) Update() error {
	return DB.Select("FlowRuleId").Updates(f).Error
}
