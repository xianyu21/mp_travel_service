<script setup lang="ts">
import { getSendSms } from '@/api/index'
import { login } from '@/api/login'
import { useUserStore } from '@/store'
import { go } from '@/utils/tools'

const userStore = useUserStore()
const phoneNumber = ref('17323778328')
const verificationCode = ref('123456')
const codeSent = ref(false)
const codeSending = ref(false)
const countdown = ref(60)
let timer: NodeJS.Timeout | null = null

onLoad(() => {
  // 假设首次加载时验证码输入框不显示
  codeSent.value = false
})

function goBack() {
  uni.navigateBack()
}

async function getVerificationCode() {
  if (!phoneNumber.value || codeSending.value)
    return
  codeSending.value = true
  codeSent.value = true
  countdown.value = 60

  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    }
    else {
      clearInterval(timer!)
      codeSending.value = false
      timer = null
    }
  }, 1000)
  const res = await getSendSms({
    phoneNumber: phoneNumber.value,
  })
  if (res.code == 200) {
    uni.showToast({
      title: '验证码已发送',
      icon: 'none',
    })
  }
}

const isCheck = ref(false)
async function onSubmit() {
  // console.log('------------------------------')
  // console.log('11')
  // console.log('------------------------------')
  // go({
  //   type: 'switchTab',
  //   url: '/pages/index',
  // })
  if (!phoneNumber.value || !verificationCode.value || !isCheck.value) {
    uni.showToast({
      title: '请填写完整信息并同意用户协议',
      icon: 'none',
    })
    return
  }
  const res = await login({
    phone: phoneNumber.value,
    messageCode: verificationCode.value,
  })
  console.log('------------------------------')
  console.log(res)
  console.log('------------------------------')
  if (res.code === 200) {
    uni.showToast({
      title: '登录成功',
      icon: 'success',
    })
    userStore.setUserInfo(res.data)
    uni.setStorageSync('userInfo', res.data)
    uni.setStorageSync('token', res.data.token)
    setTimeout(() => {
      // 登录成功后跳转到首页
      uni.switchTab({
        url: '/pages/index',
      })
    }, 1000)
  }
}

function wechatLogin() {
  uni.showToast({
    title: '微信登录功能待开发',
    icon: 'none',
  })
}
</script>

<template>
  <view class="login-container">
    <view class="header">
      <text class="greeting">
        你好，
      </text>
      <text class="welcome">
        欢迎来到旅接接单宝
      </text>
    </view>

    <view class="input-group">
      <view class="phone-input">
        <text class="country-code">
          +86
        </text>
        <input v-model="phoneNumber" type="number" placeholder="请输入手机号" class="flex-1">
        <button
          class="get-code-btn" :disabled="!phoneNumber || codeSending" :class="{ 'is-sending': codeSending }"
          @click="getVerificationCode"
        >
          {{ codeSending ? `${countdown}s` : '获取验证码' }}
        </button>
      </view>
      <input v-if="codeSent" v-model="verificationCode" type="number" placeholder="请输入验证码" class="verification-input">
    </view>

    <button class="login-btn" :disabled="!phoneNumber || !verificationCode" @click="onSubmit">
      登录
    </button>
    <view class="mb-8 flex items-center justify-center">
      <wd-checkbox v-model="isCheck" checked-color="#0680F0" size="26rpx" />
      <text class="text-[24rpx] text-[#181818]">
        您已阅读和同意
      </text>
      <text class="text-[24rpx] text-[#181818]" @click="go('/packages/public/rich_text', { id: 2 })">
        用户协议
      </text>
    </view>
    <wd-divider>
      使用第三方账号登录
    </wd-divider>
    <view class="third-party-login">
      <view class="wechat-icon" @click="wechatLogin">
        <image src="@img/wechat.png" class="h-10 w-10" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login-container {
  @apply flex flex-col items-center pt-20 px-8 h-screen bg-white;

  .header {
    @apply w-full text-left mb-10;

    .greeting {
      @apply text-[52rpx] text-[#000000] block;
    }

    .welcome {
      @apply text-[52rpx] text-[#000000] block mt-2;
    }
  }

  .input-group {
    @apply w-full mb-8;

    .phone-input {
      @apply flex items-center p-3 mb-4;
      border-bottom: 1rpx solid #f8f8f8;

      .country-code {
        @apply text-lg mr-2;
      }

      input {
        @apply text-lg;
      }

      .get-code-btn {
        @apply bg-blue-500 text-white text-sm px-4 py-2 rounded-full;

        &[disabled] {
          @apply bg-blue-200;
        }

        &.is-sending {
          @apply bg-gray-400;
        }
      }
    }

    .verification-input {
      @apply rounded-lg p-3 text-lg;
      border-bottom: 1rpx solid #f8f8f8;
    }
  }

  .login-btn {
    @apply w-full bg-blue-500 text-white text-lg py-3 rounded-full mb-4;

    &[disabled] {
      @apply bg-blue-200;
    }
  }

  .agreement {
    @apply mb-8;
  }

  .third-party-login {
    @apply flex flex-col items-center;

    .wechat-icon {
      @apply mt-4 p-3 rounded-full;
    }
  }
}
</style>
