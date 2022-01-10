<template>
  <div class="contacts-container">
    <n-list>
      <template v-for="(item, index) in data.userList" :key="index">
        <n-list-item @click="selectItem(item)">
          <template #prefix>
            <div class="head-img">
              <img alt="">
            </div>
          </template>
          {{item.username}}
        </n-list-item>
      </template>
    </n-list>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { NList, NListItem, NImage } from 'naive-ui'
import { useRouter } from 'vue-router'
const router = useRouter()
const data = reactive({
  userList: []
})
import customer from '../api/customer'
customer.queryUserList().then(res => {
  console.log('queryUserList-res', res)
  if (res.result !== 0) return 

  data.userList = res.userList
})
const selectItem = userinfo => {
  const { userId } = userinfo
  router.push({
    path: '/chat',
    query: {id: userId}
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
    flex: 0 0 auto;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgb(157, 199, 212);
    position: relative;
    margin-left: 10px;
  }
}

</style>