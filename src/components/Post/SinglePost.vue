<template>
    <div class="ui stackable two column centered vertically padded grid container">
        <div class="column">
            <a class="ui button mini primary" @click="back">Back</a>
            <div class="ui feed">
                <div class="event">
                    <div class="label">
                        <img src="https://oxfordtri.co.uk/sites/all/themes/oxfordtri/css/images/anonymous-user-gravatar.png" alt="">
                    </div>
                    <div class="content">
                        <div class="summary">
                            <router-link :to="`/${user.username}`">
                                {{user.name}}
                                <small>{{`@${user.username}`}}</small>
                            </router-link>
                            <div class="date">
                                {{ post.created_at | timeAgo }}
                            </div>
                        </div>
                        <div class="extra text">
                            <router-link :to="`/${user.username}/post/${post.id}`">
                                <h4>{{ post.title }}</h4>
                            </router-link>
                            {{ post.content }}
                        </div>
                        <Reactions
                            :post="post"
                            :replies="replies"
                            :auth-user="authUser"
                            :favorites.sync="favorites"
                        />
                    </div>
                </div>
            </div>
            <div class="ui divider"></div>
            <form class="ui form" @submit.prevent="replyPost">
                <div class="field">
                    <textarea name="reply" v-model="reply" rows="3" placeholder="Add a comment"></textarea>
                </div>
                <button class="ui button positive" :disabled="!isValid">Reply</button>
            </form>

            <Replies :replies="replies"/>
        </div>
    </div>
</template>

<script>
import Replies from '@/components/Post/Replies'
import Reactions from '@/components/Post/Reactions'
export default {
    name: 'SinglePost',
    components: {
        Replies,
        Reactions
    },
    data() {
        return {
            post: {},
            replies: [],
            favorites: [],
            reply: '',
            user: '',
            authUser: {}
        }
    },
    computed: {
        isValid() {
            return !!this.reply
        }
    },
    created() {
        this.fetchPost()
        this.fetchAuthUser()
    },
    methods: {
        fetchPost() {
            window.axios.get(`/post/${this.$route.params.id}`)
                .then(response => {
                    this.post = response.data.data
                    this.replies = response.data.data.replies
                    this.favorites = response.data.data.favorites
                    this.user = this.post.user;
                })
        },
        back() {
            this.$router.go(-1)
        },
        replyPost() {
            const token = localStorage.getItem('blogapp-token')

            window.axios.post(`/post/reply/${this.post.id}`, {
                reply: this.reply
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    this.reply = ''
                    this.replies.unshift(response.data.data)
                })
        },
        fetchAuthUser() {
            const token = localStorage.getItem('blogapp-token')
            window.axios.get(`/profile/me`, {
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