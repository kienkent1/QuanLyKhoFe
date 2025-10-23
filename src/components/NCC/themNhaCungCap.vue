<template>
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
</template>

<script setup>

</script>