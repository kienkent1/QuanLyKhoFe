<template>
  <div class="p-6 space-y-4 bg-gray-50">
    <!-- THANH CÔNG CỤ -->
    <div class="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl shadow-sm relative">
      <!-- Ô tìm kiếm -->
      <div class="relative flex-1 min-w-[250px]">
        <input type="text" placeholder="Search here..."
          class="w-full rounded-xl border-none bg-white shadow-sm py-3.5 pl-4 pr-10 text-sm text-gray-600 placeholder-gray-400 focus:outline-1 focus:ring-2 focus:ring-blue-500" />
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute right-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2"
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
        </svg>
      </div>

      <!-- NHÓM NÚT -->
      <div class="flex items-center gap-2 relative">
        <button @click="showAddEmployee = true"
          class="rounded-xl bg-white px-4 py-3.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 transition">
          Thêm nhân viên
        </button>

        <!-- NÚT LỌC -->
        <div class="relative">
          <button @click="toggleDropdown('filter')"
            class="flex items-center gap-1 rounded-xl bg-white px-4 py-3.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 transition">
            Lọc
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>


          <div v-if="dropdown === 'filter'"
            class="absolute right-0 mt-2 w-44 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black/5 z-50">
            <div class="py-2 text-sm text-gray-700">
              <button class="block w-full px-4 py-2 text-left hover:bg-gray-100" @onclick="filterBy('Nam')">Nam</button>
              <button class="block w-full px-4 py-2 text-left hover:bg-gray-100">Nữ</button>
              <button class="block w-full px-4 py-2 text-left hover:bg-gray-100">Hoạt động</button>
              <button class="block w-full px-4 py-2 text-left hover:bg-gray-100">Không hoạt động</button>
            </div>
          </div>
        </div>

        <!-- NÚT HÀNH ĐỘNG -->
        <div class="relative">
          <button @click="toggleDropdown('action')"
            class="flex items-center gap-1 rounded-xl bg-white px-4 py-3.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 transition">
            Hành động
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div v-if="dropdown === 'action'"
            class="absolute right-0 mt-2 w-36 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black/5 z-50">
            <div class="py-2 text-sm text-gray-700">
              <button class="block w-full px-4 py-2 text-left hover:bg-gray-100">Sửa</button>
              <button class="block w-full px-4 py-2 text-left hover:bg-gray-100">Xóa</button>
              <button class="block w-full px-4 py-2 text-left hover:bg-gray-100">Chặn</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- BẢNG DỮ LIỆU -->
    <div class="w-full overflow-visible bg-white rounded-xl shadow-sm border border-gray-200 mt-4">
      <table class="w-full border-collapse text-sm">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="border border-gray-200 p-3 text-center">
              <input type="checkbox" v-model="selectAll" @change="toggleAll" />
            </th>

            <th class="border border-gray-200 p-3 text-left">
              <div class="flex items-center gap-1">
                Mã NV
                <div class="flex flex-col text-gray-400 text-[10px] leading-[8px]">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-2 h-2 hover:text-blue-500 cursor-pointer"
                    viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 14l5-5 5 5H7z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-2 h-2 hover:text-blue-500 cursor-pointer"
                    viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </div>
            </th>

            <th class="border border-gray-200 p-3 text-left">
              <div class="flex items-center gap-1">
                Tên nhân viên
                <div class="flex flex-col text-gray-400 text-[10px] leading-[8px]">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-2 h-2 hover:text-blue-500 cursor-pointer"
                    viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 14l5-5 5 5H7z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-2 h-2 hover:text-blue-500 cursor-pointer"
                    viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </div>
            </th>

            <th class="border border-gray-200 p-3 text-left">
              <div class="flex items-center gap-1">
                Mã số thuế
                <div class="flex flex-col text-gray-400 text-[10px] leading-[8px]">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-2 h-2 hover:text-blue-500 cursor-pointer"
                    viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 14l5-5 5 5H7z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-2 h-2 hover:text-blue-500 cursor-pointer"
                    viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </div>
            </th>

            <th class="border border-gray-200 p-3 text-left">
              <div class="flex items-center gap-1">
                Địa chỉ
                <div class="flex flex-col text-gray-400 text-[10px] leading-[8px]">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-2 h-2 hover:text-blue-500 cursor-pointer"
                    viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 14l5-5 5 5H7z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-2 h-2 hover:text-blue-500 cursor-pointer"
                    viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </div>
            </th>

            <th class="border border-gray-200 p-3 text-left">
              <div class="flex items-center gap-1">
                Số điện thoại
                <div class="flex flex-col text-gray-400 text-[10px] leading-[8px]">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-2 h-2 hover:text-blue-500 cursor-pointer"
                    viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 14l5-5 5 5H7z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-2 h-2 hover:text-blue-500 cursor-pointer"
                    viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </div>
            </th>

            <th class="border border-gray-200 p-3 text-left">
              <div class="flex items-center gap-1">
                Email
                <div class="flex flex-col text-gray-400 text-[10px] leading-[8px]">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-2 h-2 hover:text-blue-500 cursor-pointer"
                    viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 14l5-5 5 5H7z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-2 h-2 hover:text-blue-500 cursor-pointer"
                    viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </div>
            </th>

            <!-- CỘT LƯU -->
            <th class="border border-gray-200 p-3 text-center">
              <button
                class="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                  <path
                    d="M17 3H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM5 5h10v3H5V5zm5 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
                </svg>
                Lưu
              </button>
            </th>
          </tr>
        </thead>


        <tbody v-if="paginatedRows !== null && paginatedRows.length !== 0">
          <tr v-for="(row, i) in paginatedRows" :key="i" class="hover:bg-gray-50 transition relative">
            <td class="border border-gray-200 p-2 text-center">
              <input type="checkbox" v-model="row.selected" class="accent-blue-500 w-4 h-4" />
            </td>
            <td class="border border-gray-200 p-2">
              <input v-model="row.col1"
                class="w-full rounded-md border-none bg-transparent px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </td>
            <td class="border border-gray-200 p-2">
              <input v-model="row.col2"
                class="w-full rounded-md border-none bg-transparent px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </td>
            <td class="border border-gray-200 p-2">
              <input v-model="row.col3"
                class="w-full rounded-md border-none bg-transparent px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </td>
            <td class="border border-gray-200 p-2">
              <input v-model="row.col4"
                class="w-full rounded-md border-none bg-transparent px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </td>
            <td class="border border-gray-200 p-2">
              <input v-model="row.col5"
                class="w-full rounded-md border-none bg-transparent px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </td>
            <td class="border border-gray-200 p-2">
              <input v-model="row.col6"
                class="w-full rounded-md border-none bg-transparent text-green-600 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </td>

            <!-- CỘT MENU 3 CHẤM -->
            <td class="border border-gray-200 p-2 text-center relative">
              <div class="flex items-center justify-center gap-2">
                <!-- 🟢 Icon hiện khi đang sửa -->
                <svg v-if="row.isEditing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                  class="w-4 h-4 text-blue-500 animate-pulse">
                  <path
                    d="M17.414 2.586a2 2 0 0 0-2.828 0L6 11.172V14h2.828l8.586-8.586a2 2 0 0 0 0-2.828zM4 16h12v2H4v-2z" />
                </svg>

                <!-- Nút 3 chấm -->
                <button @click="toggleRowMenu(i)" class="text-gray-700 hover:text-blue-500 text-lg font-bold relative">
                  ...
                </button>
              </div>

              <!-- Menu xổ xuống -->
              <div v-if="row.showMenu"
                class="absolute right-2 top-8 z-50 w-32 bg-white border border-gray-200 rounded-lg shadow-md text-sm text-gray-700">
                <button @click="editRow(i)" class="block w-full text-left px-4 py-2 hover:bg-gray-100">✏️ Sửa</button>
                <button class="block w-full text-left px-4 py-2 hover:bg-gray-100">🗑️ Xóa</button>
                <button class="block w-full text-left px-4 py-2 hover:bg-gray-100">👁️ Xem</button>
                <button class="block w-full text-left px-4 py-2 hover:bg-gray-100">🚫 Chặn</button>
              </div>
            </td>

          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="8" class="h-80">
              <div class="flex items-center justify-center">
                <loader />
              </div>
            </td>
          </tr>

        </tbody>
      </table>
    </div>

    <!-- PHÂN TRANG -->
    <div class="flex flex-wrap items-center justify-between px-2 pt-3">
      <p class="text-sm text-gray-600">
        Hiển thị {{ startIndex + 1 }} - {{ endIndex }} trong số {{ rows.length }} dữ liệu
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
    <!-- Popup thêm nhân viên (có thể di chuyển, không làm mờ nền) -->
    <div v-if="showAddEmployee" class="fixed inset-0 flex items-center justify-center z-50">
      <!-- Overlay trong suốt (click để đóng) -->
      <div class="absolute inset-0 bg-black/5" @click="showAddEmployee = false"></div>

      <!-- Hộp chính -->
      <div ref="popup"
        class="bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.25)] w-[850px] max-w-[95%] p-8 relative animate-fadeIn border border-gray-200 cursor-move select-none"
        @mousedown="startDrag">
        <!-- Nút đóng -->
        <button @click.stop="showAddEmployee = false"
          class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold">
          ✕
        </button>

        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Thêm nhân viên</h2>
          <div class="flex items-center gap-2">
            <img src="/public/logo.png" alt="Logo" class="w-20 h-20" />
          </div>
        </div>

        <!-- Form -->
        <div class="bg-gray-50 p-6 rounded-xl space-y-4 cursor-default">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tên</label>
              <input type="text" placeholder="Nhập tên của bạn"
                class="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Mã số thuế</label>
              <input type="text" placeholder="Nhập mã của bạn"
                class="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
              <input type="text" placeholder="Nhập địa chỉ của bạn"
                class="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
              <input type="date"
                class="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" placeholder="Nhập email của bạn"
                class="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <input type="text" placeholder="Nhập số điện thoại của bạn"
                class="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
              <select
                class="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option>Nam</option>
                <option>Nữ</option>
              </select>
            </div>
          </div>

          <!-- Nút -->
          <div class="flex justify-center gap-6 mt-6">
            <button
              class="flex items-center gap-2 bg-blue-100 text-blue-600 font-medium px-5 py-2.5 rounded-lg hover:bg-blue-200 transition">
              🔄 Refresh
            </button>
            <button
              class="flex items-center gap-2 bg-blue-600 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-blue-700 transition">
              💾 Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Loader from '../HelperComponents/Loader.vue';

