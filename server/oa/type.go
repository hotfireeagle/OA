package oa

type FlowNodeType int

const (
	Begin      FlowNodeType = iota + 1 // the begin node
	Condition                          // the condition node
	Approve                            // the approve node
	CC                                 // the make a copy for node
	CaseBranch                         // the case branch node
	End        FlowNodeType = 999      // the end node
)

type OANode struct {
	Id       string
	NodeType FlowNodeType
	Attr     AttrType
	Next     *OANode
}

type AttrType interface{}

type BaseAttr struct {
}

type ConditionNodeAttr struct {
	BaseAttr
	CaseSchema []*OANode
}

// TODO:
type BeginNodeAttr struct {
	BaseAttr
}

// TODO:
type CaseBranchNodeAttr struct {
	BaseAttr
}
