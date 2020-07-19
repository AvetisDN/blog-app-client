<template>
    <div class="event">
        <div class="label">
            <img src="https://oxfordtri.co.uk/sites/all/themes/oxfordtri/css/images/anonymous-user-gravatar.png" alt="">
        </div>
        <div class="content">
            <div class="summary">
                <router-link :to="`/${post.user.username}`">
                    {{post.user.name}}
                    <small>{{`@${post.user.username}`}}</small>
                </router-link>
                <div class="date">
                    {{ post.created_at | timeAgo }}
                    <small v-if="isItMine">
                        <a @click.prevent="deletePost(post.id)">
                            <i class="trash icon"></i>
                        </a>
                    </small>
                </div>
            </div>
            <div class="extra text">
                <router-link :to="`/${post.user.username}/post/${post.id}`">
                    <h4>{{ post.title }}</h4>
                </router-link>
                {{ post.content }}
            </div>
            <Reactions
                :post="post"
                :replies="post.replies"
                :auth-user="authUser"
                :favorites.sync="post.favorites"
            />
        </div>
    </div>
</template>

<script>

import Reactions from '@/components/Post/Reactions'
export default {
    name: 'Post',
    components: {
        Reactions
    },
    props: {
        post: {
            type: Object,
            required: true
        },
        authUser: {
            type: Object,
            required: true
        }
    },
    computed: {
        isItMine() {
            return this.post.user_id === this.authUser.id
        }
    },
    methods: {
        deletePost(postId) {
            const token = localStorage.getItem('blogapp-token')

            if(confirm('Are you sure?')) {
                window.axios.delete(`/post/delete/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => {
                        console.log(response.data.message)
                        this.$emit('delete', postId)
                    })
            }
        }
    }
}

</script>