import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import SignUp from '../components/Auth/SignUp'
import SignIn from '../components/Auth/SignIn'
import UserProfileSettings from '../components/User/Settings/UserProfileSettings'
import UserPasswordSettings from '../components/User/Settings/UserPasswordSettings'
import SinglePost from '../components/Post/SinglePost'

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
      path: '/settings/profile',
      name: 'UserProfileSettings',
      component: UserProfileSettings
    },
    {
      path: '/settings/password',
      name: 'UserPasswordSettings',
      component: UserPasswordSettings
    },
    {
      path: '/:username/post/:id',
      name: 'SinglePost',
      component: SinglePost
    },
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
