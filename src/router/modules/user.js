/* jshint esversion: 6 */
import UserLogout from '@/components/User/Logout.vue'
import UserLogin from '@/components/User/Login.vue'
import UserRegister from '@/components//User/Register.vue'
import UserLayout from '@/components/User/UserLayout.vue'
import UserIndex from '@/components/User/Index.vue'

export default {
  path: '/user',
  name: 'user-layout',
  component: UserLayout,
  children: [
    {
      path: 'login',
      name: 'user-login',
      component: UserLogin
    },
    {
      path: 'logout',
      name: 'user-logout',
      component: UserLogout
    },
    {
      path: 'register',
      name: 'user-register',
      component: UserRegister
    },
    {
      path: 'index',
      name: 'user-info',
      component: UserIndex
    }
  ]
}
