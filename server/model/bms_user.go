package model

import (
	"oa/util"
	"time"
)

type BmsUser struct {
	UserId     string    `json:"userId" gorm:"column:user_id"`
	Email      string    `json:"email" gorm:"column:email" binding:"required"`
	Password   string    `json:"password,omitempty" gorm:"column:password" binding:"required"`
	RoleId     int       `json:"roleId" gorm:"column:role_id"`
	CreateTime time.Time `json:"createTime" gorm:"column:create_time"`
	DeleteTime time.Time `json:"deleteTime" gorm:"column:delete_time"`
}

type BmsUserQueryParam struct {
	Email string `json:"email"`
	PaginationParam
}

type UserMeta struct {
	*BmsUser
	Menus []string
	Apis  []string
}

func (b BmsUser) TableName() string {
	return "bms_users"
}

func (b *BmsUser) Insert() error {
	return DB.Create(b).Error
}

func (b *BmsUser) Update() error {
	return DB.Model(b).Select("Email", "Password", "RoleId").Updates(b).Error
}

func (b *BmsUser) Delete() error {
	return DB.Model(b).Update("DeleteTime", time.Now()).Error
}

func (b BmsUser) Search() (*UserMeta, error) {
	um := new(UserMeta)
	role := new(Role)
	rpApi := new([]RolePermission)
	rpMenu := new([]RolePermission)
	apis := make([]string, 0)
	menus := make([]string, 0)
	u := new(BmsUser)

	err := DB.Where("user_id = ?", b.UserId).First(u).Error
	if err != nil {
		return um, err
	}

	um.BmsUser = u

	err = DB.Where("id = ?", u.RoleId).Find(role).Error
	if err != nil {
		return um, err
	}

	if role.IsAdminRole == IsAdminRole {
		um.Apis = util.PermissionBus.PlainGetAllApi()
		um.Menus = util.PermissionBus.PlainGetAllMenu()
		return um, nil
	}

	err = DB.Where("role_id = ? and permission_type = ?", u.RoleId, ApiPermissionType).Find(rpApi).Error
	if err != nil {
		return um, err
	}

	err = DB.Where("role_id = ? and permission_type = ?", u.RoleId, MenuPermissionType).Find(rpMenu).Error

	for _, r := range *rpApi {
		apis = append(apis, r.Permission)
	}
	for _, m := range *rpMenu {
		menus = append(menus, m.Permission)
	}

	um.Apis = apis
	um.Menus = menus
	return um, nil
}

func (b BmsUser) SearchByEmail() (*BmsUser, error) {
	u := new(BmsUser)
	return u, DB.Where("email = ?", b.Email).First(u).Error
}

func (b BmsUser) UserList(q *BmsUserQueryParam) (*[]BmsUser, error) {
	u := new([]BmsUser)

	db := DB.Model(&BmsUser{})
	if q.Email != "" {
		db = db.Where("email = ?", q.Email)
	}
	err := db.Limit(q.PageSize).Offset(q.Offset()).Find(u).Error
	return u, err
}
