import { useUserStore } from '@/store'
import { getEnvBaseUrl } from '@/utils'
import { platform } from '@/utils/platform'
import { stringifyQuery } from './queryString'

export type CustomRequestOptions = UniApp.RequestOptions & {
  query?: Record<string, any>
  /** 出错时是否隐藏错误提示 */
  hideErrorToast?: boolean
} & IUniUploadFileOptions // 添加uni.uploadFile参数类型

// 黑名单接口列表，这些接口不需要显示错误提示
const blacklistApis = [
  '/api/user/check',
  '/api/common/heartbeat',
  '/travel/receiveUserPage',
  '/spot/page',
  '/service/detail',
  '/receive/order/waitRobOrder',
  '/receive/order/robbedOrder',
]

/**
 * 判断接口是否在黑名单中
 * @param url 接口地址
 * @returns 是否在黑名单中
 */
export function isInBlacklist(url: string): boolean {
  const apiPath = url.split('?')[0]
  return blacklistApis.some(api => apiPath.includes(api))
}
const baseUrl = getEnvBaseUrl()
const httpInterceptor = {
  invoke(options: CustomRequestOptions) {
    const userStore = useUserStore()
    // 判断是否在黑名单中
    const inBlacklist = isInBlacklist(options.url)
    if (inBlacklist) {
      if (options.data) {
        options.data.provinceId = userStore.locationInfo.provinceId
        options.data.cityId = userStore.locationInfo.cityId
      }
    }

    if (options.query) {
      const queryStr = stringifyQuery(options.query)
      if (options.url.includes('?')) {
        options.url += `&${queryStr}`
      }
      else {
        options.url += `?${queryStr}`
      }
    }
    // 非 http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      // #ifdef H5
      // console.log(__VITE_APP_PROXY__)
      if (JSON.parse(__VITE_APP_PROXY__)) {
        // 自动拼接代理前缀
        options.url = import.meta.env.VITE_APP_PROXY_PREFIX + options.url
      }
      else {
        options.url = baseUrl + options.url
      }
      // #endif
      // 非H5正常拼接
      // #ifndef H5
      options.url = baseUrl + options.url
      // #endif
      // TIPS: 如果需要对接多个后端服务，也可以在这里处理，拼接成所需要的地址
    }
    // 1. 请求超时
    options.timeout = 10000 // 10s
    // 2. （可选）添加小程序端请求头标识
    options.header = {
      platform, // 可选，与 uniapp 定义的平台一致，告诉后台来源
      ...options.header,
    }
    // 3. 添加 token 请求头标识

    const { token } = userStore.userInfo as unknown as IUserInfo
    if (token) {
      options.header.token = token
    }
  },
}

export const requestInterceptor = {
  install() {
    // 拦截 request 请求
    uni.addInterceptor('request', httpInterceptor)
    // 拦截 uploadFile 文件上传
    uni.addInterceptor('uploadFile', httpInterceptor)
  },
}
