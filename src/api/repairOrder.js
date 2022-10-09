import request from '@/utils/request'

/**
 * 获取工单状态列表
 * @returns
 */
export const getRepairOrderStatusList = () => {
  return request({
    url: '/task-service/task/allTaskStatus'
  })
}

/**
 *工单管理搜索列表
 * @param {object} params
 * @returns
 */
export const repairOrderSearchList = (params) => {
  return request({
    url: '/task-service/task/search',
    params
  })
}

/**
 * 获取补货预警值
 * @returns
 */
export const getWarningValue = () => {
  return request({
    url: '/task-service/task/supplyAlertValue'
  })
}

/**
 * 设置自动补货工单阈值
 * @param {*} alertValue 预警值(百分比，如50代表，满量的百分之50为补货预警值)
 * @returns
 */
export const setWarningValue = (alertValue) => {
  return request({
    url: '/task-service/task/autoSupplyConfig',
    method: 'POST',
    data: { alertValue }
  })
}

/**
 * 根据设备编号获取运营人员列表
 * @param {*} innerCode 设备编号
 * @returns
 */
export const getOperatorList = (innerCode) => {
  return request({
    url: `/user-service/user/operatorList/${innerCode}`
  })
}

/**
 * 获取补货详情列表
 * @param {*} innerCode
 * @returns
 */
export const getBuHuoDetailList = (innerCode) => {
  return request({
    url: `vm-service/channel/channelList/${innerCode}`
  })
}

/**
 * 获取所有工单类型
 * @returns
 */
export const getAllOrderType = () => {
  return request({
    url: '/task-service/taskType/list'
  })
}

/**
 * 获取维修人员列表
 * @param {*} innerCode 设备编号
 * @returns
 */
export const getRepairerList = (innerCode) => {
  return request({
    url: `/user-service/user/repairerList/${innerCode}`
  })
}

/**
 * 创建工单
 * @returns
 */
export const createOrder = (data) => {
  return request({
    url: '/task-service/task/create',
    method: 'POST',
    data
  })
}

/**
 * 取消工单
 * @returns
 */
export const delOrder = (taskId, data) => {
  return request({
    url: `/task-service/task/cancel/${taskId}`,
    method: 'POST',
    data
  })
}

/**
 * 补货详情
 * @param {*} innerCode
 * @returns
 */
export const searchBuHuoDetail = (taskId) => {
  return request({
    url: `task-service/taskDetails/${taskId}`
  })
}
