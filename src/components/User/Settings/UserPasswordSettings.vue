<template>
    <div class="ui stackable grid container">
        <UserSettingsMenu/>

        <div class="eight wide column">
            <div class="ui segment">
                <h2 class="ui dividing header">Edit Password</h2>

                <Notification
                    :message="notification.message"
                    :type="notification.type"
                    v-if="notification.message"
                />

                <ValidationObserver ref="form">
                    <form class="ui form" @submit.prevent="changePassword">
                        <div class="field">
                            <label for="password">Current Password</label>
                            <validation-provider rules="required" v-slot="{ errors }">
                                <input
                                    type="password"
                                    name="password"
                                    id="password" 
                                    v-model="password" 
                                    placeholder="Your Current Password"
                                    :class="{'input': true, 'is-danger': errors[0]}"
                                    :valid="!errors[0] && password.length>0"
                                >
                                <span class="is-danger">
                                    {{ errors[0] }}
                                </span>
                            </validation-provider>
                        </div>
                        <div class="field">
                            <label for="newPassword">New Password</label>
                            <validation-provider rules="required" v-slot="{ errors }">
                                <input
                                    type="password"
                                    name="newPassword"
                                    id="newPassword" 
                                    v-model="newPassword" 
                                    placeholder="Your New Password"
                                    :class="{'input': true, 'is-danger': errors[0]}"
                                    :valid="!errors[0] && newPassword.length>0"
                                >
                                <span class="is-danger">
                                    {{ errors[0] }}
                                </span>
                            </validation-provider>
                        </div>
                        <div class="field">                    
                            <label for="confirmPassword">Confirm Password</label>
                            <validation-provider rules="required" v-slot="{ errors }">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword" 
                                    v-model="confirmPassword" 
                                    placeholder="Confirm New Password"
                                    :class="{'input': true, 'is-danger': errors[0]}"
                                    :valid="!errors[0] && confirmPassword.length>0"
                                >
                                <span class="is-danger">
                                    {{ errors[0] }}
                                </span>
                            </validation-provider>
                        </div>

                        <div class="ui divider"></div>
                        
                        <button class="fluid ui primary button">
                            Save Password
                        </button>
                    </form>
                </ValidationObserver>

            </div>
        </div>
    </div>
</template>

<script>
import Notification from '@/components/Notification'
import UserSettingsMenu from '@/components/User/Settings/UserSettingsMenu'
export default {
    name: 'UserPasswordSettings',
    components: {
        Notification,
        UserSettingsMenu
    },
    data() {
        return {
            password: '',
            newPassword: '',
            confirmPassword: '',
            notification: {
                message: '',
                type: ''
            }
        }
    },
    computed: {
        isValid() {
            return this.password && this.newPassword && this.email && this.confirmPassword
        }
    },
    beforeRouteEnter (to, from, next) {
        const token = localStorage.getItem('blogapp-token')
        return token ? next() : next('/signin')
    },
    methods: {
        changePassword() {
            const token = localStorage.getItem('blogapp-token')
            window.axios.put('/profile/password', {
                currentPassword: this.password,
                newPassword: this.newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    this.password = this.newPassword = this.confirmPassword = ''
                    this.notification = {
                        message: response.data.message,
                        type: response.data.status
                    }
                })
                .catch(error => {
                    this.password = this.newPassword = this.confirmPassword = ''
                    this.$nextTick(() => {
                        this.$refs.form.reset()
                    })
                    console.log(error)
                    this.notification = {
                        message: error.message,
                        type: 'danger'
                    }
                })
        }
    }
}
</script>