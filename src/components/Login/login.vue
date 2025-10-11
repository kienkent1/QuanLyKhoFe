<script setup>
import { ref } from 'vue';
import Logo from '../Logo.vue';

import BtnGoogle from '../Buttons/BtnGG/BtnGoogle.vue';
const showPassword = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Logo -->
    <Logo />

    <!-- Form Login -->
    <div class="flex flex-1 items-center justify-center">
      <div class="animate-slide-in-left bg-white p-8 rounded-2xl border border-gray-300 
        shadow-[10px_10px_25px_rgba(0,0,0,0.25),-10px_10px_25px_rgba(0,0,0,0.25),0px_-5px_5px_rgba(0,0,0,0.15)] 
        w-full max-w-md">

        <!-- Title -->
        <h2 class="text-2xl font-bold text-left mb-2" style="color:#071B41;">ĐĂNG NHẬP</h2>
        <p class="text-left text-gray-600 mb-6 pl-4">Chào mừng quay trở lại</p>

        <form class="space-y-5">
          <!-- Username -->
          <div class="relative">
            <input type="text" id="username" required
              class="peer w-full border-2 border-gray-500 rounded-lg px-2.5 pt-3 pb-2 text-sm 
              focus:ring-blue-500 focus:border-blue-700 "
              placeholder="Tên đăng nhập hoặc Email" />
            <label for="username"
              class="absolute left-3 top-2 bg-white px-1 text-gray-600 text-sm transition-all duration-200
              peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 
              peer-placeholder-shown:text-base 
              peer-focus:top-[-6px] peer-focus:text-blue-700 peer-focus:text-xs
              peer-valid:top-[-6px] peer-valid:text-blue-700 peer-valid:text-xs">
              Tên đăng nhập hoặc Email
            </label>
          </div>

          <!-- Password -->
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'" id="password" required
              class="peer w-full border-2 border-gray-500 rounded-lg px-2.5 pt-3 pb-2 text-sm 
              focus:ring-blue-500 focus:border-blue-700 placeholder-transparent pr-10"
              placeholder="Mật khẩu" />
            <label for="password"
              class="absolute left-3 top-2 bg-white px-1 text-gray-600 text-sm transition-all duration-200
              peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 
              peer-placeholder-shown:text-base 
              peer-focus:top-[-6px] peer-focus:text-blue-700 peer-focus:text-xs
              peer-valid:top-[-6px] peer-valid:text-blue-700 peer-valid:text-xs">
              Mật khẩu
            </label>

            <!-- Nút con mắt -->
            <button type="button" @click="togglePassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 
                     0 8.268 2.943 9.542 7-1.274 4.057-5.065 
                     7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 
                     0112 19c-4.478 0-8.269-2.943-9.543-7 
                     a10.05 10.05 0 012.003-3.368m3.016-2.59A9.959 
                     9.959 0 0112 5c4.477 0 8.268 2.943 
                     9.542 7a9.956 9.956 0 01-4.043 
                     5.197M15 12a3 3 0 11-6 0 
                     3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3l18 18"/>
              </svg>
            </button>
          </div>

          <!-- Remember + Forgot -->
          <div class="flex justify-between items-center text-sm">
            <div class="flex items-center">
              <input type="checkbox" id="remember"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
              <label for="remember" class="ml-2 text-gray-500 select-none">Ghi nhớ tài khoản</label>
            </div>
            <a href="#" class="text-blue-600 hover:underline font-medium">Quên mật khẩu?</a>
          </div>

          <!-- Nút login -->
          <button type="submit"
            class="w-full bg-blue-800 text-white py-2.5 rounded-lg font-medium 
              shadow-md shadow-gray-500/50 transition-all duration-300 
              hover:bg-blue-900 hover:scale-105 hover:shadow-lg hover:shadow-gray-600/60 
              active:scale-95">
            Đăng nhập
          </button>

          <!-- Nút Google -->
          <BtnGoogle >Đăng nhập với Google</BtnGoogle>
        </form>

        <p class="text-center text-sm text-gray-600 mt-4">
          Bạn chưa có tài khoản?
          <a href="#" class="text-blue-600 hover:underline">Đăng ký</a>
        </p>
      </div>
    </div>
  </div>
</template>
