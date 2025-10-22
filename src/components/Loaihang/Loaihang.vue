<template>
  <div class="p-4 space-y-3 bg-white text-[13px]">
    <div class="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
      <div class="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 w-64 shadow-sm focus-within:ring-2 focus-within:ring-blue-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          class="w-full outline-none text-[13px] placeholder-gray-400"
        />
      </div>

      <div class="flex items-center gap-1.5">
        <button
          class="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-200 transition shadow-sm">
          <span>Tạo phiếu xuất kho với NCC</span>
        </button>

        <button
          class="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-200 transition shadow-sm">
          <span>Quét mã</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 4h2M7 4h10M19 4h2M3 8h18M3 16h18M3 20h2M7 20h10M19 20h2" />
          </svg>
        </button>

        <button
          class="flex items-center gap-0.5 bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-gray-700 hover:bg-gray-100 shadow-sm transition">
          Newest
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <button
          class="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg shadow-sm transition">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
            class="w-4 h-4">
            <path
              d="M17 3H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM5 5h10v3H5V5zm5 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
          </svg>
          Lưu
        </button>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-3 space-y-2">
      <div
        v-for="item in paginatedData"
        :key="item.id"
        class="grid grid-cols-[1.1fr_1.2fr_0.8fr_1fr] items-center bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition text-sm gap-3"
      >
        <div class="flex flex-col space-y-0.5">
          <div class="text-[11px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-md w-max">
            Mã loại: {{ item.id }}
          </div>
          <div class="font-semibold text-gray-800">
            Tên loại: {{ item.tenLoai }}
          </div>
        </div>

        <div class="flex flex-col justify-center">
          <div class="font-semibold text-gray-700 text-[13px] mb-0.5">Mô tả:</div>
          <div class="text-gray-500 text-[12px] leading-snug line-clamp-2">
            {{ item.moTa }}
          </div>
        </div>

        <div class="flex justify-center items-center">
          <div
            class="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-xs"
          >
            Ảnh
          </div>
        </div>

        <div class="flex items-center justify-end gap-2.5">
          <button
            class="bg-green-500 hover:bg-green-600 text-white text-[12px] px-3 py-1 rounded-md transition"
          >
            Chỉnh sửa
          </button>

          <button class="text-gray-600 hover:text-blue-600 transition">
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>

          <button class="text-red-500 hover:text-red-700 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2h16a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0015 2H9zM5 6v14a2 2 0 002 2h10a2 2 0 002-2V6H5z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap items-center justify-between px-2 pt-2 text-[13px]">
      <p class="text-gray-600">
        Hiển thị {{ paginatedData.length }} trong số {{ totalItems }} dữ liệu
      </p>

      <div class="flex items-center gap-1.5">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-2.5 py-1.5 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 disabled:opacity-50 flex items-center gap-1"
        >
          « Trước
        </button>

        <div class="flex items-center border border-blue-500 rounded-md overflow-hidden">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="changePage(page)"
            class="px-2.5 py-1.5 text-xs"
            :class="page === currentPage ? 'bg-blue-500 text-white' : 'text-blue-600 hover:bg-blue-100'"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-2.5 py-1.5 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 disabled:opacity-50 flex items-center gap-1"
        >
          Sau »
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import useLoaiHang from "./Loaihang.js";
const {
  paginatedData,
  currentPage,
  totalPages,
  totalItems,
  nextPage,
  prevPage,
  changePage
} = useLoaiHang();
</script>
