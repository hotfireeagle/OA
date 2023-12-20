create database oa character set utf8 collate utf8_general_ci;

# 后台管理系统用户表
create table bms_users (
  user_id varchar(36) not null unique,
  email varchar(50) not null unique,
  password varchar(130) not null,
  is_admin int, # 是否是管理员, 1表示是, 0表示否
  token varchar(60) not null unique, # 用来生成token, 目前系统设计只支持一个账号最多在一个设备上进行登录, 触发了登录的情况下
  create_time datetime,
  delete_time datetime,
  primary key (user_id)
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

# 部门表
create table department (
  id int auto_increment,
  name varchar(20) not null unique,
  parent_department_id int,
  create_time datetime,
  primary key (id)
);

# 账号表
create table account (
  id varchar(36),
  name varchar(6) not null unique,
  email varchar(30) not null unique,
  password varchar(50) not null,
  prev_login_time datetime,
  create_time datetime,
  delete_time datetime,
  primary key (id)
);

# 账号权限关联表
create table account_role (
  id int auto_increment,
  account_id varchar(36),
  role_id int,
  primary key (id)
);

# 账号部门关联表
create table account_department (
  id int auto_increment,
  account_id varchar(36),
  department_id int,
  primary key (id)
);

# 角色表
create table role (
  id int auto_increment,
  name varchar(15),
  create_time datetime,
  primary key (id)
);

# 权限表
create table permission (
  id int auto_increment,
  parent_id int,
  remark varchar(15),
  primary key (id)
);