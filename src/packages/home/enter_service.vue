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
import { getArrived, getCompleteOrder, getOrderList, getSetOut, getStartService } from '@/api/index'
import { back, call, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()

const paging = ref(null)
const dataList = ref([])
const status = ref('7')

async function queryList(pageNo, pageSize) {
  const res = await getOrderList({
    page: {
      page: pageNo,
      limit: pageSize,
    },
    status: status.value,
  })
  paging.value.complete(res.data.list)
}
async function handleStartService(order) {
  const res = await getStartService({
    orderNo: order.orderNo,
  })
  if (res.code === 200) {
    toast.success('开始服务')
    paging.value.reload()
  }
}
async function handleSetOut(order) {
  const ret = await message.confirm({
    msg: '已检测到您到达用户下单地址',
    title: '提示',
  })
  if (ret.action === 'confirm') {
    const res = await getSetOut({
      orderNo: order.orderNo,
    })
    if (res.code === 200) {
      toast.success('已出发')
      paging.value.reload()
    }
  }
}
// 联系客户
function handleContact(order) {
  toast.success('正在联系客户...')
  call(order.userPhone)
}

// 已到达
async function handleArrived(order) {
  const res = await getArrived({
    orderNo: order.orderNo,
  })
  if (res.code === 200) {
    toast.success('已标记为到达')
    paging.value.reload()
  }
}
// 服务完成
async function handleComplete(order) {
  const res = await getCompleteOrder({
    orderNo: order.orderNo,
  })
  if (res.code === 200) {
    toast.success('服务已完成')
    paging.value.reload()
  }
}
function handleOrderClick(order) {
  go('/packages/order/details', { orderNo: order.orderNo })
}
</script>

<template>
  <view class="bg-base-news">
    <z-paging ref="paging" v-model="dataList" @query="queryList">
      <template #top>
        <wd-navbar
          title="开始服务" left-arrow custom-style="background-color: transparent !important;" :placeholder="true" :fixed="false" :bordered="false" :safe-area-inset-top="true" @click-left="back"
        />
      </template>
      <view class="mx-[30rpx] mt-[30rpx] flex flex-col gap-[30rpx]">
        <ol-order-item
          v-for="item in dataList" :key="item.id" :order="item" @click="handleOrderClick"
          @contact="handleContact" @arrived="handleArrived" @complete="handleComplete"
          @start-service="handleStartService" @set-out="handleSetOut"
        />
      </view>
    </z-paging>
  </view>
</template>

<style lang="scss" scoped>

</style>
