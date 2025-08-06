<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "游玩攻略"
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

// 游玩攻略列表数据
const travelGuides = ref([
  {
    id: 1,
    title: '我在解放碑｜洪崖洞景区密十八梯',
    image: '/static/images/guide-1.jpg',
    tags: ['别称巴渝', '山城', '渝都', '桥都', '艺术等中心'],
    publishTime: '2024/02/17 14:00'
  },
  {
    id: 2,
    title: '来福士生活广场｜重庆新地标',
    image: '/static/images/guide-2.jpg',
    tags: ['别称巴渝', '山城', '渝都', '桥都', '艺术等中心'],
    publishTime: '2024/02/17 14:00'
  },
  {
    id: 3,
    title: '如何花最短的时间玩转洪崖洞景区',
    image: '/static/images/guide-3.jpg',
    tags: ['别称巴渝', '山城', '渝都', '桥都', '艺术等中心'],
    publishTime: '2024/02/17 14:00'
  },
  {
    id: 4,
    title: '江边风｜一起乘坐轮渡观赏风景',
    image: '/static/images/guide-4.jpg',
    tags: ['别称巴渝', '山城', '渝都', '桥都', '艺术等中心'],
    publishTime: '2024/02/17 14:00'
  },
  {
    id: 5,
    title: '必打卡｜游客拍照景点｜来福士',
    image: '/static/images/guide-5.jpg',
    tags: ['别称巴渝', '山城', '渝都', '桥都', '艺术等中心'],
    publishTime: '2024/02/17 14:00'
  },
  {
    id: 6,
    title: '我在解放碑｜洪崖洞景区密十八梯',
    image: '/static/images/guide-6.jpg',
    tags: ['别称巴渝', '山城', '渝都', '桥都', '艺术等中心'],
    publishTime: '2024/02/17 14:00'
  }
])

// 点击攻略项
function onGuideClick(guide: any) {
  // 跳转到攻略详情页面
  go(`/packages/home/guide_detail?id=${guide.id}`)
}
</script>

<template>
  <view class="min-h-screen bg-[#f5f5f5]">
    <wd-navbar
      title="游玩攻略"
      custom-style="background-color: white !important;"
      left-arrow
      :placeholder="true"
      :fixed="true"
      :bordered="true"
      :safe-area-inset-top="true"
      @click-left="back"
    />

    <!-- 攻略列表 -->
    <view class="px-[30rpx] pt-[20rpx]">
      <view 
        v-for="guide in travelGuides" 
        :key="guide.id"
        class="mb-[30rpx] rounded-[20rpx] bg-white p-[30rpx] shadow-sm"
        @click="onGuideClick(guide)"
      >
        <view class="flex">
          <!-- 攻略图片 -->
          <image
            :src="guide.image"
            mode="aspectFill"
            class="mr-[20rpx] h-[160rpx] w-[160rpx] flex-shrink-0 rounded-[10rpx]"
          />
          
          <!-- 攻略内容 -->
          <view class="flex-1">
            <!-- 标题 -->
            <text class="block text-[32rpx] font-medium text-[#333] leading-[44rpx]">
              {{ guide.title }}
            </text>
            
            <!-- 标签 -->
            <view class="mt-[15rpx] flex flex-wrap">
              <text 
                v-for="(tag, index) in guide.tags" 
                :key="index"
                class="mr-[10rpx] text-[24rpx] text-[#999]"
              >
                {{ tag }}{{ index < guide.tags.length - 1 ? '、' : '...' }}
              </text>
            </view>
            
            <!-- 发布时间 -->
            <view class="mt-[20rpx] flex items-center">
              <view class="mr-[10rpx] h-[24rpx] w-[24rpx] rounded-full bg-[#ddd] flex items-center justify-center">
                <text class="text-[16rpx] text-[#999]">🕐</text>
              </view>
              <text class="text-[24rpx] text-[#999]">{{ guide.publishTime }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 使用unocss，无需额外样式
</style>
