import Cookies from 'js-cookie'
import { defineStore } from 'pinia'

export const useSocketStore = defineStore('socket', {
  state: () => {
    return {
      chatMsgList: [],
      receive_msg_list: [],
      receive_msg: {},
    }
  },
  getters: {
    getChatMsgList: state => state.chatMsgList
  },
  actions: {
    setReceiveMsg({ chatMsg }) {
      this.chatMsgList = [ ...this.chatMsgList, chatMsg ]
    },
    setChatMsgList(chatMsgList) {
      this.chatMsgList = [ ...chatMsgList ]
    }
  }
})