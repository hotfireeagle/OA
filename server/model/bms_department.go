package model

import (
	"errors"
	"oa/util"
	"time"
)

type Department struct {
	Id                 int       `json:"id" gorm:"column:id"`
	Name               string    `json:"name" gorm:"column:name" binding:"required"`
	ParentDepartmentId int       `json:"parentDepartmentId" gorm:"column:parent_department_id" binding:"required"`
	CreateTime         time.Time `json:"createTime" gorm:"column:create_time"`
}

type DepartmentRes struct {
	Department
	ParentDepartmentName string `json:"parentDepartmentName" gorm:"column:parent_department_name"`
}

type DepartmentTreeItem struct {
	Value    int                   `json:"value"`
	Title    string                `json:"title"`
	Children []*DepartmentTreeItem `json:"children"`
}

type DepartmentPaginationQuery struct {
	Name     string `json:"name"`
	Current  int    `json:"current"`
	PageSize int    `json:"pageSize"`
}

type DepartmentPaginationResponse struct {
	Current  int         `json:"current"`
	PageSize int         `json:"pageSize"`
	Total    int64       `json:"total"`
	List     interface{} `json:"list"`
}

func (d Department) TableName() string {
	return "department"
}

func (d *Department) Insert() error {
	d.CreateTime = time.Now()
	parentDepartment, err := FindDepartmentById(d.ParentDepartmentId)

	if err != nil {
		return err
	}

	if parentDepartment.Id == 0 {
		return errors.New("不存在该父权限")
	}

	return DB.Create(d).Error
}

func (d *Department) Update() error {
	return DB.Select("Name", "ParentDepartmentId").Updates(d).Error
}

func DeleteDepartmentById(id string) error {
	// FIXME: 不仅仅只是删除部门，可能还需要删子部门、账号之间的关联关系
	return DB.Where("id = ?", id).Delete(&Department{}).Error
}

func SelectDepartmentList(queryData *DepartmentPaginationQuery) (*[]DepartmentRes, int64, error) {
	answer := new([]DepartmentRes)
	var total int64
	var err error

	if queryData.Current == 0 {
		queryData.Current = util.DefaultCurrent
	}

	if queryData.PageSize == 0 {
		queryData.PageSize = util.DefaultPageSize
	}

	db := DB.Model(&Department{})

	if queryData.Name != "" {
		db = db.Where("name = ?", queryData.Name)
	}

	err = db.Count(&total).Error
	if err != nil {
		return answer, total, err
	}

	db = db.Offset((queryData.Current - 1) * queryData.PageSize).Limit(queryData.PageSize)
	query := "SELECT d1.id, d1.name, d1.create_time, d1.parent_department_id, d2.name AS parent_department_name FROM department d1 LEFT JOIN department d2 ON d1.parent_department_id = d2.id"
	if queryData.Name != "" {
		query += " WHERE d1.name = ?"
		db = db.Raw(query, queryData.Name)
	} else {
		db = db.Raw(query)
	}
	err = db.Scan(answer).Error
	if err != nil {
		return answer, total, err
	}

	return answer, total, nil
}

func FindDepartmentById(id int) (*Department, error) {
	department := new(Department)

	return department, DB.First(department, id).Error
}

// 搜索获取部门树数据
func SelectDepartmentTree() ([]*DepartmentTreeItem, error) {
	answer := make([]*DepartmentTreeItem, 0)

	// 首先找出根部门，可能不仅仅只有一个
	roots := new([]Department)

	err := DB.Where("parent_department_id is null").Find(roots).Error

	if err != nil {
		return answer, err
	}

	for _, root := range *roots {
		treeItem, err := departmentRes2DepartmentTreeItem(root) // 给root动态扩展children
		if err != nil {
			return answer, err
		}
		answer = append(answer, treeItem)
	}

	return answer, nil
}

// Department => DepartmentTreeItem
func departmentRes2DepartmentTreeItem(node Department) (*DepartmentTreeItem, error) {
	answerNode := &DepartmentTreeItem{
		Value:    node.Id,
		Title:    node.Name,
		Children: make([]*DepartmentTreeItem, 0),
	}

	departmentChildrenList := new([]Department)
	err := DB.Where("parent_department_id = ?", node.Id).Find(departmentChildrenList).Error

	if err != nil {
		return answerNode, err
	}

	for _, child := range *departmentChildrenList {
		newChild, err := departmentRes2DepartmentTreeItem(child)
		if err != nil {
			return answerNode, err
		}
		answerNode.Children = append(answerNode.Children, newChild)
	}

	return answerNode, nil
}
