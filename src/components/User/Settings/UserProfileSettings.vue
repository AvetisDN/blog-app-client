<template>
    <div class="ui stackable grid container">

        <UserSettingsMenu/>

        <div class="eight wide column">
            <div class="ui segment">
                <h2 class="ui dividing header">Edit Profile</h2>

                <Notification
                    :message="notification.message"
                    :type="notification.type"
                    v-if="notification.message"
                />

                <form class="ui form" @submit.prevent="updateProfile">
                <div class="field">
                    <label for="name">Name</label>
                    <validation-provider rules="required" v-slot="{ errors }">
                        <input
                            type="text"
                            name="name"
                            id="name" 
                            v-model="name" 
                            placeholder="Your Name"
                            :class="{'input': true, 'is-danger': errors[0]}"
                            :valid="!errors[0] && name.length>0"
                        >
                        <span class="is-danger">
                            {{ errors[0] }}
                        </span>
                    </validation-provider>
                </div>
                <div class="field">
                    <label for="username">Username</label>
                    <validation-provider rules="required" v-slot="{ errors }">
                        <input
                            type="text"
                            name="username"
                            id="username" 
                            v-model="username" 
                            placeholder="Your Login"
                            :class="{'input': true, 'is-danger': errors[0]}"
                            :valid="!errors[0] && username.length>0"
                        >
                        <span class="is-danger">
                            {{ errors[0] }}
                        </span>
                    </validation-provider>
                </div>
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
                    <label for="location">Location</label>
                    <input 
                        type="text" 
                        name="location" 
                        id="location" 
                        v-model="location" 
                        placeholder="Your location"
                        :class="{'input': true}"
                        >
                </div>
                <div class="field">
                    <label for="website_url">Website URL</label>
                    <input 
                        type="url" 
                        name="website_url" 
                        id="website_url" 
                        v-model="website_url" 
                        placeholder="Your website url"
                        :class="{'input': true}"
                    >
                </div>
                <div class="field">
                    <label for="bio">Bio</label>
                    <textarea
                        name="bio" 
                        id="bio" 
                        v-model="bio" 
                        placeholder="Something about you"
                        rows="7"
                    ></textarea>
                </div>

                <div class="ui divider"></div>
                
                <button class="fluid ui primary button">
                    Save Changes
                </button>
            </form>

            </div>
        </div>

    </div>
</template>

<script>
import Notification from '@/components/Notification'
import UserSettingsMenu from '@/components/User/Settings/UserSettingsMenu'
export default {
    name: 'UserProfileSettings',
    components: {
        Notification,
        UserSettingsMenu
    },
    data() {
        return {
            name: '',
            username: '',
            email: '',
            location: '',
            website_url: '',
            bio: '',
            notification: {
                message: '',
                type: ''
            }
        }
    },
    beforeRouteEnter (to, from, next) {
        const token = localStorage.getItem('blogapp-token')
        return token ? next() : next('/signin')
    },
    created() {
        this.fetchUser()
    },
    methods: {
        fetchUser() {
            const token = localStorage.getItem('blogapp-token')
            window.axios.get('/profile/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    this.name = response.data.data.name
                    this.username = response.data.data.username
                    this.email = response.data.data.email
                    this.location = response.data.data.location
                    this.website_url = response.data.data.website_url
                    this.bio = response.data.data.bio
                })
                .catch(error => {
                    console.log(error);
                })
        },
        updateProfile() {
            const token = localStorage.getItem('blogapp-token')
            window.axios.put('/profile/update', {
                name: this.name,
                username: this.username,
                email: this.email,
                location: this.location,
                website_url: this.website_url,
                bio: this.bio
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    this.notification = {
                        message: response.data.message,
                        type: response.data.status
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
}
</script>