/* jshint esversion: 6 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import login from '../components/login.vue'
import gctf from '../components/gctf.vue'
import register from '../components/register.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: login
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/gctf',
      name: 'GCTF',
      component: gctf
    },
    {
      path: '/register',
      name: 'Register',
      component: register
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  ]
})
