<template>
    <div class="p-6 space-y-4">
        <!-- THANH CÔNG CỤ -->
        <div class="flex flex-wrap items-center justify-between gap-3  p-4 rounded-xl shadow-sm">
            <!-- Ô tìm kiếm -->
            <div class="relative flex-1 min-w-[250px]">
                <input v-model="searchQuery" type="text" placeholder="Tìm kiếm..."
                    class="w-full rounded-xl border border-gray-200 bg-white shadow-sm py-3.5 pl-4 pr-10 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <svg xmlns="http://www.w3.org/2000/svg"
                    class="absolute right-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                </svg>
            </div>

            <!-- NÚT -->
            <div class="flex items-center gap-2">
                <button @click="showModal = true"
                    class="bg-white hover:bg-gray-300 text-black px-4 py-2 rounded-xl flex items-center gap-2">
                    <span class="material-icons text-sm">add</span>
                    Tạo phiếu xuất kho
                </button>

                <!-- Dropdown sắp xếp -->
                <div class="relative">
                    <button @click="toggleDropdown"
                        class="flex items-center gap-2 rounded-xl bg-white px-4 py-3.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 transition">
                        {{ sortLabel }}
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <div v-if="showSort"
                        class="absolute right-0 mt-2 w-36 rounded-xl bg-white shadow-lg border border-gray-200 text-sm text-gray-700 z-50">
                        <button class="block w-full px-4 py-2 text-left hover:bg-gray-100"
                            @click="setSort('Newest')">Newest</button>
                        <button class="block w-full px-4 py-2 text-left hover:bg-gray-100"
                            @click="setSort('Oldest')">Oldest</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- BẢNG DỮ LIỆU -->
        <div class="w-full overflow-visible bg-white rounded-xl shadow-sm border border-gray-200 mt-4">
            <table class="w-full border-collapse text-sm">
                <thead class="bg-gray-100 text-gray-700">
                    <tr>
                        <th v-for="header in headers" :key="header" class="border border-gray-200 p-3 text-left">{{
                            header }}</th>
                        <th class="border border-gray-200 p-3 text-center">
                            <button
                                class="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition">
                                💾 Lưu
                            </button>
                        </th>
                    </tr>
                </thead>

                <tbody v-if="!loading && paginatedData.length > 0">
                    <tr v-for="(row, i) in paginatedData" :key="row.id" class="hover:bg-gray-50 transition relative">
                        <td class="border border-gray-200 p-3">{{ row.code }}</td>
                        <td class="border border-gray-200 p-3">{{ row.supplier }}</td>
                        <td class="border border-gray-200 p-3">{{ row.product }}</td>
                        <td class="border border-gray-200 p-3">{{ row.quantity }}</td>
                        <td class="border border-gray-200 p-3 text-green-600">{{ row.price }}</td>
                        <td class="border border-gray-200 p-3">{{ row.status }}</td>
                        <td class="border border-gray-200 p-3">{{ row.date }} {{ row.time }}</td>
                        <td class="border border-gray-200 p-3 text-center relative">
                            <div class="flex items-center justify-center gap-3">
                                <button class="text-gray-700 hover:text-blue-500">👁️</button>
                                <button @click="toggleRowMenu(i)" class="text-gray-700 hover:text-blue-500">⋯</button>
                            </div>

                            <!-- menu -->
                            <transition name="fade">
                                <div v-if="row.showMenu"
                                    class="absolute right-3 top-10 z-50 w-32 bg-white border border-gray-200 rounded-lg shadow-md text-sm text-gray-700">
                                    <button @click="editRow(row)"
                                        class="block w-full text-left px-4 py-2 hover:bg-gray-100">✏️ Sửa</button>
                                    <button @click="deleteRow(row.id)"
                                        class="block w-full text-left px-4 py-2 hover:bg-gray-100">🗑️ Xóa</button>
                                    <button class="block w-full text-left px-4 py-2 hover:bg-gray-100">👁️ Xem</button>
                                    <button class="block w-full text-left px-4 py-2 hover:bg-gray-100">🚫 Chặn</button>
                                </div>
                            </transition>
                        </td>
                    </tr>
                </tbody>

                <tbody v-else>
                    <tr>
                        <td colspan="8" class="h-80">
                            <div class="flex items-center justify-center h-full">
                                <Loader />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Popup -->
            <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black/15">
                <!-- Popup -->
                <div ref="modal"
                    class="bg-white rounded-2xl border border-gray-200 shadow-xl w-full max-w-2xl p-8 space-y-6 absolute"
                    :style="{ top: position.top + 'px', left: position.left + 'px' }">
                <button @click.stop="closeModal"
                    class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold">
                    ✕
                </button>
                    <!-- HEADER -->
                    <div class="flex justify-between items-center cursor-move border-b border-gray-100 pb-4"
                        @mousedown="startDrag">
                        <h2 class="text-2xl font-bold text-gray-800">Tạo phiếu xuất kho</h2>
                        <!-- Logo góc phải -->
                        <img src="/public/logo.png" alt="Logo" class="w-20 h-20" />
                    </div>

                    <!-- FORM -->
                    <div class="bg-gray-50 p-6 rounded-xl space-y-6">
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-1">Nguồn nhập</label>
                                <input v-model="newPhieu.supplier" type="text" placeholder="Nhập tên nguồn nhập"
                                    class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-200" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-1">Giá trị</label>
                                <input v-model="newPhieu.price" type="number" placeholder="Nhập giá trị"
                                    class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-200" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-1">Tình trạng</label>
                                <select v-model="newPhieu.status"
                                    class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-200">
                                    <option>Đã duyệt</option>
                                    <option>Chờ duyệt</option>
                                    <option>Đã hủy</option>
                                </select>
                            </div>
                        </div>

                        <!-- Nút -->
                        <div class="flex justify-center gap-6 pt-2">
                            <button
                                class="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 shadow-sm">
                                <span class="material-icons text-lg">refresh</span>
                                Refresh
                            </button>

                            <button
                                class="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 shadow-sm">
                                <span class="material-icons text-lg">save</span>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- PHÂN TRANG -->
        <div class="flex flex-wrap items-center justify-between px-2 pt-3">
            <p class="text-sm text-gray-600">
                Hiển thị {{ startIndex + 1 }} - {{ endIndex }} trong {{ filteredData.length }} dữ liệu
            </p>

            <div class="flex items-center gap-2">
                <button @click="prevPage" :disabled="currentPage === 1"
                    class="px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 disabled:opacity-50">
                    « Previous
                </button>

                <div class="flex items-center border border-blue-500 rounded-md overflow-hidden">
                    <button v-for="page in totalPages" :key="page" @click="currentPage = page" class="px-3 py-2 text-sm"
                        :class="page === currentPage ? 'bg-blue-500 text-white' : 'text-blue-600 hover:bg-blue-100'">
                        {{ page }}
                    </button>
                </div>

                <button @click="nextPage" :disabled="currentPage === totalPages"
                    class="px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 disabled:opacity-50">
                    Next »
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from "vue";
import Loader from "../HelperComponents/Loader.vue";

