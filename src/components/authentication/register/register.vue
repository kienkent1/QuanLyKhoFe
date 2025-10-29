<script setup>
import logo from '../../logo.vue';
import GoogleButton from '../btn-gg/btn-google.vue'
import { ref } from 'vue';
import register from './register.js';

const errors = ref({})
const idNhanVien = ref('');
const username = ref('');
const password = ref('');
const confirmPassword = ref('');

async function submitRegister(){
    errors.value = {}

  if (!username.value.trim())
    errors.value.username = 'Tên tài khoản không được để trống'

  if (!idNhanVien.value.trim())
    errors.value.idNhanVien = 'Vui lòng nhập ID'

  if (!password.value)
    errors.value.password = 'Mật khẩu không được để trống'

  if (password.value && password.value.length < 6)
    errors.value.password = 'Mật khẩu phải có ít nhất 6 ký tự'

  if (confirmPassword.value !== password.value)
    errors.value.confirmPassword = 'Mật khẩu xác nhận không khớp'

  if (Object.keys(errors.value).length === 0) {
    const obj = {
        idNhanVien : idNhanVien.value,
        tenDangNhap : username.value,
        password : password.value
    }
   const res = await register(obj)

   if(res.status === 400 || res.status === 404 || res.status === 500) 
   errors.value.message = `${res.data.message}`
   
  }
}

async function handleGoogleToken(token) {
 if (!idNhanVien.value.trim())
    errors.value.idNhanVien = 'Vui lòng nhập ID'

    if (Object.keys(errors.value).length === 0) {
    const obj = {
        gg: {
            idNhanVien: idNhanVien.value,
            tenDangNhap: username.value !== null ? username.value  : null,
        },
        dto: {
            idToken: token
        }
        }
   const res = await register(obj)

   if(res.status === 400 || res.status === 404 || res.status === 500) 
   errors.value.message = `${res.data.message}`
   
  }
}
</script>

<template>
    <div class="flex h-screen bg-gray-100">
        <!-- Logo -->
        <logo />

        <div class="flex flex-1 items-center justify-center ">
            <div class="animate-slide-in-left bg-white p-8 rounded-2xl border border-gray-300 
            shadow-[10px_10px_25px_rgba(0,0,0,0.25),-10px_10px_25px_rgba(0,0,0,0.25),0px_-5px_5px_rgba(0,0,0,0.15)] 
            w-full max-w-md">
                <h2 class="text-2xl font-bold text-left text-gray-900 mb-2 text-shadow-lg " style="color: #071B41">Tạo tài khoản mới
                </h2>
                <p class="text-center text-gray-600 mb-6">Chào mừng đến với công ty Bấu De</p>

                <form class="space-y-5" @submit.prevent="submitRegister">
                    <p v-if="errors.message" class="text-red-500 text-sm mt-1">{{ errors.message }}</p>
                    <!-- Tên tài khoản -->
                    <div class="relative">
                        <input v-model="username" type="text" id="username" required class="peer w-full border-2 border-gray-500 rounded-lg px-2.5 pt-3 pb-2 text-sm
             focus:ring-blue-500 focus:border-blue-700 placeholder-transparent" placeholder="Tên tài khoản" />
             <p v-if="errors.username" class="text-red-500 text-sm mt-1">{{ errors.username }}</p>
                        <label for="username" class="absolute left-3 top-2 bg-white px-1 text-gray-600 text-sm transition-all duration-200
             peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 
             peer-placeholder-shown:text-base 
             peer-focus:top-[-6px] peer-focus:text-blue-700 peer-focus:text-xs
             peer-valid:top-[-6px] peer-valid:text-blue-700 peer-valid:text-xs">
                            Tên tài khoản
                        </label>
                    </div>

                    <!-- ID -->
                    <div class="relative">
                        <input v-model="idNhanVien" type="text" id="userid" required class="peer w-full border-2 border-gray-500 rounded-lg px-2.5 pt-3 pb-2 text-sm
             focus:ring-blue-500 focus:border-blue-700 placeholder-transparent" placeholder="Id của bạn" />
             <p v-if="errors.idNhanVien" class="text-red-500 text-sm mt-1">{{ errors.idNhanVien }}</p>
                        <label for="userid" class="absolute left-3 top-2 bg-white px-1 text-gray-600 text-sm transition-all duration-200
             peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 
             peer-placeholder-shown:text-base 
             peer-focus:top-[-6px] peer-focus:text-blue-700 peer-focus:text-xs
             peer-valid:top-[-6px] peer-valid:text-blue-700 peer-valid:text-xs">
                            Id của bạn
                        </label>
                    </div>

                    <!-- Mật khẩu -->
                    <div class="relative">
                        <input v-model="password" type="password" id="password" required class="peer w-full border-2 border-gray-500 rounded-lg px-2.5 pt-3 pb-2 text-sm
             focus:ring-blue-500 focus:border-blue-700 placeholder-transparent" placeholder="Mật khẩu" />
             <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
                        <label for="password" class="absolute left-3 top-2 bg-white px-1 text-gray-600 text-sm transition-all duration-200
             peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 
             peer-placeholder-shown:text-base 
             peer-focus:top-[-6px] peer-focus:text-blue-700 peer-focus:text-xs
             peer-valid:top-[-6px] peer-valid:text-blue-700 peer-valid:text-xs">
                            Mật khẩu
                        </label>
                    </div>

                    <!-- Xác nhận mật khẩu -->
                    <div class="relative">
                        <input v-model="confirmPassword" type="password" id="confirm-password" required class="peer w-full border-2 border-gray-500 rounded-lg px-2.5 pt-3 pb-2 text-sm
             focus:ring-blue-500 focus:border-blue-700 placeholder-transparent" placeholder="Xác nhận mật khẩu" />
             <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
                        <label for="confirm-password" class="absolute left-3 top-2 bg-white px-1 text-gray-600 text-sm transition-all duration-200
             peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 
             peer-placeholder-shown:text-base 
             peer-focus:top-[-6px] peer-focus:text-blue-700 peer-focus:text-xs
             peer-valid:top-[-6px] peer-valid:text-blue-700 peer-valid:text-xs">
                            Xác nhận mật khẩu
                        </label>
                    </div>

                    <!-- Nút Đăng ký -->
                    <button @click="submitRegister()" class="w-full bg-blue-800 text-white py-2.5 rounded-lg font-medium 
         shadow-md shadow-gray-500/50 
         transition-all duration-300 
         hover:bg-blue-900 hover:scale-105 hover:shadow-lg hover:shadow-gray-600/60 
         active:scale-95">
                        Đăng ký
                    </button>

                </form>

                <GoogleButton
                @success="handleGoogleToken"
                >
                Đăng ký bằng Google
                </GoogleButton>


                <p class="text-center text-sm text-gray-600 mt-4">
                    Bạn đã có tài khoản?
                    <a href="/login" class="text-blue-600 hover:underline">Đăng nhập</a>
                </p>
            </div>
        </div>
    </div>
</template>
