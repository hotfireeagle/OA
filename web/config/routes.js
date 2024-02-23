export default [
	{
		"path": "/flowModule",
		"name": "流程管理",
		"component": "./flowModule/list/index"
	},
	{
		"path": "/flowModule/detail/:id",
		"name": "流程详情",
		"component": "./flowModule/form/index",
		"hideInMenu": true,
		"layout": false
	},
	{
		"path": "/flowModule/new",
		"name": "新增流程",
		"component": "./flowModule/form/index",
		"hideInMenu": true,
		"layout": false
	},
	{
		"path": "/permission",
		"name": "权限管理",
		"routes": [
      {
        "path": "/permission",
        "redirect": "/permission/role",
      },
      {
        "path": "/permission/role",
				"name": "角色列表",
				"component": "./role/list"
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
        "name": "账户列表",
        "component": "./account/index",
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
		"path": "*",
		"layout": false,
		"component": "./404"
	}
];