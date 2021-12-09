<template>
  <AppProvider>
    <router-view></router-view>
  </AppProvider>

  <Nav class="footer" v-if="isMainPath" :navList="mainNavList" ></Nav>
</template>

<script setup>
import Nav from './components/layout/Nav.vue'
import AppProvider from './components/layout/AppProvider.vue'
import { useCheckPathIsMain } from './hooks/routerPath'

const { isMainPath, mainNavList } = useCheckPathIsMain()

</script>

<style>
.footer {
  position: fixed;
  bottom: 0;
  z-index: 100;
}
</style>
