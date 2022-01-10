import router from '@/router'
import { useUserStore } from '../store/modules/user'
import customer from '../api/customer'
import datahelper from '../utils/datahelper'

function useRouteMiddleware() {
  const UserStore = useUserStore()
  const pathignore = [ 'login', 'reg' ]
  router.beforeEach((to, from, next) => {
    if (!UserStore.getToken || UserStore.getUserInfo.userId || pathignore.includes(to.name)) {
      next()
      return
    }

    customer.getUserInfo().then(res => {
      if (res.result !== 0) {
        next()
        return
      }
      UserStore.setUserInfo(res.userInfo)
      next()
    }).catch(err => {
      console.error('customer-getUserInfo-catch-errinfo', err)
      next()
    })
  })
}

export default {
  useRouteMiddleware
}