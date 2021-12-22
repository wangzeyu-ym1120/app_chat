<template>
  <div class="message">
    <List />
  </div>
</template>

<script setup>
import List from '../components/message/List.vue'
import customer from '../api/customer'
import { useStore } from 'vuex'

const Store = useStore()

customer.getUserInfo().then(res => {
  if (res.result !== 0) return
})

</script>

<style lang="less" scoped>
.message {
  font-size: 50px;
}
</style>