import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import UButton from '@/components/UButton'

Vue.component('u-button', UButton)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
