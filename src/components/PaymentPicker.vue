<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  singlePayment: {
    type: [String, Number],
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])

const paymentOptions = [
  {
    id: 1,
    name: '微信支付',
    icon: '/static/images/wx.png',
    style: 'width: 36rpx; height: 32rpx;',
  },
  {
    id: 2,
    name: '支付宝支付',
    icon: '/static/images/zfb.png',
    style: 'width: 34.53rpx; height: 34.53rpx;',
  },
  {
    id: 3,
    name: '余额支付',
    icon: '/static/images/yue.png',
    style: 'width: 36rpx; height: 36rpx;',
  },
]

function selectPayment(id) {
  emit('update:modelValue', id)
}
</script>

<template>
  <view>
    <view
      v-for="item in paymentOptions" :key="item.id"
      class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-[#fff] p-[30rpx]" @click="selectPayment(item.id)"
    >
      <view class="flex items-center justify-between">
        <view class="flex items-center">
          <image :src="item.icon" mode="scaleToFill" class="mr-[16rpx]" :style="[item.style]" />
          <text class="text-[28rpx] text-[#000000] font-bold">
            {{ item.name }}
          </text>
        </view>
        <view class="flex items-center">
          <wd-icon v-if="modelValue === item.id" name="check-circle-filled" size="40rpx" color="#0669EB" />
          <wd-icon v-else name="circle" size="40rpx" color="#0669EB" />
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>
