<template>
  <div class="fixed inset-0 bg-gray-500/30 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
    <div
      class="animate-slide-in-left bg-white p-8 rounded-2xl border border-gray-300 
      shadow-[10px_10px_25px_rgba(0,0,0,0.25),-10px_10px_25px_rgba(0,0,0,0.25),0px_-5px_5px_rgba(0,0,0,0.15)] 
      w-full max-w-md relative">
      <button @click="$emit('close')" class="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-xl">
        ✕
      </button>

      <h2 class="text-2xl font-bold text-left text-gray-900 mb-2" style="color: #071B41">
        Đổi mật khẩu
      </h2>
      <form class="space-y-5">
        <div class="relative">
          <input type="password" id="old-password" v-model="oldPassword" required
            class="peer w-full border-2 border-gray-500 rounded-lg px-2.5 pt-3 pb-2 text-sm
            focus:ring-blue-500 focus:border-blue-700 placeholder-transparent"
            placeholder="Mật khẩu cũ" />
          <label for="old-password"
            class="absolute left-3 top-2 bg-white px-1 text-gray-600 text-sm transition-all duration-200
            peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:text-base 
            peer-focus:top-[-6px] peer-focus:text-blue-700 peer-focus:text-xs">
            Mật khẩu cũ
          </label>
        </div>
<div class="relative">
  <input
    :type="showNew ? 'text' : 'password'"
    id="new-password"
    v-model="newPassword"
    required
    class="peer w-full border-2 border-gray-500 rounded-lg px-2.5 pt-3 pb-2 text-sm
    focus:ring-blue-500 focus:border-blue-700 placeholder-transparent pr-10"
    placeholder="Mật khẩu mới"
  />
  <label
    for="new-password"
    class="absolute left-3 bg-white px-1 text-gray-600 text-sm transition-all duration-200"
    :class="[
      newPassword ? 'top-[-6px] text-blue-700 text-xs' :
      'peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-6px] peer-focus:text-blue-700 peer-focus:text-xs'
    ]"
  >
    Mật khẩu mới
    </label>
    <button
        type="button"
        @click="toggleNew"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-700"
    >
        <svg v-if="!showNew" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 
            0 8.268 2.943 9.542 7-1.274 4.057-5.065 
            7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

    <div class="relative">
    <input
        :type="showConfirm ? 'text' : 'password'"
        id="confirm-password"
        v-model="confirmPassword"
        required
        class="peer w-full border-2 border-gray-500 rounded-lg px-2.5 pt-3 pb-2 text-sm
        focus:ring-blue-500 focus:border-blue-700 placeholder-transparent pr-10"
        placeholder="Xác nhận mật khẩu"
    />
    <label
        for="confirm-password"
        class="absolute left-3 bg-white px-1 text-gray-600 text-sm transition-all duration-200"
        :class="[
        confirmPassword ? 'top-[-6px] text-blue-700 text-xs' :
        'peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-6px] peer-focus:text-blue-700 peer-focus:text-xs'
        ]"
    >
        Xác nhận mật khẩu
    </label>

    <button
        type="button"
        @click="toggleConfirm"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-700"
    >
        <svg v-if="!showConfirm" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 
            0 8.268 2.943 9.542 7-1.274 4.057-5.065 
            7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <button type="submit"
          class="w-full bg-blue-800 text-white py-2.5 rounded-lg font-medium 
          shadow-md shadow-gray-500/50 
          transition-all duration-300 
          hover:bg-blue-900 hover:scale-105 hover:shadow-lg hover:shadow-gray-600/60 
          active:scale-95">
          Đổi mật khẩu
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showNew = ref(false)
const showConfirm = ref(false)

const toggleNew = () => (showNew.value = !showNew.value)
const toggleConfirm = () => (showConfirm.value = !showConfirm.value)
</script>

<style scoped>
@keyframes slide-in-left {
  0% {
    transform: translateX(-40px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
.animate-slide-in-left {
  animation: slide-in-left 0.6s ease forwards;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-in-out;
}
</style>
