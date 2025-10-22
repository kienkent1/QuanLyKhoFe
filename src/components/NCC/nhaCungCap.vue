<template>
  <div class=" p-6 space-y-6">
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

      <div class="flex items-center gap-2 relative font-sans text-sm text-black">
        <!-- Nút thêm -->
        <button @click="showModal = true"
          class="flex items-center gap-2 bg-white hover:bg-gray-300 font-medium px-4 py-2.5 rounded-xl shadow transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Thêm nhà cung cấp
        </button>

        <!-- Nút dropdown -->
        <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
          class="flex items-center justify-between bg-white hover:bg-gray-300 font-medium shadow transition rounded-xl px-4 py-2.5">
          Mới nhất
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ms-2 text-gray-700" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 17V7m0 10-3-3m3 3 3-3M8 7h5M8 11h3M8 15h1" />
          </svg>
        </button>


        <!-- Menu dropdown -->
        <div id="dropdown"
          class="absolute z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 mt-2 font-normal">
          <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
            <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">Mới nhất</a></li>
            <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">Cũ nhất</a></li>
            <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">ID↑</a></li>
            <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">ID↓</a></li>
            <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">Tên↑</a></li>
            <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">Tên↓</a></li>
          </ul>
        </div>
      </div>
      <!-- MODAL THÊM NHÀ CUNG CẤP -->
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
        <div ref="modalRef"
          class="bg-white border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.25)]  rounded-2xl w-[700px] max-w-[90%] p-8 space-y-6 relative cursor-move select-none"
          @mousedown="startDrag">
          <!-- Nút đóng -->
          <button @click="showModal = false"
            class="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl leading-none transition">
            &times;
          </button>

          <!-- Tiêu đề -->
          <h2 class="text-2xl font-bold text-gray-900 text-left">Thêm nhà cung cấp</h2>

          <!-- Nội dung form -->
          <div class="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl shadow-inner select-none">
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
                <span class="text-sm text-gray-400 select-none">Bấm vào để chọn ảnh</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 7h4l1.5-2h7L17 7h4v13H3V7zm9 3a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Nút hành động -->
          <div class="flex justify-center gap-6 pt-4">
            <button
              class="flex items-center gap-2 bg-[#007BFF] hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-lg shadow transition active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"
                class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v6h6M20 20v-6h-6M4 20l6-6M20 4l-6 6" />
              </svg>
              Refresh
            </button>

            <button
              class="flex items-center gap-2 bg-[#007BFF] hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-lg shadow transition active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"
                class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17 3H7a2 2 0 00-2 2v14l4-4h8a2 2 0 002-2V5a2 2 0 00-2-2z" />
              </svg>
              Save
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- DANH SÁCH NHÀ CUNG CẤP -->
    <div class="space-y-4">
      <div v-for="(item, i) in paginatedRows" :key="i"
        class="grid grid-cols-[2fr_2.5fr_3fr_auto] items-center gap-4 bg-white rounded-2xl shadow p-4 hover:shadow-md transition">
        <!-- Cột 1: Thông tin -->
        <div>
          <p class="text-sm text-blue-500 font-medium">Mã nhà cung cấp: {{ item.id }}</p>
          <p class="font-semibold text-black">Tên nhà cung cấp: {{ item.name }}</p>
          <p class="text-gray-500 text-sm flex items-center gap-1">
            <span>✔</span> Thời gian: {{ item.time }}
          </p>
        </div>

        <!-- Cột 2 -->
        <div class="text-center">
          <p class="font-semibold text-black">{{ item.description }}</p>
          <p class="text-gray-500 text-sm">Mô tả</p>
        </div>

        <!-- Cột 3: Logo -->
        <div class="flex flex-col justify-center items-center text-center">
          <div class="w-[100px] h-[60px] flex items-center justify-center">
            <img :src="item.logo" alt="Logo" class="object-contain max-w-full max-h-full" />
          </div>
          <p class="text-gray-500 text-sm mt-2">Logo</p>
        </div>

        <!-- Cột 4: Hành động -->
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
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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

      <!-- Loader khi không có dữ liệu -->
      <div v-if="paginatedRows.length === 0"
        class="flex flex-col items-center justify-center py-10 text-gray-500 min-h-[200px]">
        <loader />
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
import { ref, computed, onMounted } from "vue";
import Loader from "../HelperComponents/Loader.vue";
const showModal = ref(false);

const q = ref("");
const rows = ref([]);
const currentPage = ref(1);
const pageSize = 5;

// Lấy dữ liệu từ db.json qua json-server
onMounted(async () => {
  try {
    const res = await fetch("http://localhost:3000/Suppliers");
    if (!res.ok) throw new Error("Không thể kết nối tới API");
    const data = await res.json();
    rows.value = data;
  } catch (err) {
    console.error("Lỗi tải dữ liệu:", err.message);

  }
});

// Tìm kiếm
const filteredRows = computed(() =>
  rows.value.filter((r) => r.name.toLowerCase().includes(q.value.toLowerCase()))
);

// Phân trang
const totalPages = computed(() => Math.ceil(filteredRows.value.length / pageSize));
const startIndex = computed(() => (currentPage.value - 1) * pageSize);
const endIndex = computed(() => Math.min(startIndex.value + pageSize, filteredRows.value.length));
const paginatedRows = computed(() => filteredRows.value.slice(startIndex.value, endIndex.value));
const nextPage = () => currentPage.value < totalPages.value && currentPage.value++;
const prevPage = () => currentPage.value > 1 && currentPage.value--;

const modalRef = ref(null);

let offset = { x: 0, y: 0 };
let isDragging = false;

const startDrag = (e) => {
  if (e.target.closest("button")) return; // tránh kéo khi bấm nút
  isDragging = true;
  const rect = modalRef.value.getBoundingClientRect();
  offset = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
};

const onDrag = (e) => {
  if (!isDragging) return;
  modalRef.value.style.left = `${e.clientX - offset.x}px`;
  modalRef.value.style.top = `${e.clientY - offset.y}px`;
  modalRef.value.style.position = "fixed";
  modalRef.value.style.margin = 0;
};

const stopDrag = () => {
  isDragging = false;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
