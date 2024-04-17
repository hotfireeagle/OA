import { useState, useEffect } from "react"
import { request } from "buerui"

export const usePost = (api, postData) => {
  const [response, setResponse] = useState({})

  useEffect(() => {
    request(api, postData, "post").then(res => {
      setResponse(res)
    })
  }, [api, JSON.stringify(postData)])

  return response
}