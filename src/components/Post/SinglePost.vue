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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SinglePost',
    data() {
        return {
            post: '',
            user: ''
        }
    },
    created() {
        this.fetchPost()
    },
    methods: {
        fetchPost() {
            window.axios.get(`/post/${this.$route.params.id}`)
                .then(response => {
                    this.post = response.data.data
                    this.user = this.post.user;
                })
        },
        back() {
            this.$router.go(-1)
        }
    }
}
</script>