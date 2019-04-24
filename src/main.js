import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './styles.scss'
import GlobalErrorHandler from './plugins/GlobalErrorHandler'

Vue.use(ElementUI)
Vue.use(GlobalErrorHandler, {
  router: router,
  store: store
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
