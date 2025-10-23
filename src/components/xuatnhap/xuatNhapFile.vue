<template>
    <div class="min-h-screen bg-gray-50 p-6">
        <!-- HEADER -->
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Xuất - Nhập file</h1>
            <p class="text-gray-600 mt-1">Quản lý dữ liệu thông qua file Excel</p>
        </div>

        <!-- MAIN CONTENT -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- LEFT PANEL - XUẤT FILE -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                <div class="p-6 border-b border-gray-200">
                    <h2 class="text-lg font-semibold text-gray-900">Xuất file Excel</h2>
                </div>
                
                <div class="p-6">
                    <!-- CHỌN DỮ LIỆU XUẤT -->
                    <div class="mb-6">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Chọn dữ liệu xuất</label>
                        <select v-model="selectedExportType" 
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                            <option value="">-- Chọn loại dữ liệu --</option>
                            <option value="hanghoa">Hàng hóa</option>
                            <option value="nhaCungCap">Nhà cung cấp</option>
                            <option value="loaiHang">Loại hàng hóa</option>
                            <option value="nhanVien">Nhân viên</option>
                            <option value="phieuNhap">Phiếu nhập kho</option>
                            <option value="phieuXuat">Phiếu xuất kho</option>
                        </select>
                    </div>


                    <!-- NÚT XUẤT -->
                    <button @click="exportFile" :disabled="isExporting"
                        class="w-full px-4 py-3 bg-gray-500 hover:bg-gray-600 disabled:opacity-50 text-white font-medium rounded-lg transition">
                        {{ isExporting ? 'Đang xuất...' : 'Export' }}
        </button>

                    <!-- TRẠNG THÁI XUẤT FILE -->
                    <div v-if="exportStatus" class="mt-6 p-4 bg-gray-50 rounded-lg">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <svg class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
                                <div>
                                    <p class="font-medium text-gray-900">{{ exportStatus.fileName }}</p>
                                    <div class="flex items-center gap-2 mt-1">
                                        <div class="w-32 bg-gray-200 rounded-full h-2">
                                            <div class="bg-blue-500 h-2 rounded-full" :style="`width: ${exportStatus.progress}%`"></div>
                                        </div>
                                        <span class="text-sm text-gray-600">{{ exportStatus.size }} {{ exportStatus.progress }}%</span>
          </div>
            </div>
          </div>
                            <svg v-if="exportStatus.progress === 100" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <svg v-else class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      </div>
      </div>

            <!-- RIGHT PANEL - NHẬP FILE -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                <div class="p-6 border-b border-gray-200">
                    <h2 class="text-lg font-semibold text-gray-900">Nhập file Excel</h2>
                </div>
                
                <div class="p-6">
                    <!-- VÙNG KÉO THẢ FILE -->
                    <div @drop="handleFileDrop" @dragover.prevent @dragenter.prevent
                        :class="[
                            'border-2 border-dashed rounded-lg p-8 text-center transition cursor-pointer',
                            isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                        ]"
                        @click="triggerFileInput">
                        <input ref="fileInput" type="file" accept=".xlsx,.xls,.csv" @change="handleFileSelect" class="hidden">
                        
                        <div class="flex flex-col items-center">
                            <svg class="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
                            <p class="text-lg font-medium text-gray-700 mb-2">Tải tệp lên chỉ</p>
                            <p class="text-sm text-gray-500">Kéo thả file Excel vào đây hoặc click để chọn</p>
                        </div>
                    </div>

                    <!-- NÚT NHẬP -->
                    <div class="mt-4">
                        <button @click="importFile" :disabled="!selectedFile || isImporting"
                            class="w-full px-4 py-3 bg-gray-500 hover:bg-gray-600 disabled:opacity-50 text-white font-medium rounded-lg transition">
                            {{ isImporting ? 'Đang nhập...' : 'Import' }}
          </button>
        </div>

                    <!-- TRẠNG THÁI NHẬP FILE -->
                    <div v-if="importStatus" class="mt-6 p-4 bg-gray-50 rounded-lg">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <svg class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
                                <div>
                                    <p class="font-medium text-gray-900">{{ importStatus.fileName }}</p>
                                    <div class="flex items-center gap-2 mt-1">
                                        <div class="w-32 bg-gray-200 rounded-full h-2">
                                            <div class="bg-blue-500 h-2 rounded-full" :style="`width: ${importStatus.progress}%`"></div>
                                        </div>
                                        <span class="text-sm text-gray-600">{{ importStatus.size }} {{ importStatus.progress }}%</span>
          </div>
            </div>
          </div>
                            <svg v-if="importStatus.progress === 100" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <svg v-else class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- DANH SÁCH FILE ĐÃ XỬ LÝ -->
        <div class="mt-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div class="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 class="text-lg font-semibold text-gray-900">Lịch sử file</h2>
                <button @click="clearFileHistory" 
                    class="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition">
                    Xóa lịch sử
                </button>
            </div>
            
            <div class="p-6">
                <div class="space-y-3">
                    <div v-for="file in fileHistory" :key="file.id" 
                        class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h4 class="font-medium text-gray-900">{{ file.name }}</h4>
                                <p class="text-sm text-gray-600">{{ file.type }} • {{ file.size }} • {{ file.date }}</p>
                            </div>
                        </div>
                        
                        <div class="flex items-center gap-2">
                            <span :class="[
                                'px-2 py-1 rounded-full text-xs font-medium',
                                file.status === 'success' ? 'bg-green-100 text-green-800' : 
                                file.status === 'error' ? 'bg-red-100 text-red-800' : 
                                'bg-yellow-100 text-yellow-800'
                            ]">
                                {{ file.status === 'success' ? 'Thành công' : 
                                   file.status === 'error' ? 'Lỗi' : 'Đang xử lý' }}
                            </span>
                        </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as XLSX from 'xlsx';

