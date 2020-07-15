<template>
    <div class="four wide column">
        <router-link to='/' class="ui button mini primary">Home</router-link>
        <div class="ui fluid vertical menu pointing">
            <div class="item">
                <router-link to="/settings/profile">Edit Profile</router-link>
            </div>
            <div class="item">
                <router-link to="/settings/password">Edit Password</router-link>
            </div>
        </div>
    </div>
</template>