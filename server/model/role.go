package model

const (
	ApiPermissionType     = 1
	MenuPermissionType    = 2
	HasSetPermissionValue = 1
)

type RoleListSearchParam struct {
	Name string `json:"name"`
	PaginationParam
}

type Role struct {
	Id               int    `json:"id" gorm:"column:id"`
	Name             string `json:"name" gorm:"column:name" binding:"required"`
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

	err := DB.Model(r).Find(role).Error
	if err != nil {
		return roleDetail, err
	}

	err = DB.Model(&RolePermission{}).Where("role_id = ? and permission_type = ?", role.Id, ApiPermissionType).Pluck("permission", apis).Error
	if err != nil {
		return roleDetail, err
	}

	err = DB.Model(&RolePermission{}).Where("role_id = ? and permission_type = ?", role.Id, MenuPermissionType).Pluck("permission", menus).Error
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

	query := DB.Model(&Role{})
	if p.Name != "" {
		query = query.Where("name = ?", p.Name)
	}

	query = query.Limit(p.PageSize).Offset(p.Current - 1*p.PageSize).Find(roleList)
	return roleList, query.Error
}

// 更新角色的api权限数据
func (rd *RoleDetail) UpateApis() error {
	// 删除老权限
	currentRoleApis := new([]RolePermission)
	err := DB.Model(&RolePermission{}).Where("role_id = ? and permission_type = ?", rd.Id, ApiPermissionType).Find(currentRoleApis).Error
	if err != nil {
		return err
	}
	for _, rp := range *currentRoleApis {
		DB.Delete(&rp)
	}

	// 新增权限
	for _, apiName := range *rd.Apis {
		rolePermission := RolePermission{
			RoleId:         rd.Id,
			PermissionType: ApiPermissionType,
			Permission:     apiName,
		}
		DB.Create(&rolePermission)
	}

	DB.Model(&Role{}).Where("id = ?", rd.Id).Update("has_set_permission", HasSetPermissionValue)

	return nil
}