// DỮ LIỆU
const selectedExportType = ref('');
const selectedFile = ref(null);
const isDragOver = ref(false);
const isExporting = ref(false);
const isImporting = ref(false);
const fileInput = ref(null);

// TRẠNG THÁI XUẤT/NHẬP
const exportStatus = ref(null);
const importStatus = ref(null);

// LỊCH SỬ FILE
const fileHistory = ref([]);

const loadFileHistory = () => {
    try {
        const savedHistory = localStorage.getItem('file_history');
        if (savedHistory) {
            fileHistory.value = JSON.parse(savedHistory);
        } else {
            fileHistory.value = [
                {
                    id: 1,
                    name: 'Products.xls',
                    type: 'Xuất',
                    size: '30 MB',
                    date: '2024-01-15 10:30',
                    status: 'success'
                },
                {
                    id: 2,
                    name: 'PhoneList.xls',
                    type: 'Nhập',
                    size: '15 MB',
                    date: '2024-01-15 09:15',
                    status: 'error'
                }
            ];
        }
    } catch (error) {
        console.error('Lỗi khi load lịch sử file:', error);
        fileHistory.value = [];
    }
};

const saveFileHistory = () => {
    try {
        localStorage.setItem('file_history', JSON.stringify(fileHistory.value));
    } catch (error) {
        console.error('Lỗi khi lưu lịch sử file:', error);
    }
};

const clearFileHistory = () => {
    try {
        fileHistory.value = [];
        localStorage.removeItem('file_history');
        console.log('Đã xóa lịch sử file');
    } catch (error) {
        console.error('Lỗi khi xóa lịch sử file:', error);
    }
};

