<script setup>
import {
  ref,
  defineEmits,
  onMounted,
  reactive,
  defineExpose,
  watch,
} from "vue";
import { themNhaCungCap } from "./nha-cung-cap.js";

const formData = ref({
  TenNCC: "",
  DienThoai: "",
  Email: "",
  HinhAnh: null,
  DiaChi: {
    Tinh: "",
    Phuong: "",
    DiaChiNha: "",
    QuanHuyen: "",
  },
});

const validateData = reactive({
  message: "",
});

const previewUrl = ref(null);
const emit = defineEmits(["updatePreview", "createdNCC"]);

function handleFileChange(e) {
  const file = e.target.files[0];

  if (file) {
    formData.value.HinhAnh = file;
    previewUrl.value = URL.createObjectURL(file);
    emit("updatePreview", previewUrl.value);
  }
}

const refresh = () => {
  formData.value = {
    TenNCC: "",
    DienThoai: "",
    Email: "",
    HinhAnh: null,
    DiaChi: {
      Tinh: "",
      Phuong: "",
      DiaChiNha: "",
      QuanHuyen: "",
    },
  };
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
  }

  previewUrl.value = null;

  emit("updatePreview", null);
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegexVN = /^(0\d{9,10}|\+84\d{9,10})$/;
const nameRegex = /^[A-Za-zÀ-ỹ0-9 _-]+$/;

const createNCC = async () => {
  if (!formData.value.TenNCC || formData.value.TenNCC.trim() === "") {
    validateData.message = "Vui lòng nhập tên nhà cung cấp";

    return;
  } else if (!nameRegex.test(formData.value.TenNCC)) {
    validateData.message = "Tên nhà cung cấp không được có các ký tự đặc biệt";
    return;
  } else if (
    !formData.value.DienThoai ||
    formData.value.DienThoai.trim() === ""
  ) {
    validateData.message = "Số điện thoại  bị trống";

    return;
  } else if (!phoneRegexVN.test(formData.value.DienThoai)) {
    validateData.message = "Số điện thoại không đúng định dạng ";

    return;
  } else if (
    !formData.value.Email ||
    formData.value.Email.trim() === "" ||
    !emailRegex.test(formData.value.Email)
  ) {
    validateData.message = "Email sai định dạng hoặc bị trống";

    return;
  } else {
    const data = new FormData();
    data.append("TenNCC", formData.value.TenNCC);
    data.append("DienThoai", formData.value.DienThoai);
    data.append("Email", formData.value.Email);

    if (formData.value.HinhAnh) {
      data.append("HinhAnh", formData.value.HinhAnh);
    }

    data.append("DiaChi", JSON.stringify(formData.value.DiaChi));
    const res = await themNhaCungCap(data);

    if (res.status === 200 || res.status === 201) {
      alert("Thêm thành công");
      refresh();
      emit("createdNCC", true);
    } else {
      validateData.message = res.message;
      emit("createdNCC", false);
    }
  }
};

watch(
  () => validateData.message,
  (newVal) => {
    if (newVal) {
      // sau 3 giây xóa message
      setTimeout(() => {
        validateData.message = "";
      }, 3000);
    }
  }
);
defineExpose({
  createNCC,
});
</script>
<template>
  <div class="min-h-screen flex justify-center items-center p-6">
    <div
      class="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl border border-gray-100"
    >
      <div class="border-b flex mb-2">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Thêm nhà cung cấp</h2>
        <p v-if="validateData.message" class="text-red-400 p-2">
          *{{ validateData.message }}
        </p>
      </div>
      <!-- Form -->
      <form
        @submit.prevent
        class="grid grid-cols-1 md:grid-cols-3 gap-6"
        enctype="multipart/form-data"
      >
        <div class="mb-2">
          <!-- Tên nhà cung cấp -->
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium text-gray-700"
              >Tên nhà cung cấp</label
            >
            <input
              v-model="formData.TenNCC"
              type="text"
              placeholder="Nhập tên nhà cung cấp"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <!-- email -->
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium text-gray-700"
              >Email
            </label>
            <input
              v-model="formData.Email"
              type="email"
              placeholder="Nhập email nhà cung cấp"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <!-- Logo -->
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium text-gray-700"
              >Logo</label
            >
            <label
              for="logo"
              class="flex items-center justify-between w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm cursor-pointer hover:bg-gray-100 transition"
            >
              <span>Bấm vào để chọn ảnh</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 16l4-4 4 4m5-4l4-4 4 4M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </label>
            <input
              id="logo"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileChange"
            />
          </div>
          <div v-if="previewUrl" class="mt-3">
            <p class="text-sm text-gray-500 mb-1">Ảnh xem trước:</p>
            <img
              :src="previewUrl"
              alt="Preview"
              class="h-32 w-auto rounded-lg border shadow-sm object-contain"
            />
          </div>
        </div>

        <div>
          <!-- phone -->
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium text-gray-700"
              >Điện thoại
            </label>
            <input
              v-model="formData.DienThoai"
              type="tel"
              placeholder="Nhập số điện thoại nhà cung cấp"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <!-- mô tả -->
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium text-gray-700"
              >Địa chỉ chi tiết</label
            >
            <textarea
              v-model="formData.DiaChi.DiaChiNha"
              placeholder="Nhập địa chỉ chi tiết"
              rows="5"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm resize-none focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>
        </div>

        <div>
          <!-- địa chỉ -->
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium text-gray-700"
              >Tỉnh</label
            >
            <input
              v-model="formData.DiaChi.Tinh"
              type="text"
              placeholder="Nhập địa chỉ nhà cung cấp"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium text-gray-700"
              >Phường</label
            >
            <input
              v-model="formData.DiaChi.Phuong"
              type="text"
              placeholder="Nhập địa chỉ nhà cung cấp"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium text-gray-700"
              >Quận/Huyện</label
            >
            <input
              v-model="formData.DiaChi.QuanHuyen"
              type="text"
              placeholder="Nhập địa chỉ nhà cung cấp"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </form>

      <!-- Nút hành động -->
      <div class="flex justify-center gap-6 mt-8">
        <button
          @click="refresh()"
          type="button"
          class="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium shadow transition"
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

          Tải lại
        </button>

        <button
          @click="createNCC()"
          class="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium shadow transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Lưu
        </button>
      </div>
    </div>
  </div>
</template>
