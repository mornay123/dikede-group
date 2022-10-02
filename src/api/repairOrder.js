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
