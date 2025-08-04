<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "旅接入驻"
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

// 入驻表单数据
const formData = ref({
  avatar: '/static/images/avatar-default.png',
  name: '冯宝宝',
  gender: '男',
  phone: '136****4545',
  address: '重庆市沙坪坝区微电园产业园11栋',
  introduction: '人民话多爱交朋友',
  idCard: '500104199710253541',
  isDriver: '是',
  serviceItems: '陪拍陪玩｜陪伴游戏',
  serviceTime: '',
  emergencyContact: '王美美',
  emergencyPhone: '15815421241',
})

// 证件照片
const certificates = ref([
  { type: 'idFront', name: '身份证正面', image: '' },
  { type: 'idBack', name: '身份证反面', image: '' },
  { type: 'other', name: '其他照片', image: '' },
  { type: 'personal', name: '个人生活照', image: '' },
  { type: 'personalLife', name: '个人生活照', image: '' },
  { type: 'qualification', name: '资格证', image: '' },
])

// 同意隐私协议
const agreePrivacy = ref(false)

// 选择头像
function selectAvatar() {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      formData.value.avatar = res.tempFilePaths[0]
      toast.success('头像已更新')
    },
  })
}

// 编辑字段
function editField(field: string, title: string) {
  const currentValue = formData.value[field as keyof typeof formData.value]
  message.prompt(`请输入${title}`, currentValue as string)
    .then((value) => {
      if (value && value.trim()) {
        (formData.value as any)[field] = value.trim()
        toast.success(`${title}已更新`)
      }
    })
    .catch(() => {})
}

// 选择性别
function selectGender() {
  uni.showActionSheet({
    itemList: ['男', '女'],
    success: (res) => {
      formData.value.gender = res.tapIndex === 0 ? '男' : '女'
    },
  })
}

// 选择是否有车
function selectDriver() {
  uni.showActionSheet({
    itemList: ['是', '否'],
    success: (res) => {
      formData.value.isDriver = res.tapIndex === 0 ? '是' : '否'
    },
  })
}

// 上传证件照片
function uploadCertificate(index: number) {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      certificates.value[index].image = res.tempFilePaths[0]
      toast.success('照片已上传')
    },
  })
}

// 重置表单
function resetForm() {
  message.confirm('确定要重置所有信息吗？')
    .then(() => {
      // 重置表单数据
      Object.assign(formData.value, {
        avatar: '/static/images/avatar-default.png',
        name: '',
        gender: '男',
        phone: '',
        address: '',
        introduction: '',
        idCard: '',
        isDriver: '是',
        serviceItems: '',
        serviceTime: '',
        emergencyContact: '',
        emergencyPhone: '',
      })

      // 重置证件照片
      certificates.value.forEach((cert) => {
        cert.image = ''
      })

      agreePrivacy.value = false
      toast.success('已重置')
    })
    .catch(() => {})
}

// 提交申请
function submitApplication() {
  // 表单验证
  if (!formData.value.name) {
    toast.error('请输入姓名')
    return
  }
  if (!formData.value.phone) {
    toast.error('请输入手机号')
    return
  }
  if (!formData.value.idCard) {
    toast.error('请输入身份证号码')
    return
  }
  if (!agreePrivacy.value) {
    toast.error('请同意隐私协议')
    return
  }

  // 提交申请
  message.confirm('确定要提交入驻申请吗？')
    .then(() => {
      // 实际项目中应该调用API提交
      toast.success('申请已提交，请等待审核')
      setTimeout(() => {
        back()
      }, 1500)
    })
    .catch(() => {})
}
</script>

