<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "推广赚钱"
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

// 收益数据
const earningsData = ref({
  totalEarnings: 5646.00,
  todayEarnings: 635.00,
  cumulativeEarnings: 15646.00,
})

// 佣金明细数据
const commissionList = ref([
  {
    id: 1,
    type: '推广奖励',
    amount: 100,
    user: '冯宝宝',
    avatar: '',
    time: '2025.08.27 15:34:59',
  },
  {
    id: 2,
    type: '推广提现',
    amount: -40,
    user: '张楚岚',
    avatar: '',
    time: '2025.08.27 15:34:59',
  },
])

// 当前选择的时间筛选
const selectedTimeFilter = ref('今日')
const timeFilterOptions = ['今日', '本周', '本月', '全部']

// 申请提现
function applyWithdraw() {
  if (earningsData.value.totalEarnings <= 0) {
    toast.error('可提现金额不足')
    return
  }
  // 跳转到提现页面
  go('/packages/mine/apply_withdrawal')
}

// 推广海报
function sharePromotion() {
  // 跳转到推广海报页面或生成推广链接
  go('/packages/mine/share_poster')
}

// 切换时间筛选
function changeTimeFilter() {
  // 这里可以实现时间筛选的下拉选择
  message.alert('时间筛选功能')
}
</script>

<template>
  <view class="min-h-screen bg-[#f5f5f5]">
    <wd-navbar
      title="推广赚钱"
      custom-style="background-color: transparent !important;"
      left-arrow
      :placeholder="true"
      :fixed="false"
      :bordered="false"
      :safe-area-inset-top="true"
      @click-left="back"
    />

    <!-- 收益卡片 -->
    <view
      class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] p-[40rpx]"
      style="background: linear-gradient(135deg, #1890ff 0%, #722ed1 100%);"
    >
      <view class="flex items-center justify-between">
        <view>
          <view class="mb-[10rpx] text-[28rpx] text-white opacity-90">
            可提现（元）
          </view>
          <view class="mb-[20rpx] text-[60rpx] text-white font-bold">
            {{ earningsData.totalEarnings.toFixed(2) }}
          </view>
          <view class="flex items-center text-[24rpx] text-white opacity-80">
            <text class="mr-[40rpx]">
              今日收益 {{ earningsData.todayEarnings.toFixed(2) }}
            </text>
            <text>
              累计收益 {{ earningsData.cumulativeEarnings.toFixed(2) }}
            </text>
          </view>
        </view>

        <view
          class="rounded-[40rpx] bg-white bg-opacity-20 px-[30rpx] py-[15rpx] text-[28rpx] text-white"
          @click="applyWithdraw"
        >
          申请提现
        </view>
      </view>
    </view>

    <!-- 佣金明细 -->
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-white p-[30rpx]">
      <view class="mb-[30rpx] flex items-center justify-between">
        <text class="text-[32rpx] text-[#333] font-medium">
          佣金明细
        </text>
        <view class="flex items-center" @click="changeTimeFilter">
          <text class="mr-[10rpx] text-[28rpx] text-[#666]">
            {{ selectedTimeFilter }}
          </text>
          <text class="text-[24rpx] text-[#999]">
            ▼
          </text>
        </view>
      </view>

      <!-- 明细列表 -->
      <view class="space-y-[30rpx]">
        <view
          v-for="item in commissionList"
          :key="item.id"
          class="flex items-center justify-between"
        >
          <view class="flex items-center">
            <!-- 用户头像 -->
            <view class="mr-[20rpx] h-[80rpx] w-[80rpx] flex items-center justify-center rounded-full bg-[#f0f0f0]">
              <image
                v-if="item.avatar"
                :src="item.avatar"
                mode="aspectFill"
                class="h-full w-full rounded-full"
              />
              <text v-else class="text-[24rpx] text-[#999]">
                {{ item.user.charAt(0) }}
              </text>
            </view>

            <!-- 明细信息 -->
            <view>
              <view class="mb-[8rpx] text-[32rpx] text-[#333]">
                {{ item.type }}
              </view>
              <view class="text-[24rpx] text-[#999]">
                {{ item.user }}
              </view>
            </view>
          </view>

          <!-- 金额和时间 -->
          <view class="text-right">
            <view
              class="mb-[8rpx] text-[32rpx] font-medium"
              :class="item.amount > 0 ? 'text-[#52c41a]' : 'text-[#ff4d4f]'"
            >
              {{ item.amount > 0 ? '+' : '' }}{{ item.amount }}
            </view>
            <view class="text-[24rpx] text-[#999]">
              {{ item.time }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 推广海报按钮 -->
    <view
      class="fixed bottom-[40rpx] left-[30rpx] right-[30rpx] h-[90rpx] flex items-center justify-center rounded-[45rpx] text-[32rpx] text-white"
      style="background: linear-gradient(106deg, #078af3 0%, #0668eb 100%);"
      @click="sharePromotion"
    >
      推广海报
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 使用unocss，无需额外样式
</style>
