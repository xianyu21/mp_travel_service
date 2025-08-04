<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "编辑资料"
  }
}
</route>

<script lang="ts" setup>
import { useMessage, useToast } from 'wot-design-uni'
// import {  } from '@/api/index'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()

// 用户资料数据
const userInfo = ref({
  avatar: '/static/images/avatar-default.png', // 默认头像
  nickname: '冯宝宝',
  registerDate: '2025.06.22',
})

// 选择头像
function selectAvatar() {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      userInfo.value.avatar = res.tempFilePaths[0]
      toast.success('头像已更新')
    },
    fail: () => {
      toast.error('选择头像失败')
    },
  })
}

// 编辑昵称
function editNickname() {
  message.prompt('请输入新昵称', userInfo.value.nickname)
    .then((value) => {
      if (value && value.trim()) {
        userInfo.value.nickname = value.trim()
        toast.success('昵称已更新')
      }
    })
    .catch(() => {
      // 用户取消
    })
}

// 注销用户
function logoutUser() {
  message.confirm('确定要注销用户吗？注销后将清除所有数据，此操作不可恢复！')
    .then(() => {
      // 实际项目中应该调用API注销用户
      toast.success('用户注销成功')
      setTimeout(() => {
        // 跳转到登录页面或首页
        uni.reLaunch({
          url: '/pages/index/index',
        })
      }, 1500)
    })
    .catch(() => {
      // 用户取消
    })
}

// 退出登录
function logout() {
  message.confirm('确定要退出登录吗？')
    .then(() => {
      // 清除用户信息
      userStore.clearUserInfo()
      toast.success('已退出登录')
      setTimeout(() => {
        // 跳转到登录页面
        uni.reLaunch({
          url: '/pages/login/login',
        })
      }, 1500)
    })
    .catch(() => {
      // 用户取消
    })
}

// 确定保存
function confirmSave() {
  // 保存用户资料
  // 实际项目中应该调用API保存
  toast.success('资料保存成功')
  setTimeout(() => {
    back()
  }, 1500)
}
</script>

<template>
  <view class="min-h-screen bg-[#f5f5f5]">
    <wd-navbar
      title="编辑资料"
      custom-style="background-color: transparent !important;"
      left-arrow
      :placeholder="true"
      :fixed="false"
      :bordered="false"
      :safe-area-inset-top="true"
      @click-left="back"
    />

    <!-- 用户资料表单 -->
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-white p-[30rpx]">
      <!-- 真实头像 -->
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]" @click="selectAvatar">
        <text class="text-[32rpx] text-[#333]">
          真实头像
        </text>
        <view class="flex items-center">
          <image
            :src="userInfo.avatar"
            mode="aspectFill"
            class="mr-[10rpx] h-[80rpx] w-[80rpx] rounded-full"
          />
          <text class="text-[32rpx] text-[#999]">
            >
          </text>
        </view>
      </view>

      <!-- 昵称 -->
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]" @click="editNickname">
        <text class="text-[32rpx] text-[#333]">
          昵称
        </text>
        <view class="flex items-center">
          <text class="mr-[10rpx] text-[32rpx] text-[#333]">
            {{ userInfo.nickname }}
          </text>
          <text class="text-[32rpx] text-[#999]">
            >
          </text>
        </view>
      </view>

      <!-- 注册时间 -->
      <view class="flex items-center justify-between py-[30rpx]">
        <text class="text-[32rpx] text-[#333]">
          注册时间
        </text>
        <text class="text-[32rpx] text-[#666]">
          {{ userInfo.registerDate }}
        </text>
      </view>
    </view>

    <!-- 注销用户按钮 -->
    <view class="mx-[30rpx] mt-[60rpx] text-center">
      <text class="text-[32rpx] text-[#999]" @click="logoutUser">
        注销用户?
      </text>
    </view>

    <!-- 底部按钮 -->
    <view class="fixed bottom-[40rpx] left-[30rpx] right-[30rpx] flex gap-[20rpx]">
      <!-- 退出登录按钮 -->
      <view
        class="h-[90rpx] flex flex-1 items-center justify-center border border-[#ddd] rounded-[45rpx] bg-white text-[32rpx] text-[#666]"
        @click="logout"
      >
        退出登录
      </view>

      <!-- 确定按钮 -->
      <view
        class="h-[90rpx] flex flex-1 items-center justify-center rounded-[45rpx] text-[32rpx] text-white"
        style="background: linear-gradient(106deg, #078af3 0%, #0668eb 100%);"
        @click="confirmSave"
      >
        确定
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 使用unocss，无需额外样式
</style>