const getHangHoaData = async () => {
    try {
        const localData = JSON.parse(localStorage.getItem('hanghoa_data'));
        if (localData && localData.length > 0) {
            console.log('Lấy dữ liệu hàng hóa từ localStorage:', localData.length, 'bản ghi');
            return localData;
        }
        
        const mockData = [
            { id: 1, ma: 'HH001', ten: 'Điện thoại iPhone 15', nhaCC: 'Apple', loai: 'Điện thoại', soLuong: 50, moTa: 'Điện thoại thông minh cao cấp' },
            { id: 2, ma: 'HH002', ten: 'Laptop Dell XPS 13', nhaCC: 'Dell', loai: 'Laptop', soLuong: 25, moTa: 'Máy tính xách tay cao cấp' },
            { id: 3, ma: 'HH003', ten: 'Chuột không dây Logitech', nhaCC: 'Logitech', loai: 'Phụ kiện', soLuong: 100, moTa: 'Chuột máy tính không dây' },
            { id: 4, ma: 'HH004', ten: 'Bàn phím cơ Razer', nhaCC: 'Razer', loai: 'Phụ kiện', soLuong: 75, moTa: 'Bàn phím cơ gaming' },
            { id: 5, ma: 'HH005', ten: 'Monitor Samsung 27 inch', nhaCC: 'Samsung', loai: 'Monitor', soLuong: 30, moTa: 'Màn hình máy tính 4K' },
            { id: 6, ma: 'HH006', ten: 'Máy in Canon PIXMA', nhaCC: 'Canon', loai: 'Máy in', soLuong: 15, moTa: 'Máy in laser đen trắng' },
            { id: 7, ma: 'HH007', ten: 'Webcam Logitech C920', nhaCC: 'Logitech', loai: 'Phụ kiện', soLuong: 40, moTa: 'Webcam HD 1080p' },
            { id: 8, ma: 'HH008', ten: 'Ổ cứng SSD Samsung 1TB', nhaCC: 'Samsung', loai: 'Lưu trữ', soLuong: 60, moTa: 'SSD NVMe tốc độ cao' }
        ];
        
        console.log('Sử dụng dữ liệu mẫu hàng hóa:', mockData.length, 'bản ghi');
        return mockData;
        
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu hàng hóa:', error);
        return [];
    }
};

const getNhaCungCapData = async () => {
    try {
        const localData = JSON.parse(localStorage.getItem('nhaCungCap_data'));
        if (localData && localData.length > 0) {
            console.log('Lấy dữ liệu nhà cung cấp từ localStorage:', localData.length, 'bản ghi');
            return localData;
        }
        
        try {
            const response = await fetch('http://localhost:3000/Suppliers');
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('nhaCungCap_data', JSON.stringify(data));
                console.log('Lấy dữ liệu nhà cung cấp từ API và lưu vào localStorage:', data.length, 'bản ghi');
                return data;
            }
        } catch (apiError) {
            console.log('API không khả dụng, sử dụng dữ liệu mẫu');
        }
        const mockData = [
            { id: 1, ma: 'NCC001', ten: 'Công ty TNHH Apple Việt Nam', diaChi: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM', soDienThoai: '0281234567', email: 'contact@apple.vn' },
            { id: 2, ma: 'NCC002', ten: 'Dell Technologies Vietnam', diaChi: '456 Đường Lê Lợi, Quận 1, TP.HCM', soDienThoai: '0282345678', email: 'info@dell.vn' },
            { id: 3, ma: 'NCC003', ten: 'Logitech Vietnam', diaChi: '789 Đường Pasteur, Quận 3, TP.HCM', soDienThoai: '0283456789', email: 'support@logitech.vn' },
            { id: 4, ma: 'NCC004', ten: 'Samsung Electronics Vietnam', diaChi: '321 Đường Cách Mạng Tháng 8, Quận 10, TP.HCM', soDienThoai: '0284567890', email: 'contact@samsung.vn' },
            { id: 5, ma: 'NCC005', ten: 'Canon Vietnam', diaChi: '654 Đường Võ Văn Tần, Quận 3, TP.HCM', soDienThoai: '0285678901', email: 'info@canon.vn' },
            { id: 6, ma: 'NCC006', ten: 'Razer Vietnam', diaChi: '987 Đường Nguyễn Thị Minh Khai, Quận 1, TP.HCM', soDienThoai: '0286789012', email: 'support@razer.vn' }
        ];
        
        localStorage.setItem('nhaCungCap_data', JSON.stringify(mockData));
        console.log('Sử dụng dữ liệu mẫu nhà cung cấp:', mockData.length, 'bản ghi');
        return mockData;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu nhà cung cấp:', error);
        return [];
    }
};

