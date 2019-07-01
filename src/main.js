import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
// import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import { install } from 'vuex';
// import axiosConfig from './config/axios.config';


Vue.config.productionTip = false
// axios 全局配置
// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Vue.prototype.$http = axios

// Vue.use(VueAxios,axios)
Vue.use({install(Vue){
  Vue.prototype.$axios = axios.create({
    // baseURL: 'http://localhost:8000/api/v1/'
  })
}})
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
