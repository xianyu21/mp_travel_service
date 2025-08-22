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
import { getArrived, getCompleteOrder, getOrderList, getSetOut, getStartService } from '@/api/index'
import { back, call, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const tab = ref(0)
const tabs = ref([
  {
    type: '0',
    title: '全部',
  },
  {
    type: '4',
    title: '已接单',
  },
  {
    type: '5',
    title: '已出发',
  },
  {
    type: '6',
    title: '已到达',
  },
  {
    type: '7',
    title: '开始服务',
  },
  {
    type: '8',
    title: '完成',
  },
])
const paging = ref(null)
const dataList = ref([])
const status = ref('')
function handleTabsChange(e) {
  tab.value = e.index
  status.value = e.name
  paging.value.reload()
}
async function queryList(pageNo, pageSize) {
  const res = await getOrderList({
    page: {
      page: pageNo,
      limit: pageSize,
    },
    status: status.value === '0' ? '' : status.value,
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
  <view class="bg-base-order">
    <z-paging ref="paging" v-model="dataList" @query="queryList">
      <template #top>
        <wd-navbar
          title="订单" custom-style="background-color: transparent !important;" left-arrow :placeholder="true"
          :fixed="false" :bordered="false" :safe-area-inset-top="true" @click-left="back"
        />
        <view
          class="m-[24rpx] flex items-center gap-[20rpx] rounded-[88rpx] bg-[#fff] p-[10rpx]"
          style="overflow: hidden;" @click="go('/packages/public/search')"
        >
          <wd-search
            placeholder="输入关键字订单" placeholder-left :hide-cancel="true" disabled
            custom-class="w-full !p-0 !bg-[#fff] " :light="true"
          />
          <view
            class="h-[62rpx] w-[114rpx] rounded-[31rpx] bg-[linear-gradient(315deg,#078AF3_0%,#0668EB_100%)] text-center text-[28rpx] text-[#fff] leading-[62rpx]"
          >
            搜索
          </view>
        </view>
        <wd-tabs
          v-model="tab" auto-line-width custom-style="background-color: transparent !important;"
          @click="handleTabsChange"
        >
          <wd-tab v-for="(item, index) in tabs" :key="index" :title="`${item.title}`" :name="item.type" />
        </wd-tabs>
      </template>

      <view class="mx-[30rpx] mt-[34rpx] flex flex-col gap-[30rpx]">
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
