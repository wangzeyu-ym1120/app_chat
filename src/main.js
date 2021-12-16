import './utils/rem'
import 'normalize.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import middleware from './middleware'

const app = createApp(App)
app.use(router)
app.use(store)
middleware.doUseRouterMiddleware()
app.mount('#app')
