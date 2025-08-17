<route lang="jsonc" type="home">
{
  "needLogin": false,
  "layout": "default",
  "style": {
    "navigationBarTitleText": "首页"
  }
}
</route>

<script lang="ts" setup>
import { useMessage, useToast } from 'wot-design-uni'
import { offlineReceiveUser, onlineReceiveUser } from '@/api/index'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
const isOnline = ref(userStore?.userInfo?.isOnline)
async function onlineChange({ value }) {
  console.log('------------------------------')
  console.log(value)
  console.log('------------------------------')
  if (value == -1) {
    await offlineReceiveUser()
    await userStore.getUserInfo()
    toast.success('已下线！')
  }
  else if (value == 1) {
    await onlineReceiveUser()
    await userStore.getUserInfo()
    toast.success('已上线！')
  }
}
// 拨打紧急电话
function callEmergencyPhone() {
  if (!userStore.userInfo?.emergencyContactPhone) {
    return toast.error('请先绑定紧急联系人号码！')
  }
  wx.makePhoneCall({
    phoneNumber: userStore.userInfo.emergencyContactPhone,
  })
}
</script>

<template>
  <view class="bg-base-index">
    <wd-navbar
      title="首页" custom-style="background-color: transparent !important;" :placeholder="true" :fixed="false"
      :bordered="false" :safe-area-inset-top="true"
    />
    <view class="mx-[30rpx] mt-[30rpx] flex items-center justify-between gap-[30rpx]" @click="callEmergencyPhone">
      <view class="h-[100rpx] flex flex-1 items-center justify-between rounded-[20rpx] bg-[#fff] px-[30rpx]">
        <text class="text-[28rpx] text-[#000000] font-bold">
          紧急呼救
        </text>
        <image src="@img/img-008.png" mode="scaleToFill" class="h-[47.08rpx] w-[47.08rpx]" />
      </view>
      <view class="h-[100rpx] flex flex-1 items-center justify-between rounded-[20rpx] bg-[#fff] px-[30rpx]">
        <text class="text-[28rpx] text-[#000000] font-bold">
          {{ isOnline == 1 ? '在线' : '下线' }}
        </text>
        <wd-switch v-model="isOnline" active-value="1" inactive-value="-1" size="40rpx" @change="onlineChange" />
      </view>
    </view>
    <view class="mx-[30rpx] mt-[30rpx] flex items-center justify-between gap-[30rpx] text-[#fff]">
      <view class="bg-002 h-[294rpx] flex flex-1 flex-col rounded-[20rpx] bg-[#fff] px-[30rpx]">
        <text class="mt-[30rpx] text-[24rpx]">
          今日服务收益
        </text>
        <text class="mt-[10rpx] text-[60rpx]">
          899.0
        </text>
        <text class="mt-[30rpx] text-[24rpx]">
          累计服务收益
        </text>
        <text class="mt-[10rpx] text-[32rpx]">
          1250.0
        </text>
      </view>
      <view class="bg-003 h-[294rpx] flex flex-1 flex-col rounded-[20rpx] bg-[#fff] px-[30rpx]">
        <text class="mt-[30rpx] text-[24rpx]">
          今日分销收益
        </text>
        <text class="mt-[10rpx] text-[60rpx]">
          899.0
        </text>
        <text class="mt-[30rpx] text-[24rpx]">
          累计分销收益
        </text>
        <text class="mt-[10rpx] text-[32rpx]">
          1250.0
        </text>
      </view>
    </view>
    <view class="mx-[30rpx] mt-[30rpx] h-[328rpx] rounded-[20rpx] bg-[#fff]">
      <view class="mx-[30rpx] flex items-center justify-between pt-[30rpx]">
        <text class="text-[36rpx] text-[#0B0B0B] font-bold">
          订单概况
        </text>
        <view class="flex gap-[20rpx] text-[24rpx] text-[#9E9E9E]">
          <text>今日订单</text>
          <text>2</text>
        </view>
      </view>
      <view class="grid grid-cols-3 grid-rows-2 mt-[26rpx] gap-[30rpx]">
        <view class="flex flex-col items-center justify-center" @click="go('/packages/home/received_order')">
          <text class="text-[40rpx] text-[#4895F1]">
            3
          </text>
          <text class="text-[24rpx] text-[#9E9E9E]">
            已接单
          </text>
        </view>
        <view class="flex flex-col items-center justify-center" @click="go('/packages/home/enter_service')">
          <text class="text-[40rpx] text-[#62DAEF]">
            3
          </text>
          <text class="text-[24rpx] text-[#9E9E9E]">
            开始服务
          </text>
        </view>
        <view class="flex flex-col items-center justify-center">
          <text class="text-[40rpx] text-[#0B0B0B]">
            3
          </text>
          <text class="text-[24rpx] text-[#9E9E9E]">
            服务完成
          </text>
        </view>
        <view class="flex flex-col items-center justify-center">
          <text class="text-[40rpx] text-[#0B0B0B]">
            3
          </text>
          <text class="text-[24rpx] text-[#9E9E9E]">
            总订单
          </text>
        </view>
        <view class="flex flex-col items-center justify-center" @click="go('/packages/home/evaluate')">
          <text class="text-[40rpx] text-[#0B0B0B]">
            3
          </text>
          <text class="text-[24rpx] text-[#9E9E9E]">
            评价
          </text>
        </view>
      </view>
      <!-- <view class="mt-[26rpx] flex items-center justify-around">
        <view class="flex flex-col items-center justify-center">
          <text class="text-[40rpx] text-[#4895F1]">
            3
          </text>
          <text class="text-[24rpx] text-[#9E9E9E]">
            已接单
          </text>
        </view>
        <wd-divider vertical color="#F2F2F2" />
        <view class="flex flex-col items-center justify-center">
          <text class="text-[40rpx] text-[#4895F1]">
            3
          </text>
          <text class="text-[24rpx] text-[#9E9E9E]">
            已接单
          </text>
        </view>
      </view> -->
    </view>
    <view class="mx-[30rpx] mt-[30rpx] flex items-center gap-[42rpx]">
      <view class="text-line relative text-[32rpx] text-[#000000] font-bold">
        待抢单
        <wd-tag type="danger" custom-class="absolute top-[-25%] right-[-30%] ">
          1
        </wd-tag>
      </view>
      <view class="text-[32rpx] text-[#8C8C8C]">
        待同意
        <!-- <wd-tag type="danger" custom-class="absolute top-[-25%] right-[-30%] ">
          1
        </wd-tag> -->
      </view>
    </view>
    <view class="mx-[30rpx] mt-[30rpx] flex flex-col gap-[30rpx]">
      <view v-for="(item, index) in 2" :key="index" class="h-[378rpx] rounded-[20rpx] bg-[#fff]">
        <view class="mx-[30rpx] mt-[30rpx] flex items-center justify-between">
          <view class="flex items-center gap-[10rpx]">
            <image src="" mode="scaleToFill" class="h-[32rpx] w-[32rpx] rounded-full bg-[#DC3A23]" />
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
        <view class="mx-[30rpx] mt-[30rpx] flex items-center gap-[30rpx]">
          <image src="" mode="scaleToFill" class="h-[124rpx] w-[122rpx] rounded-[12rpx] bg-[#DC3A23]" />
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
        <view class="mx-[30rpx] flex items-end justify-between">
          <view>
            <text class="text-[24rpx] text-[#002C4F]">
              实付款
            </text>
            <text class="text-price text-[36rpx] text-[#DC3A23]">
              499.00
            </text>
          </view>
          <view
            v-if="index == 0"
            class="h-[60rpx] w-[152rpx] rounded-[198rpx] text-center text-[28rpx] text-[#fff] leading-[60rpx]"
            style="background: linear-gradient( 106deg, #078AF3 0%, #0668EB 100%);"
          >
            申请接单
          </view>
          <view v-if="index == 1" class="text-[24rpx] text-[#FB2C41]">
            00:05:24等待客户同意接单申请
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//

.text-line::before {
  position: absolute;
  bottom: 0rpx;
  transform: translateY(-50%);
  width: 80%;
  left: 0rpx;
  height: 6rpx;
  background-color: rgba(30, 139, 244, 0.7);
  display: block;
  content: '';
}
</style>
