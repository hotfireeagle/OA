package model

type Role struct {
	Id   int    `json:"id" gorm:"column:id"`
	Name string `json:"name" gorm:"column:name"`
	BaseColumn
	Menus []string `json:"menus" gorm:"column:menus"`
	Apis  []string `json:"apis" gorm:"column:apis"`
}

func (r *Role) Insert() error {
	return DB.Create(r).Error
}

func (r *Role) Update() {

}

func (r Role) Pagination() {

}
