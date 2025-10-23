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

      <!-- Nút thêm loại hàng và lọc -->
      <div class="flex items-center gap-3">
        <Addloai @reload="loadLoai" />
        
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
            <button @click="setSort('CreateAt', 'desc')" 
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
              Mới nhất
            </button>
            <button @click="setSort('CreateAt', 'asc')" 
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
              Cũ nhất
            </button>
            <button @click="setSort('tenLoai', 'asc')" 
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
              Tên↑
            </button>
            <button @click="setSort('tenLoai', 'desc')" 
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
              Tên↓
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- BẢNG DỮ LIỆU LOẠI HÀNG -->
    <div class="w-full overflow-hidden bg-white rounded-xl shadow-sm border border-gray-200 mt-4">
      <table class="w-full border-collapse text-sm border border-gray-300">
        <thead class="bg-gray-50 text-gray-700">
          <tr>
            <th class="p-3 border-b border-r border-gray-300 text-center w-[50px]">
              <input type="checkbox" class="rounded border-gray-300" />
            </th>
            <th class="p-3 border-b border-r border-gray-300 text-center cursor-pointer w-[100px]">
              <div class="flex items-center justify-center gap-1">
                Mã loại
                <div class="flex flex-col">
                  <svg class="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v11a1 1 0 102 0V5a1 1 0 00-1-1H3zm4.293 4.293a1 1 0 011.414 0L10 9.414l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </th>
            <th class="p-3 border-b border-r border-gray-300 text-left cursor-pointer">
              <div class="flex items-center gap-1">
                Tên loại hàng
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
                Hình ảnh
                <div class="flex flex-col">
                  <svg class="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v11a1 1 0 102 0V5a1 1 0 00-1-1H3zm4.293 4.293a1 1 0 011.414 0L10 9.414l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </th>
            <th class="p-3 border-b border-r border-gray-300 text-left cursor-pointer">
              <div class="flex items-center gap-1">
                Ngày tạo
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

        <tbody v-if="paginatedData.length">
          <tr v-for="item in paginatedData" :key="item.id" class="hover:bg-gray-50 transition border-b border-gray-300">
            <td class="p-3 border-r border-gray-300 text-center">
              <input type="checkbox" class="rounded border-gray-300" />
            </td>
            <td class="p-3 border-r border-gray-300 text-center text-gray-700 font-medium">{{ item.id }}</td>
            <td class="p-3 border-r border-gray-300 font-medium text-gray-800">{{ item.tenLoai }}</td>
            <td class="p-3 border-r border-gray-300 text-gray-600 max-w-[200px]">
              <div class="truncate" :title="item.moTa">
                {{ item.moTa }}
              </div>
            </td>
            <td class="p-3 border-r border-gray-300 text-center">
              <div class="w-[60px] h-[40px] flex items-center justify-center mx-auto">
                <img v-if="item.HinhAnh || item.hinhAnh || item.imageName"
                  :src="getImageUrl(item.HinhAnh || item.hinhAnh || item.imageName)" 
                  alt="Ảnh loại hàng"
                  class="object-contain max-w-full max-h-full rounded" />
                <span v-else class="text-gray-400 text-xs">Không có ảnh</span>
              </div>
            </td>
            <td class="p-3 border-r border-gray-300 text-gray-600">{{ item.CreateAt || 'N/A' }}</td>
            <td class="p-3 text-center">
              <div class="flex items-center justify-center gap-2">
                <!-- Nút Edit -->
                <button @click="editCategory(item)" class="text-purple-600 hover:text-purple-800 transition">
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
                    <button @click="viewCategory(item)" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg transition">
                      Xem
                    </button>
                    <button @click="deleteCategory(item)" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg transition">
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
                <div class="text-gray-500">Không có dữ liệu</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL XEM CHI TIẾT LOẠI HÀNG -->
    <div v-if="showViewModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="bg-white border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.15)] rounded-2xl w-[500px] max-w-[90%] p-8 space-y-6 relative">
        <!-- Nút đóng -->
        <button @click="showViewModal = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl leading-none transition">
          &times;
        </button>

        <!-- Tiêu đề -->
        <h2 class="text-2xl font-bold text-gray-900 text-left">Chi tiết loại hàng</h2>

        <!-- Nội dung -->
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <div class="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-lg">
              <img v-if="viewCategoryData.HinhAnh" :src="getImageUrl(viewCategoryData.HinhAnh)" alt="Hình ảnh" class="object-contain max-w-full max-h-full" />
              <span v-else class="text-gray-400 text-xs">Không có ảnh</span>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900">{{ viewCategoryData.tenLoai }}</h3>
              <p class="text-gray-600">Mã: {{ viewCategoryData.id }}</p>
      </div>
    </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-700 mb-2">Mô tả:</h4>
            <p class="text-gray-600">{{ viewCategoryData.moTa }}</p>
          </div>
          
          <div class="flex justify-between text-sm text-gray-600">
            <span>Ngày tạo: {{ viewCategoryData.CreateAt }}</span>
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

    <!-- MODAL SỬA LOẠI HÀNG -->
    <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/15">
      <div class="bg-white rounded-2xl shadow-2xl w-[750px] max-w-[90%] p-6 relative">
        <button @click="showEditModal = false" class="absolute top-3 right-3 text-gray-500 hover:text-black transition">✕</button>

        <h2 class="text-xl font-bold mb-6">Sửa loại hàng</h2>

        <div class="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label class="block text-sm font-semibold mb-1">Tên loại hàng</label>
            <input v-model="editCategoryData.tenLoai" type="text" placeholder="Nhập tên loại hàng"
              class="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Mô tả</label>
            <input v-model="editCategoryData.moTa" type="text" placeholder="Viết mô tả"
              class="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Hình ảnh</label>
            <div @click="selectEditImage"
              class="flex items-center justify-between w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 cursor-pointer hover:bg-gray-100">
              <span>{{ editCategoryData.imageName || 'Bấm vào để chọn ảnh' }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 7a2 2 0 012-2h3l1-1h4l1 1h3a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input ref="editFileInput" type="file" accept="image/*" @change="handleEditFile" class="hidden" />
            <div v-if="editPreviewUrl" class="mt-3">
              <img :src="editPreviewUrl" alt="Preview" class="w-28 h-16 object-cover rounded-md border" />
            </div>
          </div>
        </div>

        <div class="flex justify-center gap-6">
          <button @click="showEditModal = false"
            class="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-2 rounded-lg shadow transition">
            Hủy
          </button>
          <button @click="saveEditCategory"
            class="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow transition">
            Lưu lại
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL XÁC NHẬN XÓA LOẠI HÀNG -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="bg-white border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.15)] rounded-2xl w-[400px] max-w-[90%] p-8 space-y-6 relative">
        <!-- Tiêu đề -->
        <h2 class="text-xl font-bold text-gray-900 text-left">Xác nhận xóa</h2>

        <!-- Nội dung -->
        <div class="text-gray-600">
          <p>Bạn có chắc chắn muốn xóa loại hàng:</p>
          <p class="font-semibold text-gray-900 mt-2">{{ selectedCategory.tenLoai }}</p>
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
  sortBy,
  sortOrder,
} = useLoaiHang();

