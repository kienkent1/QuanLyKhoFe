import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router';

import HomeView from './src/components/HomePage/HomePage.vue';

import login from './src/components/Login/login.vue';
import register from './src/components/Register/Register.vue'
import NotFound from './src/components/NotFound/NotFound.vue';
import Forbidden from './src/components/403/403.vue';
import Loaihang from './src/components/Loaihang/Loaihang.vue';

const routes = [
  { path: '/', component: HomeView},
   {path:'/login',
    name: 'login'
    ,component:login} ,
   {path:'/register',
    name: 'register',
    component:register} ,

   {
   path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound

   } ,
   {path:'/403',
    name: 'Forbidden',
    component:Forbidden,
    meta: { internalOnly: true } 
   } ,
   {
    path:'/loai',
    name:'Loai',
    component: Loaihang
   }
];

 const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {

  const isDirectAccess =
    !from.name && window.performance?.getEntriesByType('navigation')[0]?.type === 'navigate'

  if (to.meta.internalOnly && isDirectAccess) {
  
    next({ name: 'NotFound' })
  } else {
    next()
  }
})
export default router;
