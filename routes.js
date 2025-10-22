import {
  createMemoryHistory,
  createWebHistory,
  createRouter,
} from "vue-router";

import HomeView from './src/components/HomePage/HomePage.vue'
import Loaihang from './src/components/Loaihang/Loaihang.vue';
import Login from "./src/components/Login/login.vue";
import Register from "./src/components/Register/Register.vue";
import NotFound from "./src/components/NotFound/NotFound.vue";
import Forbidden from "./src/components/403/403.vue";
import Employee from "./src/components/Employee/User.vue";
import nhaCungCap from "./src/components/NCC/nhaCungCap.vue";
import phieuXuatKho from "./src/components/receipt/phieuXuatKho.vue";
import phieuNhapKho from "./src/components/receipt/phieuNhapKho.vue";
import Role from "./src/components/role/Role.vue";
import hangHoa from "./src/components/HangHoa/hangHoa.vue";

const routes = [
  { path: '/', component: HomeView },

  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { public: true } 
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { public: true }
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: Forbidden,
    meta: { internalOnly: true },
  },
  {
    path: '/loai',
    name: 'Loai',
    component: Loaihang,
  },
  {
    path: '/User',
    name: 'User',
    component: Employee,
  },
  {
    path: '/Supplier',
    name: 'Supplier',
    component: nhaCungCap,
  },
  {
    path: '/xuatKho',
    name: 'xuatKho',
    component: phieuXuatKho,
  },
  {
    path: '/nhapKho',
    name: 'nhapKho',
    component: phieuNhapKho,
  },
  {
    path: '/phanQuyen',
    name: 'phanQuyen',
    component: Role,
  },
    {
    path: '/hangHoa',
    name: 'hangHoa',
    component: hangHoa,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const isDirectAccess =
    !from.name &&
    window.performance?.getEntriesByType("navigation")[0]?.type === "navigate";

  if (to.meta.internalOnly && isDirectAccess) {
    next({ name: "NotFound" });
  } else {
    next();
  }
});
export default router;
