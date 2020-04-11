import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import VueMobileDetection from 'vue-mobile-detection'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/app.css'

Vue.prototype.$http = Axios
Vue.config.productionTip = false
Vue.use(VueMobileDetection)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
