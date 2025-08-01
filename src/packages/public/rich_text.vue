<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '关于',
  },
}
</route>

<script lang="js" setup>
import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html'
import { getRichtext } from '@/api/index'
import { back } from '@/utils/tools'
//
const content = ref(null)
// 用户协议1 隐私协议2 服务中心入驻协议5 服务中心入驻协议6 转出协议7
// @click="go('/packages/public/rich_text', { id: 2 })"
onLoad(async (options) => {
  console.log(options)
  const res = await getRichtext({
    id: options.id,
  })
  console.log(res)
  content.value = res.data.content
})
</script>

<template>
  <view class="">
    <wd-navbar
      title="协议" left-arrow :placeholder="true" :fixed="false" :bordered="false" :safe-area-inset-top="true"
      @click-left="back"
    />
    <wd-gap bg-color="#F4F5F9" height="25rpx" />
    <view class="mx-[20rpx]">
      <mp-html :content="content" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
