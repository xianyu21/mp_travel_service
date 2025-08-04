<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "我的余额"
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

// 余额数据
const balanceData = ref({
  availableBalance: 3120.20,
  minWithdrawAmount: 100.00,
})

// 提现金额
const withdrawAmount = ref('')

// 选中的银行卡
const selectedBank = ref({
  name: '建设银行储蓄卡',
  cardNumber: '9943',
  icon: 'ccb',
})

// 提现须知
const withdrawNotices = [
  '提现存在10%的手续费，需用户自己承担',
  '因银行政策，每次最高可提现10000.00',
  '提现申请成功后，工作人员将在2-5个工作日审核打款，请耐心等待',
]

// 提交申请
function submitWithdraw() {
  // 验证提现金额
  if (!withdrawAmount.value) {
    toast.error('请输入提现金额')
    return
  }

  const amount = Number.parseFloat(withdrawAmount.value)

  if (amount < balanceData.value.minWithdrawAmount) {
    toast.error(`最低提现金额为¥${balanceData.value.minWithdrawAmount}`)
    return
  }

  if (amount > balanceData.value.availableBalance) {
    toast.error('提现金额不能超过可用余额')
    return
  }

  if (amount > 10000) {
    toast.error('单次提现金额不能超过¥10000')
    return
  }

  // 提交提现申请
  message.confirm('确定要提交提现申请吗？')
    .then(() => {
      // 实际项目中应该调用API提交
      toast.success('提现申请已提交，请等待审核')
      setTimeout(() => {
        back()
      }, 1500)
    })
    .catch(() => {
      // 用户取消
    })
}

// 选择银行卡
function selectBankCard() {
  go('/packages/mine/bank_management')
}
</script>

<template>
  <view class="min-h-screen bg-[#f5f5f5]">
    <wd-navbar
      title="我的余额"
      custom-style="background-color: transparent !important;"
      left-arrow
      :placeholder="true"
      :fixed="false"
      :bordered="false"
      :safe-area-inset-top="true"
      @click-left="back"
    />

    <!-- 余额卡片 -->
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] from-[#4facfe] to-[#00f2fe] bg-gradient-to-r p-[40rpx]">
      <view class="mb-[10rpx] text-[28rpx] text-white opacity-90">
        可提现（元）
      </view>
      <view class="text-[80rpx] text-white font-bold">
        {{ balanceData.availableBalance.toFixed(2) }}
      </view>
    </view>

    <!-- 提现金额输入 -->
    <view class="mx-[30rpx] mt-[40rpx]">
      <view class="mb-[20rpx] text-[32rpx] text-[#333] font-medium">
        提现金额
      </view>

      <view class="flex items-center rounded-[10rpx] bg-white px-[30rpx] py-[20rpx]">
        <text class="mr-[10rpx] text-[40rpx] text-[#333]">
          ¥
        </text>
        <input
          v-model="withdrawAmount"
          class="flex-1 text-[40rpx] text-[#333]"
          placeholder="0"
          placeholder-class="text-[#ccc]"
          type="digit"
        >
      </view>

      <view class="mt-[20rpx] text-[28rpx] text-[#4facfe]">
        需达到¥{{ balanceData.minWithdrawAmount.toFixed(2) }}及以上可申请提现
      </view>
    </view>

    <!-- 银行卡选择 -->
    <view class="mx-[30rpx] mt-[40rpx] rounded-[20rpx] bg-white p-[30rpx]" @click="selectBankCard">
      <view class="flex items-center justify-between">
        <view class="flex items-center">
          <!-- 银行图标 -->
          <view class="mr-[20rpx] h-[60rpx] w-[60rpx] flex items-center justify-center rounded-full bg-[#003e7e]">
            <text class="text-[20rpx] text-white font-bold">
              建设
            </text>
          </view>

          <view>
            <text class="text-[32rpx] text-[#333]">
              {{ selectedBank.name }}（{{ selectedBank.cardNumber }}）
            </text>
          </view>
        </view>

        <!-- 选中状态 -->
        <view class="h-[40rpx] w-[40rpx] flex items-center justify-center rounded-full bg-[#4facfe]">
          <text class="text-[20rpx] text-white">
            ✓
          </text>
        </view>
      </view>
    </view>

    <!-- 提现须知 -->
    <view class="mx-[30rpx] mt-[40rpx]">
      <view class="mb-[20rpx] text-[32rpx] text-[#333] font-medium">
        提现须知
      </view>

      <view class="space-y-[15rpx]">
        <view
          v-for="(notice, index) in withdrawNotices"
          :key="index"
          class="flex text-[28rpx] text-[#666] leading-relaxed"
        >
          <text class="mr-[10rpx]">
            {{ index + 1 }}.
          </text>
          <text class="flex-1">
            {{ notice }}
          </text>
        </view>
      </view>
    </view>

    <!-- 提交申请按钮 -->
    <view
      class="fixed bottom-[40rpx] left-[30rpx] right-[30rpx] h-[90rpx] flex items-center justify-center rounded-[45rpx] text-[32rpx] text-white"
      style="background: linear-gradient(106deg, #078af3 0%, #0668eb 100%);"
      @click="submitWithdraw"
    >
      提交申请
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 使用unocss，无需额外样式
</style>
