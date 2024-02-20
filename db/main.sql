create database oa character set utf8 collate utf8_general_ci;

create table bms_users (
  user_id varchar(36) not null unique comment 'uid',
  email varchar(50) not null unique comment '邮箱',
  password varchar(130) not null comment 'sha256后密码',
  is_admin int DEFAULT 0 comment '是否是管理员, 1表示是, 0表示否',
  create_time datetime,
  delete_time datetime,
  primary key (user_id)
)comment='后台管理系统用户表';

INSERT INTO bms_users (user_id, email, password, is_admin, create_time)
VALUES ('b9be768f-5a82-4e7e-a820-cdef7b66ec42', 'hotfireeagle@163.com', '5d45197700ac85cf4a74d660a251d82509306311aa8943da60bb8436d4e040f3', 1, NOW());

# 角色表
create table role (
  id int auto_increment comment '角色ID',
  name varchar(15) comment '角色名称',
  has_set_permission int default 0 comment '是否配置过功能权限，1表示配置过，0表示没配置过',
  create_time datetime comment '创建时间',
  delete_time datetime comment '删除时间',
  create_uid varchar(36) comment '创建者',
  primary key (id)
)comment='角色表';

# 角色-权限表
create table role_permission (
  id int auto_increment,
  role_id int comment '角色ID',
  permission_type int comment '权限类型，1表示接口，2表示菜单',
  permission varchar(30) comment '权限名称',
  primary key (id)
);


# 流程组表
create table flow_group (
  id int auto_increment,
  group_name varchar(20) not null unique,
  create_time datetime,
  delete_time datetime,
  primary key (id)
);

# 流程表
create table flow (
  id varchar(36) unique,
  flow_basic_id varchar(36) unique,
  flow_rule_id varchar(36),
  create_time datetime,
  delete_time datetime,
  primary key (id)
);

# flow基本信息表
create table flow_basic (
  id varchar(36) unique,
  flow_name varchar(20) not null unique,
  group_id int not null,
  msg_notify_way int not null,
  msg_notify_title varchar(20) not null,
  extra_desc varchar(100),
  create_time datetime,
  delete_time datetime,
  primary key (id)
);

# flow规则配置表
create table flow_rule (
  id varchar(36) unique,
  rule_data text,
  primary key (id)
);
