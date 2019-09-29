import Vue from 'vue'
import Router from 'vue-router'
import Layout from './components/layout/Layout.vue';
import store from './store';

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: () => import('./views/Login1.vue') },
    { path: '/', redirect: '/dashboard' },
    {
      path: '/dashboard',
      component: Layout,
      children: [
        { path: 'version', component: () => import('./components/VersionTable.vue') },
        { path: 'branch', component: () => import('./components/BranchTable.vue') },
        { path: 'user', component: () => import('./components/UserTable.vue') },
        { path: 'about', component: () => import('./views/About.vue') }
      ]
    },
  ]
})
router.beforeEach((to, from, next) => {
  // 如果不是登录页都进行过滤
  if (to.path != '/login') {
   
    const token = store.state.token;
    // 判断当前token无效，返回登录页
    if ('' == token) {
      next({'path':'/login'})
    }else{
      next();
    }
  }else{
    next();
  }
});
export default router;