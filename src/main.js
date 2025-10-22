import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '../routes.js'
import VueCookies from 'vue-cookies'

const app = createApp(App);
app.use(router);
app.use(VueCookies);
app.mount('#app');
