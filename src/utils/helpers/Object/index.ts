export const isKeyof = <T, U extends any = keyof T>(obj: T, key: U): boolean =>
  Object.keys(obj).some(i => i === key)

export const getValueByPathKey = (object: any, path: string[]) => {
  if (!path || !Array.isArray(path)) return ''

  let result = object
  path.forEach(item => {
    result = result[item]
  })

  return result
}
