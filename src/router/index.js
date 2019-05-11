/* jshint esversion: 6 */
import Vue from 'vue'
import Router from 'vue-router'
import User from './modules/user'
import Challenge from './modules/challenge'
import Hello from '@/components/Hello'
import Rank from './modules/rank'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Hello
    },
    User,
    Challenge,
    Rank,
    {
      path: '*',
      name: 'HTTP-404',
      // component: resolve => require(['@/components/Common/404.vue'], resolve)
      component: Hello
    }
  ]
})
