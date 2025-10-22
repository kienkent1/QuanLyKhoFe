<template>
  <div class="p-6 space-y-4 min-h-screen bg-gray-50">
    <!-- 🔹 THANH CÔNG CỤ -->
    <div class="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl shadow-sm border">
      <!-- Ô tìm kiếm -->
      <div class="relative flex-1 min-w-[250px] max-w-[400px]">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Tìm kiếm nhân viên..."
          class="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-4 pr-10 text-sm text-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
        />
        <svg xmlns="http://www.w3.org/2000/svg"
          class="absolute right-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2"
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/>
        </svg>
      </div>

      <div class="flex gap-3">
        <button
          @click="showAddEmployee = true"
          class="rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          ➕ Thêm nhân viên
        </button>
        <button
          class="rounded-xl border border-gray-300 px-4 py-3.5 text-sm font-medium hover:bg-gray-100 transition"
        >
          🔍 Lọc
        </button>
        <button
          class="rounded-xl border border-gray-300 px-4 py-3.5 text-sm font-medium hover:bg-gray-100 transition"
        >
          ⚙️ Hành động
        </button>
      </div>
    </div>

    <!-- 🔹 BẢNG DỮ LIỆU -->
    <div class="w-full overflow-hidden bg-white rounded-xl shadow-sm border border-gray-200 mt-4">

      <table class="w-full border-collapse text-sm">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="p-3 border text-center w-[50px]">
              <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
            </th>
            <th class="p-3 border text-center cursor-pointer w-[70px]" @click="sortBy('idNhanVien')">
              Mã NV
              <span v-if="sort.field === 'idNhanVien'">
                {{ sort.isDesc ? '↓' : '↑' }}
              </span>
            </th>
            <th class="p-3 border text-left cursor-pointer" @click="sortBy('tenNhanVien')">
              Tên nhân viên
              <span v-if="sort.field === 'tenNhanVien'">
                {{ sort.isDesc ? '↓' : '↑' }}
              </span>
            </th>
            <th class="p-3 border text-left cursor-pointer" @click="sortBy('email')">
              Email
              <span v-if="sort.field === 'email'">
                {{ sort.isDesc ? '↓' : '↑' }}
              </span>
            </th>
            <th class="p-3 border text-left cursor-pointer" @click="sortBy('sdt')">
              Số điện thoại
              <span v-if="sort.field === 'sdt'">
                {{ sort.isDesc ? '↓' : '↑' }}
              </span>
            </th>
            <th class="p-3 border text-left">Giới tính</th>
            <th class="p-3 border text-left">Chức vụ</th>
            <th class="p-3 border text-center">Trạng thái</th>
            <th class="p-3 border text-center w-[80px]">...</th>
          </tr>
        </thead>

        <tbody v-if="!loading && rows.length">
          <tr v-for="(emp, i) in rows" :key="emp.idNhanVien" class="hover:bg-gray-50 transition">
            <td class="border p-2 text-center">
              <input type="checkbox" v-model="emp.selected" />
            </td>
            <td class="border p-2 text-center text-gray-700 font-medium">{{ emp.idNhanVien }}</td>
            <td class="border p-2 font-medium text-gray-800">{{ emp.tenNhanVien }}</td>
            <td class="border p-2 text-blue-600 hover:underline cursor-pointer">{{ emp.email }}</td>
            <td class="border p-2">{{ emp.sdt }}</td>
            <td class="border p-2">{{ emp.gioiTinh }}</td>
            <td class="border p-2">{{ emp.chucVu }}</td>
            <td class="border p-2 text-center">
              <span
                :class="emp.trangthai ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'"
                class="px-2 py-1 rounded-full text-xs font-semibold">
                {{ emp.trangthai ? 'Hoạt động' : 'Không hoạt động' }}
              </span>
            </td>
            <td class="border p-2 text-center">
              <button class="text-blue-600 hover:text-blue-800 text-lg">✏️</button>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="9" class="h-72">
              <div class="flex justify-center items-center">
                <Loader />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 🔹 PHÂN TRANG -->
    <Pagination
      v-if="!loading"
      :currentPage="pagination.currentPage"
      :totalPages="pagination.totalPages"
      :pageSize="pagination.pageSize"
      :totalItems="pagination.totalItems"
      @page-change="goToPage"
      @next="nextPage"
      @prev="prevPage"
    />

    <!-- 🔹 POPUP THÊM NHÂN VIÊN -->
    <div v-if="showAddEmployee" class="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div class="bg-white rounded-2xl p-8 w-[600px] relative shadow-xl">
        <button @click="showAddEmployee = false"
          class="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold">
          ✕
        </button>
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">Thêm nhân viên</h2>
        <p class="text-gray-500 text-sm">Form thêm nhân viên sẽ được cập nhật sau.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import Loader from "../HelperComponents/Loader.vue";
import Pagination from "../HelperComponents/pagination.vue";
import * as userJs from "./User.js";

const rows = ref([]);
const loading = ref(true);
const searchQuery = ref("");
const showAddEmployee = ref(false);
const selectAll = ref(false);

const sort = ref({ field: "", isDesc: false });

const objQuery = ref({
  query: "",
  page: 1,
  pageSize: 10,
  FieldName: "",
  Isdesc: false,
  FilterName: "",
  FilterValue: ""
});

const pagination = ref({
  currentPage: 1,
  totalPages: 1,
  pageSize: 10,
  totalItems: 0,
});

async function loadData() {
  try {
    loading.value = true;
    objQuery.value.FieldName = sort.value.field;
    objQuery.value.Isdesc = sort.value.isDesc;
    const res = await userJs.userData(objQuery.value);
    rows.value = res.data.map((emp) => ({ ...emp, selected: false }));
    pagination.value = {
      currentPage: res.currentPage,
      totalPages: res.totalPages,
      pageSize: res.pageSize,
      totalItems: res.totalItems,
    };
  } catch (err) {
    console.error("Lỗi tải dữ liệu:", err);
  } finally {
    loading.value = false;
  }
}

watch(searchQuery, (newVal) => {
  objQuery.value.query = newVal;
  objQuery.value.page = 1;
  loadData();
});

const sortBy = (field) => {
  if (sort.value.field === field) {
    sort.value.isDesc = !sort.value.isDesc;
  } else {
    sort.value.field = field;
    sort.value.isDesc = false;
  }
  loadData();
};

const nextPage = () => {
  if (pagination.value.currentPage < pagination.value.totalPages) {
    objQuery.value.page++;
    loadData();
  }
};
const prevPage = () => {
  if (pagination.value.currentPage > 1) {
    objQuery.value.page--;
    loadData();
  }
};
const goToPage = (page) => {
  objQuery.value.page = page;
  loadData();
};

const toggleSelectAll = () => {
  rows.value.forEach((r) => (r.selected = selectAll.value));
};

onMounted(() => loadData());
</script>
