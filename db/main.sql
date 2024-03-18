create database oa character set utf8 collate utf8_general_ci;

create table bms_users (
  user_id varchar(36) not null unique comment 'uid',
  email varchar(50) not null unique comment '邮箱',
  password varchar(130) not null comment 'sha256后密码',
  role_id varchar(5) not null comment '角色ID',
  create_time datetime,
  delete_time datetime,
  primary key (user_id)
)comment='后台管理系统用户表';

# 主账号测试用
INSERT INTO bms_users (user_id, email, password, role_id, create_time)
VALUES ('b9be768f-5a82-4e7e-a820-cdef7b66ec42', 'abc@163.com', '334157fed393dc4e27eae16a93cf1ef51a1847c2b2724174b229b5a88e77265a', 1, NOW());

# 角色表
create table role (
  id int auto_increment comment '角色ID',
  name varchar(15) comment '角色名称',
  is_admin_role int default 0 comment '是否是管理员角色，1表示是，0表示不是',
  has_set_permission int default 0 comment '是否配置过功能权限，1表示配置过，0表示没配置过',
  create_time datetime comment '创建时间',
  delete_time datetime comment '删除时间',
  create_uid varchar(36) comment '创建者',
  primary key (id)
)comment='角色表';

# 管理员角色
insert into role (name, is_admin_role, create_time) values ('管理员角色', 1, now());

# 角色-权限表
create table role_permission (
  id int auto_increment,
  role_id int comment '角色ID',
  permission_type int comment '权限类型，1表示接口，2表示菜单',
  permission varchar(30) comment '权限名称',
  primary key (id)
);

# 流程表
create table flow (
  id varchar(36) unique,
  name varchar(50) not null,
  flow_config MEDIUMTEXT,
  flow_form MEDIUMTEXT,
  create_time datetime,
  delete_time datetime,
  create_uid varchar(36) comment '创建者',
  primary key (id)
);
