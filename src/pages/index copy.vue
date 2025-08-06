<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationStyle": "custom"
  }
}
</route>

<script lang="ts" setup>
import { useMessage, useToast } from 'wot-design-uni'
import { useUserStore } from '@/store'
import { go } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()

// 热门推荐数据
const hotRecommendations = ref([
  { id: 1, image: '/static/images/hot-1.jpg', title: '有风的地方景点', views: '13万' },
  { id: 2, image: '/static/images/hot-2.jpg' },
  { id: 3, image: '/static/images/hot-3.jpg' },
])

// 精选景点数据
const featuredSpots = ref([
  { id: 1, name: '我在解放碑｜渝中区', image: '/static/images/scenic-1.jpg' },
  { id: 2, name: '重庆CBD中心', image: '/static/images/scenic-2.jpg' },
  { id: 3, name: '两江缆车', image: '/static/images/scenic-7.jpg' },
  { id: 4, name: '来福士生活广场', image: '/static/images/scenic-8.jpg' },
])

// 旅接推荐数据
const companions = ref([
  {
    id: 1,
    name: '冯宝宝',
    avatar: '/static/images/avatar-1.jpg',
    status: '已离线',
    statusColor: 'gray',
    rating: 5.0,
    orders: 6300,
    distance: 16.9,
    tags: ['为人随和开朗', '个性直爽大方', '会聊天找话题'],
    action: '立即下单',
    actionColor: 'blue',
  },
  {
    id: 2,
    name: '陈子晨',
    avatar: '/static/images/avatar-2.jpg',
    status: '服务中',
    statusColor: 'red',
    availableTime: '最早可约 09:00',
    rating: 5.0,
    orders: 6300,
    distance: 16.9,
    tags: ['为人随和开朗', '个性直爽大方', '会聊天找话题'],
    action: '预约下单',
    actionColor: 'gray',
  },
  {
    id: 3,
    name: '斌楠豆',
    avatar: '/static/images/avatar-3.jpg',
    status: '服务中',
    statusColor: 'red',
    availableTime: '最早可约 09:00',
    rating: 5.0,
    orders: 6300,
    distance: 16.9,
    tags: ['为人随和开朗', '个性直爽大方', '会聊天找话题'],
    action: '立即下单',
    actionColor: 'blue',
  },
])

function onMenuClick(path: string) {
  go(path)
}
</script>

