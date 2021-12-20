<template>
  <div class="list-item" @click="selectItem">
    <div class="head-img">
      <!-- 头像 -->
      <img v-if="option.headImgUrl" :src="option.headImgUrl" alt="">
      <!-- 未读标识 -->
      <div v-if="option.unReadCount" class="unread">{{option.unReadCount}}</div>
    </div>
    <div class="user-info">
      <!-- 昵称 -->
      <div class="nickname">{{option.nickname}}</div>
      <!-- 最新的一条消息 -->
      <div class="new-message">{{option.lastMessage}}</div>
    </div>
  </div>
  <div class="line"></div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  option: Object
})
const selectItem = () => {
  router.push('/chat')
}
</script>

<style lang="less" scoped>
.list-item {
  height: 200px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  .head-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: rgb(157, 199, 212);
    position: relative;
  }

  .unread {
    height: 30px;
    border-radius: 50px;
    background: rgb(218, 43, 43);
    position: absolute;
    right: -5px;
    top: 10px;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    padding: 0 10px;
  }

  .user-info {
    margin-left: 20px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    .nickname {
      font-size: 34px;
      font-weight: bold;
    }

    .new-message {
      font-size: 30px;
      margin-top: 20px;
    }
  }
}

.line {
  height: 1px;
  background: #eee;
  transform: scaleY(0.5);
  margin: 0 40px;
}
</style>