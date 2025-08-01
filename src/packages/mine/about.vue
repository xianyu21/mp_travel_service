<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": ""
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
</script>

<template>
  <view class="bg-base">
    <wd-navbar
      title="关于我们" left-arrow custom-style="background-color: transparent !important;" :placeholder="true" :fixed="false"
      :bordered="false" :safe-area-inset-top="true" @click-left="back"
    />
    <view class="mx-[30rpx] mt-[30rpx] flex flex-col items-center justify-center gap-[30rpx]">
      <image
        src=""
        mode="scaleToFill"
        class="h-[150rpx] w-[150rpx] rounded-full bg-[#e6e7e6]"
      />
    </view>
    <view class="mx-[30rpx] mt-[30rpx] h-[102rpx] flex items-center justify-between rounded-[20rpx] bg-[#fff] px-[30rpx]" @click="go('packages/public/webView')">
      <text class="text-[28rpx] text-[#626364]">
        公司简介
      </text>
      <wd-icon name="chevron-right" size="12rpx" color="#A6A7A8" />
    </view>
    <view class="mx-[30rpx] mt-[30rpx] h-[102rpx] flex items-center justify-between rounded-[20rpx] bg-[#fff] px-[30rpx]" @click="go('packages/public/webView')">
      <text class="text-[28rpx] text-[#626364]">
        用户协议
      </text>
      <wd-icon name="chevron-right" size="12rpx" color="#A6A7A8" />
    </view>
    <view class="mx-[30rpx] mt-[30rpx] h-[102rpx] flex items-center justify-between rounded-[20rpx] bg-[#fff] px-[30rpx]" @click="go('packages/public/webView')">
      <text class="text-[28rpx] text-[#626364]">
        隐私政策
      </text>
      <wd-icon name="chevron-right" size="12rpx" color="#A6A7A8" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
