import { createRouter, createWebHashHistory } from "vue-router";

export default new createRouter({
  base: process.env.VUE_APP_BASE_PUBLIC_PATH,
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import( /** */ '../components/HelloWorld.vue'),
      meta: {}
    }
  ]
})