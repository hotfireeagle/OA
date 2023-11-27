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
  create_time datetime,
  delete_time datetime,
  primary key (id)
);

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