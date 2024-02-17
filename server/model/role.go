package model

type Role struct {
	Id   int    `json:"id" gorm:"column:id"`
	Name string `json:"name" gorm:"column:name" binding:"required"`
	BaseColumn
	Menus []string `json:"menus" gorm:"column:menus;type:json" sql:"type:json"`
	Apis  []string `json:"apis" gorm:"column:apis;type:json" sql:"type:json"`
}

// func (r *Role) Stringify() error {
// 	jsonstr, err := json.Marshal(r.Menus)
// 	if err != nil {
// 		return err
// 	}
// 	r.Menus = string(jsonstr)
// 	apiStr, err := json.Marshal(r.Apis)
// 	if err != nil {
// 		return err
// 	}
// 	r.Apis = string(apiStr)
// 	return err
// }

func (r Role) TableName() string {
	return "role"
}

func (r *Role) Insert() error {
	return DB.Create(r).Error
}

func (r *Role) Update() {

}

func (r Role) Pagination() {

}
