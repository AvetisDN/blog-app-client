<template>
    <div class="ui stackable three column centered grid container">
        <div class="column">
            <h3 class="ui dividing header">Sign In!</h3>

            <Notification
                :message="notification.message"
                :type="notification.type"
                v-if="notification.message"
            />

            <form class="ui form" @submit.prevent="signin">
                <div class="field">
                    <label for="email">E-Mail</label>
                    <validation-provider rules="required|email" v-slot="{ errors }">
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            v-model="email" 
                            placeholder="Your E-Mail"
                            :class="{'input': true, 'is-danger': errors[0]}"
                            :valid="!errors[0] && email.length>0"
                        >
                        <span class="is-danger">
                            {{ errors[0] }}
                        </span>
                    </validation-provider>
                </div>
                <div class="field">
                    <label for="password">Password</label>
                    <validation-provider rules="required" v-slot="{ errors }">
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            v-model="password" 
                            placeholder="Your password"
                            :class="{'input': true, 'is-danger': errors[0]}"
                            :valid="!errors[0] && password.length>0"
                        >
                        <span class="is-danger">
                            {{ errors[0] }}
                        </span>
                    </validation-provider>
                </div>

                <div class="ui divider"></div>
                
                <button class="fluid ui primary button" :disabled="!isValid">
                    Sign In
                </button>

                <div class="ui divider"></div>

                <div class="ui column grid">
                    <div class="center aligned column">
                        <p>
                            Don't have an account?
                            <router-link to="/signup">Sign Up</router-link>
                        </p>
                    </div>
                </div>
            </form>

        </div>
    </div>
</template>

<script>
import Notification from '@/components/Notification'
export default {
    name: 'SignIn',
    components: {
        Notification,
    },
    data() {
        return {
            email: '',
            password: '',
            notification: {
                message: '',
                type: ''
            }
        }
    },
    computed: {
        isValid() {
            return this.email && this.password
        }
    },
    beforeRouteEnter (to, from, next) {
        const token = localStorage.getItem('blogapp-token')
        return token ? next('/') : next()
    },
    methods: {
        signin() {
            window.axios.post('/signin', {
                email: this.email,
                password: this.password
            })
                .then(response => {
                    localStorage.setItem('blogapp-token', response.data.data.token)
                    this.$router.push('/')
                })
                .catch(error => {
                    this.email = ''
                    this.password = ''
                    this.notification = {
                        message: error.response.data.message,
                        type: error.response.data.status
                    }
                })
        }
    }
}
</script>