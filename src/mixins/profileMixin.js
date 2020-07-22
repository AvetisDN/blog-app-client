import axios from 'axios'

export default {
    created() {
        this.$_profileMixin_fetchUser(this.$route.params.username)
        const token = localStorage.getItem('blogapp-token')
        if(token) {
            this.$_profileMixin_fetchAuthUser(token)
        }
    },
    methods: {
        $_profileMixin_fetchUser(username) {
            if(username) {
                axios.get(`/users/${username}`)
                    .then(response => {
                        this.user = response.data.data
                    })
            }
            else {
                const token = localStorage.getItem('blogapp-token')
                axios.get('/profile/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => {
                        this.user = response.data.data
                    })
            }
        },
        $_profileMixin_fetchAuthUser(token) {
            axios.get('/profile/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    this.authUser = response.data.data
                })
        }
    }
}