import router from '@/router'
import { loginAPI } from '@/api/login'
import { getUserInfoAPI } from '@/api/user'
// import { getNumberListsAPI } from '@/api/equipments'
import { Message } from 'element-ui'
const state = {
  token: null,
  userInfo: {},
  userId: '',
  hrsaasTime: 0
  // innerList: ''
}
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  // 删除token
  REMOVE_TOKEN(state) {
    state.token = null
  },
  SET_USERID(state, userId) {
    state.userId = userId
  },
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
    // state.userId = userInfo.userId
  },
  REMOVE_USER_INFO(state) {
    state.userInfo = {}
  },
  SET_HRSAASTIME(state, time) {
    state.hrsaasTime = time
  }
  // SET_NUMBER_LIST(state, innerList) {
  //   state.innerList = innerList
  // }
}
const actions = {
  async loginActions({ commit }, data) {
    try {
      const res = await loginAPI(data)

      if (!res.data.success) return Message.error(res.data.msg)
      Message.success(res.data.msg)
      commit('SET_TOKEN', res.data.token)
      commit('SET_USER_INFO', res.data)
      commit('SET_USERID', res.data.userId)
      commit('SET_HRSAASTIME', +new Date())
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  },
  async getUserInfo(context) {
    const res = await getUserInfoAPI(context.state.userId)
    // console.log(res)
    context.commit('SET_USER_INFO', res.data)
  },
  // 售货机编号
  // async getNumberings(context) {
  //   console.log(context.state.userId)
  //   const res = await getNumberListsAPI(context.state.userId)
  //   // console.log(res)
  //   context.commit('SET_NUMBER_LIST', res.data)
  //   console.log(res, '编号')
  // },
  // 登出
  logout({ commit }) {
    commit('REMOVE_TOKEN')
    commit('REMOVE_USER_INFO')
    commit('SET_USERID', '')
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
