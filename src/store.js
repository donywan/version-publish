import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 定义登录返回的token
    token : '',
  },
  mutations: {
    // 在登录成功之后设置token
    setToken(state,responseToken){
      state.token = responseToken;
    },
    // 注销或者token失效时移除token
    removeToken(state){
      state.token = '';
    }
  },
  actions: {

  }
})
