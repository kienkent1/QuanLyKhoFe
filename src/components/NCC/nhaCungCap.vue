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
        <button @click="openAddModal"
          class="flex items-center gap-2 bg-white hover:bg-gray-300 font-medium px-4 py-2.5 rounded-xl shadow transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Thêm nhà cung cấp
        </button>

        <!-- Nút dropdown sắp xếp -->
        <div class="relative">
          <button @click="showSortDropdown = !showSortDropdown"
            class="flex items-center justify-between bg-white hover:bg-gray-300 font-medium shadow transition rounded-xl px-4 py-2.5">
            {{ getSortLabel() }}
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ms-2 text-gray-700" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 17V7m0 10-3-3m3 3 3-3M8 7h5M8 11h3M8 15h1" />
            </svg>
          </button>
          
          <!-- Dropdown Menu -->
          <div v-if="showSortDropdown" 
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <button @click="setSort('time', 'desc')" 
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
              Mới nhất
            </button>
            <button @click="setSort('time', 'asc')" 
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
              Cũ nhất
            </button>
            <button @click="setSort('name', 'asc')" 
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
              Tên↑
            </button>
            <button @click="setSort('name', 'desc')" 
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
              Tên↓
            </button>
          </div>
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
          <h2 class="text-2xl font-bold text-gray-900 text-left">
            {{ isEditMode ? 'Sửa nhà cung cấp' : 'Thêm nhà cung cấp' }}
          </h2>

          <!-- Nội dung form -->
          <form @submit.prevent="submitSupplier">
            <div class="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl shadow-inner select-none">
              <div class="flex flex-col">
                <label class="font-semibold text-sm text-gray-700 mb-1">Tên nhà cung cấp *</label>
                <input 
                  v-model="formData.name"
                  type="text" 
                  placeholder="Nhập tên nhà cung cấp"
                  required
                  class="w-full bg-white text-gray-800 placeholder-gray-400 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition border border-gray-300" />
              </div>

              <div class="flex flex-col">
                <label class="font-semibold text-sm text-gray-700 mb-1">Mô tả</label>
                <input 
                  v-model="formData.description"
                  type="text" 
                  placeholder="Viết mô tả"
                  class="w-full bg-white text-gray-800 placeholder-gray-400 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition border border-gray-300" />
              </div>

              <div class="flex flex-col">
                <label class="font-semibold text-sm text-gray-700 mb-1">Logo</label>
                <div
                  @click="selectLogo"
                  class="flex items-center justify-between bg-white rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50 transition border border-gray-300">
                  <span class="text-sm text-gray-400 select-none">{{ formData.logo ? 'Đã chọn ảnh' : 'Bấm vào để chọn ảnh' }}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M3 7h4l1.5-2h7L17 7h4v13H3V7zm9 3a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                </div>
                <input 
                  ref="logoInput"
                  type="file" 
                  accept="image/*" 
                  @change="handleLogoUpload"
                  class="hidden" />
              </div>
            </div>
          </form>

          <!-- Nút hành động -->
          <div class="flex justify-center gap-6 pt-4">
            <button
              type="button"
              @click="resetForm"
              class="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-medium px-5 py-2 rounded-lg shadow transition active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"
                class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v6h6M20 20v-6h-6M4 20l6-6M20 4l-6 6" />
              </svg>
              Reset
            </button>

            <button
              type="button"
              @click="submitSupplier"
              :disabled="loading"
              class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg shadow transition active:scale-95 disabled:opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"
                class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17 3H7a2 2 0 00-2 2v14l4-4h8a2 2 0 002-2V5a2 2 0 00-2-2z" />
              </svg>
              {{ loading ? 'Đang lưu...' : 'Lưu' }}
            </button>
          </div>
        </div>
      </div>

      <!-- MODAL XEM CHI TIẾT -->
      <div v-if="showViewModal" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="bg-white border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.15)] rounded-2xl w-[500px] max-w-[90%] p-8 space-y-6 relative">
          <!-- Nút đóng -->
          <button @click="showViewModal = false"
            class="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl leading-none transition">
            &times;
          </button>

          <!-- Tiêu đề -->
          <h2 class="text-2xl font-bold text-gray-900 text-left">Chi tiết nhà cung cấp</h2>

          <!-- Nội dung -->
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div class="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-lg">
                <img :src="viewSupplierData.logo" alt="Logo" class="object-contain max-w-full max-h-full" />
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900">{{ viewSupplierData.name }}</h3>
                <p class="text-gray-600">Mã: {{ viewSupplierData.id }}</p>
              </div>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-700 mb-2">Mô tả:</h4>
              <p class="text-gray-600">{{ viewSupplierData.description }}</p>
            </div>
            
            <div class="flex justify-between text-sm text-gray-600">
              <span>Ngày tạo: {{ viewSupplierData.time }}</span>
            </div>
          </div>

          <!-- Nút đóng -->
          <div class="flex justify-end">
            <button @click="showViewModal = false"
              class="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition">
              Đóng
            </button>
          </div>
        </div>
      </div>

      <!-- MODAL XÁC NHẬN XÓA -->
      <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="bg-white border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.15)] rounded-2xl w-[400px] max-w-[90%] p-8 space-y-6 relative">
          <!-- Tiêu đề -->
          <h2 class="text-xl font-bold text-gray-900 text-left">Xác nhận xóa</h2>

          <!-- Nội dung -->
          <div class="text-gray-600">
            <p>Bạn có chắc chắn muốn xóa nhà cung cấp:</p>
            <p class="font-semibold text-gray-900 mt-2">{{ selectedSupplier.name }}</p>
            <p class="text-sm text-red-600 mt-2">Hành động này không thể hoàn tác!</p>
          </div>

          <!-- Nút hành động -->
          <div class="flex justify-end gap-4">
            <button @click="showDeleteModal = false"
              class="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition">
              Hủy
            </button>
            <button @click="confirmDelete"
              class="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition">
              Xóa
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- BẢNG DỮ LIỆU NHÀ CUNG CẤP -->
    <div class="w-full overflow-hidden bg-white rounded-xl shadow-sm border border-gray-200 mt-4">
      <table class="w-full border-collapse text-sm border border-gray-300">
        <thead class="bg-gray-50 text-gray-700">
          <tr>
            <th class="p-3 border-b border-r border-gray-300 text-center w-[50px]">
              <input type="checkbox" class="rounded border-gray-300" />
            </th>
            <th class="p-3 border-b border-r border-gray-300 text-center cursor-pointer w-[100px]">
              <div class="flex items-center justify-center gap-1">
                Mã NCC
                <div class="flex flex-col">
                  <svg class="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v11a1 1 0 102 0V5a1 1 0 00-1-1H3zm4.293 4.293a1 1 0 011.414 0L10 9.414l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </th>
            <th class="p-3 border-b border-r border-gray-300 text-left cursor-pointer">
              <div class="flex items-center gap-1">
                Tên nhà cung cấp
                <div class="flex flex-col">
                  <svg class="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v11a1 1 0 102 0V5a1 1 0 00-1-1H3zm4.293 4.293a1 1 0 011.414 0L10 9.414l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </th>
            <th class="p-3 border-b border-r border-gray-300 text-left cursor-pointer">
              <div class="flex items-center gap-1">
                Mô tả
                <div class="flex flex-col">
                  <svg class="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v11a1 1 0 102 0V5a1 1 0 00-1-1H3zm4.293 4.293a1 1 0 011.414 0L10 9.414l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </th>
            <th class="p-3 border-b border-r border-gray-300 text-left cursor-pointer">
              <div class="flex items-center gap-1">
                Logo
                <div class="flex flex-col">
                  <svg class="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v11a1 1 0 102 0V5a1 1 0 00-1-1H3zm4.293 4.293a1 1 0 011.414 0L10 9.414l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </th>
            <th class="p-3 border-b border-r border-gray-300 text-left cursor-pointer">
              <div class="flex items-center gap-1">
                Thời gian
                <div class="flex flex-col">
                  <svg class="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v11a1 1 0 102 0V5a1 1 0 00-1-1H3zm4.293 4.293a1 1 0 011.414 0L10 9.414l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </th>
            <th class="p-3 border-b text-center w-[120px]">Hành động</th>
          </tr>
        </thead>

        <tbody v-if="paginatedRows.length">
          <tr v-for="(item, i) in paginatedRows" :key="i" class="hover:bg-gray-50 transition border-b border-gray-300">
            <td class="p-3 border-r border-gray-300 text-center">
              <input type="checkbox" class="rounded border-gray-300" />
            </td>
            <td class="p-3 border-r border-gray-300 text-center text-gray-700 font-medium">{{ item.id }}</td>
            <td class="p-3 border-r border-gray-300 font-medium text-gray-800">{{ item.name }}</td>
            <td class="p-3 border-r border-gray-300 text-gray-600 max-w-[200px]">
              <div class="truncate" :title="item.description">
                {{ item.description }}
              </div>
            </td>
            <td class="p-3 border-r border-gray-300 text-center">
              <div class="w-[60px] h-[40px] flex items-center justify-center mx-auto">
                <img :src="item.logo" alt="Logo" class="object-contain max-w-full max-h-full rounded" />
              </div>
            </td>
            <td class="p-3 border-r border-gray-300 text-gray-600">{{ item.time }}</td>
            <td class="p-3 text-center">
              <div class="flex items-center justify-center gap-2">
                <!-- Nút Edit -->
                <button @click="editSupplier(item)" class="text-purple-600 hover:text-purple-800 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <!-- Nút Menu với Dropdown -->
                <div class="relative">
                  <button @click="toggleDropdown(item.id, $event)" class="text-gray-600 hover:text-gray-800 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                  <!-- Dropdown Menu -->
                  <div v-if="openDropdownId === item.id" 
                    class="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <button @click="viewSupplier(item)" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg transition">
                      Xem
                    </button>
                    <button @click="deleteSupplier(item)" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg transition">
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="7" class="h-72">
              <div class="flex justify-center items-center">
                <Loader />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
