<route lang="json5" type="page">
{
layout: 'default',
style: {
navigationBarTitleText: '',
},
}
</route>

<script setup>
import { useToast } from 'wot-design-uni'
import {
  getCreateContract,
  getIdentify,
  getProtocolDetail,
} from '@/api/index'
import {
  back,
} from '@/utils/tools'

const toast = useToast()
const src = ref('')
onLoad(async (options) => {
  console.log(options)
  if (options.type == 1) {
    const res = await getIdentify()
    src.value = res.data.identifyUrl
  }
  else if (options.type == 2) {
    const res = await getCreateContract({
      order_sn: options.order_sn,
    })
    if (res.code == 1) {
      src.value = res.data.signUrl
    }
    else {
      toast.show(res.msg)
      setTimeout(() => {
        back()
      }, 1200)
    }
  }
  else if (options.type == 3) {
    const res = await getProtocolDetail({
      contractNo: options.contractNo,
    })
    console.log('------------------------------')
    console.log(res)
    console.log('------------------------------')
    src.value = res.data.previewUrl
  }
})

function onPostMessage(e) {
  console.log(e)
  if (e.detail.data[0].action == 'message') {
    uni.navigateBack({
      delta: 2,
    })
  }
}
function message(e) {
  console.log(e)
  if (e.detail.data[0].action == 'message') {
    uni.navigateBack({
      delta: 2,
    })
  }
}
</script>

<template>
  <view class="">
    <wd-navbar title="合同" left-arrow :placeholder="true" :fixed="false" :bordered="false" :safe-area-inset-top="true" @click-left="back" />
    <web-view :src="src" @on-post-message="onPostMessage" @message="message" />
  </view>
</template>

<style lang="scss" scoped>
	//
</style>
