<template>
    <div class="p-6 ">
        <!-- THANH CÔNG CỤ -->
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
            <!-- Ô tìm kiếm -->
            <div class="relative flex-1 min-w-[300px] sm:max-w-[700px]">
                <input v-model="searchQuery" type="text" placeholder="Search here..."
                    class="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm" />
                <svg xmlns="http://www.w3.org/2000/svg"
                    class="absolute left-3 top-1/2 w-5 h-5 text-gray-400 -translate-y-1/2" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                </svg>
            </div>

            <!-- NÚT HÀNH ĐỘNG -->
            <div class="flex items-center gap-2">
                <!-- Nút thêm hàng hóa -->
                <button @click="openAddPopup"
                    class="flex items-center justify-center gap-2 bg-white hover:bg-gray-200 text-gray-700 px-5 py-3 rounded-xl shadow-sm border border-gray-200 transition text-sm font-medium min-w-[160px]">
                    ➕ Thêm hàng hóa
                </button>

                <!-- Nút quét mã -->
                <button @click="openScanPopup"
                    class="flex items-center justify-center gap-2 bg-white hover:bg-gray-200 text-gray-700 px-5 py-3 rounded-xl shadow-sm border border-gray-200 transition text-sm font-medium min-w-[160px]">
                    <span class="material-icons text-base">qr_code_scanner</span>
                    Quét mã
                </button>

                <!-- Dropdown sắp xếp -->
                <div class="relative">
                    <button @click="toggleDropdown"
                        class="flex items-center justify-center gap-2 bg-white hover:bg-gray-200 text-gray-700 px-5 py-3 rounded-xl shadow-sm border border-gray-200 transition text-sm font-medium min-w-[160px]">
                        <span>{{ sortLabel }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <!-- Menu dropdown -->
                    <div v-if="showSort"
                        class="absolute right-0 mt-2 w-40 rounded-xl bg-white shadow-lg border border-gray-200 text-sm text-gray-700 z-50">
                        <button class="block w-full px-4 py-2 text-left hover:bg-gray-100" @click="setSort('Newest')">
                            🕓 Newest
                        </button>
                        <button class="block w-full px-4 py-2 text-left hover:bg-gray-100" @click="setSort('Oldest')">
                            📜 Oldest
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- BẢNG -->
        <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm ">
            <table class="w-full text-sm">
                <thead class="bg-gray-50 text-gray-700">
                    <tr>
                        <th class="border border-gray-200 p-3 text-center">
                            <input type="checkbox" v-model="selectAll" @change="toggleAll" />
                        </th>
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

                <!-- Khi có dữ liệu -->
                <tbody v-if="!loading && paginatedData.length > 0">
                    <tr v-for="item in paginatedData" :key="item.id"
                        class="border-t border-gray-100 hover:bg-gray-50 transition">
                        <td class="p-3 text-center">
                            <input type="checkbox" v-model="item.selected" @change="onRowSelectionChange" />
                        </td>
                        <td class="p-3">{{ item.ma }}</td>
                        <td class="p-3">{{ item.ten }}</td>
                        <td class="p-3">{{ item.nhaCC }}</td>
                        <td class="p-3">{{ item.loai }}</td>
                        <td class="p-3 text-center">{{ item.soLuong }}</td>
                        <td class=" border-gray-200 p-2 text-center relative">
                            <div class="flex items-center justify-center gap-2">
                                <!-- 🟢 Icon hiện khi đang sửa -->
                                <svg v-if="item.isEditing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                    fill="currentColor" class="w-4 h-4 text-blue-500 animate-pulse">
                                    <path
                                        d="M17.414 2.586a2 2 0 0 0-2.828 0L6 11.172V14h2.828l8.586-8.586a2 2 0 0 0 0-2.828zM4 16h12v2H4v-2z" />
                                </svg>

                                <!-- Nút 3 chấm -->
                                <button @click.stop="toggleRowMenu(item)"
                                    class="text-gray-700 hover:text-blue-500 text-lg font-bold relative">
                                    ...
                                </button>
                            </div>

                            <!-- Menu xổ xuống -->
                            <transition name="fade">
                                <div v-if="item.showMenu"
                                    class="absolute right-2 top-8 z-50 w-40 bg-white border border-gray-200 rounded-lg shadow-md text-sm text-gray-700">
                                    <button @click="editRow(item)"
                                        class="block w-full text-left px-4 py-2 hover:bg-gray-100">✏️ Sửa</button>
                                    <button @click="deleteRow(item)"
                                        class="block w-full text-left px-4 py-2 hover:bg-gray-100">🗑️ Xóa</button>
                                    <button @click="viewRow(item)"
                                        class="block w-full text-left px-4 py-2 hover:bg-gray-100">👁️ Xem chi
                                        tiết</button>
                                    <button @click="blockRow(item)"
                                        class="block w-full text-left px-4 py-2 hover:bg-gray-100">🚫 Chặn</button>
                                </div>
                            </transition>

                        </td>
                    </tr>
                </tbody>

                <!-- Khi đang load hoặc không có dữ liệu -->
                <tbody v-else>
                    <tr>
                        <td :colspan="7" class="h-80">
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
                        <button v-for="page in totalPages" :key="page" @click="goToPage(page)" class="px-3 py-2" :class="page === currentPage
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
            <!-- POPUP THÊM HÀNG HÓA -->
            <div v-if="showAddPopup"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/15 bg-opacity-40">
                <div class="bg-white rounded-2xl shadow-2xl w-[700px] p-6 relative animate-fadeIn">
                    <!-- Nút đóng -->
                    <button @click="showAddPopup = false"
                        class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl">
                        ✕
                    </button>

                    <h2 class="text-2xl font-bold text-gray-800 mb-6">Thêm hàng hóa</h2>

                    <div class="grid grid-cols-2 gap-4 mb-6">
                        <!-- Tên hàng hóa -->
                        <div class="col-span-2">
                            <label class="block text-sm font-medium text-gray-600 mb-1">Tên hàng hóa</label>
                            <input v-model="newItem.ten" type="text" placeholder="Nhập tên hàng hóa"
                                class="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        </div>

                        <!-- Nhà cung cấp -->
                        <div>
                            <label class="block text-sm font-medium text-gray-600 mb-1">Nhà cung cấp</label>
                            <select v-model="newItem.nhaCC"
                                class="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                <option>SamSung</option>
                                <option>Apple</option>
                                <option>Xiaomi</option>
                            </select>
                        </div>

                        <!-- Loại -->
                        <div>
                            <label class="block text-sm font-medium text-gray-600 mb-1">Loại</label>
                            <select v-model="newItem.loai"
                                class="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                <option>Điện thoại</option>
                                <option>Laptop</option>
                                <option>Phụ kiện</option>
                            </select>
                        </div>

                        <!-- Số lượng -->
                        <div class="col-span-2">
                            <label class="block text-sm font-medium text-gray-600 mb-1">Số lượng</label>
                            <input v-model="newItem.soLuong" type="number" placeholder="Nhập số lượng"
                                class="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        </div>
                    </div>

                    <!-- Nút hành động -->
                    <div class="flex justify-center gap-3 mt-4">
                        <button @click="resetForm"
                            class="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded-xl font-medium transition">
                            <span class="material-icons text-base">refresh</span> Refresh
                        </button>

                        <button @click="saveNewItem"
                            class="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-xl font-medium transition">
                            <span class="material-icons text-base">save</span> Save
                        </button>
                    </div>
                </div>
            </div>
            <!-- POPUP QUÉT MÃ -->
            <div v-if="showScanPopup"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/15 backdrop-blur-sm">
                <div class="bg-white rounded-2xl shadow-2xl w-[800px] p-6 relative animate-fadeIn">
                    <!-- Nút đóng -->
                    <button @click="closeScanPopup"
                        class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl">
                        ✕
                    </button>

                    <h2 class="text-2xl font-bold text-gray-800 mb-6">📷 Quét mã</h2>

                    <div class="grid grid-cols-2 gap-4 mb-5 px-2">
                        <!-- Khu quét mã -->
                        <div
                            class="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-4 hover:border-blue-400 transition">
                            <div class="flex items-center justify-center mb-2 text-gray-600">
                                <span class="material-icons text-3xl">photo_camera</span>
                            </div>
                            <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <title>bar-code</title>
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="drop" fill="#000000" transform="translate(42.666667, 85.333333)">
                                            <path
                                                d="M42.6666667,1.42108547e-14 L42.6666667,341.333333 L7.10542736e-15,341.333333 L7.10542736e-15,1.42108547e-14 L42.6666667,1.42108547e-14 Z M128,1.42108547e-14 L128,341.333333 L85.3333333,341.333333 L85.3333333,1.42108547e-14 L128,1.42108547e-14 Z M213.333333,1.42108547e-14 L213.333333,341.333333 L170.666667,341.333333 L170.666667,1.42108547e-14 L213.333333,1.42108547e-14 Z M426.666667,1.42108547e-14 L426.666667,341.333333 L384,341.333333 L384,1.42108547e-14 L426.666667,1.42108547e-14 Z M277.333333,1.42108547e-14 L277.333333,341.333333 L256,341.333333 L256,1.42108547e-14 L277.333333,1.42108547e-14 Z M341.333333,1.42108547e-14 L341.333333,341.333333 L320,341.333333 L320,1.42108547e-14 L341.333333,1.42108547e-14 Z"
                                                id="Combined-Shape"> </path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <p class="text-sm text-gray-500 mt-2">Quét bằng camera</p>
                        </div>

                        <!-- Khu tải tệp -->
                        <div
                            class="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-4 hover:border-blue-400 transition">
                            <p class="font-medium text-gray-700 mb-2">Tải tệp lên</p>
                            <label for="fileUpload"
                                class="cursor-pointer flex flex-col items-center justify-center text-blue-600 text-sm">
                                <span class="material-icons text-4xl mb-1">cloud_upload</span>
                                <span>Tải tệp lên chỉ</span>
                            </label>
                            <input id="fileUpload" type="file" accept="image/*" class="hidden"
                                @change="handleFileUpload" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import loader from "../HelperComponents/Loader.vue";
const showAddPopup = ref(false);
const newItem = ref({
    ten: "",
    nhaCC: "SamSung",
    loai: "Điện thoại",
    soLuong: "",
});

// Mở popup
function openAddPopup() {
    showAddPopup.value = true;
}

// Làm mới form
function resetForm() {
    newItem.value = {
        ten: "",
        nhaCC: "SamSung",
        loai: "Điện thoại",
        soLuong: "",
    };
}
const showScanPopup = ref(false);

function openScanPopup() {
    showScanPopup.value = true;
}
function closeScanPopup() {
    showScanPopup.value = false;
}
const data = ref([]);
const loading = ref(true);
const searchQuery = ref("");
const sortLabel = ref("Newest");
const showSort = ref(false);

const toggleDropdown = () => (showSort.value = !showSort.value);
const setSort = (type) => {
    sortLabel.value = type;
    showSort.value = false;
};
// selection
const selectAll = ref(false);

// 🧠 Tải dữ liệu từ JSON Server và khởi tạo các thuộc tính UI per-row
onMounted(async () => {
    try {
        const res = await fetch("http://localhost:3000/hanghoa");
        const raw = await res.json();
        // đảm bảo mỗi item có các thuộc tính reactive mà UI cần
        data.value = raw.map(item => ({
            ...item,
            selected: !!item.selected,
            isEditing: false,
            showMenu: false
        }));
    } catch (err) {
        console.error("Lỗi tải dữ liệu:", err);
    } finally {
        loading.value = false;
    }
});

// 🔎 Lọc dữ liệu
const filteredData = computed(() => {
    const q = searchQuery.value.toLowerCase().trim();
    let result = data.value.filter(
        (item) =>
            (item.ma || "").toString().toLowerCase().includes(q) ||
            (item.ten || "").toString().toLowerCase().includes(q) ||
            (item.nhaCC || "").toString().toLowerCase().includes(q)
    );

    if (sortLabel.value === "Newest") result = result.sort((a, b) => b.id - a.id);
    else result = result.sort((a, b) => a.id - b.id);

    return result;
});

// 📄 Phân trang
const currentPage = ref(1);
const pageSize = ref(10);
const totalPages = computed(() =>
    Math.max(1, Math.ceil(filteredData.value.length / pageSize.value))
);
const startIndex = computed(() => (currentPage.value - 1) * pageSize.value);
const endIndex = computed(() =>
    Math.min(startIndex.value + pageSize.value, filteredData.value.length)
);
const paginatedData = computed(() =>
    filteredData.value.slice(startIndex.value, endIndex.value)
);

// chuyển trang an toàn
const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};
const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};
const goToPage = (p) => {
    if (p >= 1 && p <= totalPages.value) currentPage.value = p;
};