const getLoaiHangData = async () => {
    try {
        const localData = JSON.parse(localStorage.getItem('loaiHang_data'));
        if (localData && localData.length > 0) {
            console.log('Lấy dữ liệu loại hàng từ localStorage:', localData.length, 'bản ghi');
            return localData;
        }
        
        try {
            const response = await fetch('http://localhost:3000/Categories');
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('loaiHang_data', JSON.stringify(data));
                console.log('Lấy dữ liệu loại hàng từ API và lưu vào localStorage:', data.length, 'bản ghi');
                return data;
            }
        } catch (apiError) {
            console.log('API không khả dụng, sử dụng dữ liệu mẫu');
        }
        const mockData = [
            { id: 1, ma: 'LH001', ten: 'Điện thoại', moTa: 'Các loại điện thoại di động và smartphone' },
            { id: 2, ma: 'LH002', ten: 'Laptop', moTa: 'Máy tính xách tay và notebook' },
            { id: 3, ma: 'LH003', ten: 'Phụ kiện', moTa: 'Chuột, bàn phím, webcam và các phụ kiện máy tính' },
            { id: 4, ma: 'LH004', ten: 'Monitor', moTa: 'Màn hình máy tính và display' },
            { id: 5, ma: 'LH005', ten: 'Máy in', moTa: 'Máy in laser, inkjet và multifunction' },
            { id: 6, ma: 'LH006', ten: 'Lưu trữ', moTa: 'Ổ cứng HDD, SSD và thiết bị lưu trữ' },
            { id: 7, ma: 'LH007', ten: 'Gaming', moTa: 'Thiết bị gaming và phụ kiện chơi game' },
            { id: 8, ma: 'LH008', ten: 'Audio', moTa: 'Tai nghe, loa và thiết bị âm thanh' }
        ];
        
        localStorage.setItem('loaiHang_data', JSON.stringify(mockData));
        console.log('Sử dụng dữ liệu mẫu loại hàng:', mockData.length, 'bản ghi');
        return mockData;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu loại hàng:', error);
        return [];
    }
};

const getNhanVienData = async () => {
    try {
        const localData = JSON.parse(localStorage.getItem('nhanVien_data'));
        if (localData && localData.length > 0) {
            console.log('Lấy dữ liệu nhân viên từ localStorage:', localData.length, 'bản ghi');
            return localData;
        }
        // Dữ liệu này sẽ được lấy từ component User.vue khi có
        const mockData = [
            { 
                id: '7914ab0d-e01b-4b35-9aac-df9ed4589a59', 
                ma: '7914ab0d-e01b-4b35-9aac-df9ed4589a59', 
                ten: 'Trần Thị Thúy', 
                email: 'tranthithuy@gmail.com', 
                soDienThoai: '0673845254', 
                viTri: 'Kế toán', 
                trangThai: 'Hoạt động',
                diaChi: 'N/A'
            },
            { 
                id: '5de1314d-e49f-4fd9-8374-0629d786b41a', 
                ma: '5de1314d-e49f-4fd9-8374-0629d786b41a', 
                ten: 'Nguyễn Trọng Nhân', 
                email: 'nguyentrongnhan@gmail.com', 
                soDienThoai: '0673736254', 
                viTri: 'Kế toán', 
                trangThai: 'Hoạt động',
                diaChi: 'N/A'
            },
            { 
                id: 'bdec4bde-11ea-4d84-bc70-417aee7b791a', 
                ma: 'bdec4bde-11ea-4d84-bc70-417aee7b791a', 
                ten: 'Lê Văn Đạt', 
                email: 'levandat@gmai.com', 
                soDienThoai: '0594863452', 
                viTri: 'Quản lý loại', 
                trangThai: 'Hoạt động',
                diaChi: 'N/A'
            },
            { 
                id: '5117d993-1be6-4b97-9129-a7b51887e819', 
                ma: '5117d993-1be6-4b97-9129-a7b51887e819', 
                ten: 'Kiên', 
                email: 'xuongkienphung@gmail.com', 
                soDienThoai: '0835763864', 
                viTri: 'Admin', 
                trangThai: 'Hoạt động',
                diaChi: 'N/A'
            },
            { 
                id: '8f1d2739-4942-4dbf-a92b-7a114fa65969', 
                ma: '8f1d2739-4942-4dbf-a92b-7a114fa65969', 
                ten: 'Bé dâu', 
                email: 'strawbery@gmail.com', 
                soDienThoai: '0321456987', 
                viTri: 'Nhân Viên', 
                trangThai: 'Hoạt động',
                diaChi: 'Hố nai, huyên biên hòa, tỉnh đồng nai'
            },
            { 
                id: 'aa5fbc03-e65b-4ef3-867e-42b717d7ff9f', 
                ma: 'aa5fbc03-e65b-4ef3-867e-42b717d7ff9f', 
                ten: 'Tuấn tú', 
                email: 'tuantu@gmail.com', 
                soDienThoai: '0123456987', 
                viTri: 'Nhân viên', 
                trangThai: 'Hoạt động',
                diaChi: 'Đồng Nai, Hồ Nai, Biên Hòa'
            },
            { 
                id: '49a522ed-edb3-44b6', 
                ma: '49a522ed-edb3-44b6', 
                ten: 'Nguyễn Văn A', 
                email: 'nguyenvana@gmail.com', 
                soDienThoai: '0385964836', 
                viTri: 'Admin', 
                trangThai: 'Hoạt động',
                diaChi: 'N/A'
            }
        ];
        
        console.log('Sử dụng dữ liệu mẫu nhân viên:', mockData.length, 'bản ghi');
        return mockData;
        
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu nhân viên:', error);
        return [];
    }
};

