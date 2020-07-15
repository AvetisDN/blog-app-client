<template>
  <div class="ui stackable grid vertically padded container">
    <div class="four wide column">
      <UserSidebar :user="user" />
    </div>
    <div class="eight wide column">
      <div class="ui segment">
        <h2 class="ui medium dividing header">My Timeline</h2>
        <Posts :posts='posts' :auth-user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import UserSidebar from '@/components/User/UserSidebar'
import Posts from '@/components/Post/Posts'
export default {
  name: 'Home',
  components: {
    Posts,
    UserSidebar
  },
  data() {
    return {
      user: {},
      posts: []
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('blogapp-token')
    return token ? next() : next('/signin')
  },
  created() {
    this.fetchUserData()
    this.fetchTimeline()
  },
  methods: {
    fetchUserData() {
      const token = localStorage.getItem('blogapp-token')
      window.axios.get('/profile/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        this.user = response.data.data
      })
    },
    fetchTimeline() {
      const token = localStorage.getItem('blogapp-token')
      window.axios.get('/users/timeline', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        this.posts = response.data.data.reverse()
      })
    }
  }
}
</script>

