<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "银行卡"
  }
}
</route>

<script lang="ts" setup>
import { useMessage, useToast } from 'wot-design-uni'
// import {  } from '@/api/index'
import { useUserStore } from '@/store'
import { back, getCurrentQuery, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()

// 获取路由参数，判断是编辑还是新增
const query = getCurrentQuery()
const isEdit = ref(!!query.id)
const pageTitle = computed(() => isEdit.value ? '编辑银行卡' : '银行卡')

// 表单数据
const formData = ref({
  id: query.id || '',
  name: '',
  idCard: '',
  bankName: '',
  bankCard: '',
})

// 如果是编辑模式，加载银行卡数据
onMounted(() => {
  if (isEdit.value) {
    // 模拟获取银行卡数据
    // 实际项目中应该从API获取
    formData.value = {
      id: query.id || '',
      name: '冯宝宝',
      idCard: '500104199710253541',
      bankName: '中国工商银行',
      bankCard: '6105104199710253541',
    }
  }
})

// 选择银行
function selectBank() {
  // 这里应该调用银行选择组件或页面
  // 示例中仅做演示
  message.alert('选择银行功能需要接入银行列表')
}

// 重置表单
function resetForm() {
  formData.value = {
    id: query.id || '',
    name: '',
    idCard: '',
    bankName: '',
    bankCard: '',
  }
  toast.success('重置成功')
}

// 确认添加/保存
function confirmSave() {
  // 表单验证
  if (!formData.value.name) {
    toast.error('请输入姓名')
    return
  }
  if (!formData.value.idCard) {
    toast.error('请输入身份证号码')
    return
  }
  if (!formData.value.bankName) {
    toast.error('请选择银行名称')
    return
  }
  if (!formData.value.bankCard) {
    toast.error('请输入银行卡号')
    return
  }

  // 保存银行卡
  // 实际项目中应该调用API保存
  const action = isEdit.value ? '保存' : '添加'
  toast.success(`${action}成功`)
  setTimeout(() => {
    back()
  }, 1500)
}
</script>

<template>
  <view class="min-h-screen bg-[#f5f5f5]">
    <wd-navbar
      :title="pageTitle"
      custom-style="background-color: transparent !important;"
      left-arrow
      :placeholder="true"
      :fixed="false"
      :bordered="false"
      :safe-area-inset-top="true"
      @click-left="back"
    />

    <!-- 表单区域 -->
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-white p-[30rpx]">
      <!-- 姓名 -->
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]">
        <text class="text-[32rpx] text-[#333]">
          姓名
        </text>
        <input
          v-model="formData.name"
          class="text-right text-[32rpx] text-[#333]"
          placeholder="请输入姓名"
          placeholder-class="text-[#999]"
        >
      </view>

      <!-- 身份证号码 -->
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]">
        <text class="text-[32rpx] text-[#333]">
          身份证号码
        </text>
        <input
          v-model="formData.idCard"
          class="text-right text-[32rpx] text-[#333]"
          placeholder="请输入身份证号码"
          placeholder-class="text-[#999]"
          maxlength="18"
        >
      </view>

      <!-- 银行名称 -->
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]" @click="selectBank">
        <text class="text-[32rpx] text-[#333]">
          银行名称
        </text>
        <view class="flex items-center">
          <text v-if="formData.bankName" class="mr-[10rpx] text-[32rpx] text-[#333]">
            {{ formData.bankName }}
          </text>
          <text v-else class="mr-[10rpx] text-[32rpx] text-[#999]">
            请选择银行
          </text>
          <text class="text-[32rpx] text-[#999]">
            >
          </text>
        </view>
      </view>

      <!-- 银行卡号 -->
      <view class="flex items-center justify-between py-[30rpx]">
        <text class="text-[32rpx] text-[#333]">
          银行卡号
        </text>
        <view class="flex items-center">
          <input
            v-model="formData.bankCard"
            class="text-right text-[32rpx] text-[#333]"
            placeholder="请输入银行卡号"
            placeholder-class="text-[#999]"
            type="number"
            maxlength="19"
          >
          <image
            src=""
            mode="scaleToFill"
            class="ml-[10rpx] h-[40rpx] w-[40rpx] bg-[#eaeaea]"
          />
        </view>
      </view>
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

      <!-- 确认添加按钮 -->
      <view
        class="h-[90rpx] flex flex-1 items-center justify-center rounded-[45rpx] text-[32rpx] text-white"
        style="background: linear-gradient(106deg, #078af3 0%, #0668eb 100%);"
        @click="confirmSave"
      >
        确认添加
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 使用unocss，无需额外样式
</style>
