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
  tabIndex: {
    type: String,
    default: '',
  },
})
// 定义事件
const emit = defineEmits(['contact', 'arrived', 'complete', 'click', 'refund', 'continue', 'reorder', 'evaluate', 'apply'])
const toast = useToast()
const message = useMessage()
const userStore = useUserStore()

// 联系客户
function handleContact() {
  emit('contact', props.order)
}

// 已到达
function handleArrived() {
  emit('arrived', props.order)
}

// 服务完成
function handleComplete() {
  emit('complete', props.order)
}

// 跳转到订单详情
function goToDetails() {
  emit('click', props.order)
}

// 申请退款
function handleRefund() {
  emit('refund', props.order)
}

// 续单服务
function handleContinue() {
  emit('continue', props.order)
}

// 再来一单
function handleReorder() {
  emit('reorder', props.order)
}

// 立即评价
function handleEvaluate() {
  emit('evaluate', props.order)
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
  <view class="rounded-[20rpx] bg-[#fff] p-[30rpx_40rpx]" @click="goToDetails">
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
      <view v-if="tabIndex === 1" class="text-[28rpx] text-[#0678EE]">
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
    <view class="flex items-center justify-between gap-[30rpx]">
      <view class="flex items-center">
        <text class="text-[24rpx] text-[#002C4F]">
          实付款
        </text>
        <text class="text-price text-[36rpx] text-[#DC3A23]">
          {{ order?.actualPay }}
        </text>
      </view>
      <view class="flex flex-1 flex-wrap items-center justify-end gap-[20rpx]">
        <view
          class="h-[54rpx] w-[140rpx] rounded-[198rpx] text-center text-[28rpx] text-[#fff] leading-[54rpx]"
          style="background: linear-gradient( 106deg, #078AF3 0%, #0668EB 100%);"
          @click.stop="emit('apply', props.order)"
        >
          申请接单
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
