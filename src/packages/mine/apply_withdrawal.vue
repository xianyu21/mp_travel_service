<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "申请提现"
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

// 提现表单数据
const withdrawalData = ref({
  amount: '', // 提现金额
  bankCard: {
    bankName: '建设银行储蓄卡',
    cardNumber: '9943',
    selected: true,
  },
})

// 提现规则
const withdrawalRules = [
  '提现存在10%的手续费，需用户自己承担',
  '因银行政策，每次最高可提现10000.00',
  '提现申请成功后，工作人员将在2-5个工作日审核打款，请耐心等待',
]

// 输入金额
function onAmountInput(value: string) {
  // 只允许输入数字和小数点
  const numericValue = value.replace(/[^\d.]/g, '')

  // 限制小数点后两位
  const parts = numericValue.split('.')
  if (parts.length > 2) {
    withdrawalData.value.amount = `${parts[0]}.${parts[1]}`
  }
  else if (parts[1] && parts[1].length > 2) {
    withdrawalData.value.amount = `${parts[0]}.${parts[1].substring(0, 2)}`
  }
  else {
    withdrawalData.value.amount = numericValue
  }
}

// 选择银行卡
function selectBankCard() {
  go('/packages/mine/bank_management')
}

// 提交申请
function submitWithdrawal() {
  // 表单验证
  if (!withdrawalData.value.amount) {
    toast.error('请输入提现金额')
    return
  }

  const amount = Number.parseFloat(withdrawalData.value.amount)

  if (amount < 100) {
    toast.error('最低提现金额为¥100.00')
    return
  }

  if (amount > 10000) {
    toast.error('单次最高提现金额为¥10000.00')
    return
  }

  // 计算手续费
  const fee = amount * 0.1
  const actualAmount = amount - fee

  // 确认提现
  message.confirm(
    `确认提现¥${amount.toFixed(2)}吗？\n手续费：¥${fee.toFixed(2)}\n实际到账：¥${actualAmount.toFixed(2)}`,
  )
    .then(() => {
      // 实际项目中应该调用API提交提现申请
      toast.success('提现申请已提交，请等待审核')
      setTimeout(() => {
        back()
      }, 1500)
    })
    .catch(() => {})
}
</script>

<template>
  <view class="min-h-screen bg-[#f5f5f5] pb-[200rpx]">
    <wd-navbar
      title="申请提现"
      custom-style="background-color: transparent !important;"
      left-arrow
      :placeholder="true"
      :fixed="false"
      :bordered="false"
      :safe-area-inset-top="true"
      @click-left="back"
    />

    <!-- 提现金额输入 -->
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-white p-[30rpx]">
      <view class="mb-[20rpx] text-[32rpx] text-[#333]">
        提现金额
      </view>

      <view class="flex items-center">
        <text class="mr-[10rpx] text-[60rpx] text-[#333]">
          ¥
        </text>
        <input
          v-model="withdrawalData.amount"
          type="digit"
          placeholder="0.00"
          class="flex-1 text-[60rpx] text-[#333]"
          @input="onAmountInput"
        >
      </view>

      <view class="mt-[20rpx] text-[28rpx] text-[#4facfe]">
        需达到¥100.00及以上可申请提现
      </view>
    </view>

    <!-- 银行卡选择 -->
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-white p-[30rpx]" @click="selectBankCard">
      <view class="flex items-center justify-between">
        <view class="flex items-center">
          <!-- 银行图标 -->
          <view class="mr-[20rpx] h-[60rpx] w-[60rpx] flex items-center justify-center rounded-full bg-[#4facfe]">
            <text class="text-[24rpx] text-white font-medium">
              建设
            </text>
          </view>

          <!-- 银行卡信息 -->
          <view>
            <text class="block text-[32rpx] text-[#333]">
              {{ withdrawalData.bankCard.bankName }} ({{ withdrawalData.bankCard.cardNumber }})
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
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-white p-[30rpx]">
      <view class="mb-[20rpx] text-[32rpx] text-[#333] font-medium">
        提现须知
      </view>

      <view class="space-y-[15rpx]">
        <view
          v-for="(rule, index) in withdrawalRules"
          :key="index"
          class="flex items-start"
        >
          <text class="mr-[10rpx] text-[28rpx] text-[#666]">
            {{ index + 1 }}.
          </text>
          <text class="flex-1 text-[28rpx] text-[#666] leading-[40rpx]">
            {{ rule }}
          </text>
        </view>
      </view>
    </view>

    <!-- 底部提交按钮 -->
    <view class="fixed bottom-[40rpx] left-[30rpx] right-[30rpx]">
      <view
        class="h-[90rpx] flex items-center justify-center rounded-[45rpx] text-[32rpx] text-white"
        style="background: linear-gradient(106deg, #078af3 0%, #0668eb 100%);"
        @click="submitWithdrawal"
      >
        提交申请
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 使用unocss，无需额外样式
</style>
