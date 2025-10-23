<template>
  <div class="min-h-screen flex justify-center items-center bg-white">
    <div class="animate-slide-in-left bg-white shadow-2xl rounded-2xl p-8 w-full max-w-[1100px] pb-10">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-xl font-semibold text-gray-800">
            Xin chào, {{ user.fullName }}
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

          <router-link
            to="/change-password"
            class="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition inline-block"
          >
            Đổi mật khẩu
          </router-link>
        </div>
      </div>

      <!-- Avatar -->
      <div class="flex items-center mb-6">
        <div class="relative group">
          <img
            :src="user.avatar || defaultAvatar"
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
          <h2 class="text-lg font-semibold text-gray-800">{{ user.fullName }}</h2>
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
              v-model="user.username"
              readonly
              class="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-md focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-medium mb-1">Giới tính</label>
            <select
              v-model="user.gender"
              disabled
              class="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-md bg-white"
            >
              <option value="" disabled>Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-medium mb-1">Ngày sinh</label>
            <input
              type="date"
              v-model="user.dob"
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
              v-model="user.fullName"
              readonly
              class="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-md"
            />
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-medium mb-1">Chức vụ</label>
            <input
              type="text"
              v-model="user.role"
              readonly
              class="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-medium mb-1">Số điện thoại</label>
            <input
              type="text"
              v-model="user.phone"
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
            <p class="text-xs text-gray-400">Đã cập nhật {{ monthsAgo }} ngày trước</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getProfile } from "./Profile.js";
import axios from "axios";
import VueCookies from "vue-cookies";

const user = ref({});
const isEditing = ref(false);
const formattedDate = new Date().toLocaleDateString("vi-VN");
const monthsAgo = 1;
const defaultAvatar = "/default-avatar.png";

// Load hồ sơ
const loadProfile = async () => {
  const result = await getProfile();
  if (result.success) {
    user.value = result.data;
  } else {
    alert(result.message);
  }
};

// Bật chỉnh sửa avatar
const enableEdit = () => {
  isEditing.value = true;
};

// PATCH avatar
const saveAvatar = async () => {
  if (!user.value.avatarFile) {
    alert("Vui lòng chọn ảnh mới trước khi lưu!");
    return;
  }

  const formData = new FormData();
  formData.append("file", user.value.avatarFile); // ⚠️ Trùng với [FromForm] IFormFile file

  try {
    const token = VueCookies.get("accessToken"); // ✅ Lấy token từ cookie
    if (!token) {
      alert("Không tìm thấy token. Vui lòng đăng nhập lại.");
      return;
    }

    const res = await axios.patch("https://localhost:5001/api/NhanVien/avatar", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200 || res.status === 201) {
      alert("Cập nhật ảnh thành công!");
      isEditing.value = false;
      await loadProfile();
    } else {
      alert("Không thể cập nhật ảnh. Vui lòng thử lại.");
    }
  } catch (err) {
    console.error("❌ Lỗi PATCH avatar:", err);
    alert("Đã xảy ra lỗi khi cập nhật ảnh.");
  }
};

// Hủy chỉnh sửa
const cancelEdit = async () => {
  isEditing.value = false;
  await loadProfile();
};

// Xem trước avatar
const updateAvatar = (e) => {
  const file = e.target.files[0];
  if (file) {
    user.value.avatarFile = file;
    user.value.avatar = URL.createObjectURL(file);
  }
};

onMounted(loadProfile);
</script>


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
