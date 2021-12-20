<template>
  <div>
    <template v-for="(item, index) in data.userList" :key="index">
      <UserItem :option="item" />
    </template>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import UserItem from '../components/contacts/UserItem.vue'
const data = reactive({
  userList: []
})
import customer from '../api/customer'
customer.queryUserList().then(res => {
  console.log('queryUserList-res', res)
  if (res.result !== 0) return 

  data.userList = res.userList
})
</script>

<style lang="less" scoped>

</style>