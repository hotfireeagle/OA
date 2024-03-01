package model

import (
	"oa/util"
	"time"

	"github.com/google/uuid"
)

type BmsUser struct {
	UserId     string     `json:"userId" gorm:"column:user_id"`
	Email      string     `json:"email" gorm:"column:email" binding:"required"`
	Password   string     `json:"password,omitempty" gorm:"column:password"`
	RoleId     int        `json:"roleId" gorm:"column:role_id"`
	CreateTime CustomTime `json:"createTime" gorm:"column:create_time"`
	DeleteTime CustomTime `json:"deleteTime" gorm:"column:delete_time"`
}

type BmsUserListItem struct {
	BmsUser
	RoleName string `json:"roleName" gorm:"column:role_name"`
}

type BmsUserQueryParam struct {
	Email  string `json:"email"`
	RoleId int    `json:"roleId"`
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
	b.UserId = uuid.NewString()
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

func (b BmsUser) UserList(q *BmsUserQueryParam) (*[]BmsUserListItem, error) {
	u := new([]BmsUserListItem)

	db := DB.Model(&BmsUser{})
	if q.Email != "" {
		db = db.Where("email = ?", q.Email)
	}
	if q.RoleId != 0 {
		db = db.Where("role_id = ?", q.RoleId)
	}
	db = db.Joins("LEFT JOIN role ON bms_users.role_id = role.id").Where("role.is_admin_role = ?", 0).Select("bms_users.*, role.name as role_name")
	// subQuery := DB.Model(&Role{}).Where("is_admin_role = ?", 0).Select("id")
	// db = db.Where("role_id IN (?)", subQuery)
	err := db.Limit(q.PageSize).Offset(q.Offset()).Find(u).Error
	return u, err
}
