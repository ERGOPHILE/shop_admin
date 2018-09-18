import Vue from 'vue'
import Router from 'vue-router'
//导入 Login组件(可以不加.vue)
import Login from '@/components/login/Login'
Vue.use(Router)
export default new Router({
  routed:[{path:'/login',components:Login}]
})

