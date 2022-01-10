<template>
  <div class="message">
    <n-list>
      <n-list-item v-for="(item, index) in data.msgList" :key="`msgItem${index}`" @click="selectItem(item)" >
        <template #prefix>
          <div class="head-img">
            <n-badge v-show="item.unReadCount !== 0" :value="item.unReadCount">
              <n-avatar size="large">{{item.from}}</n-avatar>
            </n-badge>
          </div>
        </template>

        <n-thing :title="item.from">
          {{item.content}}
        </n-thing>

        <template #suffix>
          <div class=""></div>
        </template>
      </n-list-item>
    </n-list>
  </div>
</template>

<script setup>
import List from '../components/message/List.vue'
import customer from '../api/customer'
import { initIO } from '../hooks/useSocket.js'
import { onMounted, reactive, watch } from '@vue/runtime-core'
import { NList, NListItem, NThing, NBadge, NAvatar } from 'naive-ui'
import { useSocketStore } from '../store/modules/socket'
import { useUserStore } from '../store/modules/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const data = reactive({
  msgList: []
})
const UserStore = useUserStore()
const userinfo = UserStore.getUserInfo
const currentUserId = userinfo.userId
const SocketStore = useSocketStore()
watch(() => SocketStore.getChatMsgList, val => {
  let list = val.filter(item => item.to === currentUserId)
  const lastMsgObjs = {}
  for(let item of list) {
    const msg = { ...item }
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
  data.msgList = lastMsgs
},{ deep: true, immediate: true })

const selectItem = userinfo => {
  const { from } = userinfo
  router.push({
    path: '/chat',
    query: {id: from}
  })
}
</script>

<style lang="less" scoped>
.message {
  font-size: 30px;

  ul {
    margin: 0;
    padding: 0;
  }

  .head-img {
    margin-left: 20px;
  }
}
</style>