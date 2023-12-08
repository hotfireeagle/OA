export default [
	{
		"path": "/flowModule",
		"name": "流程管理",
    "component": "./flowModule/list/index",
	},
  {
    "path": "/flowModule/detail/:id",
    "name": "流程详情",
    "component": "./flowModule/form/index",
    "hideInMenu": true,
    "layout": false,
  },
  {
    "path": "/flowModule/new",
    "name": "新增流程",
    "component": "./flowModule/form/index",
    "hideInMenu": true,
    "layout": false,
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