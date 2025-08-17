import type { IUserInfoVo } from '@/api/types/login'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getUserInfo as _getUserInfo,
  login as _login,
  logout as _logout,
  wxLogin as _wxLogin,
  getWxCode,
} from '@/api/login'
import { toast } from '@/utils/toast'

// 初始化状态
const userInfoState: IUserInfoVo = {
  id: 0,
  realName: '',
  headUrl: '/static/images/default-avatar.png',
  token: '',
  balance: 0,
  userId: '',
}
// ,
const locationInfoState = {
  longitude: '106.36938845801483',
  latitude: '29.620200872914182',
  address: '重庆重庆市沙坪坝区微电园金科天宸',
  province: '重庆',
  provinceId: '500000',
  city: '重庆市',
  cityId: '500100',
  county: '沙坪坝区',
  countyId: '500106',
}
export const useUserStore = defineStore(
  'user',
  () => {
    // 定义用户信息
    const userInfo = ref<IUserInfoVo>({ ...userInfoState })
    // 设置用户信息
    const setUserInfo = (val: IUserInfoVo) => {
      console.log('设置用户信息', val)
      // 若头像为空 则使用默认头像
      if (!val.headUrl) {
        val.headUrl = userInfoState.headUrl
      }
      // else {
      //   val.headUrl = 'https://oss.laf.run/ukw0y1-site/headUrl.jpg?feige'
      // }
      userInfo.value = val
    }
    const setUserheadUrl = (headUrl: string) => {
      userInfo.value.headUrl = headUrl
      console.log('设置用户头像', headUrl)
      console.log('userInfo', userInfo.value)
    }
    // 删除用户信息
    const removeUserInfo = () => {
      userInfo.value = { ...userInfoState }
      uni.removeStorageSync('userInfo')
      uni.removeStorageSync('token')
    }
    /**
     * 获取用户信息
     */
    const getUserInfo = async () => {
      const res = await _getUserInfo()
      console.log('------------------------------')
      console.log(res)
      console.log('------------------------------')
      const userInfo = res.data
      setUserInfo(userInfo)
      uni.setStorageSync('userInfo', userInfo)
      uni.setStorageSync('token', userInfo.token)
      return res
    }
    /**
     * 用户登录
     * @param credentials 登录参数
     * @returns R<IUserLogin>
     */
    const login = async (credentials: {
      phone: string
      messageCode: string
    }) => {
      const res = await _login(credentials)
      console.log('登录信息', res)
      toast.success('登录成功')
      setUserInfo(res.data)
      uni.setStorageSync('userInfo', res.data)
      uni.setStorageSync('token', res.data.token)
      return res
    }

    /**
     * 退出登录 并 删除用户信息
     */
    const logout = async () => {
      _logout()
      removeUserInfo()
    }
    /**
     * 微信登录
     */
    const wxLogin = async () => {
      // 获取微信小程序登录的code
      const data = await getWxCode()
      console.log('微信登录code', data)

      const res = await _wxLogin(data)
      await getUserInfo()
      return res
    }
    const updatedUserInfo = (val) => {
      Object.assign(userInfo.value, val)
    }
    const isLogined = computed(() => !!userInfo.value.token)
    // 地理信息
    const locationInfo = ref({ ...locationInfoState })
    // 更新地理信息
    const updateLocationInfo = (val) => {
      locationInfo.value = val
    }
    //
    const getLocation = () => {
      return new Promise((resolve, reject) => {
        uni.getLocation({
          type: 'wgs84',
          success: (res) => {
            resolve(res)
          },
          fail: (error) => {
            reject(error)
          },
        })
      })
    }
    const setLocationInfo = async () => {
      const res = await getLocation()
      locationInfo.value = res.data
    }

    return {
      userInfo,
      login,
      wxLogin,
      getUserInfo,
      setUserInfo,
      setUserheadUrl,
      logout,
      isLogined,
      updatedUserInfo,
      locationInfo,
      updateLocationInfo,
      setLocationInfo,
    }
  },
  {
    persist: true,
  },
)
