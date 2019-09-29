import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 定义登录返回的token
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    // user: localStorage.getItem('user') ? localStorage.getItem('user'):'',
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): {},
  },
  getters:{
    getUser: state =>{

    }
  },
  mutations: {
    // 在登录成功之后设置token
    setToken(state, responseToken) {
      state.token = responseToken;
      // 写入缓存
      localStorage.setItem('token', responseToken)
    },
    setUser(state,loginUser){
      // 设置token
      state.token = loginUser.token;
      // 写入缓存
      localStorage.setItem('token', loginUser.token)
      let localUser = JSON.stringify(loginUser)
      state.user = loginUser
      localStorage.setItem('user',localUser)
    },
    // 注销或者token失效时移除token
    removeUser(state) {
      state.token = ''
      state.user = {}
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },
  actions: {

  }
})
