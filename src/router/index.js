import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import SignUp from '../components/Auth/SignUp'
import SignIn from '../components/Auth/SignIn'
import UserProfileSettings from '../components/User/Settings/UserProfileSettings'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/settigns/profile',
      name: 'UserProfileSettings',
      component: UserProfileSettings
    },
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
