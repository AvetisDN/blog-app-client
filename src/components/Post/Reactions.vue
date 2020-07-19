<template>
    <div class="meta">
        <router-link class="reply" :to="`/${post.user.username}/post/${post.id}`">
            <i class="reply icon"></i>
            {{replies.length}}
        </router-link>
        <a class="like" v-if="isMyFavorite" @click.prevent="unFavorite">
            <i class="like red icon"></i>
        </a>
        <a class="like" v-else @click.prevent="favorite">
            <i class="like icon"></i>
        </a>
    </div>
</template>

<script>
export default {
    name: 'Reactions',
    props: {
        post: {
            type: Object,
            required: true
        },
        authUser: {
            type: Object,
            required: true
        },
        replies: {
            type: Array,
            required: true
        },
        favorites: {
            type: Array,
            required: false,
        }
    },
    computed: {
        isMyFavorite() {
            for(const fav of this.favorites) {
                if(fav.user_id === this.authUser.id) return true
            }
            return false
        }
    },
    methods: {
        favorite() {
            const token = localStorage.getItem('blogapp-token')

            if(!token) {
                alert('Sign in to like this post')
                return
            }

            window.axios.post('/favorites/add',{
                post_id: this.post.id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    this.favorites.push(response.data.data)
                })
        },
        unFavorite() {
            const token = localStorage.getItem('blogapp-token')

            window.axios.delete(`/favorites/delete/${this.post.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response.data.status);
                    const filtered = this.favorites.filter(fav => {
                        return fav.user_id !== this.authUser.id
                    })
                    this.$emit('update:favorites', filtered)
                })
        }
    }
}
</script>