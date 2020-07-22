<template>
    <div>
        <UserProfileHeader
            :user = "user"
            :auth-user = "authUser"
        />
        <div class="ui stackable grid container">
            <div class="four wide column">
                <UserProfileSidebar
                    :user = "user"
                />
            </div>
            <div class="ten wide column">
                <div class="ui segment">
                    <UserCard
                        v-for="following in user.following"
                        :key="following.id"
                        :user="following"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserProfileHeader from '@/components/User/Profile/UserProfileHeader'
import UserProfileSidebar from '@/components/User/Profile/UserProfileSidebar'
import UserCard from '@/components/User/Profile/UserCard'
import profileMixin from '@/mixins/profileMixin'
export default {
    name: 'UsersFollowing',
    mixins: [profileMixin],
    components: {
        UserProfileHeader,
        UserProfileSidebar,
        UserCard,
    },
    data() {
        return {
            user: {},
            authUser: {}
        }
    },
    
}
</script>