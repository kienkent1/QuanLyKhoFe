<template>
    <div class="p-6 bg-gray-50 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- BẢNG QUYỀN -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table class="w-full border-collapse">
                <thead class="bg-gray-50">
                    <tr class="text-gray-700 text-sm ">
                        <th class="p-3 text-left">
                            <select v-model="selectedRole"
                                class="border rounded-md px-2 py-1 text-sm focus:outline-none">
                                <option value="">Role</option>
                                <option v-for="r in roles" :key="r.id" :value="r.name">{{ r.name }}</option>
                            </select>
                        </th>
                        <th class="p-3 text-center">Xem</th>
                        <th class="p-3 text-center">Thêm</th>
                        <th class="p-3 text-center">Sửa</th>
                        <th class="p-3 text-center">Xóa</th>
                    </tr>
                </thead>
                <tbody class="text-sm text-gray-600">
                    <tr v-for="(item, i) in permissions" :key="i" class="hover:bg-gray-50 transition-all">
                        <td class="p-3">{{ item.name }}</td>
                        <td class="p-3 text-center"><input type="checkbox" :checked="item.view" /></td>
                        <td class="p-3 text-center"><input type="checkbox" :checked="item.add" /></td>
                        <td class="p-3 text-center"><input type="checkbox" :checked="item.edit" /></td>
                        <td class="p-3 text-center"><input type="checkbox" :checked="item.delete" /></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- DANH SÁCH ROLE -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col space-y-4">
            <!-- THANH CÔNG CỤ -->
            <div class="flex flex-wrap items-center gap-3">
                <!-- SEARCH -->
                <div class="relative flex-1 min-w-[200px] shadow-md rounded-lg">
                    <input v-model="searchQuery" type="text" placeholder="Search here..."
                        class="w-full border-none rounded-lg px-4 py-2 text-sm focus:outline-none" />
                    <span class="absolute right-3 top-2.5 text-gray-400">🔍</span>
                </div>

                <!-- BUTTONS -->
                <button class="px-4 py-2 bg-white shadow-md hover:shadow-lg rounded-lg text-sm border border-gray-100">
                    Thêm Role
                </button>
                <button class="px-4 py-2 bg-white shadow-md hover:shadow-lg rounded-lg text-sm border border-gray-100">
                    Tên Role
                </button>
            </div>

            <!-- DANH SÁCH 2 CỘT -->
            <div class="grid grid-cols-2 gap-4">
                <div v-for="(col, idx) in [filteredRoles.slice(0, 8), filteredRoles.slice(8, 16)]" :key="idx"
                    class="border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                    <table class="w-full text-sm">
                        <thead class="bg-gray-50 text-gray-700">
                            <tr>
                                <th class="p-2 text-left w-1/3">Id</th>
                                <th class="p-2 text-left">Tên Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="r in col" :key="r.id" class="hover:bg-gray-50 transition-all">
                                <td class="p-2 text-gray-600">{{ r.id }}</td>
                                <td class="p-2 text-gray-600 flex items-center justify-between">
                                    {{ r.name }}
                                    <button class="text-gray-400 hover:text-gray-600">•••</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- PHÂN TRANG -->
            <div class="flex flex-wrap items-center justify-center gap-2 mt-4">
                <button class="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 shadow-sm">
                    ‹ Previous
                </button>
                <button v-for="n in 4" :key="n"
                    class="w-8 h-8 flex items-center justify-center border rounded-lg text-sm shadow-sm"
                    :class="n === 3 ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'">
                    {{ n }}
                </button>
                <button class="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 shadow-sm">
                    Next ›
                </button>
            </div>

            <p class="text-center text-xs text-gray-500">
                Hiển thị {{ filteredRoles.length }} trong số {{ roles.length }} dữ liệu
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const roles = ref([]);
const permissions = ref([]);
const selectedRole = ref("");
const searchQuery = ref("");

// Lấy dữ liệu từ db.json
onMounted(async () => {
    const resRoles = await fetch("http://localhost:3000/roles");
    roles.value = await resRoles.json();

    const resPerms = await fetch("http://localhost:3000/permissions");
    permissions.value = await resPerms.json();
});

const filteredRoles = computed(() =>
    roles.value.filter((r) =>
        r.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
);
</script>

<style scoped>
table {
    border-collapse: collapse;
}
</style>