const headers = ["Mã phiếu", "Nguồn nhập", "Tên hàng", "Số lượng", "Giá xuất", "Tình trạng", "Thời gian"];
const showSort = ref(false);
const sortLabel = ref("Newest");
const searchQuery = ref("");
const loading = ref(true);
const data = ref([]);

const toggleDropdown = () => (showSort.value = !showSort.value);
const setSort = (type) => {
    sortLabel.value = type;
    showSort.value = false;
};

onMounted(async () => {
    try {
        const res = await fetch("http://localhost:3000/phieuXuatKho");
        if (!res.ok) throw new Error("Lỗi tải dữ liệu!");
        data.value = await res.json();
    } catch (err) {
        console.error("Fetch error:", err);
    } finally {
        loading.value = false;
    }
});

// 🔎 Lọc theo tìm kiếm
const filteredData = computed(() => {
    const q = searchQuery.value.toLowerCase();
    let result = data.value.filter(
        (r) =>
            r.code.toLowerCase().includes(q) ||
            r.supplier.toLowerCase().includes(q) ||
            r.product.toLowerCase().includes(q)
    );

    if (sortLabel.value === "Newest") result = result.sort((a, b) => b.id - a.id);
    else if (sortLabel.value === "Oldest") result = result.sort((a, b) => a.id - b.id);

    return result;
});

// 📄 PHÂN TRANG
const currentPage = ref(1);
const pageSize = ref(10);
const totalPages = computed(() => Math.ceil(filteredData.value.length / pageSize.value));
const startIndex = computed(() => (currentPage.value - 1) * pageSize.value);
const endIndex = computed(() => Math.min(startIndex.value + pageSize.value, filteredData.value.length));
const paginatedData = computed(() => filteredData.value.slice(startIndex.value, endIndex.value));

const nextPage = () => currentPage.value < totalPages.value && currentPage.value++;
const prevPage = () => currentPage.value > 1 && currentPage.value--;

// 📋 MENU
const toggleRowMenu = (index) => {
    paginatedData.value.forEach((row, i) => (row.showMenu = i === index ? !row.showMenu : false));
};

// ✏️ Chức năng mẫu
const editRow = (row) => alert(`Sửa phiếu: ${row.code}`);
const deleteRow = (id) => alert(`Xóa phiếu ID: ${id}`);
const showModal = ref(false);

const newPhieu = reactive({
    supplier: "",
    price: "",
    status: "Chờ duyệt",
});

// --- Kéo thả popup ---
const position = reactive({ top: 250, left: 700 });
const offset = reactive({ x: 0, y: 0 });
const isDragging = ref(false);
const modal = ref(null);

const startDrag = (e) => {
    isDragging.value = true;
    offset.x = e.clientX - position.left;
    offset.y = e.clientY - position.top;
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
};

const onDrag = (e) => {
    if (!isDragging.value) return;
    position.left = e.clientX - offset.x;
    position.top = e.clientY - offset.y;
};

const stopDrag = () => {
    isDragging.value = false;
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
};
const closeModal = () => {
    showModal.value = false;
};

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