<template>
  <view class="min-h-screen bg-[#f5f5f5] pb-[200rpx]">
    <wd-navbar
      title="旅接入驻"
      custom-style="background-color: transparent !important;"
      left-arrow
      :placeholder="true"
      :fixed="false"
      :bordered="false"
      :safe-area-inset-top="true"
      @click-left="back"
    />

    <!-- 基本信息 -->
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-white p-[30rpx]">
      <!-- 真实头像 -->
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]" @click="selectAvatar">
        <text class="text-[32rpx] text-[#333]">
          真实头像
        </text>
        <view class="flex items-center">
          <image
            :src="formData.avatar"
            mode="aspectFill"
            class="mr-[10rpx] h-[80rpx] w-[80rpx] rounded-full"
          />
          <text class="text-[32rpx] text-[#999]">
            >
          </text>
        </view>
      </view>

      <!-- 姓名 -->
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]" @click="editField('name', '姓名')">
        <text class="text-[32rpx] text-[#333]">
          姓名
        </text>
        <text class="text-[32rpx] text-[#333]">
          {{ formData.name }}
        </text>
      </view>

      <!-- 性别 -->
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]" @click="selectGender">
        <text class="text-[32rpx] text-[#333]">
          性别
        </text>
        <view class="flex items-center">
          <view class="mr-[20rpx] flex items-center">
            <view
              class="mr-[10rpx] h-[30rpx] w-[30rpx] border-2 rounded-full"
              :class="formData.gender === '男' ? 'border-[#4facfe] bg-[#4facfe]' : 'border-[#ddd]'"
            >
              <text v-if="formData.gender === '男'" class="text-[16rpx] text-white">
                ✓
              </text>
            </view>
            <text class="text-[28rpx] text-[#333]">
              男
            </text>
          </view>
          <view class="flex items-center">
            <view
              class="mr-[10rpx] h-[30rpx] w-[30rpx] border-2 rounded-full"
              :class="formData.gender === '女' ? 'border-[#4facfe] bg-[#4facfe]' : 'border-[#ddd]'"
            >
              <text v-if="formData.gender === '女'" class="text-[16rpx] text-white">
                ✓
              </text>
            </view>
            <text class="text-[28rpx] text-[#333]">
              女
            </text>
          </view>
        </view>
      </view>

      <!-- 手机号 -->
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]" @click="editField('phone', '手机号')">
        <text class="text-[32rpx] text-[#333]">
          手机号
        </text>
        <text class="text-[32rpx] text-[#333]">
          {{ formData.phone }}
        </text>
      </view>

      <!-- 所在地址 -->
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]" @click="editField('address', '所在地址')">
        <text class="text-[32rpx] text-[#333]">
          所在地址
        </text>
        <text class="max-w-[400rpx] text-right text-[28rpx] text-[#666]">
          {{ formData.address }}
        </text>
      </view>

      <!-- 个人简介 -->
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]" @click="editField('introduction', '个人简介')">
        <text class="text-[32rpx] text-[#333]">
          个人简介
        </text>
        <text class="text-[32rpx] text-[#333]">
          {{ formData.introduction }}
        </text>
      </view>

      <!-- 身份证号码 -->
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]" @click="editField('idCard', '身份证号码')">
        <text class="text-[32rpx] text-[#333]">
          身份证号码
        </text>
        <text class="text-[32rpx] text-[#333]">
          {{ formData.idCard }}
        </text>
      </view>

      <!-- 是否有车 -->
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]" @click="selectDriver">
        <text class="text-[32rpx] text-[#333]">
          是否有车
        </text>
        <view class="flex items-center">
          <view class="mr-[20rpx] flex items-center">
            <view
              class="mr-[10rpx] h-[30rpx] w-[30rpx] border-2 rounded-full"
              :class="formData.isDriver === '是' ? 'border-[#4facfe] bg-[#4facfe]' : 'border-[#ddd]'"
            >
              <text v-if="formData.isDriver === '是'" class="text-[16rpx] text-white">
                ✓
              </text>
            </view>
            <text class="text-[28rpx] text-[#333]">
              是
            </text>
          </view>
          <view class="flex items-center">
            <view
              class="mr-[10rpx] h-[30rpx] w-[30rpx] border-2 rounded-full"
              :class="formData.isDriver === '否' ? 'border-[#4facfe] bg-[#4facfe]' : 'border-[#ddd]'"
            >
              <text v-if="formData.isDriver === '否'" class="text-[16rpx] text-white">
                ✓
              </text>
            </view>
            <text class="text-[28rpx] text-[#333]">
              否
            </text>
          </view>
        </view>
      </view>

      <!-- 服务项目 -->
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]" @click="editField('serviceItems', '服务项目')">
        <text class="text-[32rpx] text-[#333]">
          服务项目
        </text>
        <text class="text-[32rpx] text-[#333]">
          {{ formData.serviceItems }}
        </text>
      </view>

      <!-- 服务时间 -->
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]" @click="editField('serviceTime', '服务时间')">
        <text class="text-[32rpx] text-[#333]">
          服务时间
        </text>
        <text class="text-[32rpx] text-[#999]">
          {{ formData.serviceTime || '请选择' }}
        </text>
      </view>

      <!-- 紧急联系人 -->
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]" @click="editField('emergencyContact', '紧急联系人')">
        <text class="text-[32rpx] text-[#333]">
          紧急联系人
        </text>
        <text class="text-[32rpx] text-[#333]">
          {{ formData.emergencyContact }}
        </text>
      </view>

      <!-- 紧急联系人电话 -->
      <view class="flex items-center justify-between py-[30rpx]" @click="editField('emergencyPhone', '紧急联系人电话')">
        <text class="text-[32rpx] text-[#333]">
          紧急联系人电话
        </text>
        <text class="text-[32rpx] text-[#333]">
          {{ formData.emergencyPhone }}
        </text>
      </view>
    </view>

    <!-- 相关资质 -->
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-white p-[30rpx]">
      <view class="mb-[30rpx] text-[32rpx] text-[#333] font-medium">
        相关资质
      </view>

      <view class="grid grid-cols-2 gap-[20rpx]">
        <view
          v-for="(cert, index) in certificates"
          :key="index"
          class="aspect-square flex flex-col items-center justify-center border-2 border-[#ddd] rounded-[10rpx] border-dashed"
          @click="uploadCertificate(index)"
        >
          <image
            v-if="cert.image"
            :src="cert.image"
            mode="aspectFill"
            class="h-full w-full rounded-[8rpx]"
          />
          <view v-else class="flex flex-col items-center">
            <text class="mb-[10rpx] text-[40rpx] text-[#ddd]">
              +
            </text>
            <text class="text-[24rpx] text-[#999]">
              {{ cert.name }}
            </text>
            <text v-if="cert.name.includes('身份证') || cert.name.includes('个人生活照')" class="text-[20rpx] text-[#ff4d4f]">
              *
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- 隐私协议 -->
    <view class="mx-[30rpx] mt-[30rpx] flex items-center">
      <wd-checkbox v-model="agreePrivacy" />
      <text class="ml-[10rpx] text-[28rpx] text-[#4facfe]">
        您已阅读并同意入驻协议
      </text>
    </view>

    <!-- 底部按钮 -->
    <view class="fixed bottom-[40rpx] left-[30rpx] right-[30rpx] flex gap-[20rpx]">
      <!-- 重置按钮 -->
      <view
        class="h-[90rpx] flex flex-1 items-center justify-center border border-[#ddd] rounded-[45rpx] bg-white text-[32rpx] text-[#666]"
        @click="resetForm"
      >
        重置
      </view>

      <!-- 提交申请按钮 -->
      <view
        class="h-[90rpx] flex flex-1 items-center justify-center rounded-[45rpx] text-[32rpx] text-white"
        style="background: linear-gradient(106deg, #078af3 0%, #0668eb 100%);"
        @click="submitApplication"
      >
        提交申请
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 使用unocss，无需额外样式
</style>
