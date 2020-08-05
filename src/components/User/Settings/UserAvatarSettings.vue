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

                <div class="field">
                    <img class="ui image" :src="profile_pic ? profile_pic : 'https://oxfordtri.co.uk/sites/all/themes/oxfordtri/css/images/anonymous-user-gravatar.png'">
                </div>
                <div class="field">
                    <button class="ui green button" type="button" @click="toggleShow">
                        Updload new image
                    </button>
                    <my-upload field="profile_pic"
                        @crop-success="cropSuccess"
                        @crop-upload-success="cropUploadSuccess"
                        @crop-upload-fail="cropUploadFail"
                        v-model="show"
                        :width="128"
                        :height="128"
                        langType="en"
                        url="http://127.0.0.1:3333/users/upload-pic"
                        :params="params"
                        :headers="headers"
                        img-format="png"></my-upload>
                </div>

                <div class="ui divider"></div>
                
            </div>
        </div>

    </div>
</template>

<script>
import Notification from '@/components/Notification'
import UserSettingsMenu from '@/components/User/Settings/UserSettingsMenu'
import myUpload from 'vue-image-crop-upload';
export default {
    name: 'UserProfileSettings',
    components: {
        Notification,
        UserSettingsMenu,
        myUpload
    },
    data() {
        return {
            profile_pic: '',
            imgDataUrl: '',
            show: false,
			params: {
                name: 'profile_pic',
                image: ''
			},
			headers: {
                Authorization: `Bearer ${localStorage.getItem('blogapp-token')}`
			},
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
        toggleShow() {
            this.show = !this.show;
        },
        cropSuccess(imgDataUrl, field){
            console.log('-------- crop success --------', field);
            this.imgDataUrl = imgDataUrl;
            this.params.image = imgDataUrl;
        },
        cropUploadSuccess(jsonData, field){
            console.log('-------- upload success --------');
            console.log(jsonData);
            console.log('field: ' + field);
        },
        cropUploadFail(status, field){
            console.log('-------- upload fail --------');
            console.log(status);
            console.log('field: ' + field);
        },
        fetchUser() {
            const token = localStorage.getItem('blogapp-token')
            window.axios.get('/profile/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    // console.log(response.data);
                    this.profile_pic = response.data.data.profile_pic
                })
                .catch(error => {
                    console.log(error);
                })
        },
        updateProfile() {
        }
    }
}
</script>