<template>
    <div class="min-h-screen bg-gray-50 p-6">
        <!-- HEADER -->
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Phân quyền</h1>
            <p class="text-gray-600 mt-1">Quản lý quyền hạn và vai trò người dùng</p>
        </div>

        <!-- MAIN CONTENT -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- LEFT PANEL - MATRIX PHÂN QUYỀN -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                <div class="p-6 border-b border-gray-200">
                </div>
                
                <div class="p-6">
                    <!-- BẢNG PHÂN QUYỀN -->
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="bg-gray-50">
                                    <th class="text-left p-3 font-semibold text-gray-700">Module</th>
                                    <th class="text-center p-3 font-semibold text-gray-700">Xem</th>
                                    <th class="text-center p-3 font-semibold text-gray-700">Thêm</th>
                                    <th class="text-center p-3 font-semibold text-gray-700">Sửa</th>
                                    <th class="text-center p-3 font-semibold text-gray-700">Xóa</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                <tr v-for="module in modules" :key="module.id" class="hover:bg-gray-50">
                                    <td class="p-3 font-medium text-gray-900">{{ module.name }}</td>
                                    <td class="p-3 text-center">
                                        <input type="checkbox" v-model="module.permissions.view" 
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                                    </td>
                                    <td class="p-3 text-center">
                                        <input type="checkbox" v-model="module.permissions.create" 
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                                    </td>
                                    <td class="p-3 text-center">
                                        <input type="checkbox" v-model="module.permissions.edit" 
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                                    </td>
                                    <td class="p-3 text-center">
                                        <input type="checkbox" v-model="module.permissions.delete" 
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- NÚT HÀNH ĐỘNG -->
                    <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                        <button @click="resetPermissions" 
                            class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition">
                            Đặt lại
                        </button>
                        <button @click="savePermissions" 
                            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition">
                            Lưu quyền
                        </button>
                    </div>
                </div>
            </div>

            <!-- RIGHT PANEL - QUẢN LÝ VAI TRÒ -->
            <div class="space-y-6">
                <!-- TÌM KIẾM VÀ THÊM VAI TRÒ -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h2 class="text-lg font-semibold text-gray-900">Quản lý vai trò</h2>
                    </div>
                    
                    <div class="p-6">
                        <!-- TÌM KIẾM -->
                        <div class="mb-4">
                            <div class="relative">
                                <input v-model="searchRole" type="text" placeholder="Tìm kiếm vai trò..."
                                    class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        <!-- FORM THÊM VAI TRÒ -->
                        <div class="bg-gray-50 rounded-lg p-4 mb-4">
                            <h3 class="font-medium text-gray-900 mb-3">Thêm vai trò mới</h3>
                            <div class="flex gap-3">
                                <input v-model="newRole.name" type="text" placeholder="Tên vai trò..."
                                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                                <button @click="addRole" 
                                    class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition">
                                    Thêm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- DANH SÁCH VAI TRÒ -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h2 class="text-lg font-semibold text-gray-900">Danh sách vai trò</h2>
                    </div>
                    
                    <div class="p-6">
                        <div class="space-y-3">
                            <div v-for="role in filteredRoles" :key="role.id" 
                                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 class="font-medium text-gray-900">{{ role.name }}</h4>
                                        <p class="text-sm text-gray-600">{{ role.description }}</p>
                                    </div>
                                </div>
                                
                                <div class="flex items-center gap-2">
                                    <button @click="editRole(role)" 
                                        class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button @click="deleteRole(role)" 
                                        class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- PHÂN TRANG -->
                        <div class="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                            <p class="text-sm text-gray-600">
                                Hiển thị {{ startIndex + 1 }} - {{ endIndex }} trong {{ roles.length }} vai trò
                            </p>
                            <div class="flex items-center gap-2">
                                <button @click="prevPage" :disabled="currentPage === 1"
                                    class="px-3 py-2 rounded-md bg-blue-500 text-white text-sm disabled:opacity-50">
                                    « Previous
                                </button>
                                <button v-for="page in totalPages" :key="page" @click="goToPage(page)" 
                                    :class="page === currentPage ? 'bg-blue-500 text-white' : 'text-blue-600 hover:bg-blue-100'"
                                    class="px-3 py-2 rounded-md text-sm">
                                    {{ page }}
                                </button>
                                <button @click="nextPage" :disabled="currentPage === totalPages"
                                    class="px-3 py-2 rounded-md bg-blue-500 text-white text-sm disabled:opacity-50">
                                    Next »
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// DỮ LIỆU
const searchRole = ref('');
const newRole = ref({ name: '', description: '' });
const currentPage = ref(1);
const pageSize = ref(5);

