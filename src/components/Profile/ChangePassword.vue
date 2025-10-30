<script setup>
import { ref, watch } from "vue";
import { changePassword } from "./profile.js";

const formData = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const message = ref("");

watch(
  () => message.value,
  (newVal) => {
    if (newVal) {
      // sau 3 giây xóa message
      setTimeout(() => {
        message.value = "";
      }, 3000);
    }
  }
);

const refresh = () => {
  formData.value.confirmPassword = "";
  formData.value.newPassword = "";
  formData.value.oldPassword = "";
};

const submitForm = async () => {
  if (formData.value.oldPassword.trim() === "") {
    message.value = "Mật khẩu hiện tại không được để trống";

    return;
  } else if (formData.value.oldPassword.trim().length < 6) {
    message.value = "Mật khẩu hiện tại phải từ 6 ký tự trở lên";

    return;
  } else if (
    formData.value.newPassword.trim() === "" ||
    formData.value.confirmPassword.trim() === ""
  ) {
    message.value = "Mật khẩu mới hoặc xác nhận mật khẩu bị trống";

    return;
  } else if (
    formData.value.newPassword.trim().length < 6 ||
    formData.value.confirmPassword.trim().length < 6
  ) {
    message.value = "Mật khẩu mới hoặc xác nhận mật khẩu phải hơn 6 ký tự";

    return;
  } else if (
    formData.value.newPassword.trim() !== formData.value.confirmPassword.trim()
  ) {
    message.value = "Mật khẩu mới và xác nhận mật khẩu phải giống nhau";

    return;
  } else {
    const body = {
      oldPassword: formData.value.oldPassword,
      newPassword: formData.value.newPassword,
      confirmPassword: formData.value.confirmPassword,
    };

    const res = await changePassword(body);
    if (res.status === 200) {
      alert("Đổi mật khẩu thành công!");
      refresh();
    } else {
      message.value = res.message;
    }
  }
};
</script>
<template>
  <div class="w-full">
    <div
      class="grid grid-cols-1 content-center bg-white shadow-[0_0_15px_3px_rgba(0,0,0,0.15)] rounded-xl p-6"
    >
      <div class="pb-4">
        <h1 class="text-xl font-bold text-[#3E435D]">Đổi mật khẩu</h1>
        <p v-if="message" class="text-red-400">*{{ message }}</p>
      </div>

      <form @submit.prevent>
        <div class="mb-2">
          <label
            for="currentPass"
            class="block mb-2 text-sm font-medium text-gray-700"
            >Mật khẩu hiện tại</label
          >
          <input
            v-model="formData.oldPassword"
            type="text"
            name="currentPass"
            placeholder="Nhập mật khẩu hiện tại"
            class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div class="mb-2">
          <label
            for="newPass"
            class="block mb-2 text-sm font-medium text-gray-700"
            >Mật khẩu mới</label
          >
          <input
            v-model="formData.newPassword"
            type="text"
            name="newPass"
            placeholder="Nhập mật khẩu mới"
            class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div class="mb-2">
          <label
            for="confirmPass"
            class="block mb-2 text-sm font-medium text-gray-700"
            >Xác nhận mật khẩu</label
          >
          <input
            v-model="formData.confirmPassword"
            type="text"
            name="confirmPass"
            placeholder="Nhập mật khẩu mới để xác nhận"
            class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </form>

      <!-- Btns -->
      <div class="w-full flex justify-end gap-2">
        <button
          @click="refresh()"
          class="bg-[#007AFF] hover:bg-[#006aff] text-white p-2 rounded-lg flex gap-2"
        >
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
            />
          </svg>

          <span>Tải lại</span>
        </button>

        <button
          @click="submitForm()"
          class="bg-[#007AFF] hover:bg-[#006aff] text-white p-2 rounded-lg flex gap-2"
        >
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"
            />
          </svg>
          <span>Lưu</span>
        </button>
      </div>
    </div>
  </div>
</template>
