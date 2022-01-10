import { defineStore } from 'pinia'
import user from './modules/user'

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      ...user.state
    }
  },
  getters: () => {
    return {
      ...user.getters
    }
  },
  actions: () => {
    return {
      ...user.actions
    }
  }
})