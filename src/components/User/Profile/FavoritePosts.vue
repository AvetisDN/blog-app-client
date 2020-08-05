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
                        Favorites
                    </h2>
                    <Posts
                        :posts.sync="favPosts"
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
import profileMixin from '@/mixins/profileMixin'
export default {
    name: 'FavoritePosts',
    mixins: [profileMixin],
    components: {
        UserProfileHeader,
        UserProfileSidebar,
        WhoToFollow,
        Posts
    },
    data() {
        return {
            user: {},
            authUser: {}
        }
    },
    computed: {
        isLoggedIn() {
            return !!this.authUser
        },
        favPosts() {
            return Array.from(this.user.favorites, fav => fav.post).reverse()
        }
    },
}
</script>