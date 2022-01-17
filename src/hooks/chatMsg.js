import { watch } from '@vue/runtime-core'
import { useSocketStore } from '../store/modules/socket'
import { useUserStore } from '../store/modules/user'

export const useWatchChatMsgList = (data, prop) => {
  const UserStore = useUserStore()
  const userinfo = UserStore.getUserInfo
  const currentUserId = userinfo.userId
  const SocketStore = useSocketStore()
  
  watch(() => SocketStore.getChatMsgList, val => {
    const lastMsgObjs = {}
    for(let item of val) {
      const msg = { ...item }
      if (msg.from === currentUserId) {
        [ msg.from, msg.to ] = [ msg.to, msg.from ]
      }
      msg.unReadCount = 0
      if (!msg.is_read) {
        msg.unReadCount = 1
      }
      const chatId = msg.chat_id
      const lastMsg = lastMsgObjs[chatId]
      if (!lastMsg) {
        lastMsgObjs[chatId] = msg
        continue
      }
      const unReadCount = lastMsg.unReadCount + msg.unReadCount
      if (msg.create_time > lastMsg.create_time) {
        lastMsgObjs[chatId] = msg
      }
      lastMsgObjs[chatId].unReadCount = unReadCount
    }
    const lastMsgs = Object.values(lastMsgObjs)
    lastMsgs.sort(function (msg1, msg2) {
      return msg2.create_time - msg1.create_time
    })
    data[prop] = lastMsgs
  },{ deep: true, immediate: true })
}