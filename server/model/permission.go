package model

type Permission struct {
	Id       int    `json:"id" gorm:"column:id"`
	ParentId int    `json:"parentId" gorm:"column:parent_id"`
	Remark   string `json:"name" gorm:"column:remark" binding:"required"`
}

type PermissionTreeItem struct {
	Permission
	Children []*PermissionTreeItem `json:"children"`
}

func (p Permission) TableName() string {
	return "permission"
}

func (p *Permission) Insert() error {
	return DB.Create(p).Error
}

func (p *Permission) Update() error {
	return DB.Select(
		"ParentId",
		"Remark",
	).Updates(p).Error
}

func SelectAllPermission() (*[]Permission, error) {
	all := new([]Permission)

	return all, DB.Find(all).Error
}
