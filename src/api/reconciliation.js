import request from '@/utils/request'

// 获取一定日期范围之内的合作商分成汇总数据
export const partnerCollect = (params) => {
  return request({
    url: '/order-service/report/partnerCollect',
    params
  })
}

// 获取一定时间范围之内的分成总数
export const totalBill = (params) => {
  return request({
    url: '/order-service/report/totalBill',
    params
  })
}

// 获取一定时间范围之内的收入
export const orderAmount = (params) => {
  return request({
    url: '/order-service/report/totalBill',
    params
  })
}

// 获取一定时间范围之内的订单总数
export const orderCount = (params) => {
  return request({
    url: '/order-service/report/totalBill',
    params
  })
}
