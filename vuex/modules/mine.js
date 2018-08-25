/*
 * @Author: kuangxj 
 * @Email: frankxjkuang@gmail.com 
 * @Date: 2018-04-19 12:14:42 
 * @Last Modified by: kaungxj
 * @Last Modified time: 2018-08-24 22:49:06
 */

const state = {
  user: {}
}

// getters
const getters = {
  user: state => state.user
}

// actions
const actions = {
  setUserInfo({ commit }, flag) {
    commit.commit('SET_USER', flag);
  }
}

// mutations
const mutations = {
  // 设置用户信息
  SET_USER: (state, flag) => {
    state.user = flag;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}