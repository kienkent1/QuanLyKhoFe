<script setup>
import { ref, onMounted, reactive } from "vue";
import * as info from "./profile.js";

import ChangePassword from "./change-password.vue";

const user = ref({});
const isEditing = ref(false);
const formattedDate = new Date().toLocaleDateString("vi-VN");

// Load hồ sơ
const loadProfile = async () => {

  const res = await info.getProfile();
  if(res.data.success && res.data.data){
    user.value = res.data.data;
    user.value.ngaySinh = new Date(user.value.ngaySinh).toISOString().split("T")[0]; //res.data.data.ngaySinh

    if(user.value.updateAt){
      user.value.updateAt = new Date(user.value.updateAt).toISOString().split("T")[0];
    }
    
  }
  else{
    alert('Lỗi không thể lấy được profile');
  }
}
onMounted(loadProfile);
</script>
<template >
  <div class = "w-full flex justify-center ">
    <div class="animate-slide-in-left bg-white  shadow-2xl rounded-2xl p-8 w-full max-w-[1100px] pb-10 ">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-xl font-semibold text-gray-800">
            Xin chào, {{ user.tenNhanVien }}!
          </h1>
          <p class="text-sm text-gray-500">{{ formattedDate }}</p>
        </div>

        <div class="flex gap-3">
          <button
            v-if="!isEditing"
            @click="enableEdit"
            class="flex items-center gap-2 px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition"
          >
            Chỉnh sửa
          </button>

          <div v-else class="flex gap-3">
            <button
              @click="saveAvatar"
              class="px-4 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition"
            >
              Lưu
            </button>

            <button
              @click="cancelEdit"
              class="px-4 py-1.5 bg-gray-400 hover:bg-gray-500 text-white rounded-lg shadow transition"
            >
              Hủy
            </button>
          </div>

          <button
            class="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition inline-block"
          >
            Đổi mật khẩu
          </button>
        </div>
      </div>

      <!-- Avatar -->
      <div class="flex items-center mb-6">
        <div class="relative group">
          <img
            :src="user.urlHinh !== null ? user.urlHinh : 'src/assets/default-avt.png'"
            alt="avatar"
            class="w-20 h-20 rounded-full object-cover border-4 border-white shadow"
          />

          <!-- Icon upload -->
          <label
            v-if="isEditing"
            for="avatarUpload"
            class="absolute bottom-0 right-0 bg-white text-blue-600 p-1.5 rounded-full border border-gray-300 cursor-pointer shadow-md hover:bg-gray-100 transition opacity-0 group-hover:opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 7h2l2-3h10l2 3h2a2 2 0 012 2v9a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
          </label>

          <input
            v-if="isEditing"
            type="file"
            id="avatarUpload"
            accept="image/*"
            class="hidden"
            @change="updateAvatar"
          />
        </div>

        <div class="ml-4">
          <h2 class="text-lg font-semibold text-gray-800">{{ user.tenNhanVien }}</h2>
          <p class="text-gray-500 text-sm">{{ user.email }}</p>
        </div>
      </div>

      <!-- Thông tin cá nhân -->
      <div class="grid grid-cols-2 gap-5">
        <div class="space-y-4">
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-1">Tên người dùng</label>
            <input
              type="text"
              v-model="user.userName"
              readonly
              class="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-md focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-medium mb-1">Giới tính</label>
            <select
              v-model="user.gioiTinh"
              disabled
              class="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-md bg-white"
            >
              <option value="" disabled>Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-medium mb-1">Ngày sinh</label>
            <input
              type="date"
              v-model="user.ngaySinh"
              readonly
              class="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-md"
            />
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-1">Tên đầy đủ</label>
            <input
              type="text"
              v-model="user.tenNhanVien"
              readonly
              class="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-md"
            />
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-medium mb-1">Chức vụ</label>
            <input
              type="text"
              v-model="user.chucVu"
              readonly
              class="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-medium mb-1">Số điện thoại</label>
            <input
              type="text"
              v-model="user.sdt"
              readonly
              class="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-md"
            />
          </div>
        </div>
      </div>

      <!-- Email -->
      <div class="mt-6 pt-4">
        <h2 class="text-gray-800 text-sm mb-1 font-semibold">Email của tôi</h2>
        <div class="flex items-start space-x-3">
          <div class="mt-0.5 bg-blue-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M2.94 5.94A2 2 0 0 1 4.586 5h10.828a2 2 0 0 1 1.647.94L10 10.382 2.94 5.94zM18 8.118v6.882A2 2 0 0 1 16 17H4a2 2 0 0 1-2-2V8.118l7.445 4.47a2 2 0 0 0 2.11 0L18 8.118z"
              />
            </svg>
          </div>
          <div>
            <p class="text-gray-600 font-medium">{{ user.email }}</p>
            <p v-if="user.updateAt" class="text-xs text-gray-400">Đã cập nhật {{ user.updateAt }} </p>
            <p v-else class="text-xs text-gray-400">Tài khoản chưa cập nhật gì kể từ lúc tạo</p>
          </div>
        </div>
      </div>
    </div>
</div>
<div class="w-full flex justify-center">
<div class="fixed top-50  z-40 w-80 ">
<ChangePassword/>
</div>
</div>
</template>




<style>
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
</style>
