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
import { } from '@/api/index'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
const paging = ref(null)
const dataList = ref([])
function queryList(pageNo, pageSize) {
  paging.value.complete([{}, {}, {}])
}

const value = ref(4)
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
        <view v-for="(item, index) in dataList" :key="index" class="h-[518rpx] rounded-[20rpx] bg-[#fff]">
          <view class="mx-[30rpx] mt-[30rpx] flex items-center justify-between">
            <view class="flex items-center gap-[10rpx]">
              <image
                src=""
                mode="scaleToFill"
                class="h-[32rpx] w-[32rpx] rounded-full bg-[#DC3A23]"
              />
              <text class="text-[28rpx] text-[#000000] font-bold">
                冯宝宝
              </text>
              <text class="text-[24rpx] text-[#002C4F]">
                丨服务时间:06.30 14:00
              </text>
            </view>
            <view class="text-[28rpx] text-[#0678EE]">
              已接单
            </view>
          </view>
          <view class="mx-[30rpx] mt-[30rpx] flex items-center gap-[30rpx]">
            <image
              src=""
              mode="scaleToFill"
              class="h-[124rpx] w-[122rpx] rounded-[12rpx] bg-[#DC3A23]"
            />
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
          <view class="mx-[30rpx] flex items-end justify-end">
            <view>
              <text class="text-[24rpx] text-[#002C4F]">
                实付款
              </text>
              <text class="text-price text-[36rpx] text-[#DC3A23]">
                499.00
              </text>
            </view>
          </view>
          <view class="mx-[30rpx] flex items-end justify-between">
            <view>
              <text class="text-[24rpx] text-[#002C4F]">
                预估收入
              </text>
              <text class="text-price text-[36rpx] text-[#DC3A23]">
                499.00
              </text>
            </view>
            <view>
              <text class="text-[24rpx] text-[#002C4F]">
                预估车费(往返)
              </text>
              <text class="text-price text-[36rpx] text-[#DC3A23]">
                499.00
              </text>
            </view>
          </view>
          <wd-divider color="#F6F6F6" />
          <view class="flex items-center justify-end gap-[30rpx]">
            <view

              class="h-[60rpx] w-[152rpx] rounded-[198rpx] text-center text-[28rpx] text-[#333333] leading-[60rpx]"
              style="border: 1rpx solid #A6A7A8;"
            >
              联系客户
            </view>
            <view

              class="h-[60rpx] w-[152rpx] rounded-[198rpx] text-center text-[28rpx] text-[#333333] leading-[60rpx]"
              style="border: 1rpx solid #A6A7A8;"
            >
              已到达
            </view>
            <view

              class="h-[60rpx] w-[152rpx] rounded-[198rpx] text-center text-[28rpx] text-[#fff] leading-[60rpx]"
              style="background: linear-gradient( 106deg, #078AF3 0%, #0668EB 100%);"
            >
              服务完成
            </view>
          </view>
        </view>
      </view>
    </z-paging>
  </view>
</template>

<style lang="scss" scoped>

</style>
