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
      title="申请提现"
      custom-style="background-color: transparent !important;"
      left-arrow
      :placeholder="true"
      :fixed="false"
      :bordered="false"
      :safe-area-inset-top="true"
      @click-left="back"
    />
    <view class="mt-[120rpx] flex flex-col items-center justify-center">
      <image
        src="@img/img-017.png"
        mode="scaleToFill"
        class="h-[224rpx] w-[224rpx]"
      />
      <view class="text-[#666666] text-[26rox]">
        已提交申请，请等待审核
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
