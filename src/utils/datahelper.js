export default {
  getValue (obj, path, defaultValue = null) {
    if (typeof obj !== 'object' || typeof path !== 'string') {
      return defaultValue
    }

    let result = obj
    let pathArray = path.split('.').slice(1)

    for (let prop of pathArray) {
      if (typeof result !== 'object') {
        return defaultValue
      }
      if (Object.hasOwnProperty.call(result, prop)) {
        result = result[prop]
        continue
      }
      return defaultValue
    }
    return result
  }
}