<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { usePageAuth } from '@/hooks/usePageAuth'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'

usePageAuth()

onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
.bg-base {
  background: #f5f7fa;
  width: 100%;
  min-height: 100vh;
}
.bg-base-index {
  // background: linear-gradient(#4c83f8 10%, #fafafa 20%, #f6f6f6 100%);
  // width: 100%;
  // min-height: 100vh;
  margin: 0;
  min-height: 100vh;
  background:
    linear-gradient(to bottom, transparent 30%, #f4f4f4 0),
    url('./static/images/bg-001.png') top/100% 30% no-repeat;
}
.bg-002 {
  width: 330rpx;
  height: 294rpx;
  background-image: url('./static/images/bg-002.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.bg-003 {
  width: 330rpx;
  height: 294rpx;
  background-image: url('./static/images/bg-003.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.bg-base-news {
  background: linear-gradient(#dceef9 10%, #fafafa 20%, #f6f6f6 100%);
  width: 100%;
  min-height: 100vh;
}

.bg-base-mine {
  background: linear-gradient(#b0e1ff 0%, #fafafa 30%, #f6f6f6 100%);
  width: 100%;
  min-height: 100vh;
}

.text-dot-red {
  position: relative;
}

.text-dot-red::before {
  position: absolute;
  content: '';
  width: 14rpx;
  height: 14rpx;
  display: block;
  background-color: #ff0030;
  border-radius: 100%;
  right: 0;
  top: 6rpx;
  font-size: 80%;
  margin-right: 4upx;
}
.text-required::after {
  content: '*';
  // font-size: 80%;
  color: #ff3d3d;
  margin-left: 4upx;
  font-weight: bolder;
}

.text-price::before {
  content: '¥';
  font-size: 80%;
  margin-right: 2rpx;
}
</style>
