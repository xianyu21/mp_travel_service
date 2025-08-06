<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "我的景点"
  }
}
</route>

<script lang="ts" setup>
import { useMessage, useToast } from 'wot-design-uni'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()

// 我的收藏景点数据
const scenicSpots = ref([
  {
    id: 1,
    name: '我在解放碑｜渝中区',
    image: '/static/images/scenic-1.jpg',
    isFavorite: true,
  },
  {
    id: 2,
    name: '重庆CBD中心',
    image: '/static/images/scenic-2.jpg',
    isFavorite: true,
  },
  {
    id: 3,
    name: '我在解放碑｜渝中区',
    image: '/static/images/scenic-3.jpg',
    isFavorite: true,
  },
  {
    id: 4,
    name: '重庆CBD中心',
    image: '/static/images/scenic-4.jpg',
    isFavorite: true,
  },
  {
    id: 5,
    name: '我在解放碑｜渝中区',
    image: '/static/images/scenic-5.jpg',
    isFavorite: true,
  },
  {
    id: 6,
    name: '重庆CBD中心',
    image: '/static/images/scenic-6.jpg',
    isFavorite: true,
  },
  {
    id: 7,
    name: '我在解放碑｜渝中区',
    image: '/static/images/scenic-7.jpg',
    isFavorite: true,
  },
  {
    id: 8,
    name: '重庆CBD中心',
    image: '/static/images/scenic-8.jpg',
    isFavorite: true,
  },
])

// 切换收藏状态 (在这里应该是取消收藏)
function toggleFavorite(spot: any) {
  spot.isFavorite = !spot.isFavorite
  // 在实际应用中，这应该会从列表中移除该项目
  // 在这个模型中，我们只显示一个提示消息
  if (!spot.isFavorite) {
    toast.success('已取消收藏')
    // 可选: 过滤掉未收藏的景点
    // scenicSpots.value = scenicSpots.value.filter(s => s.id !== spot.id)
  }
  else {
    toast.success('已收藏')
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
      title="我的景点"
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
