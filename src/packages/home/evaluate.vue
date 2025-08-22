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
import { getTraveCommentList } from '@/api/index'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
const paging = ref(null)
const dataList = ref([])
async function queryList(pageNo, pageSize) {
  const res = await getTraveCommentList({
    page: {
      page: pageNo,
      limit: pageSize,
    },
  })
  paging.value.complete(res.data.list)
}

// const tab = ref(0)
// const tabs = ref([
//   {
//     type: 'contribution',
//     title: '最新评价',

//   },
//   {
//     type: 'creditvalue',
//     title: '历史评价',
//   },
// ])
// function handleTabsChange() {
//   paging.value.reload()
// }
const value = ref(4)
</script>

<template>
  <view class="bg-base-news">
    <z-paging ref="paging" v-model="dataList" @query="queryList">
      <template #top>
        <wd-navbar
          title="评价" left-arrow custom-style="background-color: transparent !important;" :placeholder="true" :fixed="false" :bordered="false" :safe-area-inset-top="true" @click-left="back"
        />
        <!-- <wd-tabs v-model="tab" auto-line-width custom-style="background-color: transparent !important;" @click="handleTabsChange">
          <wd-tab v-for="(item, index) in tabs" :key="index" :title="`${item.title}`" />
        </wd-tabs> -->
      </template>
      <view class="mx-[30rpx] mt-[30rpx] flex flex-col gap-[30rpx]">
        <view v-for="(item, index) in dataList" :key="index" class="rounded-[20rpx] bg-[#fff] p-[30rpx]">
          <view class="flex items-stretch gap-[10rpx]">
            <image
              :src="item.headUrl"
              mode="scaleToFill"
              class="h-[80rpx] w-[80rpx] rounded-full"
            />
            <view class="flex flex-col justify-between">
              <text class="text-[28rpx] text-[#0B0B0B]">
                张小梅
              </text>
              <text class="text-[24rpx] text-[#9E9E9E]">
                订单 {{ item.orderNo }} | {{ item.createTime }}
              </text>
            </view>
          </view>
          <view class="mt-[28rpx] rounded-[12rpx] bg-[#F7F7F7] p-[20rpx]">
            <view class="flex items-center gap-[10rpx]">
              <text class="text-[32rpx] text-[#FF7C53] font-bold">
                {{ item.star }}
              </text>
              <wd-rate v-model="item.star" active-color="#FF7C53" color="#C7C7C7" />
            </view>
            <view class="mt-[10rpx] text-[24rpx] text-[#0B0B0B]">
              {{ item.content }}
            </view>
          </view>
        </view>
      </view>
    </z-paging>
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
  color: #717171 !important;
  font-size: 32rpx;
}

:deep(.wd-tabs__nav-item.is-active) {
  color: #000000 !important;
  font-size: 32rpx;
}

:deep(.wd-tabs__line) {
  //   background: #42cbff ;
  background: linear-gradient(90deg, #0791f5 0%, #0661e8 100%) !important;
}
</style>
