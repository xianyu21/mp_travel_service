/**
 * 构建下载链接
 *
 * @param fileIdentifiers 文件标识符数组
 * @param outputType 输出类型，默认为 "array"。可选值为 "array" 或 "string"
 * @returns 根据 outputType 参数返回字符串数组或逗号分隔的字符串
 */
export function buildDownloadURL(
  fileIdentifiers: string | string[],
  outputType: 'array' | 'string' = 'array', // 默认输出为数组
): string[] | string {
  const domain = import.meta.env.VITE_SERVER_BASEURL
  let path = '/gateway/file/download/'
  if (!path.endsWith('/')) {
    path += '/'
  }
  // 如果 fileIdentifiers 是单个字符串，转换为数组
  const identifiersArray = Array.isArray(fileIdentifiers) ? fileIdentifiers : [fileIdentifiers]
  // 拼接每个文件标识符生成完整的 URL
  const urls = identifiersArray.map(identifier => `${domain}${path}${identifier}`)
  // 根据 outputType 参数决定返回数组还是字符串
  if (outputType === 'string') {
    return urls.join(', ') // 用逗号分隔的字符串
  }
  else {
    return urls // 返回数组
  }
}
// OSS文件
export function reloadOssUrl(uniqueCode: any) {
  if (uniqueCode) {
    return `https://video.test01.eabug.com/${uniqueCode}`
  }
  else {
    return ''
  }
}
// 指定文件
export function reloadUrl(uniqueCode: any) {
  if (uniqueCode) {
    return `${import.meta.env.VITE_SERVER_BASEURL}/static/${uniqueCode}`
  }
  else {
    return ''
  }
}
// 文件
export function localUrl(uniqueCode: any) {
  if (uniqueCode) {
    return `${import.meta.env.VITE_SERVER_BASEURL}/${uniqueCode}`
  }
  else {
    return ''
  }
}

/**
 * 根据文件类型过滤文件列表
 *
 * @param data 文件列表数据，每个文件对象至少包含 `fileType` 属性
 * @param type 需要筛选的文件类型，可以是 'image'、'video' 或 'audio'
 * @returns 过滤后的文件列表
 */
export function filterFilesByType(data: { fileType: string }[], type: 'image' | 'video' | 'audio') {
  // 定义文件类型配置
  const fileTypeConfig = {
    image: ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'],
    video: ['.mp4', '.avi', '.mov', '.mkv', '.flv'],
    audio: ['.mp3', '.wav', '.aac', '.flac'],
  }
  return data.filter(item => fileTypeConfig[type].includes(item.fileType))
}
/**
 * @description 深度克隆
 * @param {object} obj 需要深度克隆的对象
 * @param cache 缓存
 * @returns {*} 克隆后的对象或者原值（不是对象）
 */
function deepClone(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== 'object')
    return obj
  if (cache.has(obj))
    return cache.get(obj)
  let clone
  if (obj instanceof Date) {
    clone = new Date(obj.getTime())
  }
  else if (obj instanceof RegExp) {
    clone = new RegExp(obj)
  }
  else if (obj instanceof Map) {
    clone = new Map(Array.from(obj, ([key, value]) => [key, deepClone(value, cache)]))
  }
  else if (obj instanceof Set) {
    clone = new Set(Array.from(obj, value => deepClone(value, cache)))
  }
  else if (Array.isArray(obj)) {
    clone = obj.map(value => deepClone(value, cache))
  }
  else if (Object.prototype.toString.call(obj) === '[object Object]') {
    clone = Object.create(Object.getPrototypeOf(obj))
    cache.set(obj, clone)
    for (const [key, value] of Object.entries(obj)) {
      clone[key] = deepClone(value, cache)
    }
  }
  else {
    clone = Object.assign({}, obj)
  }
  cache.set(obj, clone)
  return clone
}
/**
 * @description JS对象深度合并
 * @param {object} target 需要拷贝的对象
 * @param {object} source 拷贝的来源对象
 * @returns {object|boolean} 深度合并后的对象或者false（入参有不是对象）
 */
function deepMerge(target = {}, source = {}) {
  target = deepClone(target)
  if (
    typeof target !== 'object'
    || target === null
    || typeof source !== 'object'
    || source === null
  ) {
    return target
  }
  const merged = Array.isArray(target) ? target.slice() : Object.assign({}, target)
  for (const prop in source) {
    if (!source.hasOwnProperty(prop))
      continue
    const sourceValue = source[prop]
    const targetValue = merged[prop]
    if (sourceValue instanceof Date) {
      merged[prop] = new Date(sourceValue)
    }
    else if (sourceValue instanceof RegExp) {
      merged[prop] = new RegExp(sourceValue)
    }
    else if (sourceValue instanceof Map) {
      merged[prop] = new Map(sourceValue)
    }
    else if (sourceValue instanceof Set) {
      merged[prop] = new Set(sourceValue)
    }
    else if (typeof sourceValue === 'object' && sourceValue !== null) {
      merged[prop] = deepMerge(targetValue, sourceValue)
    }
    else {
      merged[prop] = sourceValue
    }
  }
  return merged
}
/**
 * @description 对象转url参数
 * @param {object} data,对象
 * @param {boolean} isPrefix,是否自动加上"?"
 * @param {string} arrayFormat 规则 indices|brackets|repeat|comma
 */
