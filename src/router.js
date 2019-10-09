import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import xiongdizujianchuanzhi1 from './components/xiongdizujianchuanzhi1.vue'
import xiongdizujianchuanzhi from './components/xiongdizujianchuanzhi.vue'
import xiongdizujianchuanzhi2 from './components/xiongdizujianchuanzhi2.vue'
import shoufengqin from './page/shoufengqin.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/shoufengqin',component: shoufengqin},
    {path: '/xiongdizujianchuanzhi',component: xiongdizujianchuanzhi},
    {path: '/',component: xiongdizujianchuanzhi},
    {path: '/xiongdizujianchuanzhi1',component: xiongdizujianchuanzhi1},
    {path: '/xiongdizujianchuanzhi2',component: xiongdizujianchuanzhi2},
    
  ]
})
