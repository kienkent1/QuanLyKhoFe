<template>
  <div class="min-h-screen flex justify-center items-center bg-white">
    <div class="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-[1100px] pb-10">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-xl font-semibold text-gray-800">
            Xin chào, {{ user.fullName }}
          </h1>
          <p class="text-sm text-gray-500">{{ formattedDate }}</p>
        </div>
        <div class="flex gap-3">
          <button
            class="flex items-center gap-2 px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.232 5.232l3.536 3.536M9 11l6.536-6.536a2.5 2.5 0 113.536 3.536L12.536 14.5H9v-3.5z"
              />
            </svg>
            Chỉnh sửa
          </button>

          <button
            @click="showChangePassword = true"
            class="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition"
          >
            Đổi mật khẩu
          </button>
        </div>
      </div>

      <!-- Thông tin người dùng -->
      <div class="flex items-center mb-6">
        <div class="relative group">
          <img
            :src="user.avatar"
            alt="avatar"
            class="w-20 h-20 rounded-full object-cover border-4 border-white shadow"
          />
          <label
            for="avatarUpload"
            class="absolute bottom-0 right-0 bg-white text-blue-600 p-1.5 rounded-full border border-gray-300 cursor-pointer shadow-md hover:bg-gray-100 transition opacity-0 group-hover:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7h2l2-3h10l2 3h2a2 2 0 012 2v9a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2z"
              />
              <circle cx="12" cy="13" r="3" />
            </svg>
          </label>
          <input
            type="file"
            id="avatarUpload"
            accept="image/*"
            class="hidden"
            @change="updateAvatar"
          />
        </div>

        <div class="ml-4">
          <h2 class="text-lg font-semibold text-gray-800">{{ user.fullName }}</h2>
          <p class="text-gray-500 text-sm">{{ user.email }}</p>
        </div>
      </div>

      <!-- Form thông tin -->
      <div class="grid grid-cols-2 gap-5">
        <div class="space-y-4">
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-1">
              Tên người dùng
            </label>
            <input
              type="text"
              v-model="user.username"
              class="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-medium mb-1">
              Giới tính
            </label>
            <select
              v-model="user.gender"
              class="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            >
              <option value="" disabled>Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-medium mb-1">
              Ngày sinh
            </label>
            <input
              type="date"
              v-model="user.dob"
              class="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-1">
              Tên đầy đủ
            </label>
            <input
              type="text"
              v-model="user.fullName"
              class="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-medium mb-1">
              Chức vụ
            </label>
            <input
              type="text"
              v-model="user.role"
              class="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-medium mb-1">
              Số điện thoại
            </label>
            <input
              type="text"
              v-model="user.phone"
              class="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      <!-- Email -->
      <div class="mt-6 pt-4">
        <h2 class="text-gray-800 text-sm mb-1 font-semibold">Email của tôi</h2>

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
            <p class="text-xs text-gray-400">
              Đã cập nhật {{ monthsAgo }} tháng trước
            </p>
          </div>
        </div>

        <button
          class="mt-3 px-4 py-1.5 bg-gray-200 hover:bg-gray-400 text-blue-500 rounded-lg shadow transition"
        >
          Đổi email
        </button>
      </div>
    </div>
  </div>

  <change-password 
    v-if="showChangePassword"
    @close="showChangePassword = false"
  />
</template>

<script setup>
import useProfile from "./Profile.js";
const {
  user,
  formattedDate,
  monthsAgo,
  showChangePassword,
  updateAvatar
} = useProfile();
</script>

<style lang="postcss">
html,
body {
  overflow: hidden;
}
</style>