const getPhieuNhapData = async () => {
    try {
        const localData = JSON.parse(localStorage.getItem('phieuNhap_data'));
        if (localData && localData.length > 0) {
            console.log('Lấy dữ liệu phiếu nhập từ localStorage:', localData.length, 'bản ghi');
            return localData;
        }
        
        try {
            const response = await fetch('http://localhost:3000/Receipts');
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('phieuNhap_data', JSON.stringify(data));
                console.log('Lấy dữ liệu phiếu nhập từ API và lưu vào localStorage:', data.length, 'bản ghi');
                return data;
            }
        } catch (apiError) {
            console.log('API không khả dụng, sử dụng dữ liệu mẫu');
        }
        const mockData = [
            { id: 1, ma: 'PN001', ngayNhap: '2024-01-15', nhaCungCap: 'Apple Việt Nam', tongTien: 50000000, trangThai: 'Hoàn thành' },
            { id: 2, ma: 'PN002', ngayNhap: '2024-01-16', nhaCungCap: 'Dell Technologies', tongTien: 75000000, trangThai: 'Hoàn thành' },
            { id: 3, ma: 'PN003', ngayNhap: '2024-01-17', nhaCungCap: 'Logitech Vietnam', tongTien: 25000000, trangThai: 'Đang xử lý' },
            { id: 4, ma: 'PN004', ngayNhap: '2024-01-18', nhaCungCap: 'Samsung Electronics', tongTien: 60000000, trangThai: 'Hoàn thành' },
            { id: 5, ma: 'PN005', ngayNhap: '2024-01-19', nhaCungCap: 'Canon Vietnam', tongTien: 30000000, trangThai: 'Chờ duyệt' },
            { id: 6, ma: 'PN006', ngayNhap: '2024-01-20', nhaCungCap: 'Razer Vietnam', tongTien: 40000000, trangThai: 'Hoàn thành' }
        ];
        
        localStorage.setItem('phieuNhap_data', JSON.stringify(mockData));
        console.log('Sử dụng dữ liệu mẫu phiếu nhập:', mockData.length, 'bản ghi');
        return mockData;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu phiếu nhập:', error);
        return [];
    }
};

const getPhieuXuatData = async () => {
    try {
        const localData = JSON.parse(localStorage.getItem('phieuXuat_data'));
        if (localData && localData.length > 0) {
            console.log('Lấy dữ liệu phiếu xuất từ localStorage:', localData.length, 'bản ghi');
            return localData;
        }
        
        try {
            const response = await fetch('http://localhost:3000/Exports');
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('phieuXuat_data', JSON.stringify(data));
                console.log('Lấy dữ liệu phiếu xuất từ API và lưu vào localStorage:', data.length, 'bản ghi');
                return data;
            }
        } catch (apiError) {
            console.log('API không khả dụng, sử dụng dữ liệu mẫu');
        }
        const mockData = [
            { id: 1, ma: 'PX001', ngayXuat: '2024-01-15', khachHang: 'Công ty ABC', tongTien: 25000000, trangThai: 'Hoàn thành' },
            { id: 2, ma: 'PX002', ngayXuat: '2024-01-16', khachHang: 'Công ty XYZ', tongTien: 40000000, trangThai: 'Hoàn thành' },
            { id: 3, ma: 'PX003', ngayXuat: '2024-01-17', khachHang: 'Công ty DEF', tongTien: 15000000, trangThai: 'Đang xử lý' },
            { id: 4, ma: 'PX004', ngayXuat: '2024-01-18', khachHang: 'Công ty GHI', tongTien: 35000000, trangThai: 'Hoàn thành' },
            { id: 5, ma: 'PX005', ngayXuat: '2024-01-19', khachHang: 'Công ty JKL', tongTien: 20000000, trangThai: 'Chờ duyệt' },
            { id: 6, ma: 'PX006', ngayXuat: '2024-01-20', khachHang: 'Công ty MNO', tongTien: 30000000, trangThai: 'Hoàn thành' }
        ];
        
        localStorage.setItem('phieuXuat_data', JSON.stringify(mockData));
        console.log('Sử dụng dữ liệu mẫu phiếu xuất:', mockData.length, 'bản ghi');
        return mockData;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu phiếu xuất:', error);
        return [];
    }
};

