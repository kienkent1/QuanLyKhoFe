<template>
  <div class="min-h-screen flex justify-center items-center bg-gray-50">
    <div
      class="animate-slide-in-left bg-white p-8 rounded-2xl border border-gray-300 
      shadow-[10px_10px_25px_rgba(0,0,0,0.25),-10px_10px_25px_rgba(0,0,0,0.25),0px_-5px_5px_rgba(0,0,0,0.15)] 
      w-full max-w-md relative">
      
      <router-link
        to="/profile"
        class="absolute top-3 left-3 text-gray-600 hover:text-blue-700 text-xl"
      >
        ←
      </router-link>

      <h2 class="text-2xl font-bold text-center text-gray-900 mb-5" style="color: #071B41">
        Đổi mật khẩu
      </h2>

      <form class="space-y-5" @submit.prevent="changePassword">
        <!-- Mật khẩu cũ -->
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

        <!-- Mật khẩu mới -->
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
            :class="[ newPassword ? 'top-[-6px] text-blue-700 text-xs' : 'peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-6px] peer-focus:text-blue-700 peer-focus:text-xs' ]"
          >
            Mật khẩu mới
          </label>
          <button type="button" @click="toggleNew" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-700">
            <i :class="showNew ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'"></i>
          </button>
        </div>

        <!-- Xác nhận mật khẩu -->
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
            :class="[ confirmPassword ? 'top-[-6px] text-blue-700 text-xs' : 'peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-6px] peer-focus:text-blue-700 peer-focus:text-xs' ]"
          >
            Xác nhận mật khẩu
          </label>
          <button type="button" @click="toggleConfirm" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-700">
            <i :class="showConfirm ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'"></i>
          </button>
        </div>

        <button type="submit"
          class="w-full bg-blue-800 text-white py-2.5 rounded-lg font-medium 
          shadow-md shadow-gray-500/50 transition-all duration-300 
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
import { useRouter } from 'vue-router'

const router = useRouter()

const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showNew = ref(false)
const showConfirm = ref(false)

const toggleNew = () => (showNew.value = !showNew.value)
const toggleConfirm = () => (showConfirm.value = !showConfirm.value)

const changePassword = () => {
  if (newPassword.value !== confirmPassword.value) {
    alert('Mật khẩu xác nhận không khớp!')
    return
  }
  alert('Đổi mật khẩu thành công!')
  router.push('/profile')
}
</script>

<style scoped>
@keyframes slide-in-left {
  0% { transform: translateX(-40px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}
.animate-slide-in-left {
  animation: slide-in-left 0.6s ease forwards;
}
</style>
