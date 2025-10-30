<template>
  <div class="p-6 space-y-4 min-h-screen bg-gray-50">
    <!-- 🔹 THANH CÔNG CỤ -->
    <div class="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl shadow-sm border">
      <!-- Ô tìm kiếm -->
      <div class="relative flex-1 min-w-[250px] max-w-[400px]">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search here..."
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
           class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition shadow-sm font-medium"
         >
           <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
           </svg>
           Thêm nhân viên
         </button>
         <div class="relative">
           <button
             @click="showFilterDropdown = !showFilterDropdown"
             class="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-lg transition border border-gray-200 font-medium"
             :class="{ 'bg-blue-50 border-blue-300': selectedGenderFilter }"
           >
             <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
             </svg>
             Lọc
             <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" :class="{ 'rotate-180': showFilterDropdown }">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
             </svg>
           </button>
           
           <div v-if="showFilterDropdown" class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-2">
             <div class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase border-b">Giới tính</div>
             <button
               @click="applyGenderFilter('')"
               class="w-full text-left px-4 py-2 hover:bg-gray-50 transition flex items-center justify-between"
               :class="{ 'bg-blue-50 text-blue-600': !selectedGenderFilter }"
             >
               <span>Tất cả</span>
               <svg v-if="!selectedGenderFilter" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
               </svg>
             </button>
             <button
               @click="applyGenderFilter('Nam')"
               class="w-full text-left px-4 py-2 hover:bg-gray-50 transition flex items-center justify-between"
               :class="{ 'bg-blue-50 text-blue-600': selectedGenderFilter === 'Nam' }"
             >
               <span>Nam</span>
               <svg v-if="selectedGenderFilter === 'Nam'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
               </svg>
             </button>
             <button
               @click="applyGenderFilter('Nữ')"
               class="w-full text-left px-4 py-2 hover:bg-gray-50 transition flex items-center justify-between"
               :class="{ 'bg-blue-50 text-blue-600': selectedGenderFilter === 'Nữ' }"
             >
               <span>Nữ</span>
               <svg v-if="selectedGenderFilter === 'Nữ'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
               </svg>
             </button>
             <button
               @click="applyGenderFilter('Khác')"
               class="w-full text-left px-4 py-2 hover:bg-gray-50 transition flex items-center justify-between"
               :class="{ 'bg-blue-50 text-blue-600': selectedGenderFilter === 'Khác' }"
             >
               <span>Khác</span>
               <svg v-if="selectedGenderFilter === 'Khác'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
               </svg>
             </button>
           </div>
         </div>
       </div>
    </div>

    <!-- 🔹 BẢNG DỮ LIỆU -->
    <div class="w-full overflow-hidden bg-white rounded-xl shadow-sm border border-gray-200 mt-4">

      <table class="w-full border-collapse text-sm border border-gray-300">
        <thead class="bg-gray-50 text-gray-700">
          <tr>
            <th class="p-3 border-b border-r border-gray-300 text-center w-[50px]">
              <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" class="rounded border-gray-300" />
            </th>
            <th class="p-3 border-b border-r border-gray-300 text-center cursor-pointer w-[100px]" @click="sortBy('idNhanVien')">
              <div class="flex items-center justify-center gap-1">
                Mã NV
                <div class="flex flex-col">
                  <svg v-if="sort.field === 'idNhanVien' && !sort.isDesc" class="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else-if="sort.field === 'idNhanVien' && sort.isDesc" class="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else class="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v11a1 1 0 102 0V5a1 1 0 00-1-1H3zm4.293 4.293a1 1 0 011.414 0L10 9.414l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </th>
            <th class="p-3 border-b border-r border-gray-300 text-left cursor-pointer" @click="sortBy('tenNhanVien')">
              <div class="flex items-center gap-1">
              Tên nhân viên
                <div class="flex flex-col">
                  <svg v-if="sort.field === 'tenNhanVien' && !sort.isDesc" class="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else-if="sort.field === 'tenNhanVien' && sort.isDesc" class="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else class="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v11a1 1 0 102 0V5a1 1 0 00-1-1H3zm4.293 4.293a1 1 0 011.414 0L10 9.414l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </th>
             <th class="p-3 border-b border-r border-gray-300 text-left cursor-pointer" @click="sortBy('chucVu')">
               <div class="flex items-center gap-1">
                 Chức vụ
                 <div class="flex flex-col">
                   <svg v-if="sort.field === 'chucVu' && !sort.isDesc" class="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                     <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                   </svg>
                   <svg v-else-if="sort.field === 'chucVu' && sort.isDesc" class="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                     <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                   </svg>
                   <svg v-else class="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                     <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v11a1 1 0 102 0V5a1 1 0 00-1-1H3zm4.293 4.293a1 1 0 011.414 0L10 9.414l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clip-rule="evenodd" />
                   </svg>
                 </div>
               </div>
            </th>
            <th class="p-3 border-b border-r border-gray-300 text-left cursor-pointer" @click="sortBy('diaChi')">
              <div class="flex items-center gap-1">
                Địa chỉ
                <div class="flex flex-col">
                  <svg v-if="sort.field === 'diaChi' && !sort.isDesc" class="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else-if="sort.field === 'diaChi' && sort.isDesc" class="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else class="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v11a1 1 0 102 0V5a1 1 0 00-1-1H3zm4.293 4.293a1 1 0 011.414 0L10 9.414l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </th>
            <th class="p-3 border-b border-r border-gray-300 text-left cursor-pointer" @click="sortBy('sdt')">
              <div class="flex items-center gap-1">
              Số điện thoại
                <div class="flex flex-col">
                  <svg v-if="sort.field === 'sdt' && !sort.isDesc" class="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else-if="sort.field === 'sdt' && sort.isDesc" class="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else class="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v11a1 1 0 102 0V5a1 1 0 00-1-1H3zm4.293 4.293a1 1 0 011.414 0L10 9.414l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </th>
            <th class="p-3 border-b border-r border-gray-300 text-left cursor-pointer" @click="sortBy('email')">
              <div class="flex items-center gap-1">
                Email
                <div class="flex flex-col">
                  <svg v-if="sort.field === 'email' && !sort.isDesc" class="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else-if="sort.field === 'email' && sort.isDesc" class="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else class="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v11a1 1 0 102 0V5a1 1 0 00-1-1H3zm4.293 4.293a1 1 0 011.414 0L10 9.414l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </th>
            <th class="p-3 border-b text-center w-[120px]">Hành động</th>
          </tr>
        </thead>

        <tbody v-if="!loading && rows.length">
          <tr v-for="(emp, i) in rows" :key="emp.idNhanVien" class="hover:bg-gray-50 transition border-b border-gray-300">
            <td class="p-3 border-r border-gray-300 text-center">
              <input type="checkbox" v-model="emp.selected" class="rounded border-gray-300" />
            </td>
             <td class="p-3 border-r border-gray-300 text-center text-gray-700 font-medium">{{ emp.idNhanVien || 'XXXXXX' }}</td>
             <td class="p-3 border-r border-gray-300 font-medium text-gray-800">{{ emp.tenNhanVien || 'Nguyễn Văn A' }}</td>
             <td class="p-3 border-r border-gray-300 text-gray-600">{{ emp.chucVu || 'Nhân viên' }}</td>
             <td class="p-3 border-r border-gray-300 text-gray-600 max-w-[200px]">
               <div class="truncate" :title="formatAddress(emp.diaChi)">
                 {{ formatAddress(emp.diaChi) }}
               </div>
             </td>
             <td class="p-3 border-r border-gray-300 text-gray-600">{{ emp.sdt || '0123456789' }}</td>
            <td class="p-3 border-r border-gray-300 text-gray-600">{{ emp.email || 'NVA@Gmail.com' }}</td>
            <td class="p-3 text-center">
              <div class="flex items-center justify-center gap-2">
                <!-- Nút Edit -->
                <button @click="editEmployee(emp)" class="text-purple-600 hover:text-purple-800 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <!-- Nút Menu với Dropdown -->
                <div class="relative">
                  <button @click="toggleDropdown(emp.idNhanVien, $event)" class="text-gray-600 hover:text-gray-800 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                  <!-- Dropdown Menu -->
                  <div v-if="openDropdownId === emp.idNhanVien" 
                    class="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <button @click="deleteEmployee(emp)" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg transition">
                      Xóa
                    </button>
                    <button @click="blockEmployee(emp)" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg transition">
                      Chặn
                    </button>
                  </div>
                </div>
              </div>
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
    <div v-if="!loading" class="flex flex-wrap items-center justify-between pt-4 border-t border-gray-200 bg-white px-4 py-3 rounded-xl">
      <p class="text-sm text-gray-600">
        Hiển thị {{ pagination.pageSize }} trong số {{ pagination.totalItems }} dữ liệu
      </p>

      <div class="flex items-center gap-2">
        <button @click="prevPage" :disabled="pagination.currentPage === 1"
          class="px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 disabled:opacity-50 flex items-center gap-1 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <div class="flex items-center border border-blue-500 rounded-md overflow-hidden">
          <button v-for="page in Math.min(4, pagination.totalPages)" :key="page" 
            @click="goToPage(page)" 
            class="px-3 py-2 text-sm transition"
            :class="page === pagination.currentPage ? 'bg-blue-500 text-white' : 'text-blue-600 hover:bg-blue-100'">
            {{ page }}
          </button>
        </div>

        <button @click="nextPage" :disabled="pagination.currentPage === pagination.totalPages"
          class="px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 disabled:opacity-50 flex items-center gap-1 transition">
          Next
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 🔹 POPUP THÊM NHÂN VIÊN -->
    <div v-if="showAddEmployee" class="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div class="bg-white rounded-2xl p-8 w-[800px] max-w-[90%] relative shadow-xl">
        <!-- Header với logo -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">{{ isEditMode ? 'Sửa nhân viên' : 'Thêm nhân viên' }}</h2>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span class="text-lg font-semibold text-blue-600">Dâu</span>
          </div>
        </div>

         <!-- Form -->
         <form @submit.prevent="submitForm" class="space-y-6">
           <!-- Grid 2 cột -->
           <div class="grid grid-cols-2 gap-8">
             <!-- Cột trái -->
             <div class="space-y-6">
               <div>
                 <label class="block text-sm font-semibold text-gray-700 mb-2">Tên</label>
                 <input
                   v-model="formData.tenNhanVien"
                   type="text"
                   required
                   placeholder="Nhập tên của bạn"
                   class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                 />
               </div>
               
               <div>
                 <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                 <input
                   v-model="formData.email"
                   type="email"
                   required
                   placeholder="Nhập email của bạn"
                   class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                 />
               </div>
               
               <div>
                 <label class="block text-sm font-semibold text-gray-700 mb-2">Ngày sinh</label>
                 <div class="relative">
                   <input
                     v-model="formData.ngaySinh"
                     type="date"
                     class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition pr-10"
                   />
                   <svg xmlns="http://www.w3.org/2000/svg" class="absolute right-3 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                   </svg>
                 </div>
               </div>
             </div>

             <!-- Cột phải -->
             <div class="space-y-6">
               <div>
                 <label class="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại</label>
                 <input
                   v-model="formData.sdt"
                   type="tel"
                   required
                   placeholder="Nhập số điện thoại của bạn"
                   class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                 />
               </div>
               
               <div>
                 <label class="block text-sm font-semibold text-gray-700 mb-2">Chức vụ</label>
                 <input
                   v-model="formData.chucVu"
                   type="text"
                   placeholder="Nhập chức vụ"
                   class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                 />
               </div>
               
               <div>
                 <label class="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ</label>
                 <input
                   v-model="formData.diaChi"
                   type="text"
                   placeholder="Nhập địa chỉ của bạn"
                   class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                 />
               </div>
               
               <div>
                 <label class="block text-sm font-semibold text-gray-700 mb-2">Giới tính</label>
                 <div class="relative">
                   <select
                     v-model="formData.gioiTinh"
                     required
                     class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
                   >
                     <option value="">Chọn giới tính</option>
                     <option value="Nam">Nam</option>
                     <option value="Nữ">Nữ</option>
                     <option value="Khác">Khác</option>
                   </select>
                   <svg xmlns="http://www.w3.org/2000/svg" class="absolute right-3 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                   </svg>
                 </div>
               </div>
             </div>
           </div>

           <!-- Phần thêm ảnh - full width -->
           <div class="mt-6">
             <label class="block text-sm font-semibold text-gray-700 mb-2">Thêm ảnh</label>
             <div class="relative">
               <input
                 ref="fileInput"
                 type="file"
                 accept="image/*"
                 @change="handleFileUpload"
                 class="hidden"
               />
               <div
                 @click="$refs.fileInput.click()"
                 class="w-full rounded-lg border-2 border-dashed border-gray-300 px-6 py-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
               >
                 <div v-if="!formData.anhDaiDien" class="space-y-3">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                   </svg>
                   <p class="text-sm text-gray-500">Nhấp để chọn ảnh</p>
                   <p class="text-xs text-gray-400">JPG, PNG, GIF (tối đa 5MB)</p>
                 </div>
                 <div v-else class="space-y-3">
                   <img :src="formData.anhDaiDien" alt="Preview" class="h-20 w-20 object-cover rounded-lg mx-auto" />
                   <p class="text-sm text-green-600">Ảnh đã được chọn</p>
                   <button
                     type="button"
                     @click.stop="removeImage"
                     class="text-xs text-red-500 hover:text-red-700"
                   >
                     Xóa ảnh
                   </button>
                 </div>
               </div>
             </div>
           </div>

          <!-- Nút hành động -->
          <div class="flex justify-center gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              @click="refreshForm"
              class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            
            <button
              type="submit"
              :disabled="loading"
              class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition shadow-sm disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {{ loading ? (isEditMode ? 'Đang cập nhật...' : 'Đang lưu...') : (isEditMode ? 'Cập nhật' : 'Save') }}
            </button>
          </div>
        </form>

        <!-- Nút đóng -->
        <button @click="showAddEmployee = false; refreshForm()"
          class="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold transition">
          ✕
        </button>
      </div>
    </div>

    <!-- 🔹 POPUP XEM CHI TIẾT NHÂN VIÊN -->
    <div v-if="showViewEmployee" class="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div class="bg-white rounded-2xl p-8 w-[800px] max-w-[90%] relative shadow-xl">
        <!-- Header với logo -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Chi tiết nhân viên</h2>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span class="text-lg font-semibold text-blue-600">Dâu</span>
          </div>
        </div>

        <!-- View Content -->
        <div class="space-y-6">
          <!-- Grid 2 cột -->
          <div class="grid grid-cols-2 gap-8">
            <!-- Cột trái -->
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Mã nhân viên</label>
                <input
                  :value="viewEmployeeData.idNhanVien"
                  type="text"
                  readonly
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-gray-50 text-gray-600"
                />
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Tên</label>
                <input
                  :value="viewEmployeeData.tenNhanVien"
                  type="text"
                  readonly
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-gray-50 text-gray-600"
                />
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  :value="viewEmployeeData.email"
                  type="email"
                  readonly
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-gray-50 text-gray-600"
                />
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Ngày sinh</label>
                <input
                  :value="viewEmployeeData.ngaySinh"
                  type="text"
                  readonly
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-gray-50 text-gray-600"
                />
              </div>
            </div>

            <!-- Cột phải -->
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại</label>
                <input
                  :value="viewEmployeeData.sdt"
                  type="tel"
                  readonly
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-gray-50 text-gray-600"
                />
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Chức vụ</label>
                <input
                  :value="viewEmployeeData.chucVu"
                  type="text"
                  readonly
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-gray-50 text-gray-600"
                />
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ</label>
                <input
                  :value="formatAddress(viewEmployeeData.diaChi)"
                  type="text"
                  readonly
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-gray-50 text-gray-600"
                />
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Giới tính</label>
                <input
                  :value="viewEmployeeData.gioiTinh"
                  type="text"
                  readonly
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-gray-50 text-gray-600"
                />
              </div>
            </div>
          </div>

          <!-- Phần ảnh đại diện - full width -->
          <div v-if="viewEmployeeData.anhDaiDien" class="mt-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Ảnh đại diện</label>
            <div class="flex justify-center">
              <img :src="viewEmployeeData.anhDaiDien" alt="Avatar" class="h-32 w-32 object-cover rounded-lg border-2 border-gray-300" />
            </div>
          </div>

          <!-- Nút đóng -->
          <div class="flex justify-center gap-4 pt-6 border-t border-gray-200">
            <button
              @click="showViewEmployee = false"
              class="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg transition shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Đóng
            </button>
          </div>
        </div>

        <!-- Nút đóng X -->
        <button @click="showViewEmployee = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold transition">
          ✕
        </button>
      </div>
    </div>

    <!-- 🔹 MODAL XÓA NHÂN VIÊN -->
    <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div class="bg-white rounded-2xl p-8 w-[500px] max-w-[90%] relative shadow-2xl">
        <!-- Icon cảnh báo -->
        <div class="flex justify-center mb-4">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        <!-- Tiêu đề -->
        <h2 class="text-2xl font-bold text-gray-900 text-center mb-2">Xóa nhân viên</h2>
        <p class="text-gray-600 text-center mb-6">Hành động này không thể hoàn tác!</p>

        <!-- Thông tin nhân viên -->
        <div class="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-sm font-semibold text-gray-700">Mã nhân viên:</span>
              <span class="text-sm text-gray-900">{{ selectedEmployee.idNhanVien }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm font-semibold text-gray-700">Tên nhân viên:</span>
              <span class="text-sm text-gray-900">{{ selectedEmployee.tenNhanVien }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm font-semibold text-gray-700">Chức vụ:</span>
              <span class="text-sm text-gray-900">{{ selectedEmployee.chucVu }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm font-semibold text-gray-700">Email:</span>
              <span class="text-sm text-gray-900">{{ selectedEmployee.email }}</span>
            </div>
          </div>
        </div>

        <!-- Câu hỏi xác nhận -->
        <p class="text-center text-gray-700 mb-6">
          Bạn có chắc chắn muốn xóa nhân viên <span class="font-bold text-red-600">{{ selectedEmployee.tenNhanVien }}</span>?
        </p>

        <!-- Nút hành động -->
        <div class="flex gap-3">
          <button
            @click="showDeleteModal = false"
            class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-3 rounded-lg transition"
          >
            Hủy
          </button>
          <button
            @click="confirmDeleteEmployee"
            :disabled="loading"
            class="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {{ loading ? 'Đang xóa...' : 'Xóa' }}
          </button>
        </div>

        <!-- Nút đóng X -->
        <button @click="showDeleteModal = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold transition">
          ✕
        </button>
      </div>
    </div>

    <!-- 🔹 MODAL CHẶN NHÂN VIÊN -->
    <div v-if="showBlockModal" class="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div class="bg-white rounded-2xl p-8 w-[500px] max-w-[90%] relative shadow-2xl">
        <!-- Icon cảnh báo -->
        <div class="flex justify-center mb-4">
          <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
        </div>

        <!-- Tiêu đề -->
        <h2 class="text-2xl font-bold text-gray-900 text-center mb-2">Chặn nhân viên</h2>
        <p class="text-gray-600 text-center mb-6">Nhân viên sẽ không thể truy cập hệ thống</p>

        <!-- Thông tin nhân viên -->
        <div class="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-sm font-semibold text-gray-700">Mã nhân viên:</span>
              <span class="text-sm text-gray-900">{{ selectedEmployee.idNhanVien }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm font-semibold text-gray-700">Tên nhân viên:</span>
              <span class="text-sm text-gray-900">{{ selectedEmployee.tenNhanVien }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm font-semibold text-gray-700">Chức vụ:</span>
              <span class="text-sm text-gray-900">{{ selectedEmployee.chucVu }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm font-semibold text-gray-700">Email:</span>
              <span class="text-sm text-gray-900">{{ selectedEmployee.email }}</span>
            </div>
          </div>
        </div>

        <!-- Câu hỏi xác nhận -->
        <p class="text-center text-gray-700 mb-4">
          Bạn có chắc chắn muốn chặn nhân viên <span class="font-bold text-yellow-600">{{ selectedEmployee.tenNhanVien }}</span>?
        </p>

        <!-- Lưu ý hậu quả -->
        <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded">
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="text-sm text-yellow-800">
              <p class="font-semibold mb-1">Lưu ý:</p>
              <p>Sau khi chặn, nhân viên này sẽ không thể:</p>
              <ul class="list-disc list-inside mt-1 space-y-1 ml-2">
                <li>Đăng nhập vào hệ thống</li>
                <li>Truy cập bất kỳ chức năng nào</li>
                <li>Thực hiện các thao tác nghiệp vụ</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Nút hành động -->
        <div class="flex gap-3">
          <button
            @click="showBlockModal = false"
            class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-3 rounded-lg transition"
          >
            Hủy
          </button>
          <button
            @click="confirmBlockEmployee"
            :disabled="loading"
            class="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-medium px-6 py-3 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            {{ loading ? 'Đang chặn...' : 'Chặn' }}
          </button>
        </div>

        <!-- Nút đóng X -->
        <button @click="showBlockModal = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-yellow-500 text-2xl font-bold transition">
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import Loader from "../helper-components/Loader.vue";
import Pagination from "../helper-components/Pagination.vue";
import * as userJs from "./user.js";

const rows = ref([]);
const loading = ref(true);
const searchQuery = ref("");
const showAddEmployee = ref(false);
const isEditMode = ref(false);
const selectAll = ref(false);
const openDropdownId = ref(null);
const showViewEmployee = ref(false);
const viewEmployeeData = ref({});
const showDeleteModal = ref(false);
const showBlockModal = ref(false);
const selectedEmployee = ref({});
const showFilterDropdown = ref(false);
const selectedGenderFilter = ref("");

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
    
    const genderEnumToString = {
      0: 'Nam',
      1: 'Nữ',
      2: 'Khác'
    };
    
    const res = await userJs.userData(objQuery.value);
    rows.value = res.data.map((emp) => ({ 
      ...emp, 
      selected: false,
      gioiTinh: genderEnumToString[emp.gioiTinh] || emp.gioiTinh
    }));
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

const applyGenderFilter = (gender) => {
  selectedGenderFilter.value = gender;
  objQuery.value.FilterName = gender ? "GioiTinh" : "";
  objQuery.value.FilterValue = gender;
  objQuery.value.page = 1;
  showFilterDropdown.value = false;
  loadData();
};

const formatAddress = (address) => {
  if (!address) return 'N/A';
  
  if (typeof address === 'string') {
    try {
      const parsed = JSON.parse(address);
      return formatAddressObject(parsed);
    } catch {
      return address;
    }
  }
  
  if (typeof address === 'object') {
    return formatAddressObject(address);
  }
  
  return 'N/A';
};

const formatAddressObject = (obj) => {
  const parts = [];
  
  if (obj.xa) parts.push(obj.xa);
  if (obj.huyen) parts.push(obj.huyen);
  if (obj.tinh) parts.push(obj.tinh);
  
  if (parts.length === 0) {
    if (obj.street) parts.push(obj.street);
    if (obj.district) parts.push(obj.district);
    if (obj.city) parts.push(obj.city);
    if (obj.province) parts.push(obj.province);
  }
  
  if (parts.length === 0) {
    parts.push(...Object.values(obj).filter(v => v && typeof v === 'string'));
  }
  
  return parts.join(', ') || 'N/A';
};

const formData = ref({
  idNhanVien: "",
  tenNhanVien: "",
  email: "",
  ngaySinh: "",
  sdt: "",
  chucVu: "",
  diaChi: "",
  gioiTinh: "",
  anhDaiDien: ""
});

const editEmployee = (emp) => {
  const genderEnumToString = {
    0: 'Nam',
    1: 'Nữ',
    2: 'Khác'
  };
  
  let ngaySinh = emp.ngaySinh || "";
  if (ngaySinh) {
    try {
      const date = new Date(ngaySinh);
      ngaySinh = date.toISOString().split('T')[0];
    } catch (e) {
      console.error('Error formatting date:', e);
    }
  }
  
  formData.value = {
    idNhanVien: emp.idNhanVien || "",
    tenNhanVien: emp.tenNhanVien || "",
    email: emp.email || "",
    ngaySinh: ngaySinh,
    sdt: emp.sdt || "",
    chucVu: emp.chucVu || "",
    diaChi: emp.diaChi || "",
    gioiTinh: typeof emp.gioiTinh === 'number' ? genderEnumToString[emp.gioiTinh] : emp.gioiTinh || "",
    anhDaiDien: emp.anhDaiDien || ""
  };
  
  showAddEmployee.value = true;
  isEditMode.value = true;
  openDropdownId.value = null;
};

const toggleDropdown = (empId, event) => {
  // Ngăn chặn event bubbling
  if (event) {
    event.stopPropagation();
  }
  
  if (openDropdownId.value === empId) {
    openDropdownId.value = null;
  } else {
    openDropdownId.value = empId;
  }
};

const viewEmployee = (emp) => {
  const genderEnumToString = {
    0: 'Nam',
    1: 'Nữ',
    2: 'Khác'
  };
  
  let ngaySinh = emp.ngaySinh || "";
  if (ngaySinh) {
    try {
      const date = new Date(ngaySinh);
      ngaySinh = date.toLocaleDateString('vi-VN');
    } catch (e) {
      console.error('Error formatting date:', e);
    }
  }
  
  viewEmployeeData.value = { 
    ...emp,
    gioiTinh: typeof emp.gioiTinh === 'number' ? genderEnumToString[emp.gioiTinh] : emp.gioiTinh,
    ngaySinh: ngaySinh
  };
  showViewEmployee.value = true;
  openDropdownId.value = null;
};

const deleteEmployee = (emp) => {
  selectedEmployee.value = { ...emp };
  showDeleteModal.value = true;
  openDropdownId.value = null;
};

const confirmDeleteEmployee = async () => {
  try {
    loading.value = true;
    await userJs.deleteUser(selectedEmployee.value.idNhanVien);
    await loadData();
    showDeleteModal.value = false;
    alert('Xóa nhân viên thành công!');
  } catch (err) {
    console.error('Lỗi xóa nhân viên:', err);
    alert('Có lỗi xảy ra khi xóa nhân viên!');
  } finally {
    loading.value = false;
  }
};

const blockEmployee = (emp) => {
  selectedEmployee.value = { ...emp };
  showBlockModal.value = true;
  openDropdownId.value = null;
};

const confirmBlockEmployee = async () => {
  try {
    loading.value = true;
    await loadData();
    showBlockModal.value = false;
    alert('Chặn nhân viên thành công!');
  } catch (err) {
    console.error('Lỗi chặn nhân viên:', err);
    alert('Có lỗi xảy ra khi chặn nhân viên!');
  } finally {
    loading.value = false;
  }
};

const refreshForm = () => {
  formData.value = {
    idNhanVien: "",
    tenNhanVien: "",
    email: "",
    ngaySinh: "",
    sdt: "",
    chucVu: "",
    diaChi: "",
    gioiTinh: "",
    anhDaiDien: ""
  };
  isEditMode.value = false;
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Kiểm tra kích thước file (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Kích thước file không được vượt quá 5MB');
      return;
    }
    
    // Kiểm tra loại file
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn file ảnh');
      return;
    }
    
    // Tạo URL preview
    const reader = new FileReader();
    reader.onload = (e) => {
      formData.value.anhDaiDien = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = () => {
  formData.value.anhDaiDien = "";
  // Reset file input
  const fileInput = document.querySelector('input[type="file"]');
  if (fileInput) {
    fileInput.value = '';
  }
};

const submitForm = async () => {
  try {
    loading.value = true;
    
    if (!formData.value.tenNhanVien.trim()) {
      alert('Vui lòng nhập tên nhân viên');
      loading.value = false;
      return;
    }
    
    if (formData.value.tenNhanVien.trim().length < 2) {
      alert('Tên nhân viên phải có ít nhất 2 ký tự');
      loading.value = false;
      return;
    }
    
    if (!formData.value.email.trim()) {
      alert('Vui lòng nhập email');
      loading.value = false;
      return;
    }
    
    if (!formData.value.sdt.trim()) {
      alert('Vui lòng nhập số điện thoại');
      loading.value = false;
      return;
    }
    
    if (!formData.value.gioiTinh) {
      alert('Vui lòng chọn giới tính');
      loading.value = false;
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.value.email.trim())) {
      alert('Vui lòng nhập email hợp lệ');
      loading.value = false;
      return;
    }
    
    const phoneRegex = /^[0-9]{9,13}$/;
    if (!phoneRegex.test(formData.value.sdt.trim())) {
      alert('Số điện thoại phải có từ 9-13 chữ số');
      loading.value = false;
      return;
    }
    
    const genderMap = {
      'Nam': 'Nam',
      'Nữ': 'Nu',
      'Khác': 'Nam'
    };
    
    const submitData = {
      TenNhanVien: formData.value.tenNhanVien.trim(),
      email: formData.value.email.trim(),
      sdt: formData.value.sdt.trim(),
      GioiTinh: genderMap[formData.value.gioiTinh] || 'Nam',
      chucVu: formData.value.chucVu?.trim() || 'Nhân viên',
      ngaySinh: formData.value.ngaySinh || '2000-01-01'
    };
    
    if (formData.value.diaChi && formData.value.diaChi.trim()) {
      try {
        submitData.diaChi = JSON.parse(formData.value.diaChi);
      } catch {
        submitData.diaChi = { "diaChi": formData.value.diaChi.trim() };
      }
    }
    
    let response;
    if (isEditMode.value) {
      response = await userJs.updateUser(formData.value.idNhanVien, submitData);
    } else {
      response = await userJs.createUser(submitData);
    }
    
    const wasEditMode = isEditMode.value;
    showAddEmployee.value = false;
    isEditMode.value = false;
    refreshForm();
    await loadData();
    
    alert(wasEditMode ? 'Cập nhật nhân viên thành công!' : 'Thêm nhân viên thành công!');
  } catch (err) {
    const action = isEditMode.value ? 'cập nhật' : 'thêm';
    console.error(`Lỗi ${action} nhân viên:`, err);
    
    let errorMessage = `Có lỗi xảy ra khi ${action} nhân viên:\n\n`;
    
    if (err.response?.data?.errors) {
      const errors = err.response.data.errors;
      const errorList = Object.keys(errors).map(key => {
        const messages = Array.isArray(errors[key]) ? errors[key].join(', ') : errors[key];
        return `• ${key}: ${messages}`;
      }).join('\n');
      errorMessage += errorList;
    } else if (err.response?.data?.title) {
      errorMessage += err.response.data.title;
      if (err.response?.data?.detail) {
        errorMessage += '\n\n' + err.response.data.detail;
      }
    } else if (err.response?.data?.message) {
      errorMessage += err.response.data.message;
    } else if (err.message) {
      errorMessage += err.message;
    } else {
      errorMessage += 'Lỗi không xác định.';
    }
    
    alert(errorMessage);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadData();
  
  // Event listener để đóng dropdown khi click bên ngoài
  document.addEventListener('click', (event) => {
    const target = event.target;
    
    // Kiểm tra nếu click vào nút lọc thì không đóng
    if (target.closest('button[class*="bg-gray-50"]') || target.closest('button[class*="bg-blue-50"]')) {
      return;
    }
    
    // Kiểm tra nếu click vào nút 3 chấm thì không đóng
    if (target.closest('button[class*="text-gray-600"]') && target.closest('svg')) {
      return;
    }
    
    // Kiểm tra nếu click vào dropdown menu thì không đóng
    if (target.closest('.absolute')) {
      return;
    }
    
    // Kiểm tra nếu click vào filter dropdown thì không đóng
    if (target.closest('[class*="z-50"]')) {
      return;
    }
    
    // Đóng tất cả dropdown
    openDropdownId.value = null;
    showFilterDropdown.value = false;
  });
});
</script>

<style scoped>
/* Đảm bảo nút 3 chấm có thể click được */
button[class*="text-gray-600"] {
    cursor: pointer;
    pointer-events: auto;
}

/* Đảm bảo nút lọc có thể click được */
button[class*="bg-gray-50"], button[class*="bg-blue-50"] {
    cursor: pointer;
    pointer-events: auto;
}

/* Đảm bảo dropdown có z-index cao */
.absolute {
    z-index: 9999;
}
</style>