<template>
  <view class="min-h-screen bg-[#f5f5f5]">
    <!-- 自定义导航栏 -->
    <wd-navbar :fixed="true" :placeholder="true">
      <template #capsule>
        <view class="flex items-center">
          <view class="flex items-center">
            <text class="i-mdi-map-marker text-[32rpx] text-[#333]" />
            <text class="ml-[10rpx] text-[30rpx] text-[#333] font-medium">
              重庆
            </text>
          </view>
          <view class="ml-[20rpx] h-[60rpx] flex flex-1 items-center rounded-[30rpx] bg-white px-[20rpx]">
            <text class="i-mdi-magnify text-[32rpx] text-[#999]" />
            <text class="ml-[10rpx] text-[28rpx] text-[#999]">
              请输入您想要搜索的内容
            </text>
          </view>
        </view>
      </template>
    </wd-navbar>

    <!-- 内容区域 -->
    <view class="p-[30rpx]">
      <!-- Banner -->
      <view class="mb-[30rpx] h-[280rpx] w-full overflow-hidden rounded-[20rpx]">
        <image src="/static/images/banner-1.jpg" mode="aspectFill" class="h-full w-full" />
      </view>

      <!-- 功能菜单 -->
      <view class="grid grid-cols-4 mb-[40rpx] gap-[30rpx] text-center">
        <view @click="onMenuClick('/packages/home/travel_guide')">
          <image src="/static/images/icon-guide.png" class="h-[88rpx] w-[88rpx]" />
          <text class="mt-[10rpx] block text-[26rpx] text-[#333]">
            游玩攻略
          </text>
        </view>
        <view @click="onMenuClick('/packages/home/scenic_mine')">
          <image src="/static/images/icon-spot.png" class="h-[88rpx] w-[88rpx]" />
          <text class="mt-[10rpx] block text-[26rpx] text-[#333]">
            我的景点
          </text>
        </view>
        <view @click="onMenuClick('')">
          <image src="/static/images/icon-route.png" class="h-[88rpx] w-[88rpx]" />
          <text class="mt-[10rpx] block text-[26rpx] text-[#333]">
            收藏路线
          </text>
        </view>
        <view @click="onMenuClick('/packages/mine/entry_information')">
          <image src="/static/images/icon-entry.png" class="h-[88rpx] w-[88rpx]" />
          <text class="mt-[10rpx] block text-[26rpx] text-[#333]">
            旅接入驻
          </text>
        </view>
      </view>

      <!-- 热门推荐 -->
      <view class="mb-[40rpx]">
        <view class="mb-[20rpx] text-[32rpx] text-[#333] font-medium">
          热门推荐
        </view>
        <view class="grid grid-cols-2 grid-rows-2 gap-[20rpx]">
          <view class="relative col-span-1 row-span-2 h-[400rpx] overflow-hidden rounded-[20rpx]">
            <image :src="hotRecommendations[0].image" mode="aspectFill" class="h-full w-full" />
            <view class="absolute bottom-0 left-0 w-full p-[20rpx] text-white">
              <view class="mb-[10rpx] inline-block rounded-[20rpx] bg-red-500 px-[15rpx] py-[5rpx] text-[24rpx]">
                HOT
              </view>
              <view class="text-[28rpx] font-medium">
                {{ hotRecommendations[0].title }}
              </view>
              <view class="text-[24rpx] opacity-80">
                浏览{{ hotRecommendations[0].views }}
              </view>
            </view>
          </view>
          <view class="h-[190rpx] overflow-hidden rounded-[20rpx]">
            <image :src="hotRecommendations[1].image" mode="aspectFill" class="h-full w-full" />
          </view>
          <view class="h-[190rpx] overflow-hidden rounded-[20rpx]">
            <image :src="hotRecommendations[2].image" mode="aspectFill" class="h-full w-full" />
          </view>
        </view>
      </view>

      <!-- 大咖带你游 Banner -->
      <view class="mb-[40rpx] h-[160rpx] w-full overflow-hidden rounded-[20rpx]">
        <image src="/static/images/banner-2.png" mode="aspectFill" class="h-full w-full" />
      </view>

      <!-- 精选景点 -->
      <view class="mb-[40rpx]">
        <view class="mb-[20rpx] flex items-center justify-between">
          <view class="flex items-center">
            <text class="i-mdi-fire text-[36rpx] text-red-500" />
            <text class="ml-[10rpx] text-[32rpx] text-[#333] font-medium">
              精选景点
            </text>
          </view>
          <view class="text-[28rpx] text-[#999]" @click="onMenuClick('/packages/home/scenic_handpick')">
            更多景点 >
          </view>
        </view>
        <view class="grid grid-cols-2 gap-[20rpx]">
          <view v-for="spot in featuredSpots" :key="spot.id" @click="onMenuClick(`/packages/home/scenic_details?id=${spot.id}`)">
            <image :src="spot.image" mode="aspectFill" class="h-[240rpx] w-full rounded-[20rpx]" />
            <text class="mt-[15rpx] block text-center text-[28rpx] text-[#333]">
              {{ spot.name }}
            </text>
          </view>
        </view>
      </view>

      <!-- 旅接推荐 -->
      <view>
        <view class="mb-[20rpx] text-[32rpx] text-[#333] font-medium">
          旅接推荐
        </view>
        <view class="mb-[20rpx] flex items-center text-[28rpx] text-[#666] space-x-[30rpx]">
          <text>全部</text>
          <text>性别</text>
          <text>单量</text>
          <text>评分</text>
          <text>驾车</text>
        </view>
        <view class="space-y-[30rpx]">
          <view v-for="(companion, index) in companions" :key="companion.id">
            <view v-if="index === 2" class="mb-[30rpx] h-[160rpx] w-full overflow-hidden rounded-[20rpx]">
              <image src="/static/images/banner-3.png" mode="aspectFill" class="h-full w-full" />
            </view>
            <view class="flex rounded-[20rpx] bg-white p-[20rpx]">
              <view class="relative h-[160rpx] w-[160rpx] flex-shrink-0 overflow-hidden rounded-[15rpx]">
                <image :src="companion.avatar" mode="aspectFill" class="h-full w-full" />
                <view
                  class="absolute bottom-0 left-0 w-full p-[5rpx] text-center text-[22rpx] text-white"
                  :class="companion.statusColor === 'red' ? 'bg-red-500' : 'bg-gray-400'"
                >
                  {{ companion.status === '服务中' ? companion.availableTime : companion.status }}
                </view>
              </view>
              <view class="ml-[20rpx] flex-1">
                <view class="flex items-center justify-between">
                  <view class="flex items-center">
                    <text class="text-[30rpx] text-[#333] font-medium">
                      {{ companion.name }}
                    </text>
                    <text class="i-mdi-gender-male ml-[10rpx] text-[28rpx] text-blue-500" />
                  </view>
                  <text class="text-[26rpx] text-[#999]">
                    {{ companion.distance }}km
                  </text>
                </view>
                <view class="my-[10rpx] flex items-center space-x-[10rpx]">
                  <text class="border border-blue-500 rounded-[5rpx] px-[8rpx] py-[2rpx] text-[22rpx] text-blue-500">
                    {{ companion.rating }}分｜已接{{ companion.orders }}+单
                  </text>
                </view>
                <view class="text-[24rpx] text-[#999]">
                  {{ companion.tags.join('，') }}
                </view>
                <view class="mt-[10rpx] flex justify-end">
                  <wd-button
                    size="small"
                    :custom-class="companion.actionColor === 'blue' ? '!bg-blue-500 !text-white' : '!bg-gray-200 !text-gray-500'"
                  >
                    {{ companion.action }}
                  </wd-button>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
