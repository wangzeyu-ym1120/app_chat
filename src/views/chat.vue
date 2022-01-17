<template>
  <div class="navigation-bar-contianer">
    <n-icon class="icon-back" size="25" @click="back">
      <chevron-back />
    </n-icon>
    <div class="title">{{targetId}}</div>
  </div>

  <div class="chat-content-container" ref="chatBoxRef">
    <template v-for="(item, index) in chatData.msgList" :key="`msg${index}`">
      <n-space class="chat-content" :justify="item.from === currentUserId ? 'end' : 'start'" >{{item.content}}</n-space>
    </template>
  </div>

  <div class="chat-tool-container">
    <n-space class="input-container" justify="space-between">
      <n-input type="text" v-model:value="content" @keyup.enter="submit" />
      <n-button type="success" @click="submit">发送</n-button>
    </n-space>
  </div>
</template>

<script setup>
import { NSpace, NInput, NButton, NIcon } from 'naive-ui'
import { sendMessage } from '../hooks/useSocket'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../store/modules/user'
import { useSocketStore } from '../store/modules/socket'
import customer from '../api/customer'
import { ChevronBack } from '@vicons/ionicons5'

const content = ref('')
const chatBoxRef = ref(null)
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

const scrollToBottom = () => {
  chatBoxRef.value.scrollTop = chatBoxRef.value.scrollHeight
}

watch(() => chatData.msgList, () => {
  scrollToBottom()
},{ deep: true })

onMounted(()=>{
  scrollToBottom()
})

const submit = () => {
  sendMessage({ to: targetId, from: currentUserId, content: content.value })
  content.value = ''
}

const router = useRouter()
const back = () => {
  router.go(-1)
}

</script>

<style lang="less" scoped>
.navigation-bar-contianer {
  height: 8vh;
  line-height: 8vh;
  position: relative;

  .icon-back {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  .title {
    text-align: center;
    font-size: 50px;
  }
}

.chat-content-container {
  height: 72vh;
  font-size: 30px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  overflow: auto;

  .chat-content {
    div {
      max-width: 550px;
      word-break: break-all;
      text-align: right;
    }
  }
}

.chat-tool-container {
  height: 20vh;
  font-size: 30px;
  box-sizing: border-box;

  .input-container {
    padding: 30px;
  }
}
</style>