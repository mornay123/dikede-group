import request from '@/utils/request'

/**
 * 搜索策略
 * @param {*} params
 * @returns
 */
export const SearchStrategy = (params) => {
  return request({
    url: '/vm-service/policy/search',
    params
  })
}

/**
 * 新建策略
 * @param {*} data
 * @returns
 */
export const setStrategy = (data) => {
  return request({
    url: '/vm-service/policy',
    method: 'POST',
    data
  })
}

/**
 * 查询售货机策略
 * @param {*} innerCode
 * @returns
 */
export const getStrategyByCode = (innerCode) => {
  return request({
    url: `/vm-service/policy/vmPolicy/${innerCode}`
  })
}

/**
 * 根据策略搜索售货机
 * @param {*} policyId
 * @returns
 */
export const getStrategyByPolicyId = (policyId, params) => {
  return request({
    url: `/vm-service/policy/vmList/${policyId}`,
    params
  })
}

/**
 * 修改策略
 * @param {*} policyId
 * @returns
 */
export const editStrategy = (policyId, data) => {
  return request({
    url: `/vm-service/policy/${policyId}`,
    method: 'PUT',
    data
  })
}
