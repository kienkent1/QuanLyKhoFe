<template>
  <div
    class="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white px-6 md:px-16 animate-slide-in"
  >
    <logo />

    <div class="text-center md:text-left space-y-4 max-w-md">
      <h1 class="text-3xl font-bold text-gray-800">Không đủ quyền</h1>
      <h3 class="text-2xl font-semibold text-gray-500">
        Bạn không có đủ quyền hạn để dùng trang này
      </h3>

      <!-- 🧭 Gọi component button -->
      <TrangChuBtn to="/" label="Trở về trang chủ" color="blue" />
    </div>

    <div class="max-w-md mt-10 md:mt-0">
      <img src="./403.png" alt="403 " class="w-full" />
    </div>
  </div>
</template>

<script setup>
import TrangChuBtn from "../buttons/TrangChuBtn.vue";
import Logo from "../Logo.vue";
</script>
