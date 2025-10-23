<template>
  <div class="p-6 space-y-6">
    <!-- ================= THANH CÔNG CỤ ================= -->
    <div class="flex flex-wrap justify-between items-center gap-3">
      <!-- Ô tìm kiếm -->
      <div class="relative w-full sm:w-80">
        <input v-model="q" type="text" placeholder="Tìm kiếm loại hàng..."
          class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 pr-10 text-sm shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition" />
        <svg xmlns="http://www.w3.org/2000/svg"
          class="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
        </svg>
      </div>

      <!-- Nút công cụ -->
      <div class="flex items-center gap-3">
        <button
          class="flex items-center justify-center bg-white hover:bg-gray-300 text-gray-700 font-medium px-5 py-2 rounded-xl shadow transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 5v14l7-5 7 5V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
          </svg>
        </button>

        <button
          class="flex items-center justify-center bg-white hover:bg-gray-300 text-green-600 font-medium px-5 py-2 rounded-xl shadow transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 4l10 6-10 6V4z" />
          </svg>
        </button>

        <button
          class="flex items-center justify-center bg-white hover:bg-gray-300 text-gray-700 font-medium px-5 py-2 rounded-xl shadow transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19V5m4 14V5" />
          </svg>
        </button>

        <button
          class="flex items-center justify-center bg-white hover:bg-gray-300 text-red-500 font-medium px-5 py-2 rounded-xl shadow transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="6" y="6" width="12" height="12" rx="2" ry="2" stroke-width="2" />
          </svg>
        </button>

        <!-- Thêm loại hàng -->
        <Addloai />
      </div>
    </div>

    <!-- ================= DANH SÁCH LOẠI HÀNG ================= -->
    <div class="space-y-4">
      <div v-for="item in paginatedData" :key="item.id"
        class="grid grid-cols-[2fr_2.5fr_2fr_auto] items-center gap-4 bg-white rounded-2xl shadow p-4 hover:shadow-md transition">
        <div>
          <p class="text-sm text-blue-500 font-medium">Mã loại: {{ item.id }}</p>
          <p class="font-semibold text-black">Tên loại:  {{ item.tenLoai }}</p>
          <div class="flex items-center text-gray-500 text-sm mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Published on {{ item.CreateAt || 'September 25, 2025' }}
          </div>
        </div>

        <div>
          <p class="font-semibold text-gray-800">Mô tả:</p>
          <p class="text-gray-500 text-sm line-clamp-2">{{ item.moTa }}</p>
        </div>

        <div class="flex flex-col items-center justify-center text-center space-y-2">
          <div
            class="w-[120px] h-[80px] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex items-center justify-center">
            <img v-if="item.HinhAnh || item.hinhAnh || item.imageName"
              :src="getImageUrl(item.HinhAnh || item.hinhAnh || item.imageName)" alt="Ảnh loại hàng"
              class="max-w-full max-h-full object-contain p-1 transition-transform duration-300 hover:scale-105" />
            <span v-else class="text-gray-400 text-xs">Không có ảnh</span>
          </div>
          <p class="text-gray-500 text-sm">Hình ảnh</p>
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
        <Loader />
      </div>
    </div>

    <!-- ================= PHÂN TRANG ================= -->
    <Pagination :currentPage="currentPage" :totalPages="totalPages" :startIndex="startIndex" :endIndex="endIndex"
      :totalItems="totalItems" @page-change="changePage" @next="nextPage" @prev="prevPage" />

    <!-- ================= POPUP THÊM LOẠI HÀNG ================= -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/15">
      <div ref="modalRef" class="bg-white rounded-2xl shadow-2xl w-[750px] max-w-[90%] p-6 relative cursor-move"
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
            <div @click="selectImage"
              class="flex items-center justify-between w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 cursor-pointer hover:bg-gray-100">
              <span>{{ newLoai.HinhAnh || 'Bấm vào để chọn ảnh' }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 7a2 2 0 012-2h3l1-1h4l1 1h3a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>

            <input ref="fileInput" type="file" accept="image/*" @change="handleFile" class="hidden" />
            <div v-if="previewUrl" class="mt-3">
              <img :src="previewUrl" alt="Preview" class="w-28 h-16 object-cover rounded-md border" />
            </div>
          </div>
        </div>

        <div class="flex justify-center gap-6">
          <button @click="resetForm"
            class="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-2 rounded-lg shadow transition">
            Làm mới
          </button>
          <button @click="saveLoaiHang"
            class="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow transition">
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
import Pagination from "../HelperComponents/pagination.vue";
import Loader from "../HelperComponents/Loader.vue";
import Addloai from "./themLoaiHang.vue";

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
  getImageUrl,
  loadLoai,
} = useLoaiHang();

const q = ref("");
</script>

<style scoped>
button {
  transition: all 0.2s ease;
}
</style>
