<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "文章详情"
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

// 获取文章ID参数
const { query } = getCurrentPages()[getCurrentPages().length - 1].options || {}
const articleId = query?.id || '1'

// 文章详情数据
const articleDetail = ref({
  id: articleId,
  title: '我在解放碑｜洪崖洞景区密十八梯',
  coverImage: '/static/images/article-cover.jpg',
  publishTime: '2025.6.27 10:00',
  content: `
    <h2>攻略介绍</h2>
    <p>重庆，简称巴和渝，别称巴渝、山城、渝都、桥都、雾都，是中华人民共和国中央直辖市、国家中心城市、超大城市、世界温泉之都、长江上游地区经济中心、金融中心和创新中心、政治、文化、科技、教育、艺术等中心，国务院定位的国际大都市、中西部地区、综合交通枢纽。</p>
    
    <p>重庆因嘉陵江古称"渝水"，故重庆简称"渝"。改渝州为恭州。南宋淳熙16年（1189年）正月，孝宗之子赵惇先封恭王，二月即帝位为光宗皇帝，称为"双重喜庆"，遂升恭州为重庆府，重庆由此而名。</p>
    
    <p>中华民国政府定重庆为中华民国战时首都和永久陪都，共和国成立初期为西南大区驻地和中央直辖市，1997年6月18日恢复成立中央直辖市后，重庆实业基地改造振兴步伐加快，形成了电子信息、汽车、装备制造、综合化工、材料、能源和消费品制造等千亿级产业集群，农业农村和金融、商贸物流、服务外包等现代服务业快速发展。</p>
  `,
  images: [
    '/static/images/article-1.jpg',
    '/static/images/article-2.jpg',
  ],
})

// 页面加载时获取文章详情
onMounted(() => {
  // 实际项目中应该根据articleId调用API获取文章详情
  console.log('加载文章详情:', articleId)
})
</script>

<template>
  <view class="min-h-screen bg-[#f5f5f5]">
    <wd-navbar
      title="文章详情"
      custom-style="background-color: white !important;"
      left-arrow
      :placeholder="true"
      :fixed="true"
      :bordered="true"
      :safe-area-inset-top="true"
      @click-left="back"
    />

    <!-- 文章内容 -->
    <view class="px-[30rpx] pt-[20rpx]">
      <!-- 封面图片 -->
      <view class="mb-[30rpx] overflow-hidden rounded-[20rpx]">
        <image
          :src="articleDetail.coverImage"
          mode="aspectFill"
          class="h-[400rpx] w-full"
        />
      </view>

      <!-- 文章标题 -->
      <view class="mb-[20rpx]">
        <text class="text-[36rpx] text-[#333] font-medium leading-[50rpx]">
          {{ articleDetail.title }}
        </text>
      </view>

      <!-- 发布时间 -->
      <view class="mb-[40rpx] flex items-center">
        <view class="mr-[10rpx] h-[28rpx] w-[28rpx] flex items-center justify-center rounded-full bg-[#ddd]">
          <text class="text-[18rpx] text-[#999]">
            🕐
          </text>
        </view>
        <text class="text-[28rpx] text-[#999]">
          编辑时间：{{ articleDetail.publishTime }}
        </text>
      </view>

      <!-- 文章正文 -->
      <view class="rounded-[20rpx] bg-white p-[30rpx]">
        <!-- 攻略介绍标题 -->
        <view class="mb-[30rpx]">
          <text class="text-[32rpx] text-[#333] font-medium">
            攻略介绍
          </text>
        </view>

        <!-- 文章内容 -->
        <view class="space-y-[30rpx]">
          <text class="block text-[28rpx] text-[#666] leading-[40rpx]">
            重庆，简称巴和渝，别称巴渝、山城、渝都、桥都、雾都，是中华人民共和国中央直辖市、国家中心城市、超大城市、世界温泉之都、长江上游地区经济中心、金融中心和创新中心、政治、文化、科技、教育、艺术等中心，国务院定位的国际大都市、中西部地区、综合交通枢纽。
          </text>

          <text class="block text-[28rpx] text-[#666] leading-[40rpx]">
            重庆因嘉陵江古称"渝水"，故重庆简称"渝"。改渝州为恭州。南宋淳熙16年（1189年）正月，孝宗之子赵惇先封恭王，二月即帝位为光宗皇帝，称为"双重喜庆"，遂升恭州为重庆府，重庆由此而名。
          </text>

          <text class="block text-[28rpx] text-[#666] leading-[40rpx]">
            中华民国政府定重庆为中华民国战时首都和永久陪都，共和国成立初期为西南大区驻地和中央直辖市，1997年6月18日恢复成立中央直辖市后，重庆实业基地改造振兴步伐加快，形成了电子信息、汽车、装备制造、综合化工、材料、能源和消费品制造等千亿级产业集群，农业农村和金融、商贸物流、服务外包等现代服务业快速发展。
          </text>
        </view>

        <!-- 文章配图 -->
        <view class="mt-[40rpx]">
          <view
            v-for="(image, index) in articleDetail.images"
            :key="index"
            class="mb-[20rpx] overflow-hidden rounded-[15rpx]"
          >
            <image
              :src="image"
              mode="aspectFill"
              class="h-[300rpx] w-full"
            />
          </view>
        </view>
      </view>

      <!-- 底部间距 -->
      <view class="h-[40rpx]" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 使用unocss，无需额外样式
</style>
