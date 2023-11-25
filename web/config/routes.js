export default [
	{
		"path": "/flowModule/detail/:id",
		"name": "流程详情",
		"component": "./flowModule/form/index",
		"hideInMenu": true,
    "layout": false,
	},
	{
		"path": "/flowModule",
		"name": "流程管理",
		"component": "./flowModule/list/index"
	},
	{
		"path": "/flowModule/detail/:id",
		"name": "TODO:详情页面名称",
		"component": "./flowModule/form/index",
		"hideInMenu": true
	},
	{
		"path": "/flowModule/list",
		"name": "TODO:列表页面名称",
		"component": "./flowModule/list/index"
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