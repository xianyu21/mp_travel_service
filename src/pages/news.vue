<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": ""
  }
}
</route>

<script setup>
import { useMessage, useToast } from 'wot-design-uni'
import { getOrderMsgPage, getReadAllOrderNotice, getReadAllSystemNotice, getReadOrderNotice, getReadSystemNotice, getSystemMsgPage } from '@/api/index'
import { useUserStore } from '@/store'
import { back, call, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()

// system order
const type = ref('system')
onLoad(() => {
})
const paging = ref(null)
const dataList = ref([])

async function queryList(pageNo, pageSize) {
  if (type.value == 'system') {
    const res = await getSystemMsgPage({
      page: {
        page: pageNo,
        limit: pageSize,
      },
    })
    paging.value.complete(res.data.list)
  }
  else if (type.value == 'order') {
    const res = await getOrderMsgPage({
      page: {
        page: pageNo,
        limit: pageSize,
      },
    })
    paging.value.complete(res.data.list)
  }
}
function changeType(type) {
  this.type = type
  paging.value.reload()
}
async function onNext(item) {
  console.log('------------------------------')
  console.log(item)
  console.log('------------------------------')
  if (type.value == 'system') {
    const res = await getReadSystemNotice({
      noticeId: item.noticeId,
    })
    paging.value.reload()
  }
  else if (type.value == 'order') {
    const res = await getReadOrderNotice({
      noticeId: item.noticeId,
    })
    paging.value.reload()
  }
}
function clear() {
  message
    .confirm({
      msg: '确认清理所有未读消息？',
    })
    .then(async () => {
      if (type.value == 'system') {
        await getReadAllSystemNotice()
        paging.value.reload()
      }
      else if (type.value == 'order') {
        await getReadAllOrderNotice()
        paging.value.reload()
      }
    })
    .catch(() => {
      console.log('点击了取消按钮')
    })
}
</script>

<template>
  <view class="bg-base-news">
    <z-paging ref="paging" v-model="dataList" @query="queryList">
      <template #top>
        <wd-navbar
          title="消息中心" custom-style="background-color: transparent !important;" left-arrow :placeholder="true"
          :fixed="false" :bordered="false" :safe-area-inset-top="true" @click-left="back"
        >
          <template #right>
            <image src="@img/img-306.png" mode="scaleToFill" class="h-[38.28rpx] w-[33.72rpx]" @click="clear" />
          </template>
        </wd-navbar>
      </template>

      <view class="grid grid-cols-3 mx-[30rpx] mt-[30rpx] h-[224rpx] rounded-[20rpx] bg-[#fff]">
        <view class="flex flex-grow flex-col items-center justify-center gap-[18rpx]" @click="changeType('system')">
          <image src="@img/img-301.png" mode="scaleToFill" class="text-dot-red h-[88rpx] w-[88rpx]" />
          <text class="text-[26rpx] text-[#333333]">
            系统通知
          </text>
        </view>
        <view class="flex flex-grow flex-col items-center justify-center gap-[18rpx]" @click="changeType('order')">
          <image src="@img/img-302.png" mode="scaleToFill" class="h-[88rpx] w-[88rpx]" />
          <text class="text-[26rpx] text-[#333333]">
            订单服务
          </text>
        </view>
        <view class="flex flex-grow flex-col items-center justify-center gap-[18rpx]" @click="call(13330203934)">
          <image src="@img/img-303.png" mode="scaleToFill" class="h-[88rpx] w-[88rpx]" />
          <text class="text-[26rpx] text-[#333333]">
            联系客服
          </text>
        </view>
      </view>
      <!-- 无数据  -->
      <view v-if="false" class="mt-[100rpx] flex flex-grow flex-col items-center justify-center gap-[18rpx]">
        <image src="@img/img-005.png" mode="scaleToFill" class="h-[88rpx] w-[88rpx]" />
        <text class="text-[32rpx] text-[#9E9E9E]">
          暂无消息呢~
        </text>
      </view>
      <!-- 有数据 -->
      <view class="mx-[30rpx] mt-[30rpx] flex flex-col gap-[30rpx]">
        <view
          v-for="(item, index) in dataList" :key="index"
          class="min-h-[234rpx] flex flex-col rounded-[20rpx] bg-[#fff] px-[18rpx]" @click.stop="onNext(item)"
        >
          <template v-if="type == 'system'">
            <view class="mt-[30rpx]">
              <image src="@img/img-304.png" mode="scaleToFill" class="round-full h-[44rpx] w-[44rpx]" />
              <text class="text-[28rpx] text-[#000000] font-bold">
                {{ item.noticeName || '-' }}
              </text>
              <text class="ml-[10rpx] text-[20rpx] text-[#BFBFBF]">
                {{ item.createTime || '-' }}
              </text>
            </view>
            <view class="mt-[30rpx] flex items-center text-[28rpx] text-[#828386]">
              <text>通知内容</text>
              <text class="ml-[30rpx]">
                {{ item.content || '-' }}
              </text>
            </view>
            <view class="mt-[18rpx] flex items-center justify-between text-[28rpx] text-[#828386]">
              <view class="flex items-center">
                <text>订单编号</text>
                <text class="ml-[30rpx]">
                  {{ item.orderNo || '-' }}
                </text>
              </view>
              <view
                class="ml-[68rpx] h-[56rpx] w-[140rpx] border-[2rpx] border-[#A6A7A8] rounded-[176rpx] border-solid text-center text-[24rpx] text-[#333333] leading-[56rpx]"
              >
                查看详情
              </view>
            </view>
          </template>
          <template v-if="type == 'order'">
            <view class="mt-[30rpx]">
              <image src="@img/img-305.png" mode="scaleToFill" class="round-full text-dot-red h-[44rpx] w-[44rpx]" />
              <text class="text-[28rpx] text-[#000000] font-bold">
                {{ item.noticeName || '-' }}
              </text>
              <text class="ml-[10rpx] text-[20rpx] text-[#BFBFBF]">
                {{ item.createTime || '-' }}
              </text>
            </view>
            <view class="mt-[30rpx] flex items-center text-[28rpx] text-[#828386]">
              <text>服务时间</text>
              <text class="ml-[30rpx]">
                {{ item.serviceTime || '-' }}
              </text>
            </view>
            <view class="mt-[18rpx] flex items-center text-[28rpx] text-[#828386]">
              <text>服务旅接</text>
              <text class="ml-[30rpx]">
                {{ item.userName || '-' }}
              </text>
            </view>
            <wd-divider color="#F9F9F9" />
            <view class="mb-[18rpx] flex items-center justify-between text-[28rpx] text-[#828386]">
              <text>{{ item.content || '-' }}</text>
              <view
                class="ml-[68rpx] h-[56rpx] w-[140rpx] border-[2rpx] border-[#A6A7A8] rounded-[176rpx] border-solid text-center text-[24rpx] text-[#333333] leading-[56rpx]"
              >
                查看详情
              </view>
            </view>
          </template>
        </view>
      </view>
    </z-paging>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
