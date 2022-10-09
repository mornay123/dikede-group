import request from '@/utils/request'
/**
 * 人员列表
 * @param {*} pageIndex
 * @param {*} pageSize
 * @param {*} userName
 * @param {*} roleId
 * @param {*} isRepair 是否是运维人员
 * @returns
 */
export const getuserSearch = (pageIndex, pageSize, userName, roleId, isRepair) => {
  return request({
    url: `/user-service/user/search`,
    method: 'get',
    params: {
      pageIndex, pageSize, userName, roleId, isRepair
    }
  })
}
// 人员工作量列表
export const getuserWorkList = (params) => {
  return request({
    url: `/user-service/user/searchUserWork`,
    method: 'get',
    params
  })
}
// 修改人员
export const updatePerson = (data) => {
  return request({
    url: `/user-service/user/${data.id}`,
    method: 'PUT',
    data
  })
}
// 新增人员
export const addPerson = (data) => {
  return request({
    url: `/user-service/user`,
    method: 'POST',
    data
  })
}
// 删除人员
export const delPerson = (id) => {
  return request({
    url: `/user-service/user/${id}`,
    method: 'DELETE'
  })
}
// 获取角色列表
export const getRoleList = () => {
  return request({
    url: `/user-service/role`,
    method: 'GET'
  })
}
// 获取地域列表
export const getRegionList = () => {
  return request({
    url: `/vm-service/region/search`,
    method: 'GET',
    params: { pageIndex: '1', pageSize: '100000' }
  })
}

// 人效统计
/**
 * 人员排名
 * @param {*} start
 * @param {*} end
 * @param {*} isRepair
 * @param {*} regionId
 * @returns
 */
export const getRankData = (start, end) => {
  return request({
    url: `/task-service/task/taskReportInfo/${start}/${end}`,
    method: 'GET'
  })
}
// 工单状态切换周月年
export const efficiencyStatus = (start, end) => {
  return request({
    url: `/task-service/task/collectReport/${start}/${end}`,
    method: 'GET'
  })
}
// 人效排名月度
export const efficiencyRank = (start, end, isRepair, regionId) => {
  return request({
    url: `/task-service/task/userWorkTop10/${start}/${end}/${isRepair}/${regionId}`,
    method: 'GET'
  })
}
// 查看详情--工单完成情况
export const getDetail = (userId, start, end) => {
  return request({
    url: `/task-service/task/userWork`,
    method: 'GET',
    params: {
      userId, start, end
    }
  })
}
// 查看详情--个人基本信息
export const getPersonMsg = (id) => {
  return request({
    url: `/user-service/user/${id}`,
    method: 'get'
  })
}
