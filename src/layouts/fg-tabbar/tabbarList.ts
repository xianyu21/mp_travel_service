import type { TabBar } from '@uni-helper/vite-plugin-uni-pages'

type FgTabBarItem = TabBar['list'][0] & {
  icon: string
  iconType: 'uiLib' | 'unocss' | 'iconfont'
}

/**
 * tabbar 选择的策略，更详细的介绍见 tabbar.md 文件
 * 0: 'NO_TABBAR' `无 tabbar`
 * 1: 'NATIVE_TABBAR'  `完全原生 tabbar`
 * 2: 'CUSTOM_TABBAR_WITH_CACHE' `有缓存自定义 tabbar`
 * 3: 'CUSTOM_TABBAR_WITHOUT_CACHE' `无缓存自定义 tabbar`
 *
 * 温馨提示：本文件的任何代码更改了之后，都需要重新运行，否则 pages.json 不会更新导致错误
 */
export const TABBAR_MAP = {
  NO_TABBAR: 0,
  NATIVE_TABBAR: 1,
  CUSTOM_TABBAR_WITH_CACHE: 2,
  CUSTOM_TABBAR_WITHOUT_CACHE: 3,
}
// TODO：通过这里切换使用tabbar的策略
export const selectedTabbarStrategy = TABBAR_MAP.NATIVE_TABBAR

// selectedTabbarStrategy==NATIVE_TABBAR(1) 时，需要填 iconPath 和 selectedIconPath
// selectedTabbarStrategy==CUSTOM_TABBAR(2,3) 时，需要填 icon 和 iconType
// selectedTabbarStrategy==NO_TABBAR(0) 时，tabbarList 不生效
export const tabbarList: FgTabBarItem[] = [
  {
    iconPath: 'static/tabbar/1.png',
    selectedIconPath: 'static/tabbar/1-1.png',
    pagePath: 'pages/index',
    text: '首页',
    icon: '',
    iconType: 'uiLib',
  },
  {
    iconPath: 'static/tabbar/2.png',
    selectedIconPath: 'static/tabbar/2-2.png',
    pagePath: 'pages/order',
    text: '订单',
    icon: '',
    iconType: 'uiLib',
  },
  {
    iconPath: 'static/tabbar/3.png',
    selectedIconPath: 'static/tabbar/3-3.png',
    pagePath: 'pages/news',
    text: '消息',
    icon: '',
    iconType: 'uiLib',
  },
  {
    iconPath: 'static/tabbar/4.png',
    selectedIconPath: 'static/tabbar/4-4.png',
    pagePath: 'pages/mine',
    text: '我的',
    icon: '',
    iconType: 'uiLib',
  },
  // {
  //   pagePath: 'pages/my/index',
  //   text: '我的',
  //   icon: '/static/logo.svg',
  //   iconType: 'unocss',
  // },
  // {
  //   pagePath: 'pages/mine/index',
  //   text: '我的',
  //   icon: 'iconfont icon-my',
  //   iconType: 'iconfont',
  // },

]

// NATIVE_TABBAR(1) 和 CUSTOM_TABBAR_WITH_CACHE(2) 时，需要tabbar缓存
export const cacheTabbarEnable = selectedTabbarStrategy === TABBAR_MAP.NATIVE_TABBAR || selectedTabbarStrategy === TABBAR_MAP.CUSTOM_TABBAR_WITH_CACHE

const _tabbar: TabBar = {
  // 只有微信小程序支持 custom。App 和 H5 不生效
  // custom: selectedTabbarStrategy === TABBAR_MAP.CUSTOM_TABBAR_WITH_CACHE,
  color: '#717171',
  selectedColor: '#096AEB',
  backgroundColor: '#FFFFFF',
  borderStyle: 'white',
  height: '84px',
  fontSize: '12px',
  iconWidth: '24px',
  spacing: '5px',
  // midButton: {
  //   iconPath: 'static/tabbar/4.png',
  //   height: '80px',
  //   iconWidth: '60px',
  //   text: '发布',
  // },
  list: tabbarList as unknown as TabBar['list'],
}

// 0和1 需要显示底部的tabbar的各种配置，以利用缓存
export const tabBar = cacheTabbarEnable ? _tabbar : undefined
