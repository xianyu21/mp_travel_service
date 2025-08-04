<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "推广海报"
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

// 海报数据
const posterData = ref({
  backgroundImage: '/static/images/bg-001.png', // 海报背景图
  qrCode: '/static/images/qr-code.png', // 二维码图片
  userInfo: {
    name: '冯宝宝',
    avatar: '/static/images/avatar.jpg',
    inviteCode: 'ABC123',
  },
})

// 保存图片到相册
function saveToAlbum() {
  // 在实际项目中，这里应该先生成海报图片，然后保存到相册
  uni.saveImageToPhotosAlbum({
    filePath: posterData.value.backgroundImage,
    success: () => {
      toast.success('海报已保存到相册')
    },
    fail: (err) => {
      if (err.errMsg.includes('auth deny')) {
        toast.error('请先授权访问相册')
      }
      else {
        toast.error('保存失败，请重试')
      }
    },
  })
}

// 分享到微信
function shareToWeChat() {
  // 检查是否支持微信分享
  if (uni.getSystemInfoSync().platform === 'devtools') {
    toast.info('请在真机上测试微信分享功能')
    return
  }

  // 在实际项目中，这里应该调用微信分享API
  uni.share({
    provider: 'weixin',
    scene: 'WXSceneSession',
    type: 2,
    imageUrl: posterData.value.backgroundImage,
    success: () => {
      toast.success('分享成功')
    },
    fail: (err) => {
      console.error('分享失败:', err)
      toast.error('分享失败，请重试')
    },
  })
}

// 生成海报（预留功能）
function generatePoster() {
  // 在实际项目中，这里应该调用canvas生成海报
  toast.info('正在生成专属海报...')
}

onMounted(() => {
  // 页面加载时可以生成海报
  generatePoster()
})
</script>

<template>
  <view class="min-h-screen bg-[#f5f5f5]">
    <wd-navbar
      title="推广海报"
      custom-style="background-color: transparent !important;"
      left-arrow
      :placeholder="true"
      :fixed="false"
      :bordered="false"
      :safe-area-inset-top="true"
      @click-left="back"
    />

    <!-- 海报展示区域 -->
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-white p-[30rpx]">
      <!-- 海报图片 -->
      <view class="relative overflow-hidden rounded-[20rpx]">
        <image
          :src="posterData.backgroundImage"
          mode="aspectFill"
          class="h-[800rpx] w-full"
        />

        <!-- 海报内容叠加层（如果需要动态生成内容） -->
        <!-- <view class="absolute bottom-[40rpx] left-[40rpx] right-[40rpx]">
          <view class="flex items-center justify-between">
            <view class="flex items-center">
              <image
                :src="posterData.userInfo.avatar"
                mode="aspectFill"
                class="mr-[20rpx] h-[80rpx] w-[80rpx] rounded-full"
              />
              <view>
                <text class="block text-[32rpx] font-medium text-white">{{ posterData.userInfo.name }}</text>
                <text class="text-[24rpx] text-white opacity-80">邀请码：{{ posterData.userInfo.inviteCode }}</text>
              </view>
            </view>
            <image
              :src="posterData.qrCode"
              mode="aspectFit"
              class="h-[120rpx] w-[120rpx] rounded-[10rpx] bg-white p-[10rpx]"
            />
          </view>
        </view> -->
      </view>
    </view>

    <!-- 使用说明 -->
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-white p-[30rpx]">
      <view class="flex items-start">
        <!-- 二维码 -->
        <view class="mr-[30rpx] flex-shrink-0">
          <image
            src="/static/images/qr-code.png"
            mode="aspectFit"
            class="h-[120rpx] w-[120rpx] border border-[#eee] rounded-[10rpx]"
          />
        </view>

        <!-- 说明文字 -->
        <view class="flex-1">
          <view class="mb-[10rpx] flex items-center">
            <view class="mr-[10rpx] h-[30rpx] w-[30rpx] flex items-center justify-center rounded-full bg-[#4facfe]">
              <text class="text-[20rpx] text-white">
                1
              </text>
            </view>
            <text class="text-[28rpx] text-[#666]">
              保存图片到相册
            </text>
          </view>

          <view class="flex items-center">
            <view class="mr-[10rpx] h-[30rpx] w-[30rpx] flex items-center justify-center rounded-full bg-[#4facfe]">
              <text class="text-[20rpx] text-white">
                2
              </text>
            </view>
            <text class="text-[28rpx] text-[#666]">
              打开相册可见
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部操作按钮 -->
    <view class="fixed bottom-[40rpx] left-[30rpx] right-[30rpx] flex gap-[20rpx]">
      <!-- 保存图片按钮 -->
      <view
        class="h-[90rpx] flex flex-1 items-center justify-center rounded-[45rpx] bg-[#4facfe] text-[32rpx] text-white"
        @click="saveToAlbum"
      >
        <view class="mr-[10rpx] h-[40rpx] w-[40rpx] flex items-center justify-center rounded-full bg-white bg-opacity-20">
          <text class="text-[24rpx] text-white">
            ↓
          </text>
        </view>
        保存图片
      </view>

      <!-- 微信分享按钮 -->
      <view
        class="h-[90rpx] flex flex-1 items-center justify-center rounded-[45rpx] bg-[#07c160] text-[32rpx] text-white"
        @click="shareToWeChat"
      >
        <view class="mr-[10rpx] h-[40rpx] w-[40rpx] flex items-center justify-center rounded-full bg-white bg-opacity-20">
          <text class="text-[24rpx] text-white">
            微
          </text>
        </view>
        微信
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 使用unocss，无需额外样式
</style>
