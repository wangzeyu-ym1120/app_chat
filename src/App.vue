<template>
  <router-view></router-view>
  <Footer class="footer" v-if="isMainPath" :navList="navList" ></Footer>
</template>

<script setup>
import { reactive, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import Footer from './components/Footer.vue'

const route = useRoute() 
const navList = [
  {
    path: '/message',
    title: '消息',
    icon: '',
    text: '消息'
  },
  {
    path: '/contacts',
    title: '联系人',
    icon: '',
    text: '联系人'
  },
  {
    path: '/personal',
    title: '我',
    icon: '',
    text: '我'
  }
]

let isMainPath = ref(true)

const checkCurrentPathIsMain = () => {
  const currentPath = route.path
  return navList.find(nav => nav.path === currentPath)
}

watchEffect(() => {
  isMainPath.value = checkCurrentPathIsMain()
})

</script>

<style>
.footer {
  position: fixed;
  bottom: 0;
  z-index: 100;
}
</style>
