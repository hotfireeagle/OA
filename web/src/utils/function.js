import { request } from "buerui"
import { useState, useEffect } from "react"

export const departmentFunction = {
  // 请求部门列表数据
  useDepartmentList: function() {
    const [departmentList, setDepartmentList] = useState([]) // 角色列表数据
    
    useEffect(() => {
      const postData = {}
      request("/api/bms/department/tree", postData, "get").then(res => {
        setDepartmentList(res || [])
      })
    }, [])

    return departmentList
  },

  // 角色的FormList配置数据
  departmentFormListConfigFun: function(configData) {
    return {
      label: "关联部门",
      key: "parentId",
      type: "treeSelect",
      required: true,
      required: true,
      ...configData,
      extraAtomProps: {
        treeDefaultExpandAll: true,
        showSearch: true,
        fieldNames: {
          label: "title",
        },
        filterTreeNode: (inputValue, treeNode) => {
          const nodeCn = treeNode?.title || ""
          return nodeCn.includes(inputValue)
        },
      },
    }
  },
}