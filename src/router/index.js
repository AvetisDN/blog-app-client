import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import SignUp from '../components/Auth/SignUp'
import SignIn from '../components/Auth/SignIn'
import UserProfile from '../components/User/Profile/UserProfile'
import UsersFollowing from '../components/User/Profile/UsersFollowing'
import UsersFollowers from '../components/User/Profile/UsersFollowers'
import FavoritePosts from '../components/User/Profile/FavoritePosts'
import UserProfileSettings from '../components/User/Settings/UserProfileSettings'
import UserAvatarSettings from '../components/User/Settings/UserAvatarSettings'
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
      path: '/settings/avatar',
      name: 'UserAvatarSettings',
      component: UserAvatarSettings
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
    {
      path: '/following',
      component: UsersFollowing
    },
    {
      path: '/:username/following',
      component: UsersFollowing,
      props: true
    },
    {
      path: '/followers',
      component: UsersFollowers
    },
    {
      path: '/:username/followers',
      component: UsersFollowers,
      props: true
    },
    {
      path: '/favorites',
      component: FavoritePosts
    },
    {
      path: '/:username/favorites',
      component: FavoritePosts,
      props: true
    },
    {
      path: '/:username',
      name: 'UserProfile',
      component: UserProfile,
      props: true
    }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
