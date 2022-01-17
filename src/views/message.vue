<template>
  <div class="message">
    <n-list>
      <n-list-item v-for="(item, index) in data.msgList" :key="`msgItem${index}`" @click="selectItem(item)" >
        <template #prefix>
          <div class="head-img">
            <n-badge v-show="item.unReadCount !== 0" :value="item.unReadCount">
              <n-avatar size="large" :style="{ backgroundColor: Colors[index%ColorsLength], 'border-radius': '5px' }"></n-avatar>
            </n-badge>
          </div>
        </template>

        <n-thing :title="item.from+''">
          <n-ellipsis style="max-width: 4.22rem;">
            {{item.content}}
          </n-ellipsis>
        </n-thing>

        <template #suffix >
          <div class="time">{{formate(item.create_time)}}</div>
        </template>
      </n-list-item>
    </n-list>
  </div>
</template>

<script setup>
import { reactive } from '@vue/runtime-core'
import { NList, NListItem, NThing, NBadge, NAvatar, NEllipsis } from 'naive-ui'
import { useRouter } from 'vue-router'
import { Colors } from '../hooks/useColor'
import { useWatchChatMsgList } from '../hooks/chatMsg'

const ColorsLength = Colors.length
const router = useRouter()
const data = reactive({
  msgList: []
})

const formate = nS =>{
  return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');
}

useWatchChatMsgList(data, 'msgList')

const selectItem = userinfo => {
  const { from } = userinfo
  router.push({
    path: '/chat',
    query: { id: from }
  })
}
</script>

<style lang="less" scoped>
.message {
  ul {
    margin: 0;
    padding: 0;
  }

  .head-img {
    margin-left: 20px;
  }

  /deep/.n-list-item__suffix {
    margin-right: 20px;
  }
}
</style>