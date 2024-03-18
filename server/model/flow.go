package model

import "github.com/google/uuid"

type Flow struct {
	Id         string `gorm:"column:id" json:"id"`
	Name       string `gorm:"name" json:"name" binding:"required"`
	FlowConfig string `gorm:"column:flow_config" json:"flowConfig"`
	FlowForm   string `gorm:"column:flow_form" json:"flowForm"`
	BaseColumn
}

type QueryFlowData struct {
	Name string `json:"name"`
	PaginationParam
}

func (f Flow) TableName() string {
	return "flow"
}

func (f *Flow) Insert() error {
	f.Id = uuid.NewString()
	return DB.Create(f).Error
}

func FindFlowDetailById(id string) (*Flow, error) {
	flow := new(Flow)
	return flow, DB.Where("id = ?", id).First(flow).Error
}

// 只更新流程的配置数据
func (f *Flow) UpdateFlowConfig() error {
	return DB.Model(&Flow{}).Where("id = ?", f.Id).Update("flow_config", f.FlowConfig).Error
}

// 只更新流程的表单数据
func (f *Flow) UpdateFlowForm() error {
	return DB.Model(&Flow{}).Where("id = ?", f.Id).Update("flow_form", f.FlowForm).Error
}

func (f *Flow) UpdateFlowBasic() error {
	return DB.Model(f).Update("name", f.Name).Error
}

func (f *Flow) Pagaination(queryData *QueryFlowData) (*[]Flow, error) {
	answer := new([]Flow)

	db := DB.Model(&Flow{}).Where("delete_time is null")

	if queryData.Name != "" {
		db = db.Where("name is ?", queryData.Name)
	}

	return answer, db.Limit(queryData.Limit()).Offset(queryData.Offset()).Find(answer).Error
}
