package model

import "time"

type BmsUser struct {
	UserId     string    `json:"userId" gorm:"user_id"`
	Email      string    `json:"email" gorm:"email" binding:"required"`
	Password   string    `json:"password,omitempty" gorm:"password" binding:"required"`
	IsAdmin    int       `json:"isAdmin" gorm:"is_admin"`
	Token      string    `json:"-" gorm:"token"`
	CreateTime time.Time `json:"createTime" gorm:"create_time"`
	DeleteTime time.Time `json:"deleteTime" gorm:"delete_time"`
}

func (b BmsUser) TableName() string {
	return "bms_users"
}

func (b *BmsUser) Insert() error {
	return DB.Create(b).Error
}

func (b *BmsUser) Update() error {
	return DB.Model(b).Select("Email", "Password").Updates(b).Error
}

func (b *BmsUser) Delete() error {
	return DB.Model(b).Update("DeleteTime", time.Now()).Error
}

func (b *BmsUser) Search() (*BmsUser, error) {
	u := new(BmsUser)
	return u, DB.Where("Email = ?", b.Email).First(u).Error
}

// 根据token来查找用户
func FindBmsUserByToken(tok string) (*BmsUser, error) {
	u := new(BmsUser)
	return u, DB.Where("Token = ?", tok).First(u).Error
}
