<template>
  <div class="p-6 space-y-6">
    <!-- THANH CÔNG CỤ -->
    <div class="flex flex-wrap justify-between items-center gap-3">
      <!-- Ô tìm kiếm -->
      <div class="relative w-full sm:w-200">
        <input v-model="q" type="text" placeholder="Tìm kiếm loại hàng..."
          class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 pr-10 text-sm shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition" />
        <svg xmlns="http://www.w3.org/2000/svg"
          class="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
        </svg>
      </div>

      <div class="flex items-center gap-3">
        <!-- Bookmark -->
        <button
          class="flex items-center justify-center bg-white hover:bg-gray-300 text-gray-700 font-medium px-5 py-2 rounded-xl shadow transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 5v14l7-5 7 5V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
          </svg>
        </button>

        <!-- Play -->
        <button
          class="flex items-center justify-center bg-white hover:bg-gray-300 text-green-600 font-medium px-5 py-2 rounded-xl shadow transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 4l10 6-10 6V4z" />
          </svg>
        </button>

        <!-- Pause -->
        <button
          class="flex items-center justify-center bg-white hover:bg-gray-300 text-gray-700 font-medium px-5 py-2 rounded-xl shadow transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19V5m4 14V5" />
          </svg>
        </button>

        <!-- Stop -->
        <button
          class="flex items-center justify-center bg-white hover:bg-gray-300 text-red-500 font-medium px-5 py-2 rounded-xl shadow transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="6" y="6" width="12" height="12" rx="2" ry="2" stroke-width="2" />
          </svg>
        </button>

        <!-- Thêm loại hàng -->
        <button @click="showModal = true"
          class="flex items-center gap-2 bg-white text-black font-medium px-5 py-2 rounded-xl shadow hover:bg-gray-300 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Thêm loại hàng
        </button>

        <!-- Filter -->
        <button
          class="flex items-center justify-center bg-white hover:bg-gray-300 text-gray-700 font-medium px-5 py-2 rounded-xl shadow transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6h18M6 12h12M10 18h4" />
          </svg>
        </button>

        <!-- Newest -->
        <button
          class="flex items-center justify-between bg-white hover:bg-gray-300 font-medium shadow rounded-xl px-5 py-2 transition">
          Newest
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ms-2 text-gray-700" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- DANH SÁCH LOẠI HÀNG -->
    <div class="space-y-4">
      <div v-for="item in paginatedData" :key="item.id"
        class="grid grid-cols-[2fr_2.5fr_2fr_auto] items-center gap-4 bg-white rounded-2xl shadow p-4 hover:shadow-md transition">
        <div>
          <p class="text-sm text-blue-500 font-medium">Mã loại: {{ item.id }}</p>
          <p class="font-semibold text-black">Tên loại: {{ item.tenLoai }}</p>
          <div class="flex items-center text-gray-500 text-sm mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Published on {{ item.ngayDang || 'January 25, 2021' }}
          </div>
        </div>

        <div>
          <p class="font-semibold text-gray-800">Mô tả:</p>
          <p class="text-gray-500 text-sm line-clamp-2">{{ item.moTa }}</p>
        </div>

        <div class="flex flex-col justify-center items-center text-center">
          <div class="w-[100px] h-[60px] flex items-center justify-center bg-gray-100 text-gray-400 text-xs rounded-md">
            Ảnh
          </div>
          <p class="text-gray-500 text-sm mt-1">Hình ảnh</p>
        </div>

        <div class="flex justify-end items-center gap-3">
          <button class="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium transition">
            Chỉnh sửa
          </button>
          <button class="hover:text-gray-800 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button class="hover:text-red-600 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div v-if="paginatedData.length === 0"
        class="flex flex-col items-center justify-center py-10 text-gray-500 min-h-[200px]">
        <loader />
      </div>
    </div>

    <!-- PHÂN TRANG -->
    <div class="flex flex-wrap items-center justify-between pt-4 border-t border-gray-200">
      <p class="text-sm text-gray-600">
        Hiển thị {{ startIndex + 1 }}–{{ endIndex }} trên tổng {{ totalItems }}
      </p>

      <div class="flex items-center gap-2">
        <button @click="prevPage" :disabled="currentPage === 1"
          class="px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 disabled:opacity-50 flex items-center gap-1">
          « Trước
        </button>

        <div class="flex items-center border border-blue-500 rounded-md overflow-hidden">
          <button v-for="page in totalPages" :key="page" @click="changePage(page)" class="px-3 py-2 text-sm"
            :class="page === currentPage ? 'bg-blue-500 text-white' : 'text-blue-600 hover:bg-blue-100'">
            {{ page }}
          </button>
        </div>

        <button @click="nextPage" :disabled="currentPage === totalPages"
          class="px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 disabled:opacity-50 flex items-center gap-1">
          Sau »
        </button>
      </div>
    </div>

    <!-- ✅ POPUP CÓ THỂ DI CHUYỂN -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/15">
      <div ref="modalRef" class="bg-white rounded-2xl shadow-2xl w-[750px] max-w-[90%] p-20 relative cursor-move"
        @mousedown="startDrag">
        <button @click="closeModal" class="absolute top-3 right-3 text-gray-500 hover:text-black transition">✕</button>

        <h2 class="text-xl font-bold mb-6">Thêm loại hàng</h2>

        <div class="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label class="block text-sm font-semibold mb-1">Tên loại hàng</label>
            <input v-model="newLoai.tenLoai" type="text" placeholder="Nhập tên loại hàng"
              class="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Mô tả</label>
            <input v-model="newLoai.moTa" type="text" placeholder="Viết mô tả"
              class="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Hình ảnh</label>

            <!-- ô click để chọn file (hiển thị tên nếu có) -->
            <div @click="selectImage"
              class="flex items-center justify-between w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 cursor-pointer hover:bg-gray-100">
              <span>{{ newLoai.imageName || 'Bấm vào để chọn ảnh' }}</span>

              <!-- Icon máy ảnh chuẩn -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 7a2 2 0 012-2h3l1-1h4l1 1h3a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>

            <!-- hidden file input -->
            <input ref="fileInput" type="file" accept="image/*" @change="handleFile" class="hidden" />

            <!-- preview ảnh -->
            <div v-if="previewUrl" class="mt-3">
              <img :src="previewUrl" alt="Preview" class="w-28 h-16 object-cover rounded-md border" />
            </div>
          </div>
        </div>

        <!-- Nút chức năng -->
        <div class="flex justify-center gap-6">
          <button @click="resetForm"
            class="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-2 rounded-lg shadow transition">
            <!-- Icon reload -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M4 4v5h.582M20 20v-5h-.581M5.632 9A9 9 0 0120 12m-1.632 3A9 9 0 014 12" />
            </svg>
            Làm mới
          </button>

          <button @click="saveLoaiHang"
            class="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow transition">
            <!-- Icon save -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h11l4 4v8a2 2 0 01-2 2h-1z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 10h8v4H7z" />
            </svg>
            Lưu lại
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useLoaiHang from "./Loaihang.js";

