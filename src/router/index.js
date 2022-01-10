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
      meta: {
        title: '登录'
      }
    },
    {
      path: '/reg',
      name: 'reg',
      component: () => import( /** */ '../views/register.vue'),
      meta: {
        title: '注册'
      }
    },
    {
      path: '/message',
      name: 'message',
      component: () => import( /** */ '../views/message.vue'),
      meta: {
        loginAuth: true
      }
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import( /** */ '../views/contacts.vue'),
      meta: {
        loginAuth: true
      }
    },
    {
      path: '/personal',
      name: 'personal',
      component: () => import( /** */ '../views/personal.vue'),
      meta: {
        loginAuth: true
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import( /** */ '../views/chat.vue'),
      meta: {
        loginAuth: true
      }
    }
  ]
})