const exportFile = async () => {
    if (!selectedExportType.value) {
        alert('Vui lòng chọn loại dữ liệu để xuất');
        return;
    }

    isExporting.value = true;
    
    try {
        let data = [];
        let headers = [];
        let sheetName = '';
        let fileName = '';

        // Lấy dữ liệu và cấu hình theo loại được chọn
        switch (selectedExportType.value) {
            case 'hanghoa':
                data = await getHangHoaData();
                headers = ['Mã hàng hóa', 'Tên hàng hóa', 'Nhà cung cấp', 'Loại', 'Số lượng', 'Mô tả'];
                sheetName = 'Hàng hóa';
                fileName = 'danh_sach_hang_hoa.xlsx';
                break;
            case 'nhaCungCap':
                data = await getNhaCungCapData();
                headers = ['Mã NCC', 'Tên NCC', 'Địa chỉ', 'Số điện thoại', 'Email'];
                sheetName = 'Nhà cung cấp';
                fileName = 'danh_sach_nha_cung_cap.xlsx';
                break;
            case 'loaiHang':
                data = await getLoaiHangData();
                headers = ['Mã loại', 'Tên loại', 'Mô tả'];
                sheetName = 'Loại hàng hóa';
                fileName = 'danh_sach_loai_hang.xlsx';
                break;
            case 'nhanVien':
                data = await getNhanVienData();
                headers = ['Mã NV', 'Họ tên', 'Email', 'Số điện thoại', 'Vị trí', 'Trạng thái'];
                sheetName = 'Nhân viên';
                fileName = 'danh_sach_nhan_vien.xlsx';
                break;
            case 'phieuNhap':
                data = await getPhieuNhapData();
                headers = ['Mã phiếu', 'Ngày nhập', 'Nhà cung cấp', 'Tổng tiền', 'Trạng thái'];
                sheetName = 'Phiếu nhập kho';
                fileName = 'danh_sach_phieu_nhap.xlsx';
                break;
            case 'phieuXuat':
                data = await getPhieuXuatData();
                headers = ['Mã phiếu', 'Ngày xuất', 'Khách hàng', 'Tổng tiền', 'Trạng thái'];
                sheetName = 'Phiếu xuất kho';
                fileName = 'danh_sach_phieu_xuat.xlsx';
                break;
        }
        
        const wb = XLSX.utils.book_new();
        
        const wsData = [headers];
        if (data.length > 0) {
            data.forEach(item => {
                const row = [];
                headers.forEach(header => {
                    switch (header) {
                        case 'Mã hàng hóa':
                            row.push(item.ma || item.id || '');
                            break;
                        case 'Tên hàng hóa':
                            row.push(item.ten || item.name || '');
                            break;
                        case 'Nhà cung cấp':
                            row.push(item.nhaCC || item.supplier || '');
                            break;
                        case 'Loại':
                            row.push(item.loai || item.category || '');
                            break;
                        case 'Số lượng':
                            row.push(item.soLuong || item.quantity || 0);
                            break;
                        case 'Mô tả':
                            row.push(item.moTa || item.description || '');
                            break;
                        case 'Mã NCC':
                            row.push(item.ma || item.id || '');
                            break;
                        case 'Tên NCC':
                            row.push(item.ten || item.name || '');
                            break;
                        case 'Địa chỉ':
                            row.push(item.diaChi || item.address || '');
                            break;
                        case 'Số điện thoại':
                            row.push(item.soDienThoai || item.phone || '');
                            break;
                        case 'Email':
                            row.push(item.email || '');
                            break;
                        case 'Mã loại':
                            row.push(item.ma || item.id || '');
                            break;
                        case 'Tên loại':
                            row.push(item.ten || item.name || '');
                            break;
                        case 'Mã NV':
                            row.push(item.ma || item.employeeId || '');
                            break;
                        case 'Họ tên':
                            row.push(item.ten || item.fullName || item.name || '');
                            break;
                        case 'Vị trí':
                            row.push(item.viTri || item.position || '');
                            break;
                        case 'Trạng thái':
                            row.push(item.trangThai || item.status || '');
                            break;
                        case 'Mã phiếu':
                            row.push(item.ma || item.id || '');
                            break;
                        case 'Ngày nhập':
                            row.push(item.ngayNhap || item.date || '');
                            break;
                        case 'Ngày xuất':
                            row.push(item.ngayXuat || item.date || '');
                            break;
                        case 'Tổng tiền':
                            row.push(item.tongTien || item.total || 0);
                            break;
                        case 'Khách hàng':
                            row.push(item.khachHang || item.customer || '');
                            break;
                        default:
                            row.push(item[header.toLowerCase()] || '');
                    }
                });
                wsData.push(row);
            });
        }
        
        // Tạo worksheet
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        
        // Thêm worksheet vào workbook
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
        
        // Xuất file
        XLSX.writeFile(wb, fileName);
        
        // Cập nhật trạng thái
        exportStatus.value = {
            fileName: fileName,
            size: `${Math.round(JSON.stringify(data).length / 1024)} KB`,
            progress: 100
        };

        // Thêm vào lịch sử
        fileHistory.value.unshift({
            id: Date.now(),
            name: fileName,
            type: 'Xuất',
            size: `${Math.round(JSON.stringify(data).length / 1024)} KB`,
            date: new Date().toLocaleString('vi-VN'),
            status: 'success'
        });
        
        // Lưu lịch sử vào localStorage
        saveFileHistory();

        console.log('Đã xuất file:', fileName);
        console.log('Dữ liệu được xuất:', data);
        
    } catch (error) {
        console.error('Lỗi khi xuất file:', error);
        alert('Có lỗi xảy ra khi xuất file');
    } finally {
        isExporting.value = false;
    }
};

