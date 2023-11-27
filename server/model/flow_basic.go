package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type FlowBasic struct {
	Id             string         `gorm:"id" json:"id"`
	FlowName       string         `gorm:"flow_name" json:"flowName" binding:"required"`
	GroupId        int            `gorm:"group_id" json:"groupId" binding:"required"`
	MsgNotifyWay   int            `gorm:"msg_notify_way" json:"msgNotifyWay" binding:"required"`
	MsgNotifyTitle string         `gorm:"msg_notify_title" json:"msgNotifyTitle" binding:"required"`
	Desc           string         `gorm:"column:extra_desc" json:"desc"`
	CreateTime     time.Time      `gorm:"create_time" json:"createTime"`
	DeleteTime     gorm.DeletedAt `gorm:"delete_time" json:"deleteTime"`
}

func (f FlowBasic) TableName() string {
	return "flow_basic"
}

func (f *FlowBasic) Insert() (error, string) {
	f.CreateTime = time.Now()
	f.Id = uuid.NewString()
	var flowId string

	return DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(f).Error; err != nil {
			return err
		}

		flowId = uuid.NewString()
		flow := &Flow{
			Id:          flowId,
			FlowBasicId: f.Id,
			CreateTime:  time.Now(),
		}
		if err := tx.Create(flow).Error; err != nil {
			return err
		}

		return nil
	}), flowId
}

func (f *FlowBasic) Update() error {
	return DB.Select(
		"FlowName",
		"GroupId",
		"MsgNotifyWay",
		"MsgNotifyTitle",
		"Desc",
	).Updates(f).Error
}

func (f *FlowBasic) Delete() error {
	return DB.Model(f).Update("DeleteTime", time.Now()).Error
}

func FindFlowBasicDetailById(id string) (*FlowBasic, error) {
	answer := new(FlowBasic)
	return answer, DB.Where("id = ?", id).First(answer).Error
}
