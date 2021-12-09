import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

export const useCheckPathIsMain = () => {
  const route = useRoute()
  const mainNavList = [
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
  
  const isMainPath = ref(true)
  const checkCurrentPathIsMain = currentPath => {
    isMainPath.value = mainNavList.find(nav => nav.path === currentPath)
  }

  watch(() => route.path, checkCurrentPathIsMain, { immediate: true })

  return {
    isMainPath,
    mainNavList
  }
}