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
import { getStatis } from '@/api/index'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
const statisInfo = ref({})
onShow(() => {
  getStatis().then((res) => {
    if (res.code === 200) {
      statisInfo.value = res.data || {}
    }
  })
})
</script>

<template>
  <view class="bg-base-mine">
    <wd-navbar
      title="我的" custom-style="background-color: transparent !important;" :placeholder="true" :fixed="false"
      :bordered="false" :safe-area-inset-top="true"
    />
    <!--  -->
    <view class="mx-[30rpx] mt-[30rpx] flex items-center justify-between">
      <view class="flex items-center gap-[30rpx]">
        <image :src="userStore.userInfo.headUrl" mode="scaleToFill" class="h-[120rpx] w-[120rpx] rounded-full" />
        <view class="flex flex-col gap-[14rpx]">
          <text class="text-[32rpx] text-[#000000]">
            {{ userStore.userInfo.realName }}
          </text>
          <text class="text-[22rpx] text-[#747474]">
            ID: {{ userStore.userInfo.id }}
          </text>
        </view>
      </view>
      <view class="flex items-center gap-[20rpx]">
        <view class="flex flex-col items-center">
          <image src="@img/img-015.png" mode="scaleToFill" class="h-[43.72rpx] w-[45.52rpx]" />
          <text class="mt-[10rpx] text-[22rpx] text-[#747474]">
            客服
          </text>
        </view>
        <view class="flex flex-col items-center" @click="go('packages/mine/information_edit')">
          <image src="@img/img-016.png" mode="scaleToFill" class="h-[41.86rpx] w-[46.77rpx]" />
          <text class="mt-[10rpx] text-[22rpx] text-[#747474]">
            设置
          </text>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="mx-[30rpx] mt-[30rpx]">
      <view class="bg-001 flex flex-col px-[30rpx] text-[#fff]">
        <view class="mt-[30rpx]">
          <text class="text-[24rpx]">
            佣金余额（元）
          </text>
          <image src="@img/img-009.png" mode="scaleToFill" class="ml-[10rpx] h-[16.12rpx] w-[25.1rpx]" />
        </view>
        <text class="mt-[14rpx] text-[54rpx] font-bold" @click="go('/packages/mine/balance')">
          {{ userStore.userInfo?.commission }}
        </text>
        <view class="mt-[24rpx] flex items-center justify-between text-[24rpx]">
          <text>今日收益 {{ statisInfo.todayCommission }}</text>
          <text>累计收益 {{ statisInfo.totalCommisstion }}</text>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="mx-[30rpx] mt-[30rpx]">
      <view class="bg-002 flex items-center justify-between">
        <view class="ml-[42rpx] flex flex-col gap-[8rpx]">
          <text class="text-[28rpx] text-[#8B6A3F]">
            推广文案
          </text>
          <text class="text-[24rpx] text-[#8B6A3F]">
            专业导游丨快去首页下单吧
          </text>
        </view>
        <view
          class="mr-[30rpx] h-[52rpx] w-[140rpx] rounded-[180rpx] bg-[#fff] text-center text-[28rpx] text-[#8B6A3F] leading-[52rpx]"
        >
          去下单
        </view>
      </view>
    </view>
    <!--  -->
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-[#fff] p-[30rpx]">
      <view class="text-[32rpx] text-[#000000] font-bold">
        我的服务
      </view>
      <view class="grid grid-cols-[repeat(4,auto)] grid-rows-[repeat(2,auto)] mt-[50rpx] gap-[50rpx]">
        <view class="flex flex-col items-center" @click="go('/packages/mine/share')">
          <image src="@img/img-010.png" mode="scaleToFill" class="h-[48rpx] w-[46rpx]" />
          <text class="mt-[10rpx] text-[24rpx] text-[#000000]">
            推广赚钱
          </text>
        </view>
        <!-- <view class="flex flex-col items-center" @click="go('/packages/mine/bank_management')">
          <image src="@img/img-011.png" mode="scaleToFill" class="h-[48rpx] w-[46rpx]" />
          <text class="mt-[10rpx] text-[24rpx] text-[#000000]">
            银行卡管理
          </text>
        </view> -->
        <view class="flex flex-col items-center" @click="go('/packages/mine/entry_information')">
          <image src="@img/img-012.png" mode="scaleToFill" class="h-[48rpx] w-[46rpx]" />
          <text class="mt-[10rpx] text-[24rpx] text-[#000000]">
            入驻资料
          </text>
        </view>
        <view class="flex flex-col items-center" @click="go('/packages/mine/address')">
          <image src="@img/img-013.png" mode="scaleToFill" class="h-[48rpx] w-[46rpx]" />
          <text class="mt-[10rpx] text-[24rpx] text-[#000000]">
            地址管理
          </text>
        </view>
        <view class="flex flex-col items-center" @click="go('/packages/mine/about')">
          <image src="@img/img-014.png" mode="scaleToFill" class="h-[48rpx] w-[46rpx]" />
          <text class="mt-[10rpx] text-[24rpx] text-[#000000]">
            关于我们
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.bg-001 {
  // width: 100%;
  height: 234rpx;
  background-image: url('./static/images/bg-004.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.bg-002 {
  width: 100%;
  height: 114rpx;
  background-image: url('./static/images/bg-005.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
