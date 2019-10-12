import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import xiongdizujianchuanzhi1 from './components/xiongdizujianchuanzhi1.vue'
import xiongdizujianchuanzhi from './components/xiongdizujianchuanzhi.vue'
import xiongdizujianchuanzhi2 from './components/xiongdizujianchuanzhi2.vue'
import shoufengqin from './components/shoufengqin.vue'
import Group from './page/Group.vue'
import GroupSearch from './page/GroupSearch.vue'
import demo from './page/demo.vue'
import mmm from './page/mmm.vue'
import Groupmember from './page/Groupmember.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',component: Groupmember},
    {path: '/Groupmember',component: Groupmember},
    {path: '/mmm',component: mmm},
    {path: '/group',component: Group},
    {path: '/demo',component: demo},
    {path: '/groupSearch',component: GroupSearch},
    {path: '/shoufengqin',component: shoufengqin},
    {path: '/xiongdizujianchuanzhi',component: xiongdizujianchuanzhi},
    {path: '/xiongdizujianchuanzhi1',component: xiongdizujianchuanzhi1},
    {path: '/xiongdizujianchuanzhi2',component: xiongdizujianchuanzhi2},
    
  ]
})
