import { request } from "buerui"
import { useState, useEffect } from "react"

export const useRoleList = () => {
  const [allRoleList, setAllRoleList] = useState([])

  useEffect(() => {
    request("/role/listAll").then(setAllRoleList)
  }, [])

  return allRoleList
}