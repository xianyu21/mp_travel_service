<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": ""
  }
}
</route>

<script  setup>
import { } from '@/api/index'
import { back, go, reloadUrl } from '@/utils/tools'
</script>

<template>
  <view class="bg-base-order">
    <wd-navbar
      title="消息中心" custom-style="background-color: transparent !important;" left-arrow :placeholder="true" :fixed="false" :bordered="false" :safe-area-inset-top="true"
      @click-left="back"
    >
      <template #right>
        <image
          src="@img/img-001.png"
          mode="scaleToFill"
          class="h-[38.28rpx] w-[33.72rpx]"
        />
      </template>
    </wd-navbar>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
