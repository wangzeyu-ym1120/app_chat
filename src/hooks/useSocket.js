// import io from 'socket.io-client'
import { useSocketStore } from '../store/modules/socket'
import { useUserStore } from '../store/modules/user'
import customer from '../api/customer'

const log = console.log

const getChatMsgList = () => {
  customer.getChatMsgList().then(res => {
    if (res.result !== 0) return
    
    const SocketStore = useSocketStore()
    SocketStore.setChatMsgList(res.chatMsgList)
  })
}

export const initIO = () => {
  if (io.socket) return

  const SocketStore = useSocketStore()
  const UserStore = useUserStore()
  const userId = UserStore.getUserInfo.userId

  
  io.socket = io('ws://10.56.39.57:4000/chat', {
    query: {
      room: 'chat'
    }
  })
  io.socket.on('connect', () => {
    const id = io.socket.id
    console.log('#connect', id)
    getChatMsgList()
    io.socket.on('receiveMsg', data => {
      log('#receiveMsg,', data)
      if (data.from === userId || data.to === userId) {
        SocketStore.setReceiveMsg({ chatMsg: data, isToMe: data.to === userId })
      }
    })
  })
}

export const sendMessage = ({ from, to, content }) => {
  io.socket.emit('sendMsg', { from, to, content })     
}

