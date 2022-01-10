<template>
  <div class="chat-content-container">
    <template v-for="(item, index) in chatData.msgList" :key="`msg${index}`">
      <n-space :justify="item.from === currentUserId ? 'end' : 'start'" >{{item.content}}</n-space>
    </template>
  </div>

  <div class="chat-tool-container">
    <n-space class="input-container" justify="space-between">
      <n-input type="text" v-model:value="content" />

      <n-button type="success" @click="submit">发送</n-button>
    </n-space>
  </div>
</template>

<script setup>
import { NSpace, NInput, NButton } from 'naive-ui'
import { sendMessage } from '../hooks/useSocket'
import { reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../store/modules/user'
import { useSocketStore } from '../store/modules/socket'
import customer from '../api/customer'

const content = ref('')
const chatData = reactive({
  msgList: []
})

const route = useRoute()
const targetId = route.query.id - 0

const UserStore = useUserStore()
const userinfo = UserStore.getUserInfo
const currentUserId = userinfo.userId


const SocketStore = useSocketStore()
watch(() => SocketStore.getChatMsgList, val => {
  const list = val.filter(item => item.from === targetId || item.to === targetId)
  chatData.msgList = list
},{ deep: true, immediate: true })

const submit = () => {
  sendMessage({ to: targetId, from: currentUserId, content: content.value })
}

</script>

<style lang="less" scoped>
.chat-content-container {
  height: 80vh;
  font-size: 30px;
  border: 1px solid #eee;
  box-sizing: border-box;
  overflow: auto;
}

.chat-tool-container {
  height: 20vh;
  font-size: 30px;
  border: 1px solid #eee;
  box-sizing: border-box;

  .input-container {
    padding: 30px;
  }
}
</style>