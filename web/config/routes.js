export default [
	{
		"path": "/flowModule",
		"name": "审批管理",
    "access": "审批管理",
    "routes": [
      {
        "path": "/flowModule",
        "redirect": "/flowModule/list",
      },
      {
        "path": "/flowModule/list",
        "name": "审批列表",
        "component": "./flowModule/list/index",
        // "access": "TODO:",
      },
    ],
	},
  {
    "path": "/flowModule/detail/:id",
    "name": "审批详情",
    "component": "./flowModule/form/index",
    "hideInMenu": true,
    "layout": false
  },
	{
		"path": "/permission",
		"name": "权限管理",
    "access": "权限管理",
		"routes": [
      {
        "path": "/permission",
        "redirect": "/permission/role",
      },
      {
        "path": "/permission/role",
				"name": "角色管理列表",
				"component": "./role/list",
        "access": "角色管理列表",
      },
      {
        "path": "/permission/role/new",
				"name": "新增角色",
				"component": "./role/form",
        "hideInMenu": true,
      },
      {
        "path": "/permission/role/edit/:id",
				"name": "编辑角色",
				"component": "./role/form",
        "hideInMenu": true,
      },
      {
        "path": "/permission/account/list",
        "name": "账号管理列表",
        "component": "./account/index",
        "access": "账号管理列表",
      }
		]
	},
	{
		"path": "/user",
		"layout": false,
		"routes": [
			{
				"name": "login",
				"path": "/user/login",
				"component": "./userModule/loginPage"
			},
			{
				"name": "changePassword",
				"path": "/user/changePassword",
				"component": "./userModule/changePassword"
			},
			{
				"component": "./404"
			}
		]
	},
  {
    "path": "/unAuth",
    "component": "./unAuth",
    "layout": false,
  },
  {
    "path": "/",
    "component": "./firstRoute",
  },
	{
		"path": "*",
		"layout": false,
		"component": "./404"
	}
];