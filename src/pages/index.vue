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
import { getRobApply, getRobbedOrder, getStatis, getWaitRobOrder, offlineReceiveUser, onlineReceiveUser } from '@/api/index'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
const isOnline = ref(userStore?.userstatisInfo?.isOnline)
async function onlineChange({ value }) {
  console.log('------------------------------')
  console.log(value)
  console.log('------------------------------')
  // if (value === -1) {
  //   await offlineReceiveUser()
  //   await userStore.getUserInfo()
  //   toast.success('已下线！')
  // }
  // else if (value === 1) {
  //   await onlineReceiveUser()
  //   await userStore.getUserInfo()
  //   toast.success('已上线！')
  // }
}
// 拨打紧急电话
function callEmergencyPhone() {
  if (!userStore.userstatisInfo?.emergencyContactPhone) {
    return toast.error('请先绑定紧急联系人号码！')
  }
  wx.makePhoneCall({
    phoneNumber: userStore.userInfo.emergencyContactPhone,
  })
}
const list = ref([])
onLoad(() => {

})

const statisInfo = ref({})
onShow(() => {
  getStatis().then((res) => {
    if (res.code === 200) {
      statisInfo.value = res.data || {}
    }
  })
})
const paging = ref(null)
const dataList = ref([])

const tabIndex = ref(0)
function tabChange(e) {
  tabIndex.value = e
  paging.value.reload()
}
const total = ref(0)
async function queryList(pageNo, pageSize) {
  if (tabIndex.value === 0) {
    const res = await getWaitRobOrder({
      page: { page: pageNo, limit: pageSize },
    })
    total.value = res.data.total
    paging.value.complete(res.data.list)
  }
  if (tabIndex.value === 1) {
    const res = await getRobbedOrder({
      page: { page: pageNo, limit: pageSize },
    })

    paging.value.complete(res.data.list)
  }
}
function handleApply(item) {
  console.log('------------------------------')
  console.log(item)
  console.log('------------------------------')
  getRobApply({
    orderNo: item?.orderNo,
  }).then((res) => {
    if (res.code === 200) {
      toast.success('抢单成功，等待接单！')
      paging.value.reload()
    }
  })
}
</script>