const triggerFileInput = () => {
    fileInput.value.click();
};

const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedFile.value = file;
        console.log('File đã chọn:', file.name);
    }
};

const handleFileDrop = (event) => {
    event.preventDefault();
    isDragOver.value = false;
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        selectedFile.value = files[0];
        console.log('File đã kéo thả:', files[0].name);
    }
};

const importFile = async () => {
    if (!selectedFile.value) {
        alert('Vui lòng chọn file để nhập');
        return;
    }

    isImporting.value = true;
    
    try {
        console.log('Bắt đầu nhập file:', selectedFile.value.name);
        
        importStatus.value = {
            fileName: selectedFile.value.name,
            size: `${Math.round(selectedFile.value.size / 1024)} KB`,
            progress: 0
        };
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                console.log('File đã được đọc, bắt đầu xử lý...');
                
                if (!selectedFile.value) {
                    throw new Error('File đã bị mất, vui lòng chọn lại file');
                }
                
                let jsonData = [];
                
                if (selectedFile.value.name.endsWith('.csv')) {
                    console.log('Xử lý file CSV...');
                    const csvText = e.target.result;
                    const lines = csvText.split('\n').filter(line => line.trim() !== '');
                    jsonData = lines.map(line => {
                        const result = [];
                        let current = '';
                        let inQuotes = false;
                        
                        for (let i = 0; i < line.length; i++) {
                            const char = line[i];
                            if (char === '"') {
                                inQuotes = !inQuotes;
                            } else if (char === ',' && !inQuotes) {
                                result.push(current.trim());
                                current = '';
                            } else {
                                current += char;
                            }
                        }
                        result.push(current.trim());
                        return result;
                    });
                } else {
                    // Xử lý file Excel
                    console.log('Xử lý file Excel...');
                    try {
                        const data = new Uint8Array(e.target.result);
                        const workbook = XLSX.read(data, { type: 'array' });
                        
                        // Lấy sheet đầu tiên
                        const firstSheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[firstSheetName];
                        
                        // Chuyển đổi thành JSON
                        jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                        console.log('Dữ liệu Excel đã được đọc:', jsonData.length, 'dòng');
                    } catch (excelError) {
                        console.error('Lỗi khi đọc file Excel:', excelError);
                        throw new Error('Không thể đọc file Excel. Vui lòng kiểm tra định dạng file.');
                    }
                }
                
                if (jsonData.length === 0) {
                    throw new Error('File không chứa dữ liệu hoặc định dạng không đúng');
                }
                
                console.log('Dữ liệu đã được parse:', jsonData);
                
                const importedData = jsonData.slice(1).map((row, index) => {
                    console.log('Xử lý dòng:', index + 1, row);
                    return {
                        id: Date.now() + index,
                        ma: row[0] || `HH${Date.now() + index}`,
                        ten: row[1] || '',
                        nhaCC: row[2] || '',
                        loai: row[3] || '',
                        soLuong: parseInt(row[4]) || 0,
                        moTa: row[5] || '',
                        createdAt: new Date().toISOString()
                    };
                }).filter(item => item.ten.trim() !== '');

                console.log('Dữ liệu sau khi xử lý:', importedData);

                const existingData = JSON.parse(localStorage.getItem('hanghoa_data')) || [];
                
                const updatedData = [...existingData, ...importedData];
                
                localStorage.setItem('hanghoa_data', JSON.stringify(updatedData));
                
                importStatus.value.progress = 100;
                fileHistory.value.unshift({
                    id: Date.now(),
                    name: selectedFile.value.name,
                    type: 'Nhập',
                    size: `${Math.round(selectedFile.value.size / 1024)} KB`,
                    date: new Date().toLocaleString('vi-VN'),
                    status: 'success'
                });
                
                saveFileHistory();

                console.log('Đã nhập file:', selectedFile.value.name, 'Số bản ghi:', importedData.length);
                
                selectedFile.value = null;
                
            } catch (error) {
                console.error('Lỗi khi đọc file Excel:', error);
                alert(`Có lỗi xảy ra khi đọc file Excel: ${error.message}`);
                importStatus.value = null;
            }
        };
        
        reader.onerror = (error) => {
            console.error('Lỗi khi đọc file:', error);
            alert('Không thể đọc file. Vui lòng kiểm tra file và thử lại.');
            importStatus.value = null;
        };
        
        // Đọc file
        if (selectedFile.value.name.endsWith('.csv')) {
            reader.readAsText(selectedFile.value, 'UTF-8');
        } else {
            reader.readAsArrayBuffer(selectedFile.value);
        }
        
    } catch (error) {
        console.error('Lỗi khi nhập file:', error);
        alert(`Có lỗi xảy ra khi nhập file: ${error.message}`);
    } finally {
        isImporting.value = false;
    }
};

const handleDragEnter = () => {
    isDragOver.value = true;
};

const handleDragLeave = () => {
    isDragOver.value = false;
};
const testApiConnection = async () => {
    console.log('=== KIỂM TRA KẾT NỐI API ===');
    
    const token = localStorage.getItem('accessToken');
    console.log('Access Token:', token ? 'Có' : 'Không');
    
    const endpoints = [
        'http://localhost:3000/api/NhanVien',
        'http://localhost:3000/api/HangHoa', 
        'http://localhost:3000/api/NhaCungCap',
        'http://localhost:3000/api/LoaiHang'
    ];
    
    for (const endpoint of endpoints) {
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            console.log(`${endpoint}: ${response.status} ${response.ok ? 'OK' : 'ERROR'}`);
            
            if (response.ok) {
                const data = await response.json();
                console.log(`Dữ liệu từ ${endpoint}:`, data);
            }
        } catch (error) {
            console.error(`Lỗi kết nối ${endpoint}:`, error);
        }
    }
};

onMounted(() => {
    console.log('Trang xuất nhập file đã được tải');
    loadFileHistory();
});
</script>

<style scoped>
.drag-over {
    border-color: #3b82f6;
    background-color: #eff6ff;
}
</style>