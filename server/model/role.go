package model

import (
	"oa/util"
)

const (
	ApiPermissionType     = 1
	MenuPermissionType    = 2
	HasSetPermissionValue = 1
	IsAdminRole           = 1
)

type RoleListSearchParam struct {
	Name string `json:"name"`
	PaginationParam
}

type Role struct {
	Id               int    `json:"id" gorm:"column:id"`
	Name             string `json:"name" gorm:"column:name" binding:"required"`
	IsAdminRole      int    `json:"isAdminRole" gorm:"column:is_admin_role"`
	HasSetPermission int    `json:"hasSetPermission" gorm:"column:has_set_permission"`
	BaseColumn
}

type RoleDetail struct {
	Apis  *[]string `json:"apis"`
	Menus *[]string `json:"menus"`
	*Role
}

type RolePermission struct {
	Id             int    `json:"id" gorm:"column:id"`
	RoleId         int    `json:"roleId" gorm:"column:role_id"`
	PermissionType int    `json:"-" gorm:"column:permission_type"`
	Permission     string `json:"permission" gorm:"column:permission"`
}

func (rp RolePermission) TableName() string {
	return "role_permission"
}

func (r Role) TableName() string {
	return "role"
}

func (r *Role) Insert() error {
	r.IsAdminRole = 0
	return DB.Create(r).Error
}

// 更新角色名称
func (r *Role) UpdateName() error {
	return DB.Model(r).Update("name", r.Name).Error
}

// 查询角色详情
func (r *Role) Detail() (*RoleDetail, error) {
	roleDetail := new(RoleDetail)
	role := new(Role)
	apis := new([]string)
	menus := new([]string)

	err := DB.Where("id = ?", r.Id).Find(role).Error
	if err != nil {
		return roleDetail, err
	}

	err = DB.Model(&RolePermission{}).Where("role_id = ? and permission_type = ?", r.Id, ApiPermissionType).Pluck("permission", apis).Error
	if err != nil {
		return roleDetail, err
	}

	err = DB.Model(&RolePermission{}).Where("role_id = ? and permission_type = ?", r.Id, MenuPermissionType).Pluck("permission", menus).Error
	if err != nil {
		return roleDetail, err
	}

	return &RoleDetail{
		Role:  role,
		Apis:  apis,
		Menus: menus,
	}, nil
}

// 分页查询角色列表数据
func (p *RoleListSearchParam) Pagination() (*[]Role, error) {
	roleList := new([]Role)

	query := DB.Model(&Role{}).Where("is_admin_role = ?", 0)
	if p.Name != "" {
		query = query.Where("name = ?", p.Name)
	}

	query = query.Limit(p.PageSize).Offset(p.Current - 1*p.PageSize).Find(roleList)
	return roleList, query.Error
}

// 更新角色的api权限数据
func (rd *RoleDetail) UpateApis() (error, []string) {
	menuNames := make([]string, 0)

	// 删除老权限
	currentRoleApis := new([]RolePermission)
	err := DB.Model(&RolePermission{}).Where("role_id = ? and permission_type = ?", rd.Id, ApiPermissionType).Find(currentRoleApis).Error
	if err != nil {
		return err, menuNames
	}
	for _, rp := range *currentRoleApis {
		DB.Delete(&rp)
	}

	// 新增权限，需要进行展开
	for _, apiName := range util.PermissionBus.ExpandApiGroup(*rd.Apis) {
		rolePermission := RolePermission{
			RoleId:         rd.Id,
			PermissionType: ApiPermissionType,
			Permission:     apiName,
		}
		DB.Create(&rolePermission)
	}

	recommendMenus := util.PermissionBus.GetMenuByLeaf(*rd.Apis)

	DB.Model(&Role{}).Where("id = ?", rd.Id).Update("has_set_permission", HasSetPermissionValue)
	return nil, recommendMenus
}

// 更新角色的菜单权限数据
func (rd *RoleDetail) UpdateMenus() error {
	// 删除角色的老菜单权限
	currentRoleMenus := new([]RolePermission)
	err := DB.Where("role_id = ? and permission_type = ?", rd.Id, MenuPermissionType).Find(currentRoleMenus).Error
	if err != nil {
		return err
	}
	for _, menu := range *currentRoleMenus {
		DB.Delete(menu)
	}

	// 添加新的菜单权限
	newMenus := make([]RolePermission, 0)
	for _, menuName := range *rd.Menus {
		menuItem := RolePermission{
			RoleId:         rd.Id,
			PermissionType: MenuPermissionType,
			Permission:     menuName,
		}
		newMenus = append(newMenus, menuItem)
	}

	err = DB.Create(&newMenus).Error
	return err
}

func FindRole(id int) (*Role, error) {
	r := new(Role)
	return r, DB.Where("id = ?", id).Find(r).Error
}

func (r *Role) FindAllRole() (*[]Role, error) {
	roleList := new([]Role)
	return roleList, DB.Where("is_admin_role = ?", 0).Find(roleList).Error
}
