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

// 定义组件接收的属性
const props = defineProps({
  // 订单数据对象
  order: {
    type: Object,
    default: () => ({}),
  },
})
// 定义事件
const emit = defineEmits(['contact', 'arrived', 'complete', 'click', 'refund', 'continue', 'reorder', 'evaluate', 'setOut', 'startService'])
const toast = useToast()
const message = useMessage()
const userStore = useUserStore()

// 跳转到订单详情
function goToDetails() {
  emit('click', props.order)
}

// 获取订单状态
function getOrderStatus(order) {
  return order.status || '待抢单'
}
// 1待支付 2支付成功  -2支付失败 3待接单 4已接单 5已出发 6已到达 7服务中 8服务完成 9退款中 10退款完成
const strategies = {
  1: '待支付',
  2: '支付成功',
  3: '待接单',
  4: '已接单',
  5: '已出发',
  6: '已到达',
  7: '服务中',
  8: '服务完成',
  9: '退款中',
  10: '退款完成',
  default: '支付失败',
}
</script>

<template>
  <view class="rounded-[20rpx] bg-[#fff] p-[30rpx_40rpx]" @click.stop="goToDetails">
    <view class="flex items-center justify-between">
      <view class="flex items-center gap-[10rpx]">
        <image :src="order?.userHeadUrl" mode="scaleToFill" class="h-[32rpx] w-[32rpx] rounded-full bg-[#eee]" />
        <text class="text-[28rpx] text-[#000000] font-bold">
          {{ order?.userName }}
        </text>
        <text class="text-[24rpx] text-[#002C4F]">
          丨服务时间:{{ order?.serviceTimeStart }}
        </text>
      </view>
      <view class="text-[28rpx] text-[#0678EE]">
        {{ strategies[order?.status] || strategies.default }}
      </view>
    </view>
    <view class="mt-[30rpx] flex items-center gap-[30rpx]">
      <image :src="order?.serviceImageUrl" mode="scaleToFill" class="h-[124rpx] w-[122rpx] rounded-[12rpx] bg-[#eee]" />
      <view class="w-full flex-1">
        <view class="flex items-center justify-between text-[32rpx]">
          <text class="text-[#000000]">
            {{ order.serviceName }}x{{ order.serviceCount }}
          </text>
          <text class="text-price text-[#333333]">
            {{ order.totalMoney }}
          </text>
        </view>
        <view class="mt-[15rpx] text-[24rpx] text-[#002C4F]">
          服务时长:{{ order.duration }}分钟
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
          {{ order?.actualPay }}
        </text>
      </view>
    </view>
    <view class="flex items-end justify-between">
      <view>
        <text class="text-[24rpx] text-[#002C4F]">
          预估收入
        </text>
        <text class="text-price text-[36rpx] text-[#DC3A23]">
          {{ order?.actualPay }}
        </text>
      </view>
      <view>
        <text class="text-[24rpx] text-[#002C4F]">
          预估车费(往返)
        </text>
        <text class="text-price text-[36rpx] text-[#DC3A23]">
          {{ order?.estimateFare }}
        </text>
      </view>
    </view>
    <wd-divider color="#F6F6F6" />
    <view class="flex items-center justify-between gap-[30rpx]">
      <view class="flex flex-1 flex-wrap items-center justify-end gap-[20rpx]">
        <view
          class="h-[60rpx] w-[152rpx] rounded-[198rpx] text-center text-[28rpx] text-[#333333] leading-[60rpx]"
          style="border: 1rpx solid #A6A7A8;" @click.stop="emit('contact', props.order)"
        >
          联系客户
        </view>
        <view
          v-if="[4].includes(order?.status)"
          class="h-[60rpx] w-[152rpx] rounded-[198rpx] text-center text-[28rpx] text-[#fff] leading-[60rpx]"
          style="background: linear-gradient( 106deg, #078AF3 0%, #0668EB 100%);"
          @click.stop="emit('setOut', props.order)"
        >
          开始出发
        </view>
        <view
          v-if="[5].includes(order?.status)"
          class="h-[60rpx] w-[152rpx] rounded-[198rpx] text-center text-[28rpx] text-[#fff] leading-[60rpx]"
          style="background: linear-gradient( 106deg, #078AF3 0%, #0668EB 100%);"
          @click.stop="emit('arrived', props.order)"
        >
          已到达
        </view>
        <view
          v-if="[6].includes(order?.status)"
          class="h-[60rpx] w-[152rpx] rounded-[198rpx] text-center text-[28rpx] text-[#fff] leading-[60rpx]"
          style="background: linear-gradient( 106deg, #078AF3 0%, #0668EB 100%);"
          @click.stop="emit('startService', props.order)"
        >
          开始服务
        </view>
        <view
          v-if="[7].includes(order?.status)"
          class="h-[60rpx] w-[152rpx] rounded-[198rpx] text-center text-[28rpx] text-[#fff] leading-[60rpx]"
          style="background: linear-gradient( 106deg, #078AF3 0%, #0668EB 100%);"
          @click.stop="emit('complete', props.order)"
        >
          服务完成
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
