import { createWebHistory, createRouter } from "vue-router";

import HomeView from "./src/components/home-page/HomePage.vue";
import Loaihang from "./src/components/loai-hang/LoaiHang.vue";
import Login from "./src/components/authentication/login/Login.vue";
import Register from "./src/components/authentication/register/Register.vue";
import NotFound from "./src/components/notfound/NotFound.vue";
import Forbidden from "./src/components/403/403.vue";
import nhanVienRoute from "./src/components/employee/nhan-vien.route.js";
import nhaCungCap from "./src/components/ncc/NhaCungCap.vue";
import phieuXuatKho from "./src/components/receipt/PhieuXuaKho.vue";
import phieuNhapKho from "./src/components/receipt/PhieuNhapKho.vue";
import Role from "./src/components/role/Role.vue";
import hangHoa from "./src/components/hang-hoa/HangHoa.vue";
import xuatnhap from "./src/components/xuat-nhap/XuatNhapFile.vue";

import Profile from "./src/components/Profile/Profile.vue";

import Account from "./src/components/employee/account/Account.vue";

import VueCookies from "vue-cookies";
import * as api from "./src/helper/call-api.js";
const routes = [
  { path: "/", name: "home", component: HomeView },

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
    path: "/profile",
    name: "profile",
    component: Profile,
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
  ...nhanVienRoute,
  {
    path: "/nha-cung-cap",
    name: "Supplier",
    component: nhaCungCap,
  },
  {
    path: "/xuat-Kho",
    name: "xuatKho",
    component: phieuXuatKho,
  },
  {
    path: "/nhap-Kho",
    name: "nhapKho",
    component: phieuNhapKho,
  },
  {
    path: "/phan-Quyen",
    name: "phanQuyen",
    component: Role,
  },
  {
    path: "/hang-hoa",
    name: "hangHoa",
    component: hangHoa,
  },

  {
    path: "/xuat-Nhap",
    name: "xuatNhap",
    component: xuatnhap,
  },
  {
    path: "/tai-khoan",
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
    console.log(remember + "-" + refreshToken);
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
