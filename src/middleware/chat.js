import router from '@/router'
import { useUserStore } from '../store/modules/user'
import { initIO } from '../hooks/useSocket'

function useRouteMiddleware() {
  const UserStore = useUserStore()
  const pathignore = [ 'login', 'reg' ]
  router.beforeEach((to, from, next) => {
    if (!UserStore.getUserInfo.userId || pathignore.includes(to.name)) {
      next()
      return
    }
    initIO()
    next()
  })
}

export default {
  useRouteMiddleware
}