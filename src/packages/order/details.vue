<route lang="jsonc" type="page">
{
    "layout": "default",
    "style": {
        "navigationBarTitleText": "订单详情"
    }
}
</route>

<script lang="ts" setup>
import { useMessage, useToast } from 'wot-design-uni'
import { getOrderDetail } from '@/api/index'
import { useUserStore } from '@/store'
import { back, call, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
const active = ref<number>(2)
const info = ref({})
const list = ref([])
const orderNo = ref()
onLoad((options) => {
  orderNo.value = decodeURIComponent(options.orderNo)
  init()
})
function init() {
  getOrderDetail({
    orderNo: orderNo.value,
  }).then((res) => {
    console.log('------------------------------')
    console.log(res)
    console.log('------------------------------')
    info.value = res.data
  })
}
// 订单详情数据
const orderDetail = ref({

})

// 联系客户
function contactCustomer() {
  uni.makePhoneCall({
    phoneNumber: orderDetail.value.user.phone,
    success: () => {
      console.log('拨打电话成功')
    },
    fail: (err) => {
      console.error('拨打电话失败:', err)
      toast.error('拨打电话失败')
    },
  })
}

// 点击提醒
function clickRemind() {
  toast.success('已发送提醒')
}

//
function agreeApply(item) {
  getTravelAgreeApply({
    orderNo: orderNo.value,
    receiveUserId: item.receiveUserId,
    realName: item.realName,
  })
}
// 申请退款
async function handleRefund(order) {
  const res = await getTravelRefund({
    orderNo: orderNo.value,
  })
  if (res.code === 200) {
    toast.success('退款完成')
    init()
  }
}
// 服务完成
async function handleComplete(order) {
  const res = await getComplete({
    orderNo: orderNo.value,
  })
  if (res.code === 200) {
    toast.success('服务已完成')
    init()
  }
}
</script>

<template>
  <view class="bg min-h-screen">
    <wd-navbar
      title="订单详情" custom-style="background-color: transparent !important; color: #fff !important;"
      left-arrow :placeholder="false" :fixed="false" :bordered="false" @click-left="back"
    >
      <template #left>
        <wd-icon name="thin-arrow-left" size="36rpx" />
      </template>
    </wd-navbar>
    <view class="relative from-[#4facfe] to-[#00f2fe] bg-gradient-to-r pb-[40rpx] pt-[var(--status-bar-height)]">
      <!-- 用户信息卡片 -->
      <view class="mx-[30rpx] mt-[20rpx] rounded-[20rpx] bg-white p-[30rpx]">
        <view class="flex items-center justify-between">
          <view class="flex-1">
            <view class="flex items-center">
              <text class="text-[32rpx] text-[#000000] font-medium">
                {{ info.userName }}
              </text>
              <text class="ml-[20rpx] text-[28rpx] text-[#000000]">
                {{ info.userPhone }}
              </text>
            </view>
            <text class="mt-[10rpx] text-[28rpx] text-[#626364]">
              {{ info.address }}
            </text>
          </view>
        </view>

        <!-- 服务信息 -->
        <view class="mt-[30rpx] flex items-center border-t border-[#f5f5f5] pt-[30rpx]">
          <image
            :src="info?.serviceImageUrl" mode="aspectFill"
            class="mr-[20rpx] h-[100rpx] w-[100rpx] rounded-[10rpx] bg-[#eee]"
          />
          <view class="flex-1">
            <text class="block text-[32rpx] text-[#333]">
              {{ info?.serviceName }}
            </text>
            <text class="mt-[10rpx] block text-[24rpx] text-[#002C4F]">
              服务时间：{{ info?.serviceTimeStart }}
            </text>
          </view>
          <text class="text-[32rpx] text-[#ff6b35] font-medium">
            ¥{{ info?.totalMoney.toFixed(2) }}
          </text>
        </view>

        <!-- 联系客户按钮 -->
        <view v-if="info.receiveUserName && info.receive_user_phone" class="mt-[30rpx]" style="border-top: 2rpx solid #F8F8F8;">
          <view class="mt-[30rpx] flex items-center justify-between">
            <text class="text-[28rpx] text-[#6B6B6D]">
              服务旅接
            </text>
            <text class="text-[28rpx] text-[#6B6B6D]">
              ¥{{ info.receiveUserName }}
            </text>
          </view>
          <view class="mt-[30rpx] flex items-center justify-between">
            <text class="text-[28rpx] text-[#6B6B6D]">
              联系旅接
            </text>
            <image
              src="@img/img-031.png"
              mode="scaleToFill"
              class="h-[50rpx] w-[184rpx]"
              @click="call(info.receive_user_phone)"
            />
          </view>
        </view>
      </view>
    </view>
    <view class="bg-[#FAFAFA] pb-[100rpx] pt-[30rpx]" style="border-radius: 20rpx 20rpx 0rpx 0rpx;">
      <view class="bg-[#FAFAFA] pb-[100rpx] pt-[30rpx]" style="border-radius: 20rpx 20rpx 0rpx 0rpx;">
        <view class="mx-[30rpx] rounded-[20rpx] bg-white p-[30rpx]">
          <view class="mb-[30rpx] text-[32rpx] text-[#000000] font-bold">
            进度
          </view>
          <wd-steps align-center>
            <wd-step v-if="info.orderType === 2" title="待接单" description="step" :status="info.status === 3 ? 'process' : (info.status > 3 ? 'finished' : '')" />
            <wd-step title="已接单" description="step" :status="info.status === 4 ? 'process' : (info.status > 4 ? 'finished' : '')" />
            <wd-step title="已出发" description="step" :status="info.status === 5 ? 'process' : (info.status > 5 ? 'finished' : '')" />
            <wd-step title="已到达" description="step" :status="info.status === 6 ? 'process' : (info.status > 6 ? 'finished' : '')" />
            <wd-step title="服务中" description="step" :status="info.status === 7 ? 'process' : (info.status > 7 ? 'finished' : '')" />
            <wd-step title="完成" description="step" :status="info.status === 8 ? 'process' : (info.status > 8 ? 'finished' : '')" />
          </wd-steps>
        </view>
        <!-- 价格明细 -->
        <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-white p-[30rpx]">
          <view class="mb-[30rpx] text-[32rpx] text-[#000000] font-bold">
            价格明细
          </view>
          <view class="space-y-[20rpx]">
            <view class="flex items-center justify-between">
              <text class="text-[28rpx] text-[#666]">
                项目价格
              </text>
              <text class="text-[28rpx] text-[#333]">
                ¥{{ info.totalMoney.toFixed(2) }}
              </text>
            </view>

            <view class="flex items-center justify-between">
              <text class="text-[28rpx] text-[#666]">
                车费
              </text>
              <text class="text-[28rpx] text-[#333]">
                ¥{{ info.estimateFare.toFixed(2) }}
              </text>
            </view>
            <view class="flex items-center justify-between">
              <text class="text-[28rpx] text-[#666]">
                优惠金额
              </text>
              <text class="text-[32rpx] text-[#333] font-medium">
                ¥{{ info?.discountMoney || 0 }}
              </text>
            </view>
            <view class="flex items-center justify-between">
              <text class="text-[28rpx] text-[#666]">
                实付金额
              </text>
              <text class="text-[32rpx] text-[#4facfe] font-medium">
                ¥{{ info.actualPay.toFixed(2) }}
              </text>
            </view>
          </view>
        </view>

        <!-- 续单服务 -->
        <view v-if="info.totalContinueMoney > 0" class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-white p-[30rpx]">
          <view class="mb-[30rpx] text-[32rpx] text-[#000000] font-bold">
            续单服务
          </view>

          <view class="space-y-[20rpx]">
            <view class="flex items-center justify-between">
              <text class="text-[28rpx] text-[#6B6B6D]">
                续单开始时间
              </text>
              <text class="text-[28rpx] text-[#333]">
                {{ info.serviceTimeStart }}
              </text>
            </view>

            <view class="flex items-center justify-between">
              <text class="text-[28rpx] text-[#6B6B6D]">
                续单结束时间
              </text>
              <text class="text-[28rpx] text-[#333]">
                {{ info.serviceTimeEnd }}
              </text>
            </view>

            <view class="flex items-center justify-between">
              <text class="text-[28rpx] text-[#6B6B6D]">
                续单实付金额
              </text>
              <text class="text-[32rpx] text-[#3686EF] font-medium">
                ¥{{ info.renewal.totalAmount.toFixed(2) }}
              </text>
            </view>

            <view class="flex items-center justify-between">
              <text class="text-[28rpx] text-[#6B6B6D]">
                预估收入
              </text>
              <text class="text-[32rpx] text-[#3686EF] font-medium">
                ¥{{ info.renewal.estimatedIncome.toFixed(2) }}
              </text>
            </view>
          </view>
        </view>

        <!-- 订单明细 -->
        <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-white p-[30rpx]">
          <view class="mb-[30rpx] text-[32rpx] text-[#000000] font-bold">
            订单明细
          </view>

          <view class="space-y-[20rpx]">
            <view class="flex items-center justify-between">
              <text class="text-[28rpx] text-[#6B6B6D]">
                订单编号
              </text>
              <text class="text-[28rpx] text-[#6B6B6D]">
                {{ info.orderNo }}
              </text>
            </view>

            <view class="flex items-center justify-between">
              <text class="text-[28rpx] text-[#6B6B6D]">
                下单时间
              </text>
              <text class="text-[28rpx] text-[#6B6B6D]">
                {{ info.payTime }}
              </text>
            </view>

            <view class="flex items-center justify-between">
              <text class="text-[28rpx] text-[#6B6B6D]">
                支付方式
              </text>
              <text v-if="info.payType === 1" class="text-[28rpx] text-[#6B6B6D]">
                微信支付
              </text>
              <text v-if="info.payType === 2" class="text-[28rpx] text-[#6B6B6D]">
                支付宝支付
              </text>
              <text v-if="info.payType === 3" class="text-[28rpx] text-[#6B6B6D]">
                余额支付
              </text>
            </view>
          </view>
        </view>

        <!-- 底部操作按钮 -->
        <view class="mx-[30rpx] mt-[30rpx] flex flex-wrap items-center justify-end gap-[20rpx]">
          <view
            v-if="[3, 4, 5, 6, 7].includes(info?.status)"
            class="h-[56rpx] w-[140rpx] rounded-[198rpx] text-center text-[28rpx] text-[#333333] leading-[56rpx]"
            style="border: 1rpx solid #A6A7A8;"
            @click="handleRefund"
          >
            申请退款
          </view>
          <view
            v-if="[7].includes(info?.status)"
            class="h-[56rpx] w-[144rpx] flex items-center justify-center rounded-[45rpx] text-[28rpx] text-white leading-[56rpx]"
            style="background: linear-gradient( 90deg, #FD8A27 0%, #FEB536 100%);" @click="completeService"
          >
            续单服务
          </view>
          <view
            v-if="[7].includes(info?.status)"
            class="h-[56rpx] w-[144rpx] flex items-center justify-center rounded-[45rpx] text-[28rpx] text-white leading-[56rpx]"
            style="background: linear-gradient( 106deg, #078AF3 0%, #0668EB 100%);" @click="handleComplete"
          >
            服务完成
          </view>
          <view
            v-if="[8].includes(info?.status)"
            class="h-[56rpx] w-[140rpx] rounded-[198rpx] text-center text-[28rpx] text-[#333333] leading-[56rpx]"
            style="border: 1rpx solid #A6A7A8;"
          >
            申请投诉
          </view>
          <view
            v-if="[8].includes(info?.status)"
            class="h-[56rpx] w-[140rpx] rounded-[198rpx] text-center text-[28rpx] text-[#333333] leading-[56rpx]"
            style="border: 1rpx solid #A6A7A8;"
          >
            再来一单
          </view>
          <view
            v-if="[8].includes(info?.status)"
            class="h-[56rpx] w-[144rpx] flex items-center justify-center rounded-[45rpx] text-[28rpx] text-white leading-[56rpx]"
            style="background: linear-gradient( 106deg, #078AF3 0%, #0668EB 100%);" @click="completeService"
          >
            立即评价
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 使用unocss，无需额外样式
.bg {
  background: #5594fb;
  width: 100%;
  min-height: 100vh;
}
:deep(.wd-navbar__title) {
  color: #fff;
}
</style>
