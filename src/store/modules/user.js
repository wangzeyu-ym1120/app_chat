import Cookies from 'js-cookie'

const state = {
  token: Cookies.get('token')
}

const getters = {
  getToken: state => state.token
}

const actions = {
  setToken ({ commit }, token) {
    Cookies.set('token', token)
    commit('SET_TOKEN', token)
  }
}

const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}