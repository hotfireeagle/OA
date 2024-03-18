package oa

import "errors"

// 验证流程配置数据是否正确：
// 所有的支路中最后一个节点必须是结束节点
// 对于Condition节点来说，它的attr里面必须存在caseSchema节点，而且这个slice的长度必须大于1
func Validate(oaNode *OANode) error {
	if !checkEveryPathHasEnd(oaNode) {
		return errors.New("流程配置错误，存在有路径没有结束的情况")
	}

	if flag, reason := checkConditionNodeMustHasCaseSchema(oaNode); !flag {
		return errors.New(reason)
	}

	if flag, reason := checkEveryCaseBranchNodeHasRightAttr(oaNode); !flag {
		return errors.New(reason)
	}

	return nil
}

// 判断每条路径的最后一个节点是不是结束节点
func checkEveryPathHasEnd(root *OANode) bool {
	yes := true

	var dfs func(node *OANode)
	dfs = func(node *OANode) {
		if node.Next == nil {
			// 表示它就是最后一个节点
			if node.NodeType != End {
				// 是最后一个节点，但是它的类型不是结束节点
				yes = false
				return
			}
		} else {
			// 不是最后一个节点，那么继续遍历下去即可
			dfs(node.Next)
		}
	}
	dfs(root)

	return yes
}

// 判断节点路径中条件节点的attr里面的caseSchema是不是一个有效slice
func checkConditionNodeMustHasCaseSchema(root *OANode) (bool, string) {
	var yes = true
	reason := ""

	var dfs func(node *OANode)
	dfs = func(node *OANode) {
		if node.NodeType == Condition {
			// 是条件节点
			attr := node.Attr
			if caseNodeAttr, ok := attr.(ConditionNodeAttr); ok {
				if len(caseNodeAttr.CaseSchema) < 2 {
					yes = false
					reason = "流程配置错误，条件节点的条件分支必须大于等于2"
					return
				}
			} else {
				// 类型都不对
				yes = false
				reason = "流程配置错误，条件节点的attr字段类型错误"
				return
			}
		}

		if node.Next != nil {
			dfs(node.Next)
		}
	}
	dfs(root)

	return yes, reason
}

// 判断条件分支节点的配置数据是否正确，尤其是条件节点是否有设置判断条件
func checkEveryCaseBranchNodeHasRightAttr(root *OANode) (bool, string) {
	// TODO:
	return true, ""
}