// HANDLE selection / toggleAll
function toggleAll() {
    // nếu selectAll true thì check tất cả item trong filteredData (tốt hơn là áp dụng trên toàn bộ data tuỳ ý)
    const checked = selectAll.value;
    // Nếu muốn chỉ check trang hiện tại thay vì toàn bộ kết quả lọc: dùng paginatedData
    // Ở đây ta check toàn bộ filteredData để hành vi "Chọn tất cả kết quả tìm kiếm"
    filteredData.value.forEach(item => (item.selected = checked));
}

function onRowSelectionChange() {
    // Đồng bộ selectAll nếu tất cả đã được chọn
    const allSelected = filteredData.value.length > 0 && filteredData.value.every(i => i.selected);
    selectAll.value = allSelected;
}

// ROW MENU / EDIT
function toggleRowMenu(item) {
    // đóng tất cả menu khác rồi mở menu cho item (toggle)
    data.value.forEach(i => {
        if (i.id === item.id) i.showMenu = !i.showMenu;
        else i.showMenu = false;
    });
}

function editRow(item) {
    // đóng menu, bật chế độ edit
    item.showMenu = false;
    item.isEditing = true;
    // nếu muốn chỉ cho phép 1 dòng edit cùng lúc:
    data.value.forEach(i => {
        if (i.id !== item.id) i.isEditing = false;
    });
}

function deleteRow(item) {
    // ví dụ: xóa local (nên gọi API để xóa server-side)
    data.value = data.value.filter(i => i.id !== item.id);
}

function viewRow(item) {
    // placeholder - thực hiện mở modal hoặc route đến chi tiết
    alert(`Xem chi tiết: ${item.ten || item.ma}`);
}

function blockRow(item) {
    // placeholder
    alert(`Đã chặn: ${item.ten || item.ma}`);
}

// Khi thay đổi filteredData (ví dụ do search) -> reset currentPage nếu vượt
watch(filteredData, (newVal) => {
    if (startIndex.value >= newVal.length && currentPage.value > 1) {
        currentPage.value = Math.max(1, Math.ceil(newVal.length / pageSize.value));
    }
    // cập nhật selectAll khi filteredData thay đổi
    const allSelected = newVal.length > 0 && newVal.every(i => i.selected);
    selectAll.value = allSelected;
}, { immediate: true });

</script>
<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.96);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
}
</style>