import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import xiongdizujianchuanzhi1 from './components/xiongdizujianchuanzhi1.vue'
import xiongdizujianchuanzhi from './components/xiongdizujianchuanzhi.vue'
import xiongdizujianchuanzhi2 from './components/xiongdizujianchuanzhi2.vue'
import shoufengqin from './components/shoufengqin.vue'
import GroupSearch from './page/GroupSearch.vue'
import demo from './page/demo.vue'
import mmm from './page/mmm.vue'
import Group from './page/Group.vue'
import GroupMember from './page/GroupMember.vue'
import GroupMemberAdd from './page/GroupMemberAdd.vue'
import abcd from './page/abcd.vue'
import Tree from './page/Tree.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',component: GroupMember},
    {path: '/Tree',component: Tree},
    {path: '/abcd',component: abcd},
    {path: '/GroupMemberAdd',component: GroupMemberAdd},
    {path: '/GroupMember',component: GroupMember},
    {path: '/group',component: Group},
    {path: '/mmm',component: mmm},
    {path: '/demo',component: demo},
    {path: '/groupSearch',component: GroupSearch},
    {path: '/shoufengqin',component: shoufengqin},
    {path: '/xiongdizujianchuanzhi',component: xiongdizujianchuanzhi},
    {path: '/xiongdizujianchuanzhi1',component: xiongdizujianchuanzhi1},
    {path: '/xiongdizujianchuanzhi2',component: xiongdizujianchuanzhi2},
    
  ]
})
