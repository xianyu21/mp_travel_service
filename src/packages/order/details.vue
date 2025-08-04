<route lang="jsonc" type="page">
{
    "layout": "default",
    "style": {
        "navigationBarTitleText": "订单详情"
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

// 订单详情数据
const orderDetail = ref({
  // 用户信息
  user: {
    name: 'XX用户',
    phone: '18560604560',
    address: '重庆市 沙坪坝区 微电园产业园3栋研究院5楼',
  },
  // 服务信息
  service: {
    name: '陪玩陪拍×1',
    price: 499.00,
    image: '/static/images/service-1.jpg',
    time: '2025.07.03 18:00',
  },
  // 订单进度
  progress: {
    current: 4, // 当前进度：1-已接单，2-已出发，3-已到达，4-开始服务，5-完成
    steps: [
      { id: 1, name: '已接单', time: '04:10', completed: true },
      { id: 2, name: '已出发', time: '06:10', completed: true },
      { id: 3, name: '已到达', time: '07:10', completed: true },
      { id: 4, name: '开始服务', time: '08:10', completed: true },
      { id: 5, name: '完成', time: '', completed: false },
    ],
  },
  // 价格明细
  pricing: {
    servicePrice: 479.00,
    carFee: 19.00,
    actualPaid: 499.00,
    estimatedIncome: 499.00,
  },
  // 续单服务
  renewal: {
    startTime: '2025.07.07 14:00',
    endTime: '2025.07.07 23:00',
    totalAmount: 1299.00,
    estimatedIncome: 1299.00,
  },
  // 订单明细
  orderInfo: {
    orderNumber: 'SG156488489154156490',
    orderTime: '2025.7.30 11:10',
    paymentMethod: '微信支付',
  },
})

// 联系客户
function contactCustomer() {
  uni.makePhoneCall({
    phoneNumber: orderDetail.value.user.phone,
    success: () => {
      console.log('拨打电话成功')
    },
    fail: (err) => {
      console.error('拨打电话失败:', err)
      toast.error('拨打电话失败')
    },
  })
}

// 点击提醒
function clickRemind() {
  toast.success('已发送提醒')
}

// 服务完成
function completeService() {
  message.confirm('确认服务已完成吗？')
    .then(() => {
      // 更新订单状态
      orderDetail.value.progress.current = 5
      orderDetail.value.progress.steps[4].completed = true
      orderDetail.value.progress.steps[4].time = new Date().toLocaleTimeString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      })

      toast.success('服务已完成')
    })
    .catch(() => { })
}
</script>

