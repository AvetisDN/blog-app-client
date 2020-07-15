<template>
    <div>
        <div class="ui attached segment">
            <div class="ui form">
                <form @submit.prevent="addPost">
                    <div class="field">
                        <input name="title" v-model="title" placeholder="Add a title">
                    </div>
                    <div class="field">
                        <textarea name="content" v-model="content" rows="3" placeholder="Create a post"></textarea>
                    </div>
                    <button class="ui button fluid primary" :disabled="!isValid">Post</button>
                </form>
            </div>
        </div>
        <div class="ui bottom attached menu">
            <router-link class="item" to="/">
                <i class="home icon"></i>
            </router-link>
            <router-link class="item" :to="`/${user.username}`">
                Profile
            </router-link>
            <router-link class="item" to="/settings/profile">
                Settings
            </router-link>
            <a class="item">
                <i class="sign out icon"></i>
            </a>
        </div>
    </div>
</template>

<script>
import EventBus from '@/eventBus'
export default {
    name: 'UserSidebar',
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            content: '',
            title: ''
        }
    },
    computed: {
        isValid() {
            return !!this.content && !!this.title
        }
    },
    methods: {
        addPost() {
            const token = localStorage.getItem('blogapp-token')

            window.axios.post('/post', {
                title: this.title,
                content: this.content
            }, {
                headers: {
                Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    EventBus.$emit('postAdded', response.data.data)
                    this.title = ''
                    this.content = ''
                })
        }
    }
}
</script>