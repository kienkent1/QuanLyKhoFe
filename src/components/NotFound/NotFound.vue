<template>
  <div class="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white px-6 md:px-16 animate-slide-in">
    <logo />



    <div class="text-center md:text-left space-y-4 max-w-md">
      <h1 class="text-3xl font-bold text-gray-800">Oops....</h1>
      <h2 class="text-2xl font-semibold text-gray-900">Trang này không tồn tại</h2>
      <p class="text-gray-500">
        Trang này không tồn tại hoặc không thể tìm thấy!<br />
        Vui lòng quay về trang chủ.
      </p>

      <!-- 🧭 Gọi component button -->
      <TrangChuBtn to="/" label="Trở về trang chủ" color="blue" />
    </div>

    <div class="max-w-md mt-10 md:mt-0">
      <img :src="image404" alt="404 Not Found" class="w-full" />
    </div>
  </div>
</template>

<script setup>
import TrangChuBtn from '../Buttons/TrangChuBtn.vue'

import logo from '../Logo.vue'
import image404 from './404notfound.jpg'

</script>
