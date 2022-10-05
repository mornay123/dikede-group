// 封装所有商品管理版块的请求
import request from '@/utils/request'

// 商品数据搜索
export const getAllGoods = (params) => {
  return request({
    url: '/vm-service/skuClass/search',
    method: 'GET',
    params
  })
}

// 新增商品
export const addGoods = (data) => {
  return request({
    url: '/vm-service/skuClass',
    method: 'POST',
    data
  })
}

// 修改商品类型
export const editGoods = (data) => {
  return request({
    url: `/vm-service/skuClass/${data.classId}`,
    method: 'PUT',
    data
  })
}

// 删除商品类型
export const delGoods = (classId) => {
  return request({
    url: `/vm-service/skuClass/${classId}`,
    method: 'DELETE'
  })
}
// ------------------------------------------------
// 商品管理页面的商品搜索
export const manageAllGoods = (params) => {
  return request({
    url: '/vm-service/sku/search',
    method: 'GET',
    params
  })
}

// 新增商品
export const addManageGoods = (data) => {
  return request({
    url: '/vm-service/sku',
    method: 'POST',
    data
  })
}

// 修改商品
export const editManageGoods = (params) => {
  return request({
    url: '/vm-service/sku/search',
    method: 'GET',
    params
  })
}

// 导入文件
export const importGoods = (data) => {
  return request({
    url: '/vm-service/sku/upload',
    method: 'POST',
    data
  })
}
