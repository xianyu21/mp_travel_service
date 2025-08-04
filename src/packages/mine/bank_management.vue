<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "银行卡管理"
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

// 银行卡列表数据
const bankCards = ref([
  {
    id: 1,
    bankName: '中国工商银行',
    cardNumber: '2522',
    singleLimit: 5000,
    dailyLimit: 5000,
    icon: 'icbc', // 工商银行图标
    color: '#c8102e',
  },
  {
    id: 2,
    bankName: '中国建设银行',
    cardNumber: '2522',
    singleLimit: 5000,
    dailyLimit: 5000,
    icon: 'ccb', // 建设银行图标
    color: '#003e7e',
  },
])

// 编辑银行卡
function editBankCard(id: number) {
  go('/packages/mine/bank_edit', { id })
}

// 删除银行卡
function deleteBankCard(id: number) {
  message.confirm('确定要删除这张银行卡吗？')
    .then(() => {
      // 实际项目中应该调用API删除
      const index = bankCards.value.findIndex(card => card.id === id)
      if (index > -1) {
        bankCards.value.splice(index, 1)
        toast.success('删除成功')
      }
    })
    .catch(() => {
      // 用户取消删除
    })
}

// 添加银行卡
function addBankCard() {
  go('/packages/mine/bank_edit')
}
</script>

<template>
  <view class="min-h-screen bg-[#f5f5f5]">
    <wd-navbar
      title="银行卡管理"
      custom-style="background-color: transparent !important;"
      left-arrow
      :placeholder="true"
      :fixed="false"
      :bordered="false"
      :safe-area-inset-top="true"
      @click-left="back"
    />

    <!-- 银行卡列表 -->
    <view class="px-[30rpx] pt-[30rpx]">
      <view
        v-for="card in bankCards"
        :key="card.id"
        class="mb-[30rpx] rounded-[20rpx] bg-white p-[30rpx]"
      >
        <!-- 银行信息行 -->
        <view class="mb-[20rpx] flex items-center">
          <!-- 银行图标 -->
          <view
            class="mr-[30rpx] h-[80rpx] w-[80rpx] flex items-center justify-center rounded-full text-[32rpx] text-white"
            :style="{ backgroundColor: card.color }"
          >
            <text class="text-[24rpx] font-bold">
              {{ card.bankName.slice(2, 4) }}
            </text>
          </view>

          <!-- 银行信息 -->
          <view class="flex-1">
            <view class="mb-[10rpx] text-[32rpx] text-[#333] font-medium">
              {{ card.bankName }}({{ card.cardNumber }})
            </view>
            <view class="text-[28rpx] text-[#666]">
              单笔限额¥{{ card.singleLimit }}，单日限额¥{{ card.dailyLimit }}
            </view>
          </view>
        </view>

        <!-- 分割线 -->
        <view class="border-t border-[#f5f5f5] pt-[20rpx]">
          <!-- 操作按钮行 -->
          <view class="flex items-center justify-end">
            <view
              class="mr-[40rpx] flex items-center"
              @click="editBankCard(card.id)"
            >
              <image
                src=""
                mode="scaleToFill"
                class="mr-[8rpx] h-[50rpx] w-[50rpx] bg-[#eaeaea]"
              />
              <text class="text-[28rpx] text-[#666]">
                编辑
              </text>
            </view>
            <view
              class="flex items-center"
              @click="deleteBankCard(card.id)"
            >
              <image
                src=""
                mode="scaleToFill"
                class="mr-[8rpx] h-[50rpx] w-[50rpx] bg-[#eaeaea]"
              />
              <text class="text-[28rpx] text-[#666]">
                删除
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 添加银行卡按钮 -->
    <view
      class="fixed bottom-[40rpx] left-[30rpx] right-[30rpx] h-[90rpx] flex items-center justify-center rounded-[45rpx] text-[32rpx] text-white"
      style="background: linear-gradient(106deg, #078af3 0%, #0668eb 100%);"
      @click="addBankCard"
    >
      添加银行卡
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 使用unocss，无需额外样式
</style>
