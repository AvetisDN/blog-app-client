import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import {ValidationObserver, ValidationProvider, extend} from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import moment from 'moment'

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
Vue.component('ValidationObserver', ValidationObserver);

Vue.config.productionTip = false

Vue.filter('timeAgo', date => moment(date).fromNow())
Vue.filter('joined', date => moment(date).format('MMMM YYYY'))
Vue.filter('dob', date => moment(date).fromNow('MMMM Do YYYY'))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
