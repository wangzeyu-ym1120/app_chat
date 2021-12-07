import { createRouter, createWebHashHistory } from "vue-router";

export default new createRouter({
  base: process.env.VUE_APP_BASE_PUBLIC_PATH,
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/message'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import( /** */ '../views/login.vue'),
      meta: {}
    },
    {
      path: '/message',
      name: 'message',
      component: () => import( /** */ '../views/messageList.vue'),
      meta: {}
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import( /** */ '../views/contacts.vue'),
      meta: {}
    },
    {
      path: '/personal',
      name: 'personal',
      component: () => import( /** */ '../views/personal.vue'),
      meta: {}
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import( /** */ '../views/chat.vue'),
      meta: {}
    }
  ]
})