// Import hàm trong composable
const {
  paginatedData,
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  nextPage,
  prevPage,
  changePage,
} = useLoaiHang();

// Tìm kiếm
const q = ref("");

// Popup thêm loại hàng
const showModal = ref(false);
const newLoai = ref({ tenLoai: "", moTa: "", image: null });
const fileInput = ref(null);

// Reset form
const resetForm = () => {
  newLoai.value = { tenLoai: "", moTa: "", image: null };
};

// Đóng popup
const closeModal = () => {
  showModal.value = false;
  resetForm();
};
const isDragging = ref(false);
const offset = ref({ x: 0, y: 0 });

const startDrag = (e) => {
  if (!modalRef.value) return;
  isDragging.value = true;

  const rect = modalRef.value.getBoundingClientRect();
  offset.value = { x: e.clientX - rect.left, y: e.clientY - rect.top };

  const move = (ev) => {
    if (!isDragging.value) return;
    modalRef.value.style.position = "fixed";
    modalRef.value.style.left = `${ev.clientX - offset.value.x}px`;
    modalRef.value.style.top = `${ev.clientY - offset.value.y}px`;
  };

  const stop = () => {
    isDragging.value = false;
    window.removeEventListener("mousemove", move);
    window.removeEventListener("mouseup", stop);
  };

  window.addEventListener("mousemove", move);
  window.addEventListener("mouseup", stop);
};
const modalRef = ref(null);
</script>