// MODULES VÀ QUYỀN HẠN
const modules = ref([
    {
        id: 1,
        name: 'Nhân viên',
        permissions: { view: false, create: false, edit: false, delete: false }
    },
    {
        id: 2,
        name: 'Nhà cung cấp',
        permissions: { view: false, create: false, edit: false, delete: false }
    },
    {
        id: 3,
        name: 'Loại hàng hóa',
        permissions: { view: false, create: false, edit: false, delete: false }
    },
    {
        id: 4,
        name: 'Hàng hóa',
        permissions: { view: false, create: false, edit: false, delete: false }
    },
    {
        id: 5,
        name: 'Báo cáo',
        permissions: { view: false, create: false, edit: false, delete: false }
    },
    {
        id: 6,
        name: 'Phân quyền',
        permissions: { view: false, create: false, edit: false, delete: false }
    }
]);

// VAI TRÒ
const roles = ref([
    { id: 1, name: 'Admin', description: 'Quản trị viên hệ thống' },
    { id: 2, name: 'Manager', description: 'Quản lý kho' },
    { id: 3, name: 'Staff', description: 'Nhân viên kho' },
    { id: 4, name: 'Viewer', description: 'Chỉ xem' },
    { id: 5, name: 'Editor', description: 'Chỉnh sửa dữ liệu' },
    { id: 6, name: 'User', description: 'Người dùng thường' },
    { id: 7, name: 'Guest', description: 'Khách' }
]);

// COMPUTED
const filteredRoles = computed(() => {
    let result = roles.value;
    
    if (searchRole.value) {
        result = result.filter(role => 
            role.name.toLowerCase().includes(searchRole.value.toLowerCase()) ||
            role.description.toLowerCase().includes(searchRole.value.toLowerCase())
        );
    }
    
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return result.slice(start, end);
});

const totalPages = computed(() => Math.ceil(roles.value.length / pageSize.value));
const startIndex = computed(() => (currentPage.value - 1) * pageSize.value);
const endIndex = computed(() => Math.min(startIndex.value + pageSize.value, roles.value.length));

// FUNCTIONS
const addRole = () => {
    if (newRole.value.name.trim()) {
        const role = {
            id: Date.now(),
            name: newRole.value.name,
            description: newRole.value.description || 'Vai trò mới'
        };
        roles.value.push(role);
        newRole.value = { name: '', description: '' };
        console.log('Đã thêm vai trò:', role.name);
    }
};

const editRole = (role) => {
    const newName = prompt('Nhập tên vai trò mới:', role.name);
    if (newName && newName.trim()) {
        role.name = newName.trim();
        console.log('Đã cập nhật vai trò:', role.name);
    }
};

const deleteRole = (role) => {
    if (confirm(`Bạn có chắc muốn xóa vai trò "${role.name}"?`)) {
        roles.value = roles.value.filter(r => r.id !== role.id);
        console.log('Đã xóa vai trò:', role.name);
    }
};

const savePermissions = () => {
    console.log('Đã lưu quyền hạn:', modules.value);
    // Logic lưu quyền hạn vào database
};

const resetPermissions = () => {
    modules.value.forEach(module => {
        module.permissions = { view: false, create: false, edit: false, delete: false };
    });
    console.log('Đã đặt lại quyền hạn');
};

// PHÂN TRANG
const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};

onMounted(() => {
    console.log('Trang phân quyền đã được tải');
});
</script>

<style scoped>
/* Custom styles nếu cần */
</style>