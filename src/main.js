import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import {ValidationProvider, extend} from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'This field is required'
});
extend('email', {
  ...email,
  message: 'E-Mail is incorrect'
});

window.axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3333'

Vue.component('ValidationProvider', ValidationProvider);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
