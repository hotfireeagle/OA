import { request } from "buerui"
import { useState, useEffect } from "react"

export const useRoleList = () => {
  const [allRoleList, setAllRoleList] = useState([])

  useEffect(() => {
    request("/role/listAll").then(setAllRoleList)
  }, [])

  return allRoleList
}

// 请求用户详情数据
export const fetchUserInfo = async () => {
  return request("/user/detail")
}