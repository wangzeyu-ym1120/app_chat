import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

export const mainNavList = [
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

export const useCheckPathIsMain = () => {
  const route = useRoute()
  const isMainPath = ref(true)
  const navPath = ref('/')
  const checkCurrentPathIsMain = currentPath => {
    const findResult = mainNavList.find(nav => nav.path === currentPath)
    isMainPath.value = findResult ? true : false
    navPath.value = isMainPath.value ? findResult.path : '/'
  }

  watch(() => route.path, checkCurrentPathIsMain, { immediate: true })

  return {
    navPath,
    isMainPath
  }
}