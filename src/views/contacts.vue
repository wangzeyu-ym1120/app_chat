<template>
  <div class="contacts-container">
    <n-list>
      <n-list-item v-for="(item, index) in data.userList" :key="`contactItem${index}`" @click="selectItem(item)" >
        <template #prefix>
          <div class="head-img">
            <n-badge v-show="item.unReadCount !== 0" :value="item.unReadCount">
              <n-avatar size="large" :style="{ backgroundColor: Colors[index%ColorsLength], 'border-radius': '5px' }"></n-avatar>
            </n-badge>
          </div>
        </template>
        {{item.username}}
      </n-list-item>
    </n-list>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { NList, NListItem, NThing, NBadge, NAvatar } from 'naive-ui'
import { useRouter } from 'vue-router'
import { Colors } from '../hooks/useColor'

const ColorsLength = Colors.length
const router = useRouter()
const data = reactive({
  userList: []
})
import customer from '../api/customer'
customer.queryUserList().then(res => {
  if (res.result !== 0) return 

  data.userList = res.userList
})

const selectItem = userinfo => {
  const { userId } = userinfo
  router.push({
    path: '/chat',
    query: { id: userId }
  })
}
</script>

<style lang="less" scoped>
.contacts-container {
  ul {
    margin: 0;
    padding: 0;
  }

  .head-img {
    margin-left: 20px;
  }
}

</style>