<template>
  <view class="bg-base-index">
    <z-paging ref="paging" v-model="dataList" @query="queryList">
      <template #top>
        <wd-navbar
          title="首页" custom-style="background-color: transparent !important;" :placeholder="true" :fixed="false"
          :bordered="false" :safe-area-inset-top="true"
        />
      </template>

      <view class="mx-[30rpx] mt-[30rpx] flex items-center justify-between gap-[30rpx]">
        <view class="h-[100rpx] flex flex-1 items-center justify-between rounded-[20rpx] bg-[#fff] px-[30rpx]" @click="callEmergencyPhone">
          <text class="text-[28rpx] text-[#000000] font-bold">
            紧急呼救
          </text>
          <image src="@img/img-008.png" mode="scaleToFill" class="h-[47.08rpx] w-[47.08rpx]" />
        </view>
        <view class="h-[100rpx] flex flex-1 items-center justify-between rounded-[20rpx] bg-[#fff] px-[30rpx]">
          <text class="text-[28rpx] text-[#000000] font-bold">
            {{ isOnline == 1 ? '在线' : '下线' }}
          </text>
          <wd-switch v-model="isOnline" :active-value="1" :inactive-value="-1" size="40rpx" @change="onlineChange" />
        </view>
      </view>
      <view class="mx-[30rpx] mt-[30rpx] flex items-center justify-between gap-[30rpx] text-[#fff]">
        <view class="bg-002 h-[294rpx] flex flex-1 flex-col rounded-[20rpx] bg-[#fff] px-[30rpx]">
          <text class="mt-[30rpx] text-[24rpx]">
            今日服务收益
          </text>
          <text class="mt-[10rpx] text-[60rpx]">
            {{ statisInfo?.todayCommission || 0 }}
          </text>
          <text class="mt-[30rpx] text-[24rpx]">
            累计服务收益
          </text>
          <text class="mt-[10rpx] text-[32rpx]">
            {{ statisInfo?.totalCommisstion || 0 }}
          </text>
        </view>
        <view class="bg-003 h-[294rpx] flex flex-1 flex-col rounded-[20rpx] bg-[#fff] px-[30rpx]">
          <text class="mt-[30rpx] text-[24rpx]">
            今日分销收益
          </text>
          <text class="mt-[10rpx] text-[60rpx]">
            {{ statisInfo?.todayShareCommission || 0 }}
          </text>
          <text class="mt-[30rpx] text-[24rpx]">
            累计分销收益
          </text>
          <text class="mt-[10rpx] text-[32rpx]">
            {{ statisInfo?.totalShareCommisstion || 0 }}
          </text>
        </view>
      </view>
      <view class="mx-[30rpx] mt-[30rpx] h-[328rpx] rounded-[20rpx] bg-[#fff] py-[30rpx]">
        <view class="mx-[30rpx] flex items-center justify-between">
          <text class="text-[36rpx] text-[#0B0B0B] font-bold">
            订单概况
          </text>
          <view class="flex gap-[20rpx] text-[24rpx] text-[#9E9E9E]">
            <text>今日订单</text>
            <text>  {{ statisInfo?.receivedCount || 0 }}</text>
          </view>
        </view>
        <view class="grid grid-cols-3 grid-rows-2 mt-[26rpx] gap-[30rpx]">
          <view class="flex flex-col items-center justify-center" @click="go('/packages/home/received_order')">
            <text class="text-[40rpx] text-[#4895F1]">
              {{ statisInfo?.receivedCount || 0 }}
            </text>
            <text class="text-[24rpx] text-[#9E9E9E]">
              已接单
            </text>
          </view>
          <view class="flex flex-col items-center justify-center" @click="go('/packages/home/enter_service')">
            <text class="text-[40rpx] text-[#62DAEF]">
              {{ statisInfo?.inServiceCount || 0 }}
            </text>
            <text class="text-[24rpx] text-[#9E9E9E]">
              开始服务
            </text>
          </view>
          <view class="flex flex-col items-center justify-center">
            <text class="text-[40rpx] text-[#0B0B0B]">
              {{ statisInfo?.completeCount || 0 }}
            </text>
            <text class="text-[24rpx] text-[#9E9E9E]">
              服务完成
            </text>
          </view>
          <view class="flex flex-col items-center justify-center">
            <text class="text-[40rpx] text-[#0B0B0B]">
              {{ statisInfo?.totalOrderCount || 0 }}
            </text>
            <text class="text-[24rpx] text-[#9E9E9E]">
              总订单
            </text>
          </view>
          <view class="flex flex-col items-center justify-center" @click="go('/packages/home/evaluate')">
            <text class="text-[40rpx] text-[#0B0B0B]">
              {{ statisInfo?.evaluationCount || 0 }}
            </text>
            <text class="text-[24rpx] text-[#9E9E9E]">
              评价
            </text>
          </view>
        </view>
      </view>
      <view class="mx-[30rpx] mt-[30rpx] flex items-center gap-[42rpx]">
        <view class="relative text-[32rpx]" :class="tabIndex === 0 ? ' text-line text-[#000000] font-bold' : 'text-[#8C8C8C]'" @click="tabChange(0)">
          待抢单
          <wd-tag type="danger" custom-class="absolute top-[-25%] right-[-30%] ">
            {{ total || 0 }}
          </wd-tag>
        </view>
        <view class="text-[32rpx]" :class="tabIndex === 1 ? 'relative text-line text-[#000000] font-bold' : 'text-[#8C8C8C]'" @click="tabChange(1)">
          待同意
        <!-- <wd-tag type="danger" custom-class="absolute top-[-25%] right-[-30%] ">
          1
        </wd-tag> -->
        </view>
      </view>
      <view class="mx-[30rpx] mt-[30rpx] flex flex-col gap-[30rpx]">
        <ol-order-item-v2
          v-for="item in dataList"
          :key="item.id"
          :order="item"
          :tab-index="tabIndex"
          @apply="handleApply"
        />
      </view>
    </z-paging>
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
