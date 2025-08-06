<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "精选景点详情"
  }
}
</route>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useMessage, useToast } from 'wot-design-uni'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()

// 景点详情数据
const scenicDetail = ref({
  id: 1,
  title: '我在解放碑｜十二点的钟声盛宴',
  image: '/static/images/scenic-1.jpg',
  publishTime: '2025.6.27 10:00',
  address: '重庆市渝中区解放碑102号',
  content: `
    <p>重庆，简称巴和渝，别称巴渝、山城、渝都、桥都，雾都，是中华人民共和国中央直辖市、国家中心城市、超大城市、世界温泉之都、长江上游地区经济中心、金融中心和创新中心，政治、文化、科技、教育、艺术等中心，国务院定位的国际大都市。中西部水、陆、空型综合交通枢纽。</p>
    <p>重庆因嘉陵江古称“渝水”，故重庆简称“渝”。改渝州为恭州。南宋淳熙16年（1189年）正月，孝宗之子赵惇先封恭王，二月即帝位为宋光宗皇帝，称为“双重喜庆”，遂升恭州为重庆府，重庆由此而得名。</p>
    <p>中华民国政府定重庆为中华民国战时首都和永久陪都，共和国成立初期为西南大区驻地和中央直辖市，1997年6月18日恢复成立中央直辖市后，重庆老工业基地改造振兴步伐加快，形成了电子信息、汽车、装备制造、综合化工、材料、能源和消费品制造等千亿级产业集群，农业农村和金融、商贸物流、服务外包等现代服务业快速发展。</p>
  `,
  isFavorite: false,
})

// 页面加载时获取景点详情
onMounted(() => {
  // 实际项目中应根据路由参数获取ID，然后调用API
  // const options = getCurrentPages().pop().options
  // if (options.id) {
  //   fetchScenicDetail(options.id)
  // }
})

// 收藏/取消收藏
function toggleFavorite() {
  scenicDetail.value.isFavorite = !scenicDetail.value.isFavorite
  if (scenicDetail.value.isFavorite) {
    toast.success('已收藏')
  }
  else {
    toast.success('已取消收藏')
  }
}
</script>

<template>
  <view class="min-h-screen bg-white">
    <wd-navbar
      title="精选景点"
      :placeholder="true"
      :fixed="true"
      left-arrow
      @click-left="back"
    />

    <view class="relative pb-[180rpx]">
      <!-- 封面图片 -->
      <view class="h-[400rpx] w-full">
        <image
          :src="scenicDetail.image"
          mode="aspectFill"
          class="h-full w-full"
        />
      </view>

      <!-- 详情内容区域 -->
      <view class="p-[30rpx]">
        <!-- 标题和信息 -->
        <view class="mb-[40rpx]">
          <view class="mb-[20rpx]">
            <text class="text-[36rpx] text-[#333] font-medium leading-[50rpx]">
              {{ scenicDetail.title }}
            </text>
          </view>
          <view class="space-y-[10rpx]">
            <view class="flex items-center">
              <view class="mr-[10rpx] h-[28rpx] w-[28rpx] flex items-center justify-center rounded-full bg-[#ddd]">
                <text class="text-[18rpx] text-[#999]">
                  🕐
                </text>
              </view>
              <text class="text-[28rpx] text-[#999]">
                编辑时间：{{ scenicDetail.publishTime }}
              </text>
            </view>
            <view class="flex items-center">
              <view class="mr-[10rpx] h-[28rpx] w-[28rpx] flex items-center justify-center rounded-full bg-[#ddd]">
                <text class="text-[18rpx] text-[#999]">
                  📍
                </text>
              </view>
              <text class="text-[28rpx] text-[#999]">
                详细地址：{{ scenicDetail.address }}
              </text>
            </view>
          </view>
        </view>

        <!-- 景点介绍 -->
        <view>
          <view class="mb-[30rpx]">
            <text class="text-[32rpx] text-[#333] font-medium">
              景点介绍
            </text>
          </view>
          <view class="text-[28rpx] text-[#666] leading-[45rpx] space-y-[30rpx]">
            <rich-text :nodes="scenicDetail.content" />
          </view>
        </view>
      </view>
    </view>

    <!-- 底部收藏按钮 -->
    <view class="safe-area-bottom fixed bottom-0 left-0 w-full bg-white px-[30rpx] py-[20rpx]">
      <wd-button
        block
        custom-class="!h-[88rpx] !rounded-[44rpx] !bg-gradient-to-r !from-[#4facfe] !to-[#00f2fe]"
        @click="toggleFavorite"
      >
        {{ scenicDetail.isFavorite ? '已收藏' : '收藏景点' }}
      </wd-button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
