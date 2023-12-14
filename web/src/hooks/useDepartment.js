import { useState, useEffect } from "react"
import { request } from "buerui"

export const useDepartment = () => {
  const [loading, setLoading] = useState(false)
  const [departmentList, setDepartmentList] = useState([])

  useEffect(() => {
    const postData = {}
    request("/api/bms/department/tree", postData, "post").then(res => {
      console.log("res is >>>", res)
    })
  }, [])

  return [
    loading,
    departmentList,
  ]
}