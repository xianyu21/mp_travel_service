``` vue
<template>
  <view class="avatar-upload">
    <view class="avatar-container" @click="uploadAvatar">
      <image 
        v-if="avatarUrl" 
        :src="avatarUrl" 
        mode="aspectFill" 
        class="avatar-image" 
      />
      <view v-else class="avatar-placeholder">
        <text class="upload-icon">+</text>
        <text class="upload-text">上传头像</text>
      </view>
    </view>
    
    <view v-if="loading" class="loading-text">上传中...</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useUpload from '@/hooks/useUpload'

const avatarUrl = ref('')

const { loading, run } = useUpload<'image'>({
  fileType: 'image',
  accept: ['png', 'jpg', 'jpeg'],
  maxSize: 2 * 1024 * 1024, // 2MB
  formData: {
    type: 'avatar',
    compress: true
  },
  success: (res) => {
    avatarUrl.value = res.url
    // 更新用户信息
    updateUserProfile({ avatarUrl: res.url })
  },
  error: (err) => {
    uni.showToast({ title: '头像上传失败', icon: 'none' })
  }
})

const uploadAvatar = () => {
  run()
}

// 模拟更新用户信息的函数
function updateUserProfile(data: { avatarUrl: string }) {
  console.log('更新用户头像:', data)
  uni.showToast({ title: '头像更新成功', icon: 'success' })
}
</script>

```