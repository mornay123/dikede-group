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
