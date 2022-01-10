import Cookies from 'js-cookie'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      userInfo: {}
    }
  },
  getters: {
    getToken: state => state.token ? state.token : Cookies.get('token'),
    getUserInfo: state => state.userInfo
  },
  actions: {
    setToken (token) {
      Cookies.set('token', token)
      this.token = token
    },
    removeToken() {
      Cookies.remove('token')
      this.token = ''
      this.userInfo = {}
    },
    setUserInfo(userinfo) {
      this.userInfo = userinfo || {}
    }
  }
})