const loading = ref(false);
const logoInput = ref(null);
const isEditMode = ref(false);
const openDropdownId = ref(null);
const showViewModal = ref(false);
const showDeleteModal = ref(false);
const selectedSupplier = ref({});
const viewSupplierData = ref({});

const q = ref("");
const rows = ref([]);
const currentPage = ref(1);
const pageSize = 5;
const sortBy = ref("time");
const sortOrder = ref("desc");
const showSortDropdown = ref(false);

// Form data cho thêm nhà cung cấp
const formData = ref({
  name: "",
  description: "",
  logo: ""
});

// Dữ liệu mẫu nhà cung cấp
const mockSuppliers = [
  {
    id: 1,
    name: "Apple Inc.",
    description: "Nhà cung cấp thiết bị Apple",
    logo: "https://via.placeholder.com/100x60/007AFF/FFFFFF?text=Apple",
    time: "2024-01-15"
  },
  {
    id: 2,
    name: "Samsung Electronics",
    description: "Nhà cung cấp thiết bị Samsung",
    logo: "https://via.placeholder.com/100x60/1D4ED8/FFFFFF?text=Samsung",
    time: "2024-01-20"
  },
  {
    id: 3,
    name: "Xiaomi Corporation",
    description: "Nhà cung cấp thiết bị Xiaomi",
    logo: "https://via.placeholder.com/100x60/FF6B35/FFFFFF?text=Xiaomi",
    time: "2024-02-01"
  },
  {
    id: 4,
    name: "Microsoft Corporation",
    description: "Nhà cung cấp phần mềm và thiết bị Microsoft",
    logo: "https://via.placeholder.com/100x60/7C3AED/FFFFFF?text=Microsoft",
    time: "2024-02-10"
  },
  {
    id: 5,
    name: "Google LLC",
    description: "Nhà cung cấp dịch vụ và thiết bị Google",
    logo: "https://via.placeholder.com/100x60/10B981/FFFFFF?text=Google",
    time: "2024-02-15"
  }
];

