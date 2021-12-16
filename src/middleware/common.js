import router from '@/router'
import datahelper from '@/utils/datahelper'
import store from '../store'

function useRouteMiddleware() {
  router.beforeEach((to, from, next) => {
    if (datahelper.getValue(to, 'to.meta.loginAuth') && !store.getters.getToken) {
      next({
        path: '/login',
        replace: true
      })
      return
    }
    next()
  })
  router.afterEach((to, from) => {
    if (datahelper.getValue(to, 'to.meta.title')) {
      window.document.title = to.meta.title
    }
  })
}

export default {
  useRouteMiddleware
}