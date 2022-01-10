<template>
  <div :class="{'isMain': isMainPath}">
    <AppProvider>
      <router-view></router-view>
    </AppProvider>
  </div>
  
  <Nav class="footer" v-if="isMainPath" :navList="mainNavList" :path="navPath" />
</template>

<script setup>
import Nav from './components/layout/Nav.vue'
import AppProvider from './components/layout/AppProvider.vue'
import { useCheckPathIsMain, mainNavList } from './hooks/routerPath'

const { navPath, isMainPath } = useCheckPathIsMain()

</script>

<style>
.isMain {
  height: calc(100vh - 90px);
  overflow: auto;
}
.footer {
  position: fixed;
  bottom: 0;
  z-index: 100;
}
</style>