// Lấy dữ liệu từ localStorage hoặc API
onMounted(async () => {
  try {
    // Kiểm tra localStorage trước
    const savedData = localStorage.getItem('supplierData');
    if (savedData) {
      // Sử dụng dữ liệu đã lưu trong localStorage
      rows.value = JSON.parse(savedData);
      return;
    }
    
    // Nếu không có dữ liệu trong localStorage, thử API
    const res = await fetch("http://localhost:3001/Suppliers");
    if (!res.ok) throw new Error("Không thể kết nối tới API");
    const data = await res.json();
    rows.value = data;
    // Lưu dữ liệu từ API vào localStorage
    localStorage.setItem('supplierData', JSON.stringify(data));
  } catch (err) {
    console.error("Lỗi tải dữ liệu:", err.message);
    // Sử dụng dữ liệu mẫu khi API fail
    rows.value = mockSuppliers;
    // Lưu dữ liệu mẫu vào localStorage
    localStorage.setItem('supplierData', JSON.stringify(mockSuppliers));
  }
});

// Tìm kiếm và sắp xếp
const filteredRows = computed(() => {
  let filtered = rows.value.filter((r) => 
    r.name.toLowerCase().includes(q.value.toLowerCase()) ||
    r.description.toLowerCase().includes(q.value.toLowerCase()) ||
    r.id.toString().includes(q.value)
  );
  
  // Sắp xếp
  filtered.sort((a, b) => {
    let aVal, bVal;
    
    switch (sortBy.value) {
      case 'id':
        aVal = a.id;
        bVal = b.id;
        break;
      case 'name':
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
        break;
      case 'time':
        aVal = new Date(a.time);
        bVal = new Date(b.time);
        break;
      default:
        aVal = a.id;
        bVal = b.id;
    }
    
    if (sortOrder.value === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });
  
  return filtered;
});

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

// Chức năng thêm nhà cung cấp
const selectLogo = () => {
  logoInput.value?.click();
};

const handleLogoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Kiểm tra kích thước file (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Kích thước file không được vượt quá 5MB');
      return;
    }
    
    // Kiểm tra loại file
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn file ảnh');
      return;
    }
    
    // Tạo URL preview
    const reader = new FileReader();
    reader.onload = (e) => {
      formData.value.logo = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const resetForm = () => {
  formData.value = {
    name: "",
    description: "",
    logo: ""
  };
  if (logoInput.value) {
    logoInput.value.value = '';
  }
};


const submitSupplier = async () => {
  try {
    loading.value = true;
    
    // Validation
    if (!formData.value.name.trim()) {
      alert('Vui lòng nhập tên nhà cung cấp');
      return;
    }
    
    if (formData.value.name.trim().length < 2) {
      alert('Tên nhà cung cấp phải có ít nhất 2 ký tự');
      return;
    }
    
    if (isEditMode.value) {
      // Cập nhật nhà cung cấp hiện có
      const index = rows.value.findIndex(r => r.id === selectedSupplier.value.id);
      if (index !== -1) {
        rows.value[index] = {
          ...rows.value[index],
          name: formData.value.name.trim(),
          description: formData.value.description.trim() || `Nhà cung cấp ${formData.value.name.trim()}`,
          logo: formData.value.logo || rows.value[index].logo,
          time: rows.value[index].time // Giữ nguyên ngày tạo
        };
      }
    } else {
      // Tạo ID mới
      const newId = rows.value.length > 0 ? Math.max(...rows.value.map(r => r.id)) + 1 : 1;
      
      // Tạo nhà cung cấp mới
      const newSupplier = {
        id: newId,
        name: formData.value.name.trim(),
        description: formData.value.description.trim() || `Nhà cung cấp ${formData.value.name.trim()}`,
        logo: formData.value.logo || `https://via.placeholder.com/100x60/4F46E5/FFFFFF?text=${formData.value.name.trim().charAt(0)}`,
        time: new Date().toISOString().split('T')[0]
      };
      
      // Thêm vào danh sách
      rows.value.unshift(newSupplier);
    }
    
    // Lưu vào localStorage để dữ liệu không bị mất khi refresh
    localStorage.setItem('supplierData', JSON.stringify(rows.value));
    
    // Đóng modal và reset form
    showModal.value = false;
    resetForm();
    
  } catch (error) {
    console.error('Lỗi khi thêm/sửa nhà cung cấp:', error);
    alert('Có lỗi xảy ra khi thêm/sửa nhà cung cấp!');
  } finally {
    loading.value = false;
  }
};

// Chức năng dropdown
const toggleDropdown = (id, event) => {
  event.stopPropagation();
  openDropdownId.value = openDropdownId.value === id ? null : id;
};

// Đóng dropdown khi click bên ngoài
document.addEventListener('click', () => {
  openDropdownId.value = null;
});

// Chức năng sửa nhà cung cấp
const editSupplier = (supplier) => {
  isEditMode.value = true;
  selectedSupplier.value = { ...supplier };
  formData.value = {
    name: supplier.name,
    description: supplier.description,
    logo: supplier.logo
  };
  showModal.value = true;
  openDropdownId.value = null;
};

// Chức năng xem nhà cung cấp
const viewSupplier = (supplier) => {
  viewSupplierData.value = { ...supplier };
  showViewModal.value = true;
  openDropdownId.value = null;
};

// Chức năng xóa nhà cung cấp
const deleteSupplier = (supplier) => {
  selectedSupplier.value = { ...supplier };
  showDeleteModal.value = true;
  openDropdownId.value = null;
};

// Xác nhận xóa
const confirmDelete = () => {
  const index = rows.value.findIndex(r => r.id === selectedSupplier.value.id);
  if (index !== -1) {
    rows.value.splice(index, 1);
    localStorage.setItem('supplierData', JSON.stringify(rows.value));
    showDeleteModal.value = false;
    selectedSupplier.value = {};
  }
};

// Mở modal thêm mới
const openAddModal = () => {
  isEditMode.value = false;
  resetForm();
  showModal.value = true;
};

// Chức năng sắp xếp
const setSort = (field, order) => {
  sortBy.value = field;
  sortOrder.value = order;
  showSortDropdown.value = false;
  currentPage.value = 1; // Reset về trang đầu
};

const getSortLabel = () => {
  const labels = {
    'time_desc': 'Mới nhất',
    'time_asc': 'Cũ nhất',
    'name_asc': 'Tên↑',
    'name_desc': 'Tên↓'
  };
  return labels[`${sortBy.value}_${sortOrder.value}`] || 'Mới nhất';
};

// Đóng dropdown khi click bên ngoài
document.addEventListener('click', (e) => {
  if (!e.target.closest('.relative')) {
    showSortDropdown.value = false;
    openDropdownId.value = null;
  }
});
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
