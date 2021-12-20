<template>
  <div class="contact-item" @click="selectItem">
    <div class="head-img">
      <img v-if="option.headImgUrl" :src="option.headImgUrl" alt="">
    </div>

    <div class="nickname">{{option.username}}</div>
  </div>
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
.contact-item {
  height: 110px;
  line-height: 110px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-size: 40px;

  .head-img {
    flex: 0 0 auto;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgb(157, 199, 212);
    position: relative;
  }

  .nickname {
    flex: 1 1 auto;
    width: calc(100%-80px);
    margin-left: 20px;
    border-bottom: 1px solid #eee;
  }
}

</style>

