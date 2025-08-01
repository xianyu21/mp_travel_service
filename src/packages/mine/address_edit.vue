<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "新建地址"
  }
}
</route>

<script lang="ts" setup>
import { useMessage, useToast } from 'wot-design-uni'
import { useUserStore } from '@/store'
import { back, getCurrentQuery, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()

// 获取路由参数，判断是编辑还是新增
const query = getCurrentQuery()
const isEdit = ref(!!query.id)
const pageTitle = computed(() => isEdit.value ? '编辑地址' : '新建地址')

// 表单数据
const formData = ref({
  id: query.id || '',
  name: '',
  phone: '',
  address: '',
  doorNumber: '',
  isDefault: false,
})

// 如果是编辑模式，加载地址数据
onMounted(() => {
  if (isEdit.value) {
    // 模拟获取地址数据
    // 实际项目中应该从API获取
    formData.value = {
      id: query.id || '',
      name: '冯宝宝',
      phone: '136****2125',
      address: '重庆市 九龙坡区 一城精英国际',
      doorNumber: 'A座3单元801',
      isDefault: false,
    }
  }
})

// 选择详细地址
function selectAddress() {
  // 这里应该调用地址选择组件或页面
  // 示例中仅做演示
  message.alert('选择地址功能需要接入地图API')
}

// 保存地址
function saveAddress() {
  // 表单验证
  if (!formData.value.name) {
    toast.error('请输入名称')
    return
  }
  if (!formData.value.phone) {
    toast.error('请输入联系方式')
    return
  }
  if (!formData.value.address) {
    toast.error('请选择详细地址')
    return
  }

  // 保存地址
  // 实际项目中应该调用API保存
  toast.success('保存成功')
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
      <!-- 名称 -->
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]">
        <text class="text-[32rpx] text-[#333]">
          名称
        </text>
        <input
          v-model="formData.name"
          class="text-right text-[32rpx] text-[#333]"
          placeholder="请输入名称"
          placeholder-class="text-[#999]"
        >
      </view>

      <!-- 联系方式 -->
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]">
        <text class="text-[32rpx] text-[#333]">
          联系方式
        </text>
        <input
          v-model="formData.phone"
          class="text-right text-[32rpx] text-[#333]"
          placeholder="请输入联系方式"
          placeholder-class="text-[#999]"
          type="number"
          maxlength="11"
        >
      </view>

      <!-- 详细地址 -->
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]" @click="selectAddress">
        <text class="text-[32rpx] text-[#333]">
          详细地址
        </text>
        <view class="flex items-center">
          <text v-if="formData.address" class="mr-[10rpx] text-[32rpx] text-[#333]">
            {{ formData.address }}
          </text>
          <text v-else class="mr-[10rpx] text-[32rpx] text-[#999]">
            请选择
          </text>
          <text class="text-[32rpx] text-[#999]">
            >
          </text>
        </view>
      </view>

      <!-- 门牌号 -->
      <view class="flex items-center justify-between py-[30rpx]">
        <text class="text-[32rpx] text-[#333]">
          门牌号
        </text>
        <input
          v-model="formData.doorNumber"
          class="text-right text-[32rpx] text-[#333]"
          placeholder="例：A座3单元801"
          placeholder-class="text-[#999]"
        >
      </view>
    </view>

    <!-- 设为默认地址 -->
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-white p-[30rpx]">
      <view class="flex items-center justify-between">
        <text class="text-[32rpx] text-[#333]">
          设为默认地址
        </text>
        <wd-switch v-model="formData.isDefault" />
      </view>
    </view>

    <!-- 保存按钮 -->
    <view
      class="fixed bottom-[40rpx] left-[30rpx] right-[30rpx] h-[90rpx] flex items-center justify-center rounded-[45rpx] text-[32rpx] text-white"
      style="background: linear-gradient(106deg, #078af3 0%, #0668eb 100%);"
      @click="saveAddress"
    >
      保存地址
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 使用unocss，无需额外样式
</style>
