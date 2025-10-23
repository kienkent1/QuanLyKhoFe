import { createWebHistory, createRouter } from "vue-router";

import HomeView from "./src/components/HomePage/HomePage.vue";
import Loaihang from "./src/components/Loaihang/Loaihang.vue";
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
import xuatnhap from "./src/components/xuatnhap/xuatNhapFile.vue";
import Account from "./src/components/Employee/account/account-fixed.vue";
import VueCookies from "vue-cookies";
import * as api from "./src/helper/callApi.js";
const routes = [
  { path: "/", component: HomeView },

  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { public: true },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { public: true },
  },
  {
    path: "/403",
    name: "Forbidden",
    component: Forbidden,
    meta: { internalOnly: true },
  },
  {
    path: "/loai",
    name: "Loai",
    component: Loaihang,
  },
  {
    path: "/User",
    name: "User",
    component: Employee,
  },
  {
    path: "/Supplier",
    name: "Supplier",
    component: nhaCungCap,
  },
  {
    path: "/xuatKho",
    name: "xuatKho",
    component: phieuXuatKho,
  },
  {
    path: "/nhapKho",
    name: "nhapKho",
    component: phieuNhapKho,
  },
  {
    path: "/phanQuyen",
    name: "phanQuyen",
    component: Role,
  },
  {
    path: "/hangHoa",
    name: "hangHoa",
    component: hangHoa,
  },

    {
    path: "/xuatNhap",
    name: "xuatNhap",
    component: xuatnhap,
  },
  {
    path: "/taikhoan",
    name: "taikhoan",
    component: Account,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const accessToken = VueCookies.get("accessToken");
  const isPublic = to.meta.public === true;

  if (!isPublic && !accessToken && to.path !== "/403") {
    const remember = localStorage.getItem("isRemember");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!remember || !refreshToken) {
      return next({ name: "login" });
    }

    try {
      const newToken = await api.refreshAccessToken();

      if (newToken) {
        const cookieDuration = remember === "true" ? "1d" : "1h";
        VueCookies.set("accessToken", newToken, cookieDuration);
        return next();
      }

      return next({ name: "login" });
    } catch (error) {
      console.warn("Refresh token failed:", error);
      return next({ name: "login" });
    }
  }

  if (
    isPublic &&
    accessToken &&
    (to.name === "login" || to.name === "register")
  ) {
    return next({ path: "/" });
  }

  const isInternal = from.name !== null && from.name !== undefined;
  if (to.meta.internalOnly && !isInternal) {
    return next({ name: "NotFound" });
  }

  next();
});

export default router;
