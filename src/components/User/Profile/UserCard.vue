<template>
    <div class="column">
        <div class="ui card">
            <div class="content">
                <img class="right floated ui image" src="https://oxfordtri.co.uk/sites/all/themes/oxfordtri/css/images/anonymous-user-gravatar.png" alt="">
                <div class="header">
                    <router-link :to="`/${user.username}`">
                        {{user.name}}
                    </router-link>
                </div>
                <div class="meta">
                    <router-link :to="`/${user.username}`">
                        @{{user.username}}
                    </router-link>
                </div>
                <div class="description">
                    {{user.bio}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'UserCard',
        props: {
            user: {
                type: Object,
                required: true
            }
        }
    }
</script>