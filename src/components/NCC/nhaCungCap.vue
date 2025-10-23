<template>
  <div class="p-6 space-y-6">
    <!-- THANH CÔNG CỤ -->
    <div class="flex flex-wrap justify-between items-center gap-3">
      <!-- Ô tìm kiếm -->
      <div class="relative w-full sm:w-72">
        <input v-model="q" type="text" placeholder="Search here..."
          class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 pr-10 text-sm shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition" />
        <svg xmlns="http://www.w3.org/2000/svg"
          class="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
        </svg>
      </div>

      <!-- Nút thêm + dropdown -->
      <div class="flex items-center gap-2 relative font-sans text-sm text-black">
        <button @click="showModal = true"
          class="flex items-center gap-2 bg-white hover:bg-gray-300 font-medium px-4 py-2.5 rounded-xl shadow transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Thêm nhà cung cấp
        </button>

        <button
          class="flex items-center justify-between bg-white hover:bg-gray-300 font-medium shadow transition rounded-xl px-4 py-2.5">
          Mới nhất
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ms-2 text-gray-700" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 17V7m0 10-3-3m3 3 3-3M8 7h5M8 11h3M8 15h1" />
          </svg>
        </button>
      </div>

      <!-- MODAL THÊM NHÀ CUNG CẤP -->
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
        <div ref="modalRef"
          class="bg-white border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.15)] rounded-2xl w-[700px] max-w-[90%] p-8 space-y-6 relative cursor-move select-none"
          @mousedown="startDrag">
          <button @click="showModal = false"
            class="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl leading-none transition">
            &times;
          </button>

          <h2 class="text-2xl font-bold text-gray-900 text-left">Thêm nhà cung cấp</h2>

          <div class="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl shadow-inner">
            <div class="flex flex-col">
              <label class="font-semibold text-sm text-gray-700 mb-1">Tên nhà cung cấp</label>
              <input type="text" placeholder="Nhập tên nhà cung cấp"
                class="w-full bg-gray-100 text-gray-800 placeholder-gray-400 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
            </div>

            <div class="flex flex-col">
              <label class="font-semibold text-sm text-gray-700 mb-1">Mô tả</label>
              <input type="text" placeholder="Viết mô tả"
                class="w-full bg-gray-100 text-gray-800 placeholder-gray-400 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
            </div>

            <div class="flex flex-col">
              <label class="font-semibold text-sm text-gray-700 mb-1">Logo</label>
              <div
                class="flex items-center justify-between bg-gray-100 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-200 transition">
                <span class="text-sm text-gray-400">Bấm vào để chọn ảnh</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 7h4l1.5-2h7L17 7h4v13H3V7zm9 3a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              </div>
            </div>
          </div>

          <div class="flex justify-center gap-6 pt-4">
            <button
              class="flex items-center gap-2 bg-[#007BFF] hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-lg shadow transition active:scale-95">
              Refresh
            </button>
            <button
              class="flex items-center gap-2 bg-[#007BFF] hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-lg shadow transition active:scale-95">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- DANH SÁCH -->
    <div class="space-y-4">
      <div v-for="item in paginatedRows" :key="item.id"
        class="grid grid-cols-[1.5fr_2.2fr_1.8fr_1.8fr_1.5fr_auto] items-center gap-4 bg-white rounded-2xl shadow p-4 hover:shadow-md transition">
        <!-- Mã & Tên -->
        <div>
          <p class="text-sm text-blue-500 font-medium">Mã: {{ item.MaNCC }}</p>
          <p class="font-semibold text-gray-900">Tên: {{ item.TenNCC }}</p>
          <p class="text-xs text-gray-500 flex items-center gap-1">
            ✔ {{ item.CreatAt }}
          </p>
        </div>

        <!-- Địa chỉ -->
        <div class="truncate text-gray-700">
          {{ item.DiaChi || "—" }}
        </div>

        <!-- Số điện thoại -->
        <div class="text-gray-700 font-medium">
          {{ item.DienThoai || "—" }}
        </div>

        <!-- Email -->
        <div class="text-gray-700 font-medium truncate" :title="item.email">
          {{ item.Email || "—" }}
        </div>

        <!-- Logo -->
        <div class="flex justify-center">
          <img :src="item.HinhAnh || '/no-logo.png'" alt="Logo" class="w-12 h-12 object-contain" />
        </div>

        <!-- Hành động -->
        <div class="flex justify-end gap-3">
          <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition">
            Chỉnh sửa
          </button>
          <button class="text-gray-400 hover:text-red-500 transition text-xl" title="Xóa">
            🗑
          </button>
        </div>
      </div>

    <div v-if="paginatedRows.length === 0" class="flex justify-center items-center py-10 text-gray-500">
      <Loader />
    </div>
    </div>


    <!-- PHÂN TRANG -->
    <div class="flex flex-wrap items-center justify-between pt-4 border-t border-gray-200">
      <p class="text-sm text-gray-600">
        Hiển thị {{ startIndex + 1 }}–{{ endIndex }} trên tổng {{ filteredRows.length }} dữ liệu
      </p>

      <div class="flex items-center gap-2">
        <button @click="prevPage" :disabled="currentPage === 1"
          class="px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 disabled:opacity-50 flex items-center gap-1">
          « Previous
        </button>

        <div class="flex items-center border border-blue-500 rounded-md overflow-hidden">
          <button v-for="page in totalPages" :key="page" @click="currentPage = page" class="px-3 py-2 text-sm"
            :class="page === currentPage ? 'bg-blue-500 text-white' : 'text-blue-600 hover:bg-blue-100'">
            {{ page }}
          </button>
        </div>

        <button @click="nextPage" :disabled="currentPage === totalPages"
          class="px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 disabled:opacity-50 flex items-center gap-1">
          Next »
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Loader from "../HelperComponents/Loader.vue";
import { useNhaCungCap } from "./NhaCungCap";

const {
  q,
  showModal,
  modalRef,
  paginatedRows,
  filteredRows,
  startIndex,
  endIndex,
  totalPages,
  currentPage,
  prevPage,
  nextPage,
  startDrag,
} = useNhaCungCap();
</script>