<template>
  <view class="bg min-h-screen">
    <wd-navbar
      title="订单详情" custom-style="background-color: transparent !important; color: #fff !important;"
      left-arrow :placeholder="false" :fixed="false" :bordered="false" @click-left="back"
    >
      <template #left>
        <wd-icon name="thin-arrow-left" size="36rpx" />
      </template>
    </wd-navbar>
    <view class="relative from-[#4facfe] to-[#00f2fe] bg-gradient-to-r pb-[40rpx] pt-[var(--status-bar-height)]">
      <!-- 用户信息卡片 -->
      <view class="mx-[30rpx] mt-[20rpx] rounded-[20rpx] bg-white p-[30rpx]">
        <view class="flex items-center justify-between">
          <view class="flex-1">
            <view class="flex items-center">
              <text class="text-[32rpx] text-[#333] font-medium">
                {{ orderDetail.user.name }}
              </text>
              <text class="ml-[20rpx] text-[28rpx] text-[#666]">
                {{ orderDetail.user.phone }}
              </text>
            </view>
            <text class="mt-[10rpx] text-[28rpx] text-[#999]">
              {{ orderDetail.user.address }}
            </text>
          </view>

          <!-- 客服按钮 -->
          <view
            class="h-[60rpx] w-[60rpx] flex items-center justify-center rounded-full bg-[#4facfe]"
            @click="contactCustomer"
          >
            <text class="text-[24rpx] text-white">
              客服
            </text>
          </view>
        </view>

        <!-- 服务信息 -->
        <view class="mt-[30rpx] flex items-center border-t border-[#f5f5f5] pt-[30rpx]">
          <image
            :src="orderDetail.service.image" mode="aspectFill"
            class="mr-[20rpx] h-[100rpx] w-[100rpx] rounded-[10rpx]"
          />
          <view class="flex-1">
            <text class="block text-[32rpx] text-[#333]">
              {{ orderDetail.service.name }}
            </text>
            <text class="mt-[10rpx] block text-[28rpx] text-[#999]">
              服务时间：{{ orderDetail.service.time }}
            </text>
          </view>
          <text class="text-[32rpx] text-[#ff6b35] font-medium">
            ¥{{ orderDetail.service.price.toFixed(2) }}
          </text>
        </view>

        <!-- 联系客户按钮 -->
        <view class="mt-[30rpx] border-t border-[#f5f5f5] pt-[30rpx]">
          <view
            class="h-[70rpx] flex items-center justify-center rounded-[35rpx] bg-[#4facfe]"
            @click="clickRemind"
          >
            <view
              class="mr-[10rpx] h-[30rpx] w-[30rpx] flex items-center justify-center rounded-full bg-white bg-opacity-20"
            >
              <text class="text-[16rpx] text-white">
                📞
              </text>
            </view>
            <text class="text-[28rpx] text-white">
              点击提醒
            </text>
          </view>
        </view>
      </view>
    </view>

    <view class="bg-[#FAFAFA] pb-[100rpx] pt-[30rpx]" style="border-radius: 20rpx 20rpx 0rpx 0rpx;">
      <!-- 进度区域 -->
      <view class="mx-[30rpx] rounded-[20rpx] bg-white p-[30rpx]">
        <view class="mb-[30rpx] text-[32rpx] text-[#333] font-medium">
          进度
        </view>

        <view class="flex items-center justify-between">
          <view
            v-for="(step, index) in orderDetail.progress.steps" :key="step.id"
            class="flex flex-col items-center"
          >
            <!-- 进度圆点 -->
            <view
              class="h-[40rpx] w-[40rpx] flex items-center justify-center rounded-full"
              :class="step.completed ? 'bg-[#4facfe]' : 'bg-[#ddd]'"
            >
              <text class="text-[20rpx]" :class="step.completed ? 'text-white' : 'text-[#999]'">
                ✓
              </text>
            </view>

            <!-- 步骤名称 -->
            <text class="mt-[10rpx] text-[24rpx]" :class="step.completed ? 'text-[#333]' : 'text-[#999]'">
              {{ step.name }}
            </text>

            <!-- 时间 -->
            <text class="mt-[5rpx] text-[20rpx]" :class="step.completed ? 'text-[#4facfe]' : 'text-[#ccc]'">
              {{ step.time }}
            </text>
          </view>
        </view>
      </view>

      <!-- 价格明细 -->
      <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-white p-[30rpx]">
        <view class="mb-[30rpx] text-[32rpx] text-[#333] font-medium">
          价格明细
        </view>

        <view class="space-y-[20rpx]">
          <view class="flex items-center justify-between">
            <text class="text-[28rpx] text-[#666]">
              项目价格
            </text>
            <text class="text-[28rpx] text-[#333]">
              ¥{{ orderDetail.pricing.servicePrice.toFixed(2) }}
            </text>
          </view>

          <view class="flex items-center justify-between">
            <text class="text-[28rpx] text-[#666]">
              车费
            </text>
            <text class="text-[28rpx] text-[#333]">
              ¥{{ orderDetail.pricing.carFee.toFixed(2) }}
            </text>
          </view>

          <view class="flex items-center justify-between">
            <text class="text-[28rpx] text-[#666]">
              实付金额
            </text>
            <text class="text-[32rpx] text-[#4facfe] font-medium">
              ¥{{ orderDetail.pricing.actualPaid.toFixed(2) }}
            </text>
          </view>

          <view class="flex items-center justify-between">
            <text class="text-[28rpx] text-[#666]">
              预估收入
            </text>
            <text class="text-[32rpx] text-[#4facfe] font-medium">
              ¥{{ orderDetail.pricing.estimatedIncome.toFixed(2) }}
            </text>
          </view>
        </view>
      </view>

      <!-- 续单服务 -->
      <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-white p-[30rpx]">
        <view class="mb-[30rpx] text-[32rpx] text-[#333] font-medium">
          续单服务
        </view>

        <view class="space-y-[20rpx]">
          <view class="flex items-center justify-between">
            <text class="text-[28rpx] text-[#666]">
              续单开始时间
            </text>
            <text class="text-[28rpx] text-[#333]">
              {{ orderDetail.renewal.startTime }}
            </text>
          </view>

          <view class="flex items-center justify-between">
            <text class="text-[28rpx] text-[#666]">
              续单结束时间
            </text>
            <text class="text-[28rpx] text-[#333]">
              {{ orderDetail.renewal.endTime }}
            </text>
          </view>

          <view class="flex items-center justify-between">
            <text class="text-[28rpx] text-[#666]">
              续单实付金额
            </text>
            <text class="text-[32rpx] text-[#4facfe] font-medium">
              ¥{{ orderDetail.renewal.totalAmount.toFixed(2) }}
            </text>
          </view>

          <view class="flex items-center justify-between">
            <text class="text-[28rpx] text-[#666]">
              预估收入
            </text>
            <text class="text-[32rpx] text-[#4facfe] font-medium">
              ¥{{ orderDetail.renewal.estimatedIncome.toFixed(2) }}
            </text>
          </view>
        </view>
      </view>

      <!-- 订单明细 -->
      <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-white p-[30rpx]">
        <view class="mb-[30rpx] text-[32rpx] text-[#333] font-medium">
          订单明细
        </view>

        <view class="space-y-[20rpx]">
          <view class="flex items-center justify-between">
            <text class="text-[28rpx] text-[#666]">
              订单编号
            </text>
            <text class="text-[28rpx] text-[#333]">
              {{ orderDetail.orderInfo.orderNumber }}
            </text>
          </view>

          <view class="flex items-center justify-between">
            <text class="text-[28rpx] text-[#666]">
              下单时间
            </text>
            <text class="text-[28rpx] text-[#333]">
              {{ orderDetail.orderInfo.orderTime }}
            </text>
          </view>

          <view class="flex items-center justify-between">
            <text class="text-[28rpx] text-[#666]">
              支付方式
            </text>
            <text class="text-[28rpx] text-[#333]">
              {{ orderDetail.orderInfo.paymentMethod }}
            </text>
          </view>
        </view>
      </view>

      <!-- 底部操作按钮 -->
      <view class="mx-[30rpx] mt-[30rpx] flex items-center justify-end">
        <view
          class="h-[60rpx] w-[152rpx] flex items-center justify-center rounded-[45rpx] text-[28rpx] text-white"
          style="background: linear-gradient( 106deg, #078AF3 0%, #0668EB 100%);" @click="completeService"
        >
          服务完成
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 使用unocss，无需额外样式
.bg {
  background: #5594fb;
  width: 100%;
  min-height: 100vh;
}
:deep(.wd-navbar__title) {
  color: #fff;
}
</style>
