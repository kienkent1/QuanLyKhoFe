<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <!-- THANH CÔNG CỤ -->
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
            <!-- Ô tìm kiếm -->
            <div class="relative w-full sm:w-[300px]">
                <input v-model="searchQuery" type="text" placeholder="Search here..."
                    class="w-full border border-gray-300 rounded-xl py-2.5 pl-10 pr-3 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <svg xmlns="http://www.w3.org/2000/svg"
                    class="absolute left-3 top-1/2 w-5 h-5 text-gray-400 -translate-y-1/2" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                </svg>
            </div>

            <!-- NÚT HÀNH ĐỘNG -->
            <div class="flex items-center gap-2">
                <button
                    class="bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 px- py-2 rounded-xl shadow-sm">
                    Tạo phiếu xuất kho với ncc
                </button>
                <button
                    class="bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 px-3 py-2 rounded-xl flex items-center gap-2">
                    <span class="material-icons text-sm">qr_code_scanner</span>
                    Quét mã
                </button>
                <select v-model="sortLabel"
                    class="border border-gray-300 bg-white text-gray-700 rounded-xl px-5 py-2 text-sm">
                    <option>Newest</option>
                    <option>Oldest</option>
                </select>
            </div>
        </div>

        <!-- BẢNG -->
        <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table class="w-full text-sm">
                <thead class="bg-gray-50 text-gray-700">
                    <tr>
                        <th class="p-3 text-left font-semibold">Mã HH</th>
                        <th class="p-3 text-left font-semibold">Tên HH</th>
                        <th class="p-3 text-left font-semibold">Nhà CC</th>
                        <th class="p-3 text-left font-semibold">Loại</th>
                        <th class="p-3 font-semibold text-center pr-6">Số lượng</th>
                        <th class="p-3 text-center">
                            <button
                                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-xs font-semibold">
                                💾 Lưu
                            </button>
                        </th>
                    </tr>
                </thead>

                <tbody v-if="!loading && paginatedData.length > 0">
                    <tr v-for="item in paginatedData" :key="item.id"
                        class="border-t border-gray-100 hover:bg-gray-50 transition">
                        <td class="p-3">{{ item.ma }}</td>
                        <td class="p-3">{{ item.ten }}</td>
                        <td class="p-3">{{ item.nhaCC }}</td>
                        <td class="p-3">{{ item.loai }}</td>
                        <td class="p-3 text-center">{{ item.soLuong }}</td>
                        <td class="p-3 text-center">
                            <button class="text-blue-500 hover:text-blue-700">✏️</button>
                        </td>
                    </tr>
                </tbody>

                <tbody v-else>
                    <tr>
                        <td colspan="8" class="h-80">
                            <div class="flex items-center justify-center h-full">
                                <loader />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- PHÂN TRANG -->
            <div class="flex items-center justify-between p-4 text-sm text-gray-600 border-t border-gray-100">
                <p>
                    Hiển thị {{ startIndex + 1 }} - {{ endIndex }} trong
                    {{ filteredData.length }} dữ liệu
                </p>
                <div class="flex items-center gap-2">
                    <button @click="prevPage" :disabled="currentPage === 1"
                        class="px-3 py-2 rounded-md bg-blue-500 text-white text-sm disabled:opacity-50">
                        « Previous
                    </button>

                    <div class="flex border border-blue-500 rounded-md overflow-hidden">
                        <button v-for="page in totalPages" :key="page" @click="currentPage = page" class="px-3 py-2"
                            :class="page === currentPage
                                ? 'bg-blue-500 text-white'
                                : 'text-blue-600 hover:bg-blue-100'
                                ">
                            {{ page }}
                        </button>
                    </div>

                    <button @click="nextPage" :disabled="currentPage === totalPages"
                        class="px-3 py-2 rounded-md bg-blue-500 text-white text-sm disabled:opacity-50">
                        Next »
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import loader from "../HelperComponents/Loader.vue";
const data = ref([]);
const loading = ref(true);
const searchQuery = ref("");
const sortLabel = ref("Newest");

// 🧠 Tải dữ liệu từ JSON Server
onMounted(async () => {
    try {
        const res = await fetch("http://localhost:3000/hanghoa");
        data.value = await res.json();
    } catch (err) {
        console.error("Lỗi tải dữ liệu:", err);
    } finally {
        loading.value = false;
    }
});

// 🔎 Lọc dữ liệu
const filteredData = computed(() => {
    const q = searchQuery.value.toLowerCase();
    let result = data.value.filter(
        (item) =>
            item.ma.toLowerCase().includes(q) ||
            item.ten.toLowerCase().includes(q) ||
            item.nhaCC.toLowerCase().includes(q)
    );

    if (sortLabel.value === "Newest") result = result.sort((a, b) => b.id - a.id);
    else result = result.sort((a, b) => a.id - b.id);

    return result;
});

// 📄 Phân trang
const currentPage = ref(1);
const pageSize = ref(10);
const totalPages = computed(() =>
    Math.ceil(filteredData.value.length / pageSize.value)
);
const startIndex = computed(() => (currentPage.value - 1) * pageSize.value);
const endIndex = computed(() =>
    Math.min(startIndex.value + pageSize.value, filteredData.value.length)
);
const paginatedData = computed(() =>
    filteredData.value.slice(startIndex.value, endIndex.value)
);

const nextPage = () => currentPage.value < totalPages.value && currentPage.value++;
const prevPage = () => currentPage.value > 1 && currentPage.value--;
</script>
