// 封装所有商品管理版块的请求
import request from '@/utils/request'

// 商品数据导入
export const getAllGoods = (data) => {
  return request({
    url: '/api/vm-service/sku/upload',
    method: 'POST',
    data
  })
}
