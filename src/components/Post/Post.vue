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
                </div>
            </div>
            <div class="extra text">
                <router-link :to="`/${post.user.username}/post/${post.id}`">
                    <h4>{{ post.title }}</h4>
                </router-link>
                {{ post.content }}
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Post',
    props: {
        post: {
            type: Object,
            required: true
        },
        authUser: {
            type: Object,
            required: true
        }
    }
}

</script>