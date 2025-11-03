<script setup>
import { ref, onMounted, reactive } from "vue";
import * as info from "./profile.js";
import Loader from "../helper-components/Loader.vue";

import ChangePassword from "./ChangePassword.vue";

const user = ref(null);
const formattedDate = new Date().toLocaleDateString("vi-VN");
const fileInput = ref(null);

const isChangePassword = ref(false);
// Load hồ sơ
const loadProfile = async () => {
  const res = await info.getProfile();
  if (res.data.success && res.data.data) {
    user.value = res.data.data;
    user.value.ngaySinh = new Date(user.value.ngaySinh)
      .toISOString()
      .split("T")[0]; //res.data.data.ngaySinh

    if (user.value.updateAt) {
      user.value.updateAt = new Date(user.value.updateAt)
        .toISOString()
        .split("T")[0];
    }
  } else {
    alert("Lỗi không thể lấy được profile");
  }
};

//Đổi avt
const confirmAvatar = ref(false);
const fileChange = ref(null);
const openFileInput = () => {
  fileInput.value.click();
};
function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    user.value.urlHinh = URL.createObjectURL(file);
    fileChange.value = file;
    confirmAvatar.value = true;
  }
}

const changeAvt = async () => {
  const data = new FormData();
  data.append("file", fileChange.value);
  const res = await info.updateAvatar(data);
  if (res.status === 200) {
    alert("Đổi ảnh thành công");
  } else {
    alert("Lỗi khi đổi ảnh");
  }
  await loadProfile();
};
//end đổi avt
onMounted(loadProfile);
</script>
<template>
  <div v-if="user">
    <div class="w-full flex justify-center">
      <div
        class="animate-slide-in-left bg-white shadow-2xl rounded-2xl p-8 w-full max-w-[1100px] pb-10"
      >
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="text-xl font-semibold text-gray-800">
              Xin chào, {{ user.tenNhanVien }}!
            </h1>
            <p class="text-sm text-gray-500">{{ formattedDate }}</p>
          </div>

          <div class="flex gap-3">
            <input
              ref="fileInput"
              accept="image/*"
              type="file"
              hidden
              @change="handleFileChange"
            />
            <button
              v-if="!confirmAvatar"
              @click="openFileInput"
              class="flex items-center gap-2 px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition"
            >
              Đổi ảnh
            </button>
            <button
              v-if="confirmAvatar"
              @click="changeAvt"
              class="flex items-center gap-2 px-4 py-1.5 bg-green-600 hover:bg-green-800 text-white rounded-lg shadow transition"
            >
              Xác nhận
            </button>
            <button
              v-if="confirmAvatar"
              @click="(confirmAvatar = false), loadProfile()"
              class="flex items-center gap-2 px-4 py-1.5 bg-gray-400 hover:bg-gray-600 text-white rounded-lg shadow transition"
            >
              Hủy
            </button>

            <button
              @click="isChangePassword = true"
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
              :src="
                user.urlHinh !== null
                  ? user.urlHinh
                  : 'src/assets/default-avt.png'
              "
              alt="avatar"
              class="w-20 h-20 rounded-full object-cover border-4 border-white shadow"
            />
            <button
              @click="openFileInput"
              class="rounded-4xl bg-white shadow-md right-0 absolute top-15 cursor-pointer"
            >
              <svg
                class="w-5 h-5 text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.5 4.586A2 2 0 0 1 8.914 4h6.172a2 2 0 0 1 1.414.586L17.914 6H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1.086L7.5 4.586ZM10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div class="ml-4">
            <h2 class="text-lg font-semibold text-gray-800">
              {{ user.tenNhanVien }}
            </h2>
            <p class="text-gray-500 text-sm">{{ user.email }}</p>
          </div>
        </div>

        <!-- Thông tin cá nhân -->
        <div class="grid grid-cols-2 gap-5">
          <div class="space-y-4">
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-1"
                >Tên người dùng</label
              >
              <input
                type="text"
                v-model="user.userName"
                readonly
                class="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-md focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-gray-700 text-sm font-medium mb-1"
                >Giới tính</label
              >
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
              <label class="block text-gray-700 text-sm font-medium mb-1"
                >Ngày sinh</label
              >
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
              <label class="block text-gray-700 text-sm font-medium mb-1"
                >Tên đầy đủ</label
              >
              <input
                type="text"
                v-model="user.tenNhanVien"
                readonly
                class="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-md"
              />
            </div>

            <div>
              <label class="block text-gray-700 text-sm font-medium mb-1"
                >Chức vụ</label
              >
              <input
                type="text"
                v-model="user.chucVu"
                readonly
                class="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-md bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label class="block text-gray-700 text-sm font-medium mb-1"
                >Số điện thoại</label
              >
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
          <h2 class="text-gray-800 text-sm mb-1 font-semibold">
            Email của tôi
          </h2>
          <div class="flex items-start space-x-3">
            <div class="mt-0.5 bg-blue-100 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M2.94 5.94A2 2 0 0 1 4.586 5h10.828a2 2 0 0 1 1.647.94L10 10.382 2.94 5.94zM18 8.118v6.882A2 2 0 0 1 16 17H4a2 2 0 0 1-2-2V8.118l7.445 4.47a2 2 0 0 0 2.11 0L18 8.118z"
                />
              </svg>
            </div>
            <div>
              <p class="text-gray-600 font-medium">{{ user.email }}</p>
              <p v-if="user.updateAt" class="text-xs text-gray-400">
                Đã cập nhật {{ user.updateAt }}
              </p>
              <p v-else class="text-xs text-gray-400">
                Tài khoản chưa cập nhật gì kể từ lúc tạo
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isChangePassword" class="w-full flex justify-center relative">
      <div class="fixed top-50 z-40 w-80">
        <ChangePassword />
        <button
          @click="isChangePassword = false"
          class="absolute top-1 right-2 z-50 cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
  <div class="w-full flex justify-center h-150 items-center" v-else>
    <Loader />
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
