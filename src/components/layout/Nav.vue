<template>
  <div class="nav-container">
    <div class="nav-item" v-for="(nav, index) in navList" :key="'nav' + index" @click="changeNav(nav.path)">
      <span :class="{'active': nav.path === currentPath}">{{nav.text}}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const props = defineProps({
  navList: Array,
  path: String
})

let currentPath = ref('/')
const changeNav = path => {
  currentPath.value = path
  goPage()
}

watch(() => props.path, () => {
  currentPath.value = props.path
}, { immediate: true })

watch(currentPath, () => {
  const findResult = props.navList.find(item => item.path === currentPath.value)
  if (findResult) {
    window.document.title = findResult.title
  }
}, { immediate: true })

const goPage = () => {
  router.push(currentPath.value)
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