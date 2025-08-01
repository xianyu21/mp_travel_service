<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "地址管理"
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

// 地址列表数据
const addressList = ref([
  {
    id: 1,
    name: '冯宝宝',
    phone: '18560604560',
    address: '重庆市 九龙坡区 一城精英国际',
    isDefault: true,
  },
  {
    id: 2,
    name: '张楚岚',
    phone: '18560604560',
    address: '重庆市 九龙坡区 一城精英国际',
    isDefault: false,
  },
])

// 编辑地址
function editAddress(id: number) {
  go('/packages/mine/address_edit', { id })
}

// 添加新地址
function addNewAddress() {
  go('/packages/mine/address_edit')
}
</script>

<template>
  <view class="min-h-screen bg-[#f5f5f5]">
    <wd-navbar
      title="地址管理"
      custom-style="background-color: transparent !important;"
      left-arrow
      :placeholder="true"
      :fixed="false"
      :bordered="false"
      :safe-area-inset-top="true"
      @click-left="back"
    />

    <!-- 地址列表 -->
    <view class="px-[30rpx] py-[30rpx]">
      <view
        v-for="item in addressList"
        :key="item.id"
        class="mb-[30rpx] rounded-[20rpx] bg-white p-[30rpx]"
      >
        <view class="w-full">
          <view class="mb-[20rpx] flex items-center justify-between">
            <view class="flex items-center">
              <text class="mr-[20rpx] text-[32rpx] text-black font-medium">
                {{ item.name }}
              </text>
              <text class="text-[32rpx] text-black">
                {{ item.phone }}
              </text>
            </view>
            <view class="p-[10rpx]" @click="editAddress(item.id)">
              <image src="@img/img-008.png" mode="scaleToFill" class="h-[40rpx] w-[40rpx]" />
            </view>
          </view>
          <view class="flex items-start">
            <view v-if="item.isDefault" class="mr-[10rpx] mt-[4rpx] inline-block rounded-[8rpx] bg-[#0678ee] px-[12rpx] py-[4rpx] text-[24rpx] text-white">
              默认
            </view>
            <text class="flex-1 text-[28rpx] text-[#666] leading-[40rpx]">
              {{ item.address }}
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- 添加地址按钮 -->
    <view
      class="fixed bottom-[40rpx] left-[30rpx] right-[30rpx] h-[90rpx] flex items-center justify-center rounded-[45rpx] text-[32rpx] text-white"
      style="background: linear-gradient(106deg, #078af3 0%, #0668eb 100%);"
      @click="addNewAddress"
    >
      添加地址
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 使用unocss，无需额外样式
</style>
