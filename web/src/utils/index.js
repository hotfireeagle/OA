export const uuid2id = uuid => {
  // 字母开头以符合html的id规范
  return "id" + uuid
}

export const arr2map = (arr, keyName) => {
  const m = {}
  if (!Array.isArray(arr)) {
    return m
  }
  for (const item of arr) {
    if (Object.prototype.toString.call(item) === "[object Object]") {
      m[item[keyName]] = item
    } else {
      m[item] = true
    }
  }
  return m
}