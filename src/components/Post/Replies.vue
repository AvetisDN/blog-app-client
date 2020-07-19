<template>
    <div class="ui small feed">
        <div class="event" v-for="reply in replies" :key="reply.id">
            <div class="label">
                <img src="https://oxfordtri.co.uk/sites/all/themes/oxfordtri/css/images/anonymous-user-gravatar.png" alt="">
            </div>
            <div class="content">
                <div class="summary">
                    <router-link :to="`/${reply.user.username}`">
                        {{reply.user.name}}
                        <small>{{`@${reply.user.username}`}}</small>
                    </router-link>
                    <div class="date">
                        {{ reply.created_at | timeAgo }}
                    </div>
                </div>
                <div class="extra text">
                    {{ reply.content }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Replies',
    props: {
        replies: {
            type: Array,
            required: true
        }
    }
}
</script>