import { http } from '@/http/http'
// 接单端
// 获取验证码
export function getSendSms(data) {
  return http.post('/message/sendSms', data)
}
// 获取广告 广告类型 1首页封面 2首页中间宣传  3旅接封面  4入驻协议  5用户协议 6下单须知 7订单发布须知 8我的-推广文案 9公司简介 10隐私政策 11优惠券使用规则
export function getByType(data) {
  return http.post('/advert/getByType', data)
}
// 地址管理
export function getMyAddr(data) {
  return http.post('/receive/addr/myAddr', data)
}
// 地址添加
export function getAddAddr(data) {
  return http.post('/receive/addr/addAddr', data)
}
// 地址编辑
export function getUpdateAddr(data) {
  return http.post('/receive/addr/updateAddr', data)
}
// 地址详情
export function getAddrDetail(data) {
  return http.post('/receive/addr/detail', data)
}
// 地址删除
export function getRemoveAddr(data) {
  return http.post('/receive/addr/removeAddr', data)
}
// 我的默认地址
export function getMyDefaltAddr(data) {
  return http.post('/receive/addr/myDefaltAddr', data)
}
// 设置地址默认
export function getSetDefault(data) {
  return http.post('/receive/addr/setDefault', data)
}
// 系统通知列表
export function getSystemMsgPage(data) {
  return http.post('/receive/receive/notice/mySystemNotice', data)
}
// 订单服务通知列表
export function getOrderMsgPage(data) {
  return http.post('/receive/notice/myOrderNotice', data)
}
// 更改通知为已读 跳转列表或者详情前调用
export function getReadSystemNotice(data) {
  return http.post('/receive/notice/readSystemNotice', data)
}
export function getReadOrderNotice(data) {
  return http.post('/receive/notice/readOrderNotice', data)
}
// 一键已读
export function getReadAllSystemNotice() {
  return http.post('/receive/notice/readAllSystemNotice')
}
export function getReadAllOrderNotice() {
  return http.post('/receive/notice/readAllOrderNotice')
}
// 佣金明细
export function getBalanceDetails() {
  return http.post('/receive/currentUser/balanceDetails')
}
// 提现申请
export function getDrawApply(data) {
  return http.post('/receive/currentUser/drawApply', data)
}
// 独有
// 完善入驻信息
export function updateBaseInfo(data) {
  return http.post('/receive/receiveUser/updateBaseInfo', data)
}
// 上线 receive/receiveUser/online
export function onlineReceiveUser() {
  return http.post('/receive/receiveUser/online')
}

// 下线 receive/receiveUser/offline
export function offlineReceiveUser() {
  return http.post('/receive/receiveUser/offline')
}
