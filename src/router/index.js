import Vue from 'vue'
import Router from 'vue-router'

// 导入Login 组件（注意，不要添加 .vue 后缀）
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})
// 导航卫兵 主要用于通过重定向或取消导航来保护导航
// 方法router.beforeEach((to,from,nex)=>{})
// 每个守卫功能都有三个参数：
// to: Route：导航到的目标Route对象。
// from: Route：当前路线被导航离开。
// next: Function：必须调用此函数来解析钩子。该操作取决于提供给的参数next：
// next() ：继续前进到管道中的下一个钩子。如果没有留下挂钩，则确认导航。
// next(false) ：中止当前导航。如果浏览器URL已更改（由用户手动或通过后退按钮），则会将其重置为from路径的URL 。
// next('/')或next({ path: '/' }) ：重定向到其他位置。当前导航将中止，并将启动一个新导航。你可以通过任何位置对象next，它允许您指定类似的选项replace: true，name: 'home'在使用任何选项router - link的to道具或router.push
// next(error) ：（2.4.0 +）如果传递给的参数next是一个实例Error，导航将被中止，错误将传递给通过注册的回调router.onError() 。
// 确保始终调用该next函数，否则永远不会解析挂钩。
router.beforeEach((to, from, nex) => {
  console.log(to)
})
export default router