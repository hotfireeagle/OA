package model

import (
	"oa/util"
	"time"

	"gorm.io/gorm"
)

type Department struct {
	Id                 int            `json:"id" gorm:"column:id"`
	Name               string         `json:"name" gorm:"column:name" binding:"required"`
	ParentDepartmentId int            `json:"parentDepartmentId" gorm:"column:parentDepartmentId" binding:"required"`
	CreateTime         time.Time      `json:"createTime" gorm:"column:createTime"`
	DeleteTime         gorm.DeletedAt `json:"deleteTime" gorm:"column:deleteTime"`
}

type DepartmentPaginationQuery struct {
	Name     string
	Current  int
	PageSize int
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
	return DB.Create(d).Error
}

func (d *Department) Update() error {
	return DB.Select("Name", "ParentDepartmentId").Updates(d).Error
}

func (d *Department) Delete() error {
	return DB.Model(d).Update("DeleteTime", time.Now()).Error
}

func SelectDepartmentList(queryData *DepartmentPaginationQuery) (*[]Department, int64, error) {
	answer := new([]Department)
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

	err = db.Offset(queryData.Current - 1*queryData.PageSize).Limit(queryData.PageSize).Find(answer).Error
	if err != nil {
		return answer, total, err
	}

	return answer, total, nil
}
