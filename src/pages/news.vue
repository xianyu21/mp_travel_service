<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": ""
  }
}
</route>

<script  setup>
import { useMessage, useToast } from 'wot-design-uni'
import { } from '@/api/index'
import { useUserStore } from '@/store'
import { back, call, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
function clear() {
  console.log('------------------------------')
  console.log('1')
  console.log('------------------------------')
  message
    .confirm({
      msg: '确认清理所有未读消息？',
    })
    .then(() => {
      console.log('点击了确定按钮')
    })
    .catch(() => {
      console.log('点击了取消按钮')
    })
}
</script>

<template>
  <view class="bg-base-news">
    <wd-navbar
      title="消息中心" custom-style="background-color: transparent !important;" left-arrow :placeholder="true" :fixed="false" :bordered="false" :safe-area-inset-top="true"
      @click-left="back"
    >
      <template #right>
        <image
          src="@img/img-001.png"
          mode="scaleToFill"
          class="h-[38.28rpx] w-[33.72rpx]"
          @click="clear"
        />
      </template>
    </wd-navbar>
    <view class="grid grid-cols-3 mx-[30rpx] mt-[30rpx] h-[224rpx] rounded-[20rpx] bg-[#fff]">
      <view class="flex flex-grow flex-col items-center justify-center gap-[18rpx]">
        <image
          src="@img/img-002.png"
          mode="scaleToFill"
          class="text-dot-red h-[88rpx] w-[88rpx]"
        />
        <text class="text-[26rpx] text-[#333333]">
          系统通知
        </text>
      </view>
      <view class="flex flex-grow flex-col items-center justify-center gap-[18rpx]">
        <image
          src="@img/img-003.png"
          mode="scaleToFill"
          class="h-[88rpx] w-[88rpx]"
        />
        <text class="text-[26rpx] text-[#333333]">
          订单服务
        </text>
      </view>
      <view class="flex flex-grow flex-col items-center justify-center gap-[18rpx]">
        <image
          src="@img/img-004.png"
          mode="scaleToFill"
          class="h-[88rpx] w-[88rpx]"
        />
        <text class="text-[26rpx] text-[#333333]">
          联系客服
        </text>
      </view>
    </view>
    <!-- 无数据  -->
    <view v-if="false" class="mt-[100rpx] flex flex-grow flex-col items-center justify-center gap-[18rpx]">
      <image
        src="@img/img-005.png"
        mode="scaleToFill"
        class="h-[88rpx] w-[88rpx]"
      />
      <text class="text-[32rpx] text-[#9E9E9E]">
        暂无消息呢~
      </text>
    </view>
    <!-- 有数据 -->
    <view class="mx-[30rpx] mt-[30rpx] flex flex-col gap-[30rpx]">
      <view v-for="(item, index) in 2" :key="index" class="h-[234rpx] flex flex-col rounded-[20rpx] bg-[#fff] px-[18rpx]">
        <view class="mt-[30rpx]">
          <image
            v-if="index == 0"
            src="@img/img-007.png"
            mode="scaleToFill"
            class="round-full h-[44rpx] w-[44rpx]"
          />
          <image
            v-if="index == 1"
            src="@img/img-006.png"
            mode="scaleToFill"
            class="round-full text-dot-red h-[44rpx] w-[44rpx]"
          />
          <text class="text-[28rpx] text-[#000000] font-bold">
            系统通知
          </text>
          <text class="ml-[10rpx] text-[20rpx] text-[#BFBFBF]">
            2025.06.30 12:29
          </text>
        </view>
        <view class="mt-[30rpx] flex items-center text-[28rpx] text-[#828386]">
          <text>通知内容</text>
          <text class="ml-[30rpx]">
            您收到一条投诉
          </text>
        </view>
        <view class="mt-[18rpx] flex items-center text-[28rpx] text-[#828386]">
          <text>订单编号</text>
          <text class="ml-[30rpx]">
            50010541515513956
          </text>
          <view
            v-if="index == 0"
            class="ml-[68rpx] h-[56rpx] w-[140rpx] border-[2rpx] border-[#A6A7A8] rounded-[176rpx] border-solid text-center text-[24rpx] text-[#333333] leading-[56rpx]"
            @click="call('17760172268')"
          >
            联系客服
          </view>
          <view v-if="index == 1" class="ml-[68rpx] h-[56rpx] w-[140rpx] border-[2rpx] border-[#A6A7A8] rounded-[176rpx] border-solid text-center text-[24rpx] text-[#333333] leading-[56rpx]">
            查看详情
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
