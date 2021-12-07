<template>
  <div class="nav-container">
    <div class="nav-item" v-for="(nav, index) in navList" :key="'nav' + index" @click="changeNav(index)">
      <span :class="{'active': index === currentIndex}">{{nav.text}}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const props = defineProps({
  navList: Array
})

let currentIndex = ref(0)
const changeNav = index => {
  currentIndex.value = index
  goPage()
}
  
watchEffect(() => {
  window.document.title = props.navList[currentIndex.value].title
})

const goPage = () => {
  router.push(props.navList[currentIndex.value].path)
}
</script>

<style lang="less" scoped>
.nav-container {
  width: 100%;
  height: 90px;
  line-height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -1px 5px #EEE;

  .nav-item {
    width: 30%;
    text-align: center;
    font-size: 20px;

    .active {
      color: #E6A23C;
    }
  }
}

</style>