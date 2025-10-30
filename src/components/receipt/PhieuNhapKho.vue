<template>
    <div class="p-6 space-y-4">
        <!-- THANH CÔNG CỤ -->
        <div class="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl shadow-sm">
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
                    Tạo phiếu nhập kho
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
                        <th v-for="header in headers" :key="header" class="border border-gray-200 p-3 text-left">
                            {{ header }}
                        </th>
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
                        <td class="border border-gray-200 p-3 text-black">{{ formatPrice(row.price) }}</td>
                        <td class="border border-gray-200 p-3">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                :class="getStatusClass(row.status)">
                                {{ row.status }}
                            </span>
                        </td>
                        <td class="border border-gray-200 p-3">{{ row.time }}</td>
                        <td class="border border-gray-200 p-3 text-center relative">
                            <div class="flex items-center justify-center gap-3">
                                <!-- Icon mắt để xem -->
                                <button @click="viewPhieu(row)" class="text-gray-600 hover:text-blue-500 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                                
                                <!-- Icon 3 chấm để menu -->
                                <div class="relative">
                                    <button @click="toggleRowMenu(i)" class="text-gray-600 hover:text-gray-800 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                        </svg>
                                    </button>
                                    
                                    <!-- Dropdown menu -->
                                    <transition name="fade">
                                        <div v-if="row.showMenu"
                                            class="absolute right-0 top-8 z-50 w-40 bg-white border border-gray-200 rounded-lg shadow-lg text-sm">
                                            <button @click="updateStatus(row)"
                                                class="flex items-center gap-3 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg transition">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                                Cập nhật status
                                            </button>
                                            <button @click="deletePhieu(row)"
                                                class="flex items-center gap-3 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg transition">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Xóa
                                            </button>
                                        </div>
                                    </transition>
                                </div>
                            </div>
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
                        <h2 class="text-2xl font-bold text-gray-800">Tạo phiếu nhập kho</h2>
                        <img src="/public/logo.png" alt="Logo" class="w-20 h-20" />
                    </div>

                    <!-- FORM -->
                    <div class="bg-gray-50 p-6 rounded-xl space-y-6">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Nguồn nhập *</label>
                                <input v-model="newPhieu.supplier" type="text" placeholder="Nhập tên nguồn nhập"
                                    class="w-full bg-white text-gray-800 placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition border border-gray-200" />
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Tên hàng *</label>
                                <input v-model="newPhieu.product" type="text" placeholder="Nhập tên hàng"
                                    class="w-full bg-white text-gray-800 placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition border border-gray-200" />
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Số lượng *</label>
                                <input v-model="newPhieu.quantity" type="number" placeholder="Nhập số lượng"
                                    class="w-full bg-white text-gray-800 placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition border border-gray-200" />
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Giá nhập *</label>
                                <input v-model="newPhieu.price" type="number" placeholder="Nhập giá nhập"
                                    class="w-full bg-white text-gray-800 placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition border border-gray-200" />
                            </div>
                            <div class="sm:col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Tình trạng</label>
                                <select v-model="newPhieu.status"
                                    class="w-full bg-white text-gray-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition border border-gray-200">
                                    <option value="Chờ duyệt">Chờ duyệt</option>
                                    <option value="Đã duyệt">Đã duyệt</option>
                                    <option value="Đã hủy">Đã hủy</option>
                                </select>
                            </div>
                        </div>

                        <!-- Nút -->
                        <div class="flex justify-center gap-6 pt-6">
                            <button @click="closeModal"
                                class="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-3 rounded-lg shadow transition active:scale-95">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Hủy
                            </button>

                            <button @click="savePhieu"
                                class="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow transition active:scale-95">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                Lưu phiếu
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

        <!-- Modal cập nhật status -->
        <div v-if="showStatusModal" class="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div class="bg-white rounded-2xl p-8 w-[500px] max-w-[90%] relative shadow-2xl">
                <button @click="closeStatusModal"
                    class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold">
                    ✕
                </button>
                
                <!-- HEADER -->
                <div class="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">Cập nhật trạng thái</h2>
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                        <span class="text-lg font-semibold text-blue-600">Dâu</span>
                    </div>
                </div>

                <!-- THÔNG TIN PHIẾU -->
                <div class="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-sm font-semibold text-gray-700">Mã phiếu:</span>
                            <span class="text-sm text-gray-900">{{ selectedPhieu.code || 'PNK003' }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm font-semibold text-gray-700">Nguồn nhập:</span>
                            <span class="text-sm text-gray-900">{{ selectedPhieu.supplier || 'Công ty ABC' }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm font-semibold text-gray-700">Trạng thái hiện tại:</span>
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                :class="getStatusClass(selectedPhieu.status)">
                                {{ selectedPhieu.status }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- FORM CẬP NHẬT -->
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Trạng thái mới</label>
                        <select v-model="newStatus"
                            class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white">
                            <option value="">Chọn trạng thái mới</option>
                            <option value="Chờ duyệt">Chờ duyệt</option>
                            <option value="Đã duyệt">Đã duyệt</option>
                            <option value="Đã hủy">Đã hủy</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Ghi chú (tùy chọn)</label>
                        <textarea v-model="statusNote"
                            placeholder="Nhập ghi chú về việc thay đổi trạng thái..."
                            class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition h-20"></textarea>
                    </div>
                </div>

                <!-- NÚT HÀNH ĐỘNG -->
                <div class="flex justify-center gap-4 pt-6 border-t border-gray-200">
                    <button @click="closeStatusModal"
                        class="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg transition shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Hủy
                    </button>
                    
                    <button @click="saveStatusUpdate"
                        class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Cập nhật
                    </button>
                </div>
            </div>
        </div>

        <!-- Modal xác nhận xóa -->
        <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div class="bg-white rounded-2xl p-8 w-[400px] max-w-[90%] relative shadow-2xl">
                <button @click="closeDeleteModal"
                    class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold">
                    ✕
                </button>
                
                <!-- HEADER -->
                <div class="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">Xác nhận xóa</h2>
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <span class="text-lg font-semibold text-red-600">Dâu</span>
                    </div>
                </div>

                <!-- THÔNG TIN PHIẾU -->
                <div class="bg-red-50 rounded-lg p-4 mb-6 border border-red-200">
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-sm font-semibold text-gray-700">Mã phiếu:</span>
                            <span class="text-sm text-gray-900">{{ phieuToDelete.code || 'PNK003' }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm font-semibold text-gray-700">Nguồn nhập:</span>
                            <span class="text-sm text-gray-900">{{ phieuToDelete.supplier || 'Công ty ABC' }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm font-semibold text-gray-700">Tên hàng:</span>
                            <span class="text-sm text-gray-900">{{ phieuToDelete.product || 'Laptop Dell' }}</span>
                        </div>
                    </div>
                </div>

                <!-- CẢNH BÁO -->
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span class="text-sm font-medium text-yellow-800">Bạn có chắc chắn muốn xóa phiếu này?</span>
                    </div>
                    <p class="text-sm text-yellow-700 mt-2">Hành động này không thể hoàn tác!</p>
                </div>

                <!-- NÚT HÀNH ĐỘNG -->
                <div class="flex justify-center gap-4 pt-6 border-t border-gray-200">
                    <button @click="closeDeleteModal"
                        class="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg transition shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Hủy
                    </button>
                    
                    <button @click="confirmDelete"
                        class="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Xóa
                    </button>
                </div>
            </div>
        </div>

        <!-- Modal xem chi tiết phiếu -->
        <div v-if="showViewModal" class="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div class="bg-white rounded-2xl p-8 w-[600px] max-w-[90%] relative shadow-2xl">
                <button @click="closeViewModal"
                    class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold">
                    ✕
                </button>
                
                <!-- HEADER -->
                <div class="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">Chi tiết phiếu nhập kho</h2>
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <span class="text-lg font-semibold text-green-600">Dâu</span>
                    </div>
                </div>

                <!-- THÔNG TIN PHIẾU -->
                <div class="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-3">
                            <div class="flex justify-between">
                                <span class="text-sm font-semibold text-gray-700">Mã phiếu:</span>
                                <span class="text-sm text-gray-900 font-medium">{{ phieuToView.code || 'PNK003' }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm font-semibold text-gray-700">Nguồn nhập:</span>
                                <span class="text-sm text-gray-900">{{ phieuToView.supplier || 'Công ty ABC' }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm font-semibold text-gray-700">Tên hàng:</span>
                                <span class="text-sm text-gray-900">{{ phieuToView.product || 'Laptop Dell' }}</span>
                            </div>
                        </div>
                        <div class="space-y-3">
                            <div class="flex justify-between">
                                <span class="text-sm font-semibold text-gray-700">Số lượng:</span>
                                <span class="text-sm text-gray-900 font-medium">{{ phieuToView.quantity || '10' }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm font-semibold text-gray-700">Giá nhập:</span>
                                <span class="text-sm text-gray-900 font-medium">{{ formatPrice(phieuToView.price) || '15.000.000 VNĐ' }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm font-semibold text-gray-700">Trạng thái:</span>
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                    :class="getStatusClass(phieuToView.status)">
                                    {{ phieuToView.status || 'Đã duyệt' }}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-4 pt-4 border-t border-gray-200">
                        <div class="flex justify-between">
                            <span class="text-sm font-semibold text-gray-700">Thời gian tạo:</span>
                            <span class="text-sm text-gray-900">{{ phieuToView.time || '15/12/2024 10:30' }}</span>
                        </div>
                    </div>
                </div>

                <!-- NÚT HÀNH ĐỘNG -->
                <div class="flex justify-center pt-6 border-t border-gray-200">
                    <button @click="closeViewModal"
                        class="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg transition shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from "vue";
import Loader from "../helper-components/Loader.vue";

const headers = ["Mã phiếu", "Nguồn nhập", "Tên hàng", "Số lượng", "Giá nhập", "Tình trạng", "Thời gian"];
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

// Mock data cho phiếu nhập kho
const getMockData = () => [
    {
        id: 1,
        code: "PNK001",
        supplier: "Công ty ABC",
        product: "Laptop Dell",
        quantity: 10,
        price: 15000000,
        status: "Đã duyệt",
        time: "15/12/2024 10:30"
    },
    {
        id: 2,
        code: "PNK002", 
        supplier: "Nhà cung cấp XYZ",
        product: "Máy in Canon",
        quantity: 5,
        price: 8000000,
        status: "Chờ duyệt",
        time: "14/12/2024 14:20"
    },
    {
        id: 3,
        code: "PNK003",
        supplier: "Công ty DEF",
        product: "Bàn phím cơ",
        quantity: 20,
        price: 2000000,
        status: "Đã duyệt",
        time: "13/12/2024 09:15"
    }
];

onMounted(async () => {
    try {
        // Kiểm tra localStorage trước
        const savedData = localStorage.getItem('phieuNhapKhoData');
        if (savedData) {
            data.value = JSON.parse(savedData);
        } else {
            // Sử dụng mock data nếu chưa có dữ liệu
            data.value = getMockData();
            localStorage.setItem('phieuNhapKhoData', JSON.stringify(data.value));
        }
    } catch (err) {
        console.error("Load data error:", err);
        data.value = [];
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

// ✏️ Chức năng xem phiếu
const viewPhieu = (row) => {
    phieuToView.value = row;
    showViewModal.value = true;
};

// Đóng modal xem
const closeViewModal = () => {
    showViewModal.value = false;
    phieuToView.value = {};
};

// 🗑️ Chức năng xóa phiếu
const deletePhieu = (row) => {
    phieuToDelete.value = row;
    showDeleteModal.value = true;
};

// Đóng modal xóa
const closeDeleteModal = () => {
    showDeleteModal.value = false;
    phieuToDelete.value = {};
};

// Xác nhận xóa
const confirmDelete = () => {
    const index = data.value.findIndex(item => item.id === phieuToDelete.value.id);
    if (index > -1) {
        data.value.splice(index, 1);
        // Lưu vào localStorage sau khi xóa
        localStorage.setItem('phieuNhapKhoData', JSON.stringify(data.value));
        closeDeleteModal();
    }
};

// 🔄 Chức năng cập nhật status
const updateStatus = (row) => {
    selectedPhieu.value = row;
    newStatus.value = row.status;
    statusNote.value = '';
    showStatusModal.value = true;
};

// Đóng modal status
const closeStatusModal = () => {
    showStatusModal.value = false;
    selectedPhieu.value = {};
    newStatus.value = '';
    statusNote.value = '';
};

// Lưu cập nhật status
const saveStatusUpdate = () => {
    if (!newStatus.value) {
        console.log('Vui lòng chọn trạng thái mới!');
        return;
    }
    
    selectedPhieu.value.status = newStatus.value;
    // Lưu vào localStorage sau khi cập nhật
    localStorage.setItem('phieuNhapKhoData', JSON.stringify(data.value));
    closeStatusModal();
};
const showModal = ref(false);
const showStatusModal = ref(false);
const showDeleteModal = ref(false);
const showViewModal = ref(false);
const selectedPhieu = ref({});
const newStatus = ref('');
const statusNote = ref('');
const phieuToDelete = ref({});
const phieuToView = ref({});

const newPhieu = reactive({
    supplier: "",
    price: "",
    status: "Chờ duyệt",
    product: "",
    quantity: "",
    code: "",
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
    // Reset form
    Object.assign(newPhieu, {
        supplier: "",
        price: "",
        status: "Chờ duyệt",
        product: "",
        quantity: "",
        code: "",
    });
};

// Thêm phiếu nhập kho mới
const savePhieu = async () => {
    try {
        // Validation
        if (!newPhieu.supplier.trim()) {
            console.log("Vui lòng nhập nguồn nhập!");
            return;
        }
        if (!newPhieu.product.trim()) {
            console.log("Vui lòng nhập tên hàng!");
            return;
        }
        if (!newPhieu.quantity || newPhieu.quantity <= 0) {
            console.log("Vui lòng nhập số lượng hợp lệ!");
            return;
        }
        if (!newPhieu.price || newPhieu.price <= 0) {
            console.log("Vui lòng nhập giá nhập hợp lệ!");
            return;
        }

        // Tạo mã phiếu tự động
        const newCode = `PNK${Date.now()}`;
        
        // Tạo phiếu mới
        const newPhieuData = {
            id: data.value.length + 1,
            code: newCode,
            supplier: newPhieu.supplier,
            product: newPhieu.product,
            quantity: parseInt(newPhieu.quantity),
            price: parseFloat(newPhieu.price),
            status: newPhieu.status,
            time: new Date().toLocaleString('vi-VN')
        };

        // Thêm vào danh sách
        data.value.unshift(newPhieuData);
        
        // Lưu vào localStorage
        localStorage.setItem('phieuNhapKhoData', JSON.stringify(data.value));
        
        // Đóng modal và reset form
        closeModal();
        
        // Thông báo thành công (đã bỏ alert)
        console.log("Tạo phiếu nhập kho thành công!");
        
    } catch (error) {
        console.error("Lỗi khi tạo phiếu nhập kho:", error);
        console.log("Có lỗi xảy ra khi tạo phiếu nhập kho!");
    }
};

// Format giá tiền thành VNĐ
const formatPrice = (price) => {
    if (!price) return '0 VNĐ';
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
};

// Lấy class CSS cho status
const getStatusClass = (status) => {
    const classMap = {
        'Đã duyệt': 'bg-green-100 text-green-800',
        'Chờ duyệt': 'bg-yellow-100 text-yellow-800',
        'Đã hủy': 'bg-red-100 text-red-800'
    };
    return classMap[status] || 'bg-gray-100 text-gray-800';
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