const q = ref("");
const openDropdownId = ref(null);
const showViewModal = ref(false);
const showDeleteModal = ref(false);
const showEditModal = ref(false);
const selectedCategory = ref({});
const viewCategoryData = ref({});
const editCategoryData = ref({});
const editFileInput = ref(null);
const editPreviewUrl = ref(null);
const showSortDropdown = ref(false);

// Chức năng dropdown
const toggleDropdown = (id, event) => {
  event.stopPropagation();
  openDropdownId.value = openDropdownId.value === id ? null : id;
};

// Chức năng sửa loại hàng
const editCategory = (category) => {
  editCategoryData.value = { ...category };
  showEditModal.value = true;
  openDropdownId.value = null;
};

// Chức năng xem loại hàng
const viewCategory = (category) => {
  viewCategoryData.value = { ...category };
  showViewModal.value = true;
  openDropdownId.value = null;
};

// Chức năng xóa loại hàng
const deleteCategory = (category) => {
  selectedCategory.value = { ...category };
  showDeleteModal.value = true;
  openDropdownId.value = null;
};

// Xác nhận xóa
const confirmDelete = () => {
  try {
    const existingData = JSON.parse(localStorage.getItem('loaiHangData') || '[]');
    const index = existingData.findIndex(item => item.id === selectedCategory.value.id);
    
    if (index !== -1) {
      existingData.splice(index, 1);
      localStorage.setItem('loaiHangData', JSON.stringify(existingData));
      loadLoai(); // Reload data
      showDeleteModal.value = false;
      selectedCategory.value = {};
    }
  } catch (error) {
    console.error('Lỗi khi xóa loại hàng:', error);
    alert('Có lỗi xảy ra khi xóa loại hàng!');
  }
};

// Chức năng upload ảnh cho modal sửa
const selectEditImage = () => {
  editFileInput.value?.click();
};

const handleEditFile = (e) => {
  const file = e.target.files[0];
  if (file) {
    editCategoryData.value.image = file;
    editCategoryData.value.imageName = file.name;
    editPreviewUrl.value = URL.createObjectURL(file);
  }
};

// Lưu thay đổi loại hàng
const saveEditCategory = () => {
  try {
    // Validation
    if (!editCategoryData.value.tenLoai.trim()) {
      alert('Vui lòng nhập tên loại hàng');
      return;
    }
    
    if (editCategoryData.value.tenLoai.trim().length < 2) {
      alert('Tên loại hàng phải có ít nhất 2 ký tự');
      return;
    }
    
    // Cập nhật dữ liệu trong localStorage
    const existingData = JSON.parse(localStorage.getItem('loaiHangData') || '[]');
    const index = existingData.findIndex(item => item.id === editCategoryData.value.id);
    
    if (index !== -1) {
      // Cập nhật thông tin
      existingData[index] = {
        ...existingData[index],
        tenLoai: editCategoryData.value.tenLoai.trim(),
        moTa: editCategoryData.value.moTa.trim() || `Mô tả cho ${editCategoryData.value.tenLoai.trim()}`,
        HinhAnh: editCategoryData.value.image ? URL.createObjectURL(editCategoryData.value.image) : existingData[index].HinhAnh,
        imageName: editCategoryData.value.imageName || existingData[index].imageName,
        // Giữ nguyên ngày tạo
      };
      
      localStorage.setItem('loaiHangData', JSON.stringify(existingData));
      loadLoai(); // Reload data
      showEditModal.value = false;
      editCategoryData.value = {};
      editPreviewUrl.value = null;
    }
    
  } catch (error) {
    console.error('Lỗi khi sửa loại hàng:', error);
    alert('Có lỗi xảy ra khi sửa loại hàng!');
  }
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
    'CreateAt_desc': 'Mới nhất',
    'CreateAt_asc': 'Cũ nhất',
    'tenLoai_asc': 'Tên↑',
    'tenLoai_desc': 'Tên↓'
  };
  return labels[`${sortBy.value}_${sortOrder.value}`] || 'Mới nhất';
};

// Đóng dropdown khi click bên ngoài
document.addEventListener('click', (e) => {
  if (!e.target.closest('.relative')) {
    openDropdownId.value = null;
    showSortDropdown.value = false;
  }
});
</script>

<style scoped>
button {
  transition: all 0.2s ease;
}
</style>
