import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router';

import HomeView from './src/components/HomePage/HomePage.vue';
import login from './src/components/Login/login.vue';
import register from './src/components/Register/Register.vue'

const routes = [
  { path: '/', component: HomeView},
   {path:'/login',component:login} ,
   {path:'/register',component:register} 
   

];

 const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;