/* ===== Dropdown của thanh công cụ (Lọc, Hành động) ===== */
const dropdown = ref(null);
const toggleDropdown = (menu) => {
  dropdown.value = dropdown.value === menu ? null : menu;
};

/* ===== Dropdown từng dòng (3 chấm) ===== */
const toggleRowMenu = (index) => {
  // Ẩn tất cả menu khác
  rows.value.forEach((r, i) => {
    if (i !== index) r.showMenu = false;
  });
  // Bật/tắt menu hiện tại
  rows.value[index].showMenu = !rows.value[index].showMenu;
};

/* Ẩn tất cả dropdown khi click ra ngoài */
onMounted(() => {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".relative") && !e.target.closest("table")) {
      dropdown.value = null;
      rows.value.forEach((r) => (r.showMenu = false));
    }
  });
});

/* ===== DỮ LIỆU ===== */
const rows = ref([])

// 📦 Lấy dữ liệu thật từ db.json
const loading = ref(true)
onMounted(async () => {
  try {
    const res = await fetch("http://localhost:3000/Employees")
    const data = await res.json()
    rows.value = data.map(emp => ({
      selected: false,
      showMenu: false,
      isEditing: false,
      col1: emp.id,
      col2: emp.name,
      col3: emp.taxCode,
      col4: emp.address,
      col5: emp.phone,
      col6: emp.email,
    }))
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error)
  } finally {
    loading.value = false
  }
})

/* ===== Phân trang ===== */
const currentPage = ref(1);
const pageSize = ref(10);

const totalPages = computed(() => Math.ceil(rows.value.length / pageSize.value));
const startIndex = computed(() => (currentPage.value - 1) * pageSize.value);
const endIndex = computed(() =>
  Math.min(startIndex.value + pageSize.value, rows.value.length)
);
const paginatedRows = computed(() =>
  rows.value.slice(startIndex.value, endIndex.value)
);

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const editRow = (index) => {
  // Đặt tất cả dòng khác về false
  rows.value.forEach((r, i) => {
    if (i !== index) r.isEditing = false;
  });

  // Bật/tắt trạng thái sửa cho dòng được chọn
  rows.value[index].isEditing = !rows.value[index].isEditing;

  // Ẩn menu dropdown
  rows.value[index].showMenu = false;
};
const showAddEmployee = ref(false);
// === Cho phép kéo popup ===
import { onBeforeUnmount } from "vue";

let offsetX = 0;
let offsetY = 0;
let isDragging = false;

const popup = ref(null);

const startDrag = (e) => {
  if (e.target.closest("input, select, button")) return; // Không drag khi click vào form
  isDragging = true;
  const rect = popup.value.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
};

const onDrag = (e) => {
  if (!isDragging) return;
  popup.value.style.left = `${e.clientX - offsetX}px`;
  popup.value.style.top = `${e.clientY - offsetY}px`;
  popup.value.style.position = "fixed";
};

const stopDrag = () => {
  isDragging = false;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
};

onBeforeUnmount(() => stopDrag());
</script>
<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.dropdown-animate {
  animation: slideFade 0.22s cubic-bezier(.25, .8, .25, 1);
  transform-origin: top right;
}
th .flex-col svg {
  transition: color 0.2s ease;
}
th .flex-col svg:hover {
  color: #2563eb; /* blue-600 */
}
</style>