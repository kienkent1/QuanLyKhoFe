<script setup>
import logo from '../Logo.vue';
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

                <form class="space-y-5">

                    <!-- Tên tài khoản -->
                    <div class="relative">
                        <input type="text" id="username" required class="peer w-full border-2 border-gray-500 rounded-lg px-2.5 pt-3 pb-2 text-sm
             focus:ring-blue-500 focus:border-blue-700 placeholder-transparent" placeholder="Tên tài khoản" />
                        <label for="username" class="absolute left-3 top-2 bg-white px-1 text-gray-600 text-sm transition-all duration-200
             peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 
             peer-placeholder-shown:text-base 
             peer-focus:top-[-6px] peer-focus:text-blue-700 peer-focus:text-xs
             peer-valid:top-[-6px] peer-valid:text-blue-700 peer-valid:text-xs">
                            Tên tài khoản
                        </label>
                    </div>

                    <!-- Email -->
                    <div class="relative">
                        <input type="email" id="email" required class="peer w-full border-2 border-gray-500 rounded-lg px-2.5 pt-3 pb-2 text-sm
           focus:ring-blue-500 focus:border-blue-700 placeholder-transparent" placeholder="Email" />
                        <label for="email"
                            class="absolute left-3 top-2 bg-white px-1 text-gray-600 text-sm transition-all duration-200
           peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 
           peer-placeholder-shown:text-base 
           peer-focus:top-[-6px] peer-focus:text-blue-700 peer-focus:text-xs
           peer-not-placeholder-shown:top-[-6px] peer-not-placeholder-shown:text-blue-700 peer-not-placeholder-shown:text-xs">
                            Email
                        </label>
                    </div>

                    <!-- ID -->
                    <div class="relative">
                        <input type="text" id="userid" required class="peer w-full border-2 border-gray-500 rounded-lg px-2.5 pt-3 pb-2 text-sm
             focus:ring-blue-500 focus:border-blue-700 placeholder-transparent" placeholder="Id của bạn" />
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
                        <input type="password" id="password" required class="peer w-full border-2 border-gray-500 rounded-lg px-2.5 pt-3 pb-2 text-sm
             focus:ring-blue-500 focus:border-blue-700 placeholder-transparent" placeholder="Mật khẩu" />
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
                        <input type="password" id="confirm-password" required class="peer w-full border-2 border-gray-500 rounded-lg px-2.5 pt-3 pb-2 text-sm
             focus:ring-blue-500 focus:border-blue-700 placeholder-transparent" placeholder="Xác nhận mật khẩu" />
                        <label for="confirm-password" class="absolute left-3 top-2 bg-white px-1 text-gray-600 text-sm transition-all duration-200
             peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 
             peer-placeholder-shown:text-base 
             peer-focus:top-[-6px] peer-focus:text-blue-700 peer-focus:text-xs
             peer-valid:top-[-6px] peer-valid:text-blue-700 peer-valid:text-xs">
                            Xác nhận mật khẩu
                        </label>
                    </div>

                    <!-- Nút Đăng ký -->
                    <button type="submit" class="w-full bg-blue-800 text-white py-2.5 rounded-lg font-medium 
         shadow-md shadow-gray-500/50 
         transition-all duration-300 
         hover:bg-blue-900 hover:scale-105 hover:shadow-lg hover:shadow-gray-600/60 
         active:scale-95">
                        Đăng ký
                    </button>

                </form>

                <button class="w-full mt-4 relative flex items-center justify-center gap-2 
         border-2 border-gray-300 rounded-lg py-2.5 
         bg-white 
         shadow-[0px_8px_12px_rgba(0,0,0,0.15)] 
         transition-all duration-300 
         hover:shadow-[0px_10px_15px_rgba(0,0,0,0.25)] 
         hover:-translate-y-0.5 active:scale-95">

                    <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google"
                        class="w-5 h-5 absolute left-4" />
                    <span class="text-blue-700 font-medium">Đăng nhập với Google</span>
                </button>


                <p class="text-center text-sm text-gray-600 mt-4">
                    Bạn đã có tài khoản?
                    <a href="#" class="text-blue-600 hover:underline">Đăng nhập</a>
                </p>
            </div>
        </div>
    </div>
</template>
