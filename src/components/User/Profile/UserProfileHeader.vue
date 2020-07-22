<template>
    <div class="ui segment">
        <div class="ui grid container">
            <div class="four wide column">
                <img class="ui tiny avatar image" src="https://oxfordtri.co.uk/sites/all/themes/oxfordtri/css/images/anonymous-user-gravatar.png" alt="">
            </div>
            <div class="bottom aligned twelve wide column">
                <div class="ui horizontal relaxed link list">
                    <div class="item">
                        <div class="content">
                            <router-link :to="`/${user.username}`">
                                <div class="header">Posted posts:</div>
                                <b>{{ user.posts.length }}</b>
                            </router-link>
                        </div>
                    </div>
                    <div class="item">
                        <div class="content">
                            <router-link :to="isOwner ? `/following` : `/${user.username}/following`">
                                <div class="header">Following users:</div>
                                <b>{{ user.following.length }}</b>
                            </router-link>
                        </div>
                    </div>
                    <div class="item">
                        <div class="content">
                            <router-link :to="isOwner ? `/followers` : `/${user.username}/followers`">
                                <div class="header">Followers:</div>
                                <b>{{ user.followers.length }}</b>
                            </router-link>
                        </div>
                    </div>
                    <div class="item">
                        <div class="content">
                            <router-link :to="isOwner ? `/favorites` : `/${user.username}/favorites`">
                                <div class="header">Favorites:</div>
                                <b>{{ user.favorites.length }}</b>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="ui right floated horizontal list" v-if="isOwner">
                    <router-link to="/settings/profile" class="ui button primary">Edit Profile</router-link>
                </div>
                <div class="ui right floated horizontal list" v-if="!isOwner && isLoggedIn">
                    <button class="ui tiny primary button" v-if="!isFollowing" @click="follow(user.id)">Follow</button>
                    <button class="ui tiny primary button" v-else @click="unFollow(user.id)">UnFollow</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserProfileHeader',
    props: {
        user: {
            type: Object,
            required: true
        },
        authUser: {
            type: Object,
            required: true
        }
    },
    computed: {
        isOwner() {
            return this.user.id === this.authUser.id
        },
        isLoggedIn() {
            return !!this.authUser
        },
        isFollowing() {
            for(const following of this.authUser.following) {
                if(following.id === this.user.id) return true
            }
            return false
        }
    },
    methods: {
        follow(userId) {
            const token = localStorage.getItem('blogapp-token')

            window.axios.post('/users/follow', {
                user_id: userId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response.data);
                    this.authUser.following.push({id: userId})
                })
        },
        unFollow(userId) {
            const token = localStorage.getItem('blogapp-token')

            window.axios.delete(`/users/unfollow/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response.data);
                    this.authUser.following = this.authUser.following.filter(u => u.id !== userId)
                })
        }
    }
}
</script>
