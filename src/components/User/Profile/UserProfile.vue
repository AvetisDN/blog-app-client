<template>
    <div>
        <UserProfileHeader
            :user = "user"
            :auth-user = "authUser"
        />
        <div class="ui stackable grid container">
            <div class="four wide column">
                <UserProfileSidebar
                    :user = "user"
                />
            </div>
            <div class="eight wide column">
                <div class="ui segment">
                    <h2 class="ui medium dividing header">
                        Posts
                    </h2>
                    <Posts
                        :posts.sync="posts"
                        :auth-user="authUser"
                    />
                </div>
            </div>
            <div class="four wide column">
                <WhoToFollow v-if="isLoggedIn" />
            </div>
        </div>
    </div>
</template>

<script>
import UserProfileHeader from '@/components/User/Profile/UserProfileHeader'
import UserProfileSidebar from '@/components/User/Profile/UserProfileSidebar'
import WhoToFollow from '@/components/User/WhoToFollow'
import Posts from '@/components/Post/Posts'
export default {
    name: 'UserProfile',
    components: {
        UserProfileHeader,
        UserProfileSidebar,
        WhoToFollow,
        Posts
    },
    data() {
        return {
            user: {},
            authUser: {},
            posts: []
        }
    },
    computed: {
        isLoggedIn() {
            return !!this.authUser
        },
    },
    beforeRouteUpdate(to, from, next) {
        this.fetchUser(to.params.username)
        next()
    },
    created() {
        this.fetchUser(this.$route.params.username)
        const token = localStorage.getItem('blogapp-token')
        if(token) {
            this.fetchAuthUser(token)
        }
    },
    methods: {
        fetchUser(username) {
            window.axios.get(`/users/${username}`)
                .then(response => {
                    this.user = response.data.data
                    this.posts = response.data.data.posts
                })
        },
        fetchAuthUser(token) {
            window.axios.get('profile/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    this.authUser = response.data.data
                })
        }
    }
}
</script>