package model

import (
	"time"

	"gorm.io/gorm"
)

type FlowGroup struct {
	Id         int            `json:"id" grom:"id"`
	GroupName  string         `json:"groupName" grom:"group_name" binding:"required"`
	CreateTime time.Time      `json:"createTime" gorm:"create_time"`
	DeleteTime gorm.DeletedAt `json:"deleteTime" gorm:"delete_time"`
}

func (f FlowGroup) TableName() string {
	return "flow_group"
}

func (f *FlowGroup) Insert() error {
	f.CreateTime = time.Now()
	return DB.Create(f).Error
}

func (f *FlowGroup) Update() error {
	return DB.Model(f).Select("GroupName", "CreateTime").Updates(f).Error
}

func (f *FlowGroup) Delete() error {
	return DB.Model(f).Update("DeleteTime", time.Now()).Error
}

func SearchAllFlowGroup() (*[]FlowGroup, error) {
	flowGroups := new([]FlowGroup)
	return flowGroups, DB.Where("delete_time is null").Find(flowGroups).Error
}
