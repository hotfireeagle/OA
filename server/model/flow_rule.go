package model

type FlowNodeType int

const (
	Begin     FlowNodeType = 1
	Condition FlowNodeType = 2
	Approve   FlowNodeType = 3
	CC        FlowNodeType = 4
	End       FlowNodeType = 999
)

type FlowNode struct {
	Id       string
	NodeType FlowNodeType
	Attr     interface{}
	Next     *FlowNode
}

type FlowRule struct {
	Id       string `json:"id" gorm:"column:id"`
	RuleData string `json:"flowRuleData" gorm:"column:rule_data"`
}

func (f FlowRule) TableName() string {
	return "flow_rule"
}

func (f *FlowRule) Insert() error {
	return DB.Create(f).Error
}

func (f *FlowRule) Update() error {
	return DB.Select("RuleData").Updates(f).Error
}