function queryParams(data = {}, isPrefix = true, arrayFormat = 'brackets') {
  const prefix = isPrefix ? '?' : ''
  const _result = []
  if (!['indices', 'brackets', 'repeat', 'comma'].includes(arrayFormat))
    arrayFormat = 'brackets'
  for (const key in data) {
    const value = data[key]
    // 去掉为空的参数
    if (['', undefined, null].includes(value)) {
      continue
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (let i = 0; i < value.length; i++) {
            _result.push(`${key}[${i}]=${value[i]}`)
          }
          break
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach((_value) => {
            _result.push(`${key}[]=${_value}`)
          })
          break
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach((_value) => {
            _result.push(`${key}=${_value}`)
          })
          break
        case 'comma':
          // 结果: ids=1,2,3
          let commaStr = ''
          value.forEach((_value) => {
            commaStr += (commaStr ? ',' : '') + _value
          })
          _result.push(`${key}=${commaStr}`)
          break
        default:
          value.forEach((_value) => {
            _result.push(`${key}[]=${_value}`)
          })
      }
    }
    else {
      _result.push(`${key}=${value}`)
    }
  }
  return _result.length ? prefix + _result.join('&') : ''
}
function addRootPath(url) {
  return url[0] === '/' ? url : `/${url}`
}
function mixinParam(url, params) {
  url = url && addRootPath(url)
  let query = ''
  if (/[^\n\r/\u2028\u2029]*\/[^\n\r?\u2028\u2029]*\?.*=.*/.test(url)) {
    query = queryParams(params, false)
    return (url += `&${query}`)
  }
  query = queryParams(params)
  return (url += query)
}
const config = {
  type: 'navigateTo',
  url: '',
  delta: 1, // navigateBack页面后退时,回退的层数
  params: {}, // 传递的参数
  animationType: 'pop-in', // 窗口动画,只在APP有效
  animationDuration: 300, // 窗口动画持续时间,单位毫秒,只在APP有效
  intercept: false, // 是否需要拦截
}
function openPage(config) {
  // 解构参数
  const { url, type, delta, animationType, animationDuration } = config
  if (config.type == 'navigateTo' || config.type == 'to') {
    uni.navigateTo({
      url,
      animationType,
      animationDuration,
    })
  }
  if (config.type == 'redirectTo' || config.type == 'redirect') {
    uni.redirectTo({
      url,
    })
  }
  if (config.type == 'switchTab' || config.type == 'tab') {
    uni.switchTab({
      url,
    })
  }
  if (config.type == 'reLaunch' || config.type == 'launch') {
    uni.reLaunch({
      url,
    })
  }
  if (config.type == 'navigateBack' || config.type == 'back') {
    uni.navigateBack({
      delta,
    })
  }
}
export function go(options = {}, params = {}) {
  console.log(options, params)
  let mergeConfig = {}
  if (typeof options === 'string') {
    // 如果options为字符串，则为route(url, params)的形式
    mergeConfig.url = mixinParam(options, params)
    mergeConfig.type = 'navigateTo'
  }
  else {
    mergeConfig = deepMerge(config, options)
    // 否则正常使用mergeConfig中的url和params进行拼接
    mergeConfig.url = mixinParam(options.url, options.params)
  }

  if (params.intercept) {
    config.intercept = params.intercept
  }
  // params参数也带给拦截器
  mergeConfig.params = params
  // 合并内外部参数
  mergeConfig = deepMerge(config, mergeConfig)
  openPage(mergeConfig)
}

/**
 * 复制文本到剪贴板
 * @param value - 需要复制的文本内容
 */
export function copy(value) {
  uni.setClipboardData({
    data: value,
    success() {
      console.log('success')
    },
  })
}
//
export function call(value) {
  uni.makePhoneCall({
    phoneNumber: value,
  })
}

/**
 * 检查值是否非空
 * @param obj - 要检查的值（可以是字符串、数组、对象等）
 * @returns 如果值为非空字符串、非空数组、非空对象或非null/undefined的其他类型返回true，否则返回false
 */
export function isNotEmpty(obj) {
  if (obj == null)
    return false
  if (typeof obj === 'string')
    return obj.trim() !== ''
  if (Array.isArray(obj))
    return obj.length > 0
  if (typeof obj === 'object')
    return Object.keys(obj).length > 0
  return true // 其他类型（如数字、布尔值）
}

// 返回上一页
export function back(delta = 1) {
  // 如果是tabbar页面，返回上一页
  if (getCurrentPages().length === 1) {
    uni.reLaunch({
      url: '/pages/index',
    })
  }
  else {
    uni.navigateBack({
      delta,
    })
  }
}
/**
 * 获取当前页面的路由信息
 * @returns 当前页面的路由信息对象
 */
export function getCurrentRoute() {
  const pages = getCurrentPages() // 获取当前页面栈
  if (pages.length === 0)
    return null // 如果没有页面，返回null
  const currentPage = pages[pages.length - 1] // 获取当前页面
  return {
    path: currentPage.route, // 当前页面的路径
    query: currentPage.options, // 当前页面的query参数
  }
}
//
export function parseQueryParams(url, paramName) {
  const queryStringStart = url.indexOf('?')
  if (queryStringStart === -1) {
    return null // 如果没有查询字符串，则返回 null
  }
  const queryString = url.slice(queryStringStart + 1)
  const pairs = queryString.split('&')
  for (const pair of pairs) {
    const [key, value] = pair.split('=')
    const decodedKey = decodeURIComponent(key)
    const decodedValue = decodeURIComponent(value)
    if (decodedKey === paramName) {
      return decodedValue // 如果是，返回对应的值
    }
  }
  return null
}
/**
 * 获取当前页面的query参数
 * @returns 当前页面的query参数对象
 */
export function getCurrentQuery() {
  const currentRoute = getCurrentRoute()
  if (!currentRoute)
    return {}
  const query = currentRoute.query || {}
  // 对query参数进行解码
  const decodedQuery = {}
  for (const key in query) {
    decodedQuery[decodeURIComponent(key)] = decodeURIComponent(query[key])
  }
  return decodedQuery
}
