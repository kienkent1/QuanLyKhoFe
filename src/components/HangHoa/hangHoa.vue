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
                        class="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-gray-200 text-sm text-gray-700 z-50">
                        <button class="block w-full px-4 py-2 text-left hover:bg-gray-100" @click="setSort('Nhiều → Ít')">
                            Nhiều → Ít
                        </button>
                        <button class="block w-full px-4 py-2 text-left hover:bg-gray-100" @click="setSort('Ít → Nhiều')">
                            Ít → Nhiều
                        </button>
                        <div class="border-t border-gray-200"></div>
                        <button class="block w-full px-4 py-2 text-left hover:bg-red-50 text-red-600" @click="setSort('Cảnh báo số lượng')">
                            ⚠️ Cảnh báo số lượng
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- BẢNG -->
        <div class="bg-white border border-gray-200 rounded-xl overflow-visible shadow-sm ">
            <table class="w-full text-sm border-collapse">
                <thead class="bg-gray-200 text-gray-800">
                    <tr>
                        <th class="border border-gray-300 p-3 text-center">
                            <input type="checkbox" v-model="selectAll" @change="toggleAll" class="text-gray-600" />
                        </th>
                        <th class="border border-gray-300 p-3 text-left font-semibold">Mã HH</th>
                        <th class="border border-gray-300 p-3 text-left font-semibold">Tên HH</th>
                        <th class="border border-gray-300 p-3 text-left font-semibold">Nhà CC</th>
                        <th class="border border-gray-300 p-3 text-left font-semibold">Loại</th>
                        <th class="border border-gray-300 p-3 font-semibold text-center pr-6">Số lượng</th>
                        <th class="border border-gray-300 p-3 text-center">
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
                        class="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td class="border-r border-gray-200 p-3 text-center">
                            <input type="checkbox" v-model="item.selected" @change="onRowSelectionChange" />
                        </td>
                        <td class="border-r border-gray-200 p-3">{{ item.ma }}</td>
                        <td class="border-r border-gray-200 p-3">{{ item.ten }}</td>
                        <td class="border-r border-gray-200 p-3">{{ item.nhaCC }}</td>
                        <td class="border-r border-gray-200 p-3">{{ item.loai }}</td>
                        <td class="border-r border-gray-200 p-3 text-center">{{ item.soLuong }}</td>
                        <td class="p-2 text-center relative">
                            <div class="flex items-center justify-center gap-3">
                                <!-- Icon con mắt để xem -->
                                <button @click="viewRow(item)" class="text-gray-600 hover:text-blue-500 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                                
                                <!-- Icon 3 chấm để menu -->
                                <div class="relative overflow-visible">
                                    <button @click.stop="toggleRowMenu(item)" :data-item-id="item.id" class="text-gray-600 hover:text-gray-800 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                        </svg>
                                    </button>
                                    
                                    <!-- Dropdown menu -->
                                    <transition name="fade">
                                        <div v-if="item.showMenu"
                                            class="absolute right-0 top-8 z-[9999] w-40 bg-white border border-gray-200 rounded-lg shadow-xl text-sm">
                                            <button @click="editRow(item)"
                                                class="flex items-center gap-3 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg transition">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Sửa
                                            </button>
                                            <button @click="configRow(item)"
                                                class="flex items-center gap-3 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                Cấu hình
                                            </button>
                                            <button @click="deleteRow(item)"
                                                class="flex items-center gap-3 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg transition">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

                <!-- Khi đang load hoặc không có dữ liệu -->
                <tbody v-else>
                    <tr>
                        <td :colspan="7" class="border-b border-gray-200 h-80">
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
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/15 backdrop-blur-sm">
                <div class="bg-white rounded-2xl shadow-2xl w-[750px] max-w-[90%] p-8 relative animate-fadeIn">
                    <!-- Nút đóng -->
                    <button @click="showAddPopup = false"
                        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none transition">
                        &times;
                    </button>

                    <!-- Tiêu đề -->
                    <h2 class="text-2xl font-bold text-gray-900 text-left mb-6">Thêm hàng hóa</h2>

                    <!-- Form content với background xám -->
                    <div class="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl shadow-inner">
                        <!-- Tên hàng hóa -->
                        <div class="col-span-2">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Tên hàng hóa</label>
                            <input v-model="newItem.ten" type="text" placeholder="Nhập tên hàng hóa"
                                :class="[
                                    'w-full bg-white text-gray-800 placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition border',
                                    errors.ten ? 'border-red-500 focus:ring-red-400' : 'border-gray-200'
                                ]" />
                            <p v-if="errors.ten" class="text-red-500 text-xs mt-1">{{ errors.ten }}</p>
                        </div>

                        <!-- Nhà cung cấp -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Nhà cung cấp</label>
                            <select v-model="newItem.nhaCC"
                                :class="[
                                    'w-full bg-white text-gray-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition border',
                                    errors.nhaCC ? 'border-red-500 focus:ring-red-400' : 'border-gray-200'
                                ]">
                                <option value="">Chọn nhà cung cấp</option>
                                <option value="SamSung">SamSung</option>
                                <option value="Apple">Apple</option>
                                <option value="Xiaomi">Xiaomi</option>
                                <option value="Oppo">Oppo</option>
                                <option value="Vivo">Vivo</option>
                            </select>
                            <p v-if="errors.nhaCC" class="text-red-500 text-xs mt-1">{{ errors.nhaCC }}</p>
                        </div>

                        <!-- Loại -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Loại</label>
                            <select v-model="newItem.loai"
                                :class="[
                                    'w-full bg-white text-gray-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition border',
                                    errors.loai ? 'border-red-500 focus:ring-red-400' : 'border-gray-200'
                                ]">
                                <option value="">Chọn loại hàng</option>
                                <option value="Điện thoại">Điện thoại</option>
                                <option value="Laptop">Laptop</option>
                                <option value="Phụ kiện">Phụ kiện</option>
                                <option value="Máy tính bảng">Máy tính bảng</option>
                            </select>
                            <p v-if="errors.loai" class="text-red-500 text-xs mt-1">{{ errors.loai }}</p>
                        </div>

                        <!-- Số lượng -->
                        <div class="col-span-2">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Số lượng</label>
                            <input v-model="newItem.soLuong" type="number" placeholder="Nhập số lượng"
                                :class="[
                                    'w-full bg-white text-gray-800 placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition border',
                                    errors.soLuong ? 'border-red-500 focus:ring-red-400' : 'border-gray-200'
                                ]" />
                            <p v-if="errors.soLuong" class="text-red-500 text-xs mt-1">{{ errors.soLuong }}</p>
                        </div>
                    </div>

                    <!-- Nút hành động -->
                    <div class="flex justify-center gap-6 pt-6">
                        <button @click="resetForm"
                            class="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-3 rounded-lg shadow transition active:scale-95">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v6h6M20 20v-6h-6M4 20l6-6M20 4l-6 6" />
                            </svg>
                            Làm mới
                        </button>

                        <button @click="saveNewItem"
                            class="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow transition active:scale-95">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Lưu lại
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

            <!-- MODAL XEM CHI TIẾT -->
            <div v-if="showViewModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div class="bg-white rounded-2xl p-8 w-[600px] max-w-[90%] relative shadow-2xl">
                    <button @click="closeViewModal"
                        class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold">
                        ✕
                    </button>
                    
                    <!-- HEADER -->
                    <div class="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Chi tiết hàng hóa</h2>
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <span class="text-lg font-semibold text-green-600">Chi tiết</span>
                        </div>
                    </div>

                    <!-- THÔNG TIN HÀNG HÓA -->
                    <div class="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="space-y-3">
                                <div class="flex justify-between">
                                    <span class="text-sm font-semibold text-gray-700">Mã hàng hóa:</span>
                                    <span class="text-sm text-gray-900 font-medium">{{ selectedItem.ma }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-sm font-semibold text-gray-700">Tên hàng hóa:</span>
                                    <span class="text-sm text-gray-900">{{ selectedItem.ten }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-sm font-semibold text-gray-700">Nhà cung cấp:</span>
                                    <span class="text-sm text-gray-900">{{ selectedItem.nhaCC }}</span>
                                </div>
                            </div>
                            <div class="space-y-3">
                                <div class="flex justify-between">
                                    <span class="text-sm font-semibold text-gray-700">Loại:</span>
                                    <span class="text-sm text-gray-900 font-medium">{{ selectedItem.loai }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-sm font-semibold text-gray-700">Số lượng:</span>
                                    <span class="text-sm text-gray-900 font-medium">{{ selectedItem.soLuong }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-sm font-semibold text-gray-700">Trạng thái:</span>
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Hoạt động
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- CẤU HÌNH CƠ BẢN -->
                    <div v-if="hasBasicConfig" class="bg-gray-100 rounded-lg p-6 mb-6 border border-gray-200">
                        <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Cấu hình cơ bản
                        </h4>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div v-if="selectedItem.mauSac" class="flex justify-between">
                                <span class="text-sm font-semibold text-gray-700">Màu sắc:</span>
                                <span class="text-sm text-gray-900">{{ selectedItem.mauSac }}</span>
                            </div>
                            <div v-if="selectedItem.ram" class="flex justify-between">
                                <span class="text-sm font-semibold text-gray-700">RAM:</span>
                                <span class="text-sm text-gray-900">{{ selectedItem.ram }}</span>
                            </div>
                            <div v-if="selectedItem.rom" class="flex justify-between">
                                <span class="text-sm font-semibold text-gray-700">ROM:</span>
                                <span class="text-sm text-gray-900">{{ selectedItem.rom }}</span>
                            </div>
                            <div v-if="selectedItem.tenPhienBan" class="flex justify-between">
                                <span class="text-sm font-semibold text-gray-700">Phiên bản:</span>
                                <span class="text-sm text-gray-900">{{ selectedItem.tenPhienBan }}</span>
                            </div>
                            <div v-if="selectedItem.moTa" class="md:col-span-2">
                                <div class="flex flex-col gap-1">
                                    <span class="text-sm font-semibold text-gray-700">Mô tả:</span>
                                    <span class="text-sm text-gray-900 bg-white p-3 rounded-lg border">{{ selectedItem.moTa }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- CẤU HÌNH TÙY CHỈNH -->
                    <div v-if="hasCustomConfig" class="bg-gray-100 rounded-lg p-6 mb-6 border border-gray-200">
                        <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v2m6-2a2 2 0 100 4m0-4a2 2 0 100 4m0-4v2m0-6V4" />
                            </svg>
                            Cấu hình tùy chỉnh
                        </h4>
                        
                        <div class="space-y-3">
                            <div v-for="config in selectedItem.config" :key="config.id" class="flex justify-between items-center bg-white p-3 rounded-lg border">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h5 class="font-medium text-gray-900">{{ config.name }}</h5>
                                        <p class="text-sm text-gray-600">{{ config.value }} <span class="text-gray-400">({{ config.type }})</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- THÔNG BÁO KHÔNG CÓ CẤU HÌNH -->
                    <div v-if="!hasBasicConfig && !hasCustomConfig" class="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p class="text-gray-500">Chưa có cấu hình nào</p>
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

            <!-- MODAL CHỈNH SỬA -->
            <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div class="bg-white rounded-2xl shadow-2xl w-[750px] max-w-[90%] p-8 relative">
                    <button @click="closeEditModal"
                        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none transition">
                        &times;
                    </button>

                    <h2 class="text-2xl font-bold text-gray-900 text-left mb-6">Chỉnh sửa hàng hóa</h2>

                    <div class="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl shadow-inner">
                        <!-- Tên hàng hóa -->
                        <div class="col-span-2">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Tên hàng hóa</label>
                            <input v-model="selectedItem.ten" type="text" placeholder="Nhập tên hàng hóa"
                                :class="[
                                    'w-full bg-white text-gray-800 placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition border',
                                    editErrors.ten ? 'border-red-500 focus:ring-red-400' : 'border-gray-200'
                                ]" />
                            <p v-if="editErrors.ten" class="text-red-500 text-xs mt-1">{{ editErrors.ten }}</p>
                        </div>

                        <!-- Nhà cung cấp -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Nhà cung cấp</label>
                            <select v-model="selectedItem.nhaCC"
                                :class="[
                                    'w-full bg-white text-gray-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition border',
                                    editErrors.nhaCC ? 'border-red-500 focus:ring-red-400' : 'border-gray-200'
                                ]">
                                <option value="">Chọn nhà cung cấp</option>
                                <option value="SamSung">SamSung</option>
                                <option value="Apple">Apple</option>
                                <option value="Xiaomi">Xiaomi</option>
                                <option value="Oppo">Oppo</option>
                                <option value="Vivo">Vivo</option>
                            </select>
                            <p v-if="editErrors.nhaCC" class="text-red-500 text-xs mt-1">{{ editErrors.nhaCC }}</p>
                        </div>

                        <!-- Loại -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Loại</label>
                            <select v-model="selectedItem.loai"
                                :class="[
                                    'w-full bg-white text-gray-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition border',
                                    editErrors.loai ? 'border-red-500 focus:ring-red-400' : 'border-gray-200'
                                ]">
                                <option value="">Chọn loại hàng</option>
                                <option value="Điện thoại">Điện thoại</option>
                                <option value="Laptop">Laptop</option>
                                <option value="Phụ kiện">Phụ kiện</option>
                                <option value="Máy tính bảng">Máy tính bảng</option>
                            </select>
                            <p v-if="editErrors.loai" class="text-red-500 text-xs mt-1">{{ editErrors.loai }}</p>
                        </div>

                        <!-- Số lượng -->
                        <div class="col-span-2">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Số lượng</label>
                            <input v-model="selectedItem.soLuong" type="number" placeholder="Nhập số lượng"
                                :class="[
                                    'w-full bg-white text-gray-800 placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition border',
                                    editErrors.soLuong ? 'border-red-500 focus:ring-red-400' : 'border-gray-200'
                                ]" />
                            <p v-if="editErrors.soLuong" class="text-red-500 text-xs mt-1">{{ editErrors.soLuong }}</p>
                        </div>
                    </div>

                    <!-- Nút hành động -->
                    <div class="flex justify-center gap-6 pt-6">
                        <button @click="closeEditModal"
                            class="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-3 rounded-lg shadow transition active:scale-95">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Hủy
                        </button>

                        <button @click="saveEdit"
                            class="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow transition active:scale-95">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Lưu thay đổi
                        </button>
                    </div>
                </div>
            </div>

            <!-- MODAL XÁC NHẬN XÓA -->
            <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
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
                            <span class="text-lg font-semibold text-red-600">Xóa</span>
                        </div>
                    </div>

                    <!-- THÔNG TIN HÀNG HÓA -->
                    <div class="bg-red-50 rounded-lg p-4 mb-6 border border-red-200">
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span class="text-sm font-semibold text-gray-700">Mã hàng hóa:</span>
                                <span class="text-sm text-gray-900">{{ selectedItem.ma }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm font-semibold text-gray-700">Tên hàng hóa:</span>
                                <span class="text-sm text-gray-900">{{ selectedItem.ten }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm font-semibold text-gray-700">Nhà cung cấp:</span>
                                <span class="text-sm text-gray-900">{{ selectedItem.nhaCC }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- CẢNH BÁO -->
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <div class="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <span class="text-sm font-medium text-yellow-800">Bạn có chắc chắn muốn xóa hàng hóa này?</span>
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

            <!-- MODAL CẤU HÌNH HÀNG HÓA -->
            <div v-if="showConfigModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                <div class="bg-white rounded-2xl shadow-2xl w-[800px] max-w-[90%] max-h-[90vh] overflow-y-auto relative">
                    <button @click="closeConfigModal"
                        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none transition z-10">
                        &times;
                    </button>

                    <div class="p-8">
                        <h2 class="text-2xl font-bold text-gray-900 text-left mb-6">Cấu hình hàng hóa</h2>
                    
                    <!-- THÔNG TIN HÀNG HÓA -->
                    <div class="bg-gray-100 rounded-lg p-4 mb-6 border border-gray-200">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-800">{{ selectedItem.ten }}</h3>
                                <p class="text-sm text-gray-600">Mã: {{ selectedItem.ma }} | Loại: {{ selectedItem.loai }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- CẤU HÌNH CƠ BẢN -->
                    <div class="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
                        <h4 class="text-lg font-semibold text-gray-800 mb-4">Cấu hình cơ bản</h4>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Màu sắc -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Màu sắc</label>
                                <input v-model="configForm.mauSac" type="text" placeholder="Nhập màu sắc..."
                                    class="w-full bg-white text-gray-800 placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition border border-gray-200" />
                            </div>
                            
                            <!-- RAM -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">RAM</label>
                                <input v-model="configForm.ram" type="text" placeholder="VD: 8GB, 16GB..."
                                    class="w-full bg-white text-gray-800 placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition border border-gray-200" />
                            </div>
                            
                            <!-- ROM -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">ROM</label>
                                <input v-model="configForm.rom" type="text" placeholder="VD: 128GB, 256GB..."
                                    class="w-full bg-white text-gray-800 placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition border border-gray-200" />
                            </div>
                            
                            <!-- Phiên bản -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Phiên bản</label>
                                <input v-model="configForm.tenPhienBan" type="text" placeholder="VD: Pro, Max, Ultra..."
                                    class="w-full bg-white text-gray-800 placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition border border-gray-200" />
                            </div>
                            
                            <!-- Mô tả -->
                            <div class="md:col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Mô tả</label>
                                <textarea v-model="configForm.moTa" rows="3" placeholder="Nhập mô tả chi tiết..."
                                    class="w-full bg-white text-gray-800 placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition border border-gray-200 resize-none"></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- FORM THÊM CẤU HÌNH MỚI -->
                    <div class="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
                        <h4 class="text-lg font-semibold text-gray-800 mb-4">Thêm cấu hình tùy chỉnh</h4>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Tên cấu hình</label>
                                <input v-model="newConfigField.name" type="text" placeholder="VD: Kích thước, Công suất..."
                                    class="w-full bg-white text-gray-800 placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition border border-gray-200" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Loại dữ liệu</label>
                                <select v-model="newConfigField.type"
                                    class="w-full bg-white text-gray-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition border border-gray-200">
                                    <option value="text">Văn bản</option>
                                    <option value="number">Số</option>
                                    <option value="select">Lựa chọn</option>
                                    <option value="boolean">Có/Không</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Giá trị</label>
                                <input v-model="newConfigField.value" type="text" placeholder="Nhập giá trị..."
                                    class="w-full bg-white text-gray-800 placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition border border-gray-200" />
                            </div>
                        </div>
                        
                        <button @click="addConfigField"
                            class="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded-lg transition">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Thêm cấu hình
                        </button>
                    </div>

                    <!-- DANH SÁCH CẤU HÌNH HIỆN TẠI -->
                    <div class="bg-white rounded-lg border border-gray-200">
                        <div class="p-4 border-b border-gray-200">
                            <h4 class="text-lg font-semibold text-gray-800">Cấu hình hiện tại</h4>
                        </div>
                        
                        <div v-if="configFields.length === 0" class="p-8 text-center text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p>Chưa có cấu hình nào</p>
                        </div>
                        
                        <div v-else class="divide-y divide-gray-200">
                            <div v-for="field in configFields" :key="field.id" class="p-4 flex items-center justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h5 class="font-medium text-gray-900">{{ field.name }}</h5>
                                            <p class="text-sm text-gray-600">{{ field.value }} <span class="text-gray-400">({{ field.type }})</span></p>
                                        </div>
                                    </div>
                                </div>
                                
                                <button @click="removeConfigField(field.id)"
                                    class="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- NÚT HÀNH ĐỘNG -->
                    <div class="flex justify-center gap-6 pt-6">
                        <button @click="closeConfigModal"
                            class="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-3 rounded-lg shadow transition active:scale-95">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Hủy
                        </button>

                        <button @click="saveConfig"
                            class="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg shadow transition active:scale-95">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Lưu cấu hình
                        </button>
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
    nhaCC: "",
    loai: "",
    soLuong: "",
});

// Validation errors
const errors = ref({});

// Validation function
const validateForm = () => {
    errors.value = {};
    
    if (!newItem.value.ten.trim()) {
        errors.value.ten = "Tên hàng hóa không được để trống";
    }
    
    if (!newItem.value.nhaCC) {
        errors.value.nhaCC = "Vui lòng chọn nhà cung cấp";
    }
    
    if (!newItem.value.loai) {
        errors.value.loai = "Vui lòng chọn loại hàng";
    }
    
    if (!newItem.value.soLuong || newItem.value.soLuong <= 0) {
        errors.value.soLuong = "Số lượng phải lớn hơn 0";
    }
    
    return Object.keys(errors.value).length === 0;
};

// Mở popup
function openAddPopup() {
    showAddPopup.value = true;
}

// Làm mới form
function resetForm() {
    newItem.value = {
        ten: "",
        nhaCC: "",
        loai: "",
        soLuong: "",
    };
    errors.value = {};
}

// Lưu item mới
async function saveNewItem() {
    if (!validateForm()) {
        return;
    }
    
    try {
        // Tạo item mới với ID và mã tự động
        const newHangHoa = {
            ...newItem.value,
            ma: `HH${Date.now()}`,
            id: Date.now(),
            selected: false,
            isEditing: false,
            showMenu: false
        };
        
        // Thêm vào danh sách local (watcher sẽ tự động lưu vào localStorage)
        data.value.unshift(newHangHoa);
        
        // Đóng popup và reset form
        showAddPopup.value = false;
        resetForm();
        
        // Thông báo thành công (đã bỏ alert)
        console.log("Thêm hàng hóa thành công!");
        
        console.log("Đã thêm hàng hóa mới:", newHangHoa);
        console.log("Dữ liệu đã được lưu vào localStorage");
        
    } catch (error) {
        console.error("Lỗi:", error);
        console.log("Có lỗi xảy ra khi thêm hàng hóa");
    }
}
const showScanPopup = ref(false);
const showViewModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const showConfigModal = ref(false);
const selectedItem = ref({});

function openScanPopup() {
    showScanPopup.value = true;
}
function closeScanPopup() {
    showScanPopup.value = false;
}

// Modal functions
function closeViewModal() {
    showViewModal.value = false;
    selectedItem.value = {};
}

function closeEditModal() {
    showEditModal.value = false;
    selectedItem.value = {};
}

function closeDeleteModal() {
    showDeleteModal.value = false;
    selectedItem.value = {};
}

function closeConfigModal() {
    showConfigModal.value = false;
    selectedItem.value = {};
}

// Lưu chỉnh sửa
function saveEdit() {
    if (!validateEditForm()) {
        return;
    }
    
    const index = data.value.findIndex(item => item.id === selectedItem.value.id);
    if (index !== -1) {
        data.value[index] = { ...selectedItem.value };
        closeEditModal();
        console.log("Đã cập nhật hàng hóa:", selectedItem.value.ten);
    }
}

// Xác nhận xóa
function confirmDelete() {
    data.value = data.value.filter(item => item.id !== selectedItem.value.id);
    closeDeleteModal();
    console.log("Đã xóa hàng hóa:", selectedItem.value.ten);
}

// Validation cho form sửa
const editErrors = ref({});

function validateEditForm() {
    editErrors.value = {};
    
    if (!selectedItem.value.ten.trim()) {
        editErrors.value.ten = "Tên hàng hóa không được để trống";
    }
    
    if (!selectedItem.value.nhaCC) {
        editErrors.value.nhaCC = "Vui lòng chọn nhà cung cấp";
    }
    
    if (!selectedItem.value.loai) {
        editErrors.value.loai = "Vui lòng chọn loại hàng";
    }
    
    if (!selectedItem.value.soLuong || selectedItem.value.soLuong <= 0) {
        editErrors.value.soLuong = "Số lượng phải lớn hơn 0";
    }
    
    return Object.keys(editErrors.value).length === 0;
}

// Cấu hình hàng hóa
const configFields = ref([]);
const newConfigField = ref({
    name: '',
    value: '',
    type: 'text'
});

// Form cấu hình cơ bản
const configForm = ref({
    mauSac: '',
    ram: '',
    rom: '',
    tenPhienBan: '',
    moTa: ''
});

function addConfigField() {
    if (newConfigField.value.name.trim()) {
        configFields.value.push({
            id: Date.now(),
            name: newConfigField.value.name,
            value: newConfigField.value.value,
            type: newConfigField.value.type
        });
        newConfigField.value = { name: '', value: '', type: 'text' };
    }
}

// Hàm addDefaultConfig đã được thay thế bằng form input trực tiếp

function removeConfigField(id) {
    configFields.value = configFields.value.filter(field => field.id !== id);
}

function saveConfig() {
    // Lưu cấu hình cơ bản vào selectedItem
    selectedItem.value.mauSac = configForm.value.mauSac;
    selectedItem.value.ram = configForm.value.ram;
    selectedItem.value.rom = configForm.value.rom;
    selectedItem.value.tenPhienBan = configForm.value.tenPhienBan;
    selectedItem.value.moTa = configForm.value.moTa;
    
    // Lưu cấu hình tùy chỉnh
    if (!selectedItem.value.config) {
        selectedItem.value.config = [];
    }
    selectedItem.value.config = [...configFields.value];
    
    // Xóa colorCode nếu có
    if (selectedItem.value.hasOwnProperty('colorCode')) {
        delete selectedItem.value.colorCode;
    }
    
    // Cập nhật trong data
    const index = data.value.findIndex(item => item.id === selectedItem.value.id);
    if (index !== -1) {
        data.value[index] = { ...selectedItem.value };
    }
    
    closeConfigModal();
    console.log("Đã lưu cấu hình cho:", selectedItem.value.ten);
}
const data = ref([]);
const loading = ref(true);
const searchQuery = ref("");
const sortLabel = ref("Lọc");
const showSort = ref(false);

const toggleDropdown = () => (showSort.value = !showSort.value);
const setSort = (type) => {
    sortLabel.value = type;
    showSort.value = false;
};
// selection
const selectAll = ref(false);

// 🧠 Tải dữ liệu từ localStorage hoặc JSON Server
onMounted(async () => {
    try {
        // Kiểm tra localStorage trước
        const savedData = localStorage.getItem('hanghoa_data');
        if (savedData) {
            console.log("Tải dữ liệu từ localStorage...");
            const raw = JSON.parse(savedData);
            data.value = raw.map(item => ({
                ...item,
                selected: !!item.selected,
                isEditing: false,
                showMenu: false
            }));
            loading.value = false;
            return;
        }

        // Thử kết nối đến JSON server
        const res = await fetch("http://localhost:3001/hanghoa");
        const raw = await res.json();
        // đảm bảo mỗi item có các thuộc tính reactive mà UI cần
        data.value = raw.map(item => ({
            ...item,
            selected: !!item.selected,
            isEditing: false,
            showMenu: false
        }));
        
        // Lưu dữ liệu từ server vào localStorage
        localStorage.setItem('hanghoa_data', JSON.stringify(raw));
        
    } catch (err) {
        console.error("Lỗi tải dữ liệu:", err);
        // Sử dụng dữ liệu mock nếu không kết nối được server
        console.log("Sử dụng dữ liệu mock...");
        const mockData = [
            {
                id: 1,
                ma: "HH001",
                ten: "iPhone 15 Pro",
                nhaCC: "Apple",
                loai: "Điện thoại",
                soLuong: 25
            },
            {
                id: 2,
                ma: "HH002", 
                ten: "Samsung Galaxy S24",
                nhaCC: "SamSung",
                loai: "Điện thoại",
                soLuong: 30
            },
            {
                id: 3,
                ma: "HH003",
                ten: "MacBook Pro M3",
                nhaCC: "Apple", 
                loai: "Laptop",
                soLuong: 15
            },
            {
                id: 4,
                ma: "HH004",
                ten: "Xiaomi 14 Pro",
                nhaCC: "Xiaomi",
                loai: "Điện thoại", 
                soLuong: 20
            },
            {
                id: 5,
                ma: "HH005",
                ten: "AirPods Pro",
                nhaCC: "Apple",
                loai: "Phụ kiện",
                soLuong: 50
            }
        ];
        
        data.value = mockData.map(item => ({
            ...item,
            selected: false,
            isEditing: false,
            showMenu: false
        }));
        
        // Lưu dữ liệu mock vào localStorage
        localStorage.setItem('hanghoa_data', JSON.stringify(mockData));
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

    if (sortLabel.value === "Nhiều → Ít") {
        result = result.sort((a, b) => (b.soLuong || 0) - (a.soLuong || 0));
    } else if (sortLabel.value === "Ít → Nhiều") {
        result = result.sort((a, b) => (a.soLuong || 0) - (b.soLuong || 0));
    } else if (sortLabel.value === "Cảnh báo số lượng") {
        // Lọc chỉ những sản phẩm có số lượng < 10
        result = result.filter(item => (item.soLuong || 0) < 10);
        // Sắp xếp theo số lượng tăng dần để thấy sản phẩm ít nhất trước
        result = result.sort((a, b) => (a.soLuong || 0) - (b.soLuong || 0));
    }

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

// Hàm getMenuPosition đã được xóa vì không cần thiết

function editRow(item) {
    // đóng menu, mở modal sửa
    item.showMenu = false;
    selectedItem.value = { ...item };
    showEditModal.value = true;
}

function configRow(item) {
    // đóng menu, mở modal cấu hình
    item.showMenu = false;
    selectedItem.value = { ...item };
    
    // Load dữ liệu cấu hình cơ bản
    configForm.value = {
        mauSac: item.mauSac || '',
        ram: item.ram || '',
        rom: item.rom || '',
        tenPhienBan: item.tenPhienBan || '',
        moTa: item.moTa || ''
    };
    
    // Load cấu hình tùy chỉnh
    configFields.value = item.config ? [...item.config] : [];
    
    showConfigModal.value = true;
}

function deleteRow(item) {
    // đóng menu, mở modal xác nhận xóa
    item.showMenu = false;
    selectedItem.value = item;
    showDeleteModal.value = true;
}

function viewRow(item) {
    selectedItem.value = item;
    showViewModal.value = true;
}

function blockRow(item) {
    // placeholder
    console.log(`Đã chặn: ${item.ten || item.ma}`);
}

// Hàm helper để lưu dữ liệu vào localStorage
function saveToLocalStorage() {
    localStorage.setItem('hanghoa_data', JSON.stringify(data.value));
    console.log("Dữ liệu đã được lưu vào localStorage");
}

// Hàm để xóa dữ liệu localStorage (reset về dữ liệu gốc)
function clearLocalStorage() {
    localStorage.removeItem('hanghoa_data');
    console.log("Đã xóa dữ liệu localStorage");
    // Reload trang để tải lại dữ liệu gốc
    window.location.reload();
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

// Kiểm tra có cấu hình cơ bản hay không
const hasBasicConfig = computed(() => {
    if (!selectedItem.value) return false;
    return selectedItem.value.mauSac || 
           selectedItem.value.ram || 
           selectedItem.value.rom || 
           selectedItem.value.tenPhienBan || 
           selectedItem.value.moTa;
});

// Kiểm tra có cấu hình tùy chỉnh hay không
const hasCustomConfig = computed(() => {
    if (!selectedItem.value) return false;
    return selectedItem.value.config && selectedItem.value.config.length > 0;
});

// Theo dõi thay đổi dữ liệu và tự động lưu vào localStorage
watch(data, (newData) => {
    if (newData.length > 0) {
        saveToLocalStorage();
    }
}, { deep: true });

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