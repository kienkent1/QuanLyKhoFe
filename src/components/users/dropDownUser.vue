<template>
  <div class="relative">
    <!-- Nút chính -->
    <div
      @click="toggleDropdown"
      class="flex items-center gap-2 cursor-pointer select-none"
    >
      <!-- Mũi tên bên trái -->
      <span
        class="material-icons text-gray-500 text-base transition-transform duration-300 origin-center"
        :class="{
          'rotate-180': open,    /* Khi mở: xoay 180° */
          'opacity-0 scale-75': !hasOpened,
          'opacity-100 scale-100': hasOpened
        }"
      >
        expand_more
      </span>

      <!-- Tên + chức vụ -->
      <div class="text-right">
        <p class="text-sm font-semibold text-gray-900">Nguyễn Đức Thắng</p>
        <p class="text-xs text-gray-500">thangdn@gmail.com</p>
      </div>

      <!-- Avatar -->
      <img
        src="/public/logo.png"
        class="w-10 h-10 rounded-full shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
        alt="user avatar"
      />
    </div>

    <!-- Dropdown -->
    <transition name="dropdown">
      <div
        v-if="open"
        class="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.2)] z-50 p-3"
      >
        <!-- Header -->
        <div class="flex items-center gap-3 pb-3 border-b border-gray-100">
          <img src="/public/logo.png" class="w-10 h-10 rounded-full" alt="user avatar" />
          <div>
            <p class="font-semibold text-gray-900">Nguyễn Đức Thắng</p>
            <p class="text-sm text-gray-500">thangdn@gmail.com</p>
          </div>
        </div>

        <!-- Menu -->
        <ul class="text-gray-800 space-y-1 mt-2">
          <li
            class="menu-item flex items-center gap-3 p-2 rounded-lg cursor-pointer font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-500 hover:shadow-md hover:-translate-y-[1px] hover:text-gray-900 group"
          >
            <span class="material-icons text-gray-500 group-hover:text-blue-500 transition-colors">person</span>
            Thông tin
          </li>
          <li
            class="menu-item flex items-center gap-3 p-2 rounded-lg cursor-pointer font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-500 hover:shadow-md hover:-translate-y-[1px] hover:text-gray-900 group"
          >
            <span class="material-icons text-gray-500 group-hover:text-blue-500 transition-colors">settings</span>
            Cài đặt
          </li>
          <li
            @click="logout"
            class="menu-item flex items-center gap-3 p-2 rounded-lg cursor-pointer font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-500 hover:shadow-md hover:-translate-y-[1px] hover:text-gray-900 group"
          >
            <span class="material-icons text-gray-500 group-hover:text-blue-500 transition-colors">logout</span>
            Đăng xuất
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const open = ref(false)
const hasOpened = ref(false)

const toggleDropdown = () => {
  hasOpened.value = true
  open.value = !open.value
}

const handleClickOutside = (e) => {
  if (!e.target.closest('.relative')) open.value = false
}

const logout = () => {
  // Xóa tất cả dữ liệu authentication
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('isRemember');
  localStorage.removeItem('userInfo');
  localStorage.removeItem('userRole');
  
  // Xóa cookies nếu có
  document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'isRemember=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  
  // Xóa sessionStorage nếu có
  sessionStorage.clear();
  
  // Đóng dropdown
  open.value = false;
  
  // Chuyển hướng về trang đăng nhập
  window.location.href = '/login';
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
/* Hiệu ứng mở dropdown */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.25s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

/* Xoay mũi tên mượt */
.rotate-180 {
  transform: rotate(360deg);
}

/* Cấu hình cơ bản cho item */
.menu-item {
  position: relative;
  overflow: hidden;
}

/* Hiệu ứng gradient nền */
.menu-item::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(59,130,246,0.08), rgba(59,130,246,0));
  opacity: 0;
  transition: opacity 0.3s;
}
.menu-item:hover::before {
  opacity: 1;
}

/* Hiệu ứng ánh sáng chạy ngang (light sweep) */
.menu-item::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-20deg);
  transition: none;
  
}
.menu-item:hover::after {
  animation: light-sweep 0.8s ease forwards;
}

/* Keyframes cho ánh sáng chạy */
@keyframes light-sweep {
  from {
    left: -100%;
  }
  to {
    left: 130%;
  }
}

/* Hiệu ứng glow nhẹ khi hover avatar */
img:hover {
  box-shadow: 0 0 10px rgba(59,130,246,0.3);
  transition: box-shadow 0.3s ease;
}

/* Toàn bộ animation mượt */
* {
  transition: all 0.25s ease-in-out;
}
</style>
