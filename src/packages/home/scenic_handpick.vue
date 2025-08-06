<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "精选景点"
  }
}
</route>

<script lang="ts" setup>
import { useMessage, useToast } from 'wot-design-uni'
// import {  } from '@/api/index'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()

// 精选景点数据
const scenicSpots = ref([
  {
    id: 1,
    name: '我在解放碑｜渝中区',
    image: '/static/images/scenic-1.jpg',
    isFavorite: false,
  },
  {
    id: 2,
    name: '重庆CBD中心',
    image: '/static/images/scenic-2.jpg',
    isFavorite: false,
  },
  {
    id: 3,
    name: '我在解放碑｜渝中区',
    image: '/static/images/scenic-3.jpg',
    isFavorite: false,
  },
  {
    id: 4,
    name: '重庆CBD中心',
    image: '/static/images/scenic-4.jpg',
    isFavorite: false,
  },
  {
    id: 5,
    name: '我在解放碑｜渝中区',
    image: '/static/images/scenic-5.jpg',
    isFavorite: false,
  },
  {
    id: 6,
    name: '重庆CBD中心',
    image: '/static/images/scenic-6.jpg',
    isFavorite: false,
  },
  {
    id: 7,
    name: '我在解放碑｜渝中区',
    image: '/static/images/scenic-7.jpg',
    isFavorite: false,
  },
  {
    id: 8,
    name: '重庆CBD中心',
    image: '/static/images/scenic-8.jpg',
    isFavorite: false,
  },
])

// 切换收藏状态
function toggleFavorite(spot: any) {
  spot.isFavorite = !spot.isFavorite
  if (spot.isFavorite) {
    toast.success('已添加到收藏')
  }
  else {
    toast.success('已取消收藏')
  }
}

// 点击景点
function onSpotClick(spot: any) {
  // 跳转到景点详情页面
  go(`/packages/home/scenic_detail?id=${spot.id}`)
}
</script>

<template>
  <view class="min-h-screen bg-[#f5f5f5]">
    <wd-navbar
      title="精选景点"
      custom-style="background-color: white !important;"
      left-arrow
      :placeholder="true"
      :fixed="true"
      :bordered="true"
      :safe-area-inset-top="true"
      @click-left="back"
    />

    <!-- 景点网格 -->
    <view class="px-[30rpx] pt-[20rpx]">
      <view class="grid grid-cols-2 gap-[20rpx]">
        <view
          v-for="spot in scenicSpots"
          :key="spot.id"
          class="relative overflow-hidden rounded-[20rpx] bg-white shadow-sm"
          @click="onSpotClick(spot)"
        >
          <!-- 景点图片 -->
          <view class="relative">
            <image
              :src="spot.image"
              mode="aspectFill"
              class="h-[240rpx] w-full"
            />

            <!-- 收藏按钮 -->
            <view
              class="absolute right-[15rpx] top-[15rpx] h-[50rpx] w-[50rpx] flex items-center justify-center rounded-full bg-black bg-opacity-30"
              @click.stop="toggleFavorite(spot)"
            >
              <text
                class="text-[24rpx]"
                :class="spot.isFavorite ? 'text-[#ff6b35]' : 'text-white'"
              >
                {{ spot.isFavorite ? '★' : '☆' }}
              </text>
            </view>
          </view>

          <!-- 景点名称 -->
          <view class="p-[20rpx]">
            <text class="text-[28rpx] text-[#333] font-medium">
              {{ spot.name }}
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部间距 -->
    <view class="h-[40rpx]" />
  </view>
</template>

<style lang="scss" scoped>
// 使用unocss，无需额外样式
</style>
