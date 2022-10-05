import request from '@/utils/request'

/**
 * 订单搜索
 * @param {*} params
 * @returns
 */
export const searchOrder = (params) => {
  return request({
    url: '/order-service/order/search',
    params
  })
}
