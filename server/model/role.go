package model

type RoleListSearchParam struct {
	Name string `json:"name"`
	PaginationParam
}

type Role struct {
	Id   int    `json:"id" gorm:"column:id"`
	Name string `json:"name" gorm:"column:name" binding:"required"`
	BaseColumn
	Menus []string `json:"menus" gorm:"column:menus;type:json" sql:"type:json"`
	Apis  []string `json:"apis" gorm:"column:apis;type:json" sql:"type:json"`
}

func (r Role) TableName() string {
	return "role"
}

func (r *Role) Insert() error {
	return DB.Create(r).Error
}

func (r *Role) UpdateName() error {
	return DB.Model(r).Update("name", r.Name).Error
}

func (p *RoleListSearchParam) Pagination() (*[]Role, error) {
	roleList := new([]Role)

	query := DB.Model(&Role{})
	if p.Name != "" {
		query = query.Where("name = ?", p.Name)
	}

	query = query.Limit(p.PageSize).Offset(p.Current - 1*p.PageSize).Find(roleList)
	return roleList, query.Error
}
