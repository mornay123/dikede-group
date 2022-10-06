import request from '@/utils/request'
// 现在时间
import dayjs from 'dayjs'
const endTime = dayjs(new Date()).format('YYYY-MM-DD')
const end = dayjs(new Date()).format('YYYY-MM-DD+HH:mm:ss')
console.log(endTime, end)
/**
 * 获取售货机列表
 * @param {*} innerCode
 */
export const getEquipmentsAPI = (params) => {
  return request({
    url: `/vm-service/vm/search`,
    params
  })
}
/**
 *新增售货机
 * @param {integer} vmType // 售货机类型Id
 * @param {string} nodeId // 所属点位Id
 * @param {integer} createUserId // 创建人Id
 * @returns
 */
export const addEquipmentAPI = (data) => {
  return request({
    url: `/vm-service/vm`,
    method: 'Post',
    data
  })
}
/**
 * 修改点位
 * @param {*} innerCode
 * @returns
 */
export const getmodifyThePointPositionAPI = ({ id, nodeId }) => {
  return request({
    url: `/vm-service/vm/${id}/${nodeId}`,
    method: 'PUT'

  })
}

/**
 * 获取售货机列表
 * @param {*} innerCode
 */
export const getEquipments = (params) => {
  return request({
    url: `/vm-service/vm/search`,
    params
  })
}
// 所有商品
export const getEdit = (id) => {
  return request(`/order-service/report/skuCollect/${id}/2022-10-01/${endTime}`)
}
// 获取老的
export const getOrderAmount = (id) => {
  return request(`/order-service/report/orderAmount?start=2022-10-01+00:00:00&end=${end}&innerCode=${id}`)
}
// 销量 655
export const getOrderCount = (id) => {
  return request(`/order-service/report/orderCount?start=2022-10-01+00:00:00&end=${end}&innerCode=${id}`)
}
// 批量策略 几折
export const getActivityList = () => {
  return request(`/vm-service/policy`)
}
/**
 * 修改几折
 * @param {*} data
 * @returns
 */
export const reviseActivity = (data) => {
  return request({
    url: `/vm-service/vm/applyPolicy`,
    method: 'PUT',
    data
  })
}
/**
 * 查询售货机策略
 * @param {*} innerCode
 * @returns
 */
export const inquireAboutDiscounts = (innerCode) => {
  return request(`vm-service/policy/vmPolicy/${innerCode}`)
}
/**
 * 取消策略
 * @param {*} innerCode // 售货机编号
 * @param {*} policyId  //策略Id
 * @returns
 */
export const removeEquipmentAPI = (innerCode, policyId) => {
  return request({
    url: `vm-service/vm/cancelPolicy/${innerCode}/${policyId}`,
    method: 'PUT'

  })
}

export const getMachineTypeAPI = (params) => {
  return request({
    url: `/vm-service/vmType/search`,
    params
  })
}
