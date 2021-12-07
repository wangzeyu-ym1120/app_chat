<template>
  <div>
    <ListItem v-for="(item, index) in messageList" :key="'item' + index" :option="item" />
  </div>
</template>

<script setup>
import ListItem from '../message/ListItem.vue'
const messageList = [{
  headImgUrl: '',
  nickname: '皮卡丘',
  lastMessage: '你获得一条新信息',
  lastMessageTime: '',
  unReadCount: 100
}]

</script>

<style lang="less" scoped>

</style>