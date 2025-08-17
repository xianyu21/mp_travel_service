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

const tab = ref(0)
const tabs = ref([
  {
    type: 'contribution',
    title: '全部',

  },
  {
    type: 'creditvalue',
    title: '已接单',
  },
  {
    type: 'creditvalue',
    title: '已出发',
  },
  {
    type: 'creditvalue',
    title: '已到达',
  },
  {
    type: 'creditvalue',
    title: '开始服务',
  },
  {
    type: 'creditvalue',
    title: '完成',
  },
])
function handleTabsChange() {
  paging.value.reload()
}
</script>

<template>
  <view class="bg-base-order">
    <wd-navbar
      title="订单" custom-style="background-color: transparent !important;" left-arrow :placeholder="true" :fixed="false" :bordered="false" :safe-area-inset-top="true"
      @click-left="back"
    />
    <view
      class="m-[24rpx] flex items-center gap-[20rpx] rounded-[88rpx] bg-[#fff] p-[10rpx]"
      style="overflow: hidden;" @click="go('/packages/public/search')"
    >
      <wd-search
        placeholder="输入您想要找·想出售的" placeholder-left :hide-cancel="true" disabled
        custom-class="w-full !p-0 !bg-[#fff] " :light="true"
      />
      <view
        class="h-[62rpx] w-[114rpx] rounded-[31rpx] bg-[linear-gradient(315deg,#FF8400_0%,#FFE524_100%)] text-center text-[28rpx] text-[#fff] leading-[62rpx]"
      >
        搜索
      </view>
    </view>
    <!--  -->
    <wd-tabs v-model="tab" auto-line-width custom-style="background-color: transparent !important;" @click="handleTabsChange">
      <wd-tab v-for="(item, index) in tabs" :key="index" :title="`${item.title}`" />
    </wd-tabs>
    <view class="mx-[30rpx] mt-[34rpx] flex flex-col gap-[30rpx]">
      <view v-for="item in 5" :key="item" class="rounded-[20rpx] bg-[#fff] p-[30rpx_40rpx]" @click="go('/packages/order/details')">
        <view class="flex items-center justify-between">
          <view class="flex items-center gap-[10rpx]">
            <image
              src=""
              mode="scaleToFill"
              class="h-[32rpx] w-[32rpx] rounded-full bg-[#DC3A23]"
            />
            <text class="text-[28rpx] text-[#000000] font-bold">
              冯宝宝
            </text>
            <text class="text-[24rpx] text-[#002C4F]">
              丨服务时间:06.30 14:00
            </text>
          </view>
          <view class="text-[28rpx] text-[#0678EE]">
            待抢单
          </view>
        </view>
        <view class="mt-[30rpx] flex items-center gap-[30rpx]">
          <image
            src=""
            mode="scaleToFill"
            class="h-[124rpx] w-[122rpx] rounded-[12rpx] bg-[#DC3A23]"
          />
          <view class="w-full flex-1">
            <view class="flex items-center justify-between text-[32rpx]">
              <text class="text-[#000000]">
                陪玩陪拍x1
              </text>
              <text class="text-price text-[#333333]">
                499.00
              </text>
            </view>
            <view class="mt-[15rpx] text-[24rpx] text-[#002C4F]">
              服务时长:120分钟
            </view>
          </view>
        </view>
        <wd-divider color="#F6F6F6" />
        <view class="flex items-end justify-end">
          <view>
            <text class="text-[24rpx] text-[#002C4F]">
              实付款
            </text>
            <text class="text-price text-[36rpx] text-[#DC3A23]">
              499.00
            </text>
          </view>
        </view>
        <view class="flex items-end justify-between">
          <view>
            <text class="text-[24rpx] text-[#002C4F]">
              预估收入
            </text>
            <text class="text-price text-[36rpx] text-[#DC3A23]">
              499.00
            </text>
          </view>
          <view>
            <text class="text-[24rpx] text-[#002C4F]">
              预估车费(往返)
            </text>
            <text class="text-price text-[36rpx] text-[#DC3A23]">
              499.00
            </text>
          </view>
        </view>
        <wd-divider color="#F6F6F6" />
        <view class="flex items-center justify-end gap-[30rpx]">
          <view

            class="h-[60rpx] w-[152rpx] rounded-[198rpx] text-center text-[28rpx] text-[#333333] leading-[60rpx]"
            style="border: 1rpx solid #A6A7A8;"
          >
            联系客户
          </view>
          <view

            class="h-[60rpx] w-[152rpx] rounded-[198rpx] text-center text-[28rpx] text-[#333333] leading-[60rpx]"
            style="border: 1rpx solid #A6A7A8;"
          >
            已到达
          </view>
          <view

            class="h-[60rpx] w-[152rpx] rounded-[198rpx] text-center text-[28rpx] text-[#fff] leading-[60rpx]"
            style="background: linear-gradient( 106deg, #078AF3 0%, #0668EB 100%);"
          >
            服务完成
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
:deep(.wd-tabs) {
  background: transparent !important;
}
:deep(.wd-tabs__nav) {
  background: transparent !important;
}

:deep(.wd-tabs__nav-item) {
  color: #fff !important;
  font-size: 28rpx;
}

:deep(.wd-tabs__nav-item.is-active) {
  color: #fff !important;
  font-size: 28rpx;
}

:deep(.wd-tabs__line) {
  //   background: #42cbff ;
  background: #fff !important;
}
.bg-base-order {
  background: linear-gradient(#5b97fb 0%, #fafafa 35%, #f6f6f6 100%);
  width: 100%;
  min-height: 100vh;
}
</style>
