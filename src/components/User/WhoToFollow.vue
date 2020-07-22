<template>
    <div class="ui segment">
        <h2 class="ui medium dividing header">
            Who to follow
        </h2>
        <i class="refresh link icon" @click="fetchUsersToFollow"></i>

        <div class="ui divided link items">
            <div class="item" v-for="user in usersToFollow" :key="user.id">
                <div class="ui avatar image">
                    <img src="https://oxfordtri.co.uk/sites/all/themes/oxfordtri/css/images/anonymous-user-gravatar.png" alt="">
                </div>
                <div class="content">
                    <router-link :to="`/${user.username}`">
                        {{user.name}}
                        <small>{{`@${user.username}`}}</small>
                    </router-link>
                    <div class="meta">
                        <button class="ui compact button mini primary" @click="follow(user.id)">
                            Follow
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'WhoToFollow',
    data() {
        return {
            usersToFollow: ''
        }
    },
    created() {
        this.fetchUsersToFollow()
    },
    methods: {
        fetchUsersToFollow() {
            const token = localStorage.getItem('blogapp-token')

            window.axios.get('/users/to_follow', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    this.usersToFollow = response.data.data
                })
        },
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
                    this.usersToFollow = response.data.data
                })
        }
    }
}
</script>