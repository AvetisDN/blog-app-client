<template>
    <div class="ui feed">
        <Post
            v-for="post in posts"
            :key="post.id"
            :post = "post"
            :auth-user = "authUser"
        />
    </div>
</template>

<script>
import EventBus from '@/eventBus'
import Post from '@/components/Post/Post'
export default {
    name: 'Posts',
    components: {
        Post
    },
    props: {
        posts: {
            type: Array,
            required: true
        },
        authUser: {
            type: Object,
            required: true
        }
    },
    created() {
        EventBus.$on('postAdded', this.fetchAddedPost)
    },
    methods: {
        fetchAddedPost(post) {
            this.posts.unshift(post)
        }
    }
}
</script>