<template>
  <div class="p-6 space-y-4 min-h-screen bg-gray-50">
    <!-- 🔹 THANH CÔNG CỤ -->
    <div class="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl shadow-sm border">
      <!-- Ô tìm kiếm -->
      <div class="relative flex-1 min-w-[250px] max-w-[400px]">
         <input
           v-model="searchQuery"
           type="text"
           placeholder="Tìm kiếm theo ID, tên, email, trạng thái..."
           class="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-4 pr-20 text-sm text-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
         />
         <!-- Icon tìm kiếm -->
         <svg xmlns="http://www.w3.org/2000/svg"
           class="absolute right-12 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2"
           fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
             d="M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/>
         </svg>
         <!-- Nút xóa tìm kiếm -->
         <button v-if="searchQuery.trim()" @click="clearSearch"
           class="absolute right-3 top-1/2 h-4 w-4 text-gray-400 hover:text-red-500 -translate-y-1/2 transition">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
           </svg>
         </button>
      </div>

       <div class="flex gap-3">
         <button
           @click="showAddAccount = true"
           class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition shadow-sm font-medium"
         >
           <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
           </svg>
           Thêm tài khoản
         </button>
         <div class="relative">
           <button
             @click="showFilterDropdown = !showFilterDropdown"
             class="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-lg transition border border-gray-200 font-medium"
             :class="{ 'bg-blue-50 border-blue-300': selectedStatusFilter }"
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
             <div class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase border-b">Trạng thái</div>
             <button
               @click="applyStatusFilter('')"
               class="w-full text-left px-4 py-2 hover:bg-gray-50 transition flex items-center justify-between"
               :class="{ 'bg-blue-50 text-blue-600': !selectedStatusFilter }"
             >
               <span>Tất cả</span>
               <svg v-if="!selectedStatusFilter" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
               </svg>
             </button>
             <button
               @click="applyStatusFilter('approved')"
               class="w-full text-left px-4 py-2 hover:bg-gray-50 transition flex items-center justify-between"
               :class="{ 'bg-blue-50 text-blue-600': selectedStatusFilter === 'approved' }"
             >
               <span>Đã duyệt</span>
               <svg v-if="selectedStatusFilter === 'approved'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
               </svg>
             </button>
             <button
               @click="applyStatusFilter('pending')"
               class="w-full text-left px-4 py-2 hover:bg-gray-50 transition flex items-center justify-between"
               :class="{ 'bg-blue-50 text-blue-600': selectedStatusFilter === 'pending' }"
             >
               <span>Chờ duyệt</span>
               <svg v-if="selectedStatusFilter === 'pending'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
               </svg>
             </button>
             <button
               @click="applyStatusFilter('rejected')"
               class="w-full text-left px-4 py-2 hover:bg-gray-50 transition flex items-center justify-between"
               :class="{ 'bg-blue-50 text-blue-600': selectedStatusFilter === 'rejected' }"
             >
               <span>Từ chối</span>
               <svg v-if="selectedStatusFilter === 'rejected'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
               </svg>
             </button>
             <button
               @click="applyStatusFilter('blocked')"
               class="w-full text-left px-4 py-2 hover:bg-gray-50 transition flex items-center justify-between"
               :class="{ 'bg-blue-50 text-blue-600': selectedStatusFilter === 'blocked' }"
             >
               <span>Bị khóa</span>
               <svg v-if="selectedStatusFilter === 'blocked'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
               </svg>
             </button>
             <div class="border-t border-gray-200 mt-1 pt-1">
               <button
                 @click="clearFilter"
                 class="w-full text-left px-4 py-2 hover:bg-gray-50 transition flex items-center justify-between text-gray-500"
               >
                 <span>Xóa bộ lọc</span>
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </button>
             </div>
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
            <th class="p-3 border-b border-r border-gray-300 text-center cursor-pointer w-[100px]" @click="sortBy('id')">
              <div class="flex items-center justify-center gap-1">
                ID
                <div class="flex flex-col">
                  <svg v-if="sort.field === 'id' && !sort.isDesc" class="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else-if="sort.field === 'id' && sort.isDesc" class="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else class="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v11a1 1 0 102 0V5a1 1 0 00-1-1H3zm4.293 4.293a1 1 0 011.414 0L10 9.414l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </th>
            <th class="p-3 border-b border-r border-gray-300 text-left cursor-pointer" @click="sortBy('tenTaiKhoan')">
              <div class="flex items-center gap-1">
                Tên tài khoản
                <div class="flex flex-col">
                  <svg v-if="sort.field === 'tenTaiKhoan' && !sort.isDesc" class="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else-if="sort.field === 'tenTaiKhoan' && sort.isDesc" class="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else class="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v11a1 1 0 102 0V5a1 1 0 00-1-1H3zm4.293 4.293a1 1 0 011.414 0L10 9.414l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </th>
            <th class="p-3 border-b border-r border-gray-300 text-left cursor-pointer" @click="sortBy('matKhau')">
              <div class="flex items-center gap-1">
                Mật khẩu
                <div class="flex flex-col">
                  <svg v-if="sort.field === 'matKhau' && !sort.isDesc" class="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else-if="sort.field === 'matKhau' && sort.isDesc" class="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else class="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v11a1 1 0 102 0V5a1 1 0 00-1-1H3zm4.293 4.293a1 1 0 011.414 0L10 9.414l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </th>
            <th class="p-3 border-b border-r border-gray-300 text-left cursor-pointer" @click="sortBy('trangThai')">
              <div class="flex items-center gap-1">
                Trạng thái
                <div class="flex flex-col">
                  <svg v-if="sort.field === 'trangThai' && !sort.isDesc" class="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else-if="sort.field === 'trangThai' && sort.isDesc" class="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
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

        <tbody v-if="loading">
          <tr v-for="n in 5" :key="n" class="animate-pulse">
            <td class="p-3 text-center">
              <div class="w-4 h-4 bg-gray-200 rounded mx-auto skeleton-shimmer"></div>
            </td>
            <td class="p-3">
              <div class="h-4 bg-gray-200 rounded w-16 mx-auto skeleton-shimmer"></div>
            </td>
            <td class="p-3">
              <div class="h-4 bg-gray-200 rounded w-32 skeleton-shimmer"></div>
            </td>
            <td class="p-3">
              <div class="h-4 bg-gray-200 rounded w-20 skeleton-shimmer"></div>
            </td>
            <td class="p-3">
              <div class="h-6 bg-gray-200 rounded-full w-20 skeleton-shimmer"></div>
            </td>
            <td class="p-3">
              <div class="h-4 bg-gray-200 rounded w-28 skeleton-shimmer"></div>
            </td>
            <td class="p-3 text-center">
              <div class="flex items-center justify-center gap-2">
                <div class="w-4 h-4 bg-gray-200 rounded skeleton-shimmer"></div>
                <div class="w-4 h-4 bg-gray-200 rounded skeleton-shimmer"></div>
              </div>
            </td>
          </tr>
        </tbody>

         <tbody v-else-if="filteredRows.length">
           <tr v-for="(account, i) in filteredRows" :key="account.id" class="hover:bg-gray-50 transition border-b border-gray-300">
            <td class="p-3 border-r border-gray-300 text-center">
              <input type="checkbox" v-model="account.selected" class="rounded border-gray-300" />
            </td>
            <td class="p-3 border-r border-gray-300 text-center text-gray-700 font-medium">{{ account.id || 'XXXXXX' }}</td>
            <td class="p-3 border-r border-gray-300 font-medium text-gray-800">{{ account.tenTaiKhoan || 'Nguyễn Văn A' }}</td>
            <td class="p-3 border-r border-gray-300 text-gray-600">********</td>
            <td class="p-3 border-r border-gray-300">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="getStatusClass(account.trangThai)">
                {{ getStatusLabel(account.trangThai) }}
              </span>
            </td>
            <td class="p-3 border-r border-gray-300 text-black">{{ account.email || 'NVA@Gmail.com' }}</td>
            <td class="p-3 text-center">
              <div class="flex items-center justify-center gap-2">
                <!-- Nút Edit -->
                <button @click="editAccount(account)" class="text-purple-600 hover:text-purple-800 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <!-- Nút Menu với Dropdown -->
                <div class="relative">
                  <button @click="toggleDropdown(account.id, $event)" class="text-gray-600 hover:text-gray-800 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                   <!-- Dropdown Menu -->
                   <div v-if="openDropdownId === account.id" 
                     class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                     <button @click="updateAccountStatus(account)" class="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition flex items-center gap-2">
                       <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                       </svg>
                       Cập nhật status
                     </button>
                     <button @click="deleteAccount(account)" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition flex items-center gap-2">
                       <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                       </svg>
                       Xóa
                     </button>
                   </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="7" class="h-72">
              <div class="flex justify-center items-center text-gray-500">
                Không có dữ liệu
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

     <!-- 🔹 PHÂN TRANG -->
     <div v-if="!loading && filteredRows.length" class="flex flex-wrap items-center justify-between pt-4 border-t border-gray-200 bg-white px-4 py-3 rounded-xl">
       <p class="text-sm text-gray-600">
         Hiển thị {{ filteredRows.length }} trong số {{ rows.length }} dữ liệu
         <span v-if="selectedStatusFilter" class="text-blue-600 font-medium">
           (Đã lọc theo: {{ getStatusLabel(selectedStatusFilter) }})
         </span>
         <span v-if="searchQuery.trim()" class="text-green-600 font-medium">
           (Tìm kiếm: "{{ searchQuery }}")
         </span>
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

    <!-- 🔹 POPUP THÊM TÀI KHOẢN -->
    <div v-if="showAddAccount" class="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div class="bg-white rounded-2xl p-8 w-[800px] max-w-[90%] relative shadow-xl">
        <!-- Header với logo -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">{{ isEditMode ? 'Sửa tài khoản' : 'Thêm tài khoản' }}</h2>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
                 <label class="block text-sm font-semibold text-gray-700 mb-2">Tên tài khoản</label>
                 <input
                   v-model="formData.tenTaiKhoan"
                   type="text"
                   required
                   placeholder="Nhập tên tài khoản"
                   class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                 />
               </div>
               
               <div>
                 <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                 <input
                   v-model="formData.email"
                   type="email"
                   required
                   placeholder="Nhập email"
                   class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                 />
               </div>
               
               <div>
                 <label class="block text-sm font-semibold text-gray-700 mb-2">Mật khẩu</label>
                 <input
                   v-model="formData.matKhau"
                   type="password"
                   required
                   placeholder="Nhập mật khẩu"
                   class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                 />
               </div>
             </div>

             <!-- Cột phải -->
             <div class="space-y-6">
               <div>
                 <label class="block text-sm font-semibold text-gray-700 mb-2">Vai trò</label>
                 <div class="relative">
                   <select
                     v-model="formData.vaiTro"
                     required
                     class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
                   >
                     <option value="">Chọn vai trò</option>
                     <option value="admin">Quản trị viên</option>
                     <option value="manager">Quản lý</option>
                     <option value="employee">Nhân viên</option>
                     <option value="viewer">Người xem</option>
                   </select>
                   <svg xmlns="http://www.w3.org/2000/svg" class="absolute right-3 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                   </svg>
                 </div>
               </div>
               
               <div>
                 <label class="block text-sm font-semibold text-gray-700 mb-2">Trạng thái</label>
                 <div class="relative">
                   <select
                     v-model="formData.trangThai"
                     required
                     class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
                   >
                     <option value="">Chọn trạng thái</option>
                     <option value="pending">Chờ duyệt</option>
                     <option value="approved">Đã duyệt</option>
                     <option value="rejected">Từ chối</option>
                     <option value="blocked">Bị khóa</option>
                   </select>
                   <svg xmlns="http://www.w3.org/2000/svg" class="absolute right-3 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                   </svg>
                 </div>
               </div>
               
               <div>
                 <label class="block text-sm font-semibold text-gray-700 mb-2">Xác nhận mật khẩu</label>
                 <input
                   v-model="formData.confirmPassword"
                   type="password"
                   required
                   placeholder="Nhập lại mật khẩu"
                   class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                 />
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
        <button @click="showAddAccount = false; refreshForm()"
          class="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold transition">
          ✕
        </button>
      </div>
    </div>

    <!-- 🔹 POPUP XEM CHI TIẾT TÀI KHOẢN -->
    <div v-if="showViewAccount" class="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div class="bg-white rounded-2xl p-8 w-[800px] max-w-[90%] relative shadow-xl">
        <!-- Header với logo -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Chi tiết tài khoản</h2>
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
                <label class="block text-sm font-semibold text-gray-700 mb-2">ID</label>
                <input
                  :value="viewAccountData.id"
                  type="text"
                  readonly
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-gray-50 text-gray-600"
                />
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Tên tài khoản</label>
                <input
                  :value="viewAccountData.tenTaiKhoan"
                  type="text"
                  readonly
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-gray-50 text-gray-600"
                />
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  :value="viewAccountData.email"
                  type="email"
                  readonly
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-gray-50 text-gray-600"
                />
              </div>
            </div>

            <!-- Cột phải -->
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Vai trò</label>
                <input
                  :value="getRoleLabel(viewAccountData.vaiTro)"
                  type="text"
                  readonly
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-gray-50 text-gray-600"
                />
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Trạng thái</label>
                <div class="flex items-center gap-2">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getStatusClass(viewAccountData.trangThai)">
                    {{ getStatusLabel(viewAccountData.trangThai) }}
                  </span>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Ngày tạo</label>
                <input
                  :value="viewAccountData.ngayTao"
                  type="text"
                  readonly
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-gray-50 text-gray-600"
                />
              </div>
            </div>
          </div>

          <!-- Nút đóng -->
          <div class="flex justify-center gap-4 pt-6 border-t border-gray-200">
            <button
              @click="showViewAccount = false"
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
        <button @click="showViewAccount = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold transition">
          ✕
        </button>
      </div>
    </div>

    <!-- 🔹 MODAL XÓA TÀI KHOẢN -->
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
        <h2 class="text-2xl font-bold text-gray-900 text-center mb-2">Xóa tài khoản</h2>
        <p class="text-gray-600 text-center mb-6">Hành động này không thể hoàn tác!</p>

        <!-- Thông tin tài khoản -->
        <div class="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-sm font-semibold text-gray-700">ID:</span>
              <span class="text-sm text-gray-900">{{ selectedAccount.id }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm font-semibold text-gray-700">Tên tài khoản:</span>
              <span class="text-sm text-gray-900">{{ selectedAccount.tenTaiKhoan }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm font-semibold text-gray-700">Email:</span>
              <span class="text-sm text-gray-900">{{ selectedAccount.email }}</span>
            </div>
          </div>
        </div>

        <!-- Câu hỏi xác nhận -->
        <p class="text-center text-gray-700 mb-6">
          Bạn có chắc chắn muốn xóa tài khoản <span class="font-bold text-red-600">{{ selectedAccount.tenTaiKhoan }}</span>?
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
            @click="confirmDeleteAccount"
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

     <!-- 🔹 MODAL CẬP NHẬT TRẠNG THÁI -->
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

         <!-- THÔNG TIN TÀI KHOẢN -->
         <div class="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
           <div class="space-y-2">
             <div class="flex justify-between">
               <span class="text-sm font-semibold text-gray-700">ID:</span>
               <span class="text-sm text-gray-900">{{ selectedAccount.id || 'XXXXXX' }}</span>
             </div>
             <div class="flex justify-between">
               <span class="text-sm font-semibold text-gray-700">Tên tài khoản:</span>
               <span class="text-sm text-gray-900">{{ selectedAccount.tenTaiKhoan || 'Nguyễn Văn A' }}</span>
             </div>
             <div class="flex justify-between">
               <span class="text-sm font-semibold text-gray-700">Trạng thái hiện tại:</span>
               <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                 :class="getStatusClass(selectedAccount.trangThai)">
                 {{ getStatusLabel(selectedAccount.trangThai) }}
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
               <option value="pending">Chờ duyệt</option>
               <option value="approved">Đã duyệt</option>
               <option value="rejected">Từ chối</option>
               <option value="blocked">Bị khóa</option>
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
             :disabled="!newStatus || loading"
             class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition shadow-sm disabled:opacity-50">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
             </svg>
             {{ loading ? 'Đang cập nhật...' : 'Cập nhật' }}
           </button>
         </div>
       </div>
     </div>
   </div>
 </template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import Loader from "../../helper-components/Loader.vue";
import * as accountJs from "./account.js";

const rows = ref([]);
const loading = ref(true);
const searchQuery = ref("");
const showAddAccount = ref(false);
const isEditMode = ref(false);
const selectAll = ref(false);
const openDropdownId = ref(null);
const showViewAccount = ref(false);
const viewAccountData = ref({});
const showDeleteModal = ref(false);
const showStatusModal = ref(false);
const selectedAccount = ref({});
const showFilterDropdown = ref(false);
const selectedStatusFilter = ref("");
const newStatus = ref("");
const statusNote = ref("");

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
    
    // Kiểm tra localStorage trước, nếu không có thì dùng dữ liệu mẫu
    const savedData = localStorage.getItem('accountData');
    let accountData;
    
    if (savedData) {
      // Sử dụng dữ liệu đã lưu trong localStorage
      accountData = JSON.parse(savedData);
    } else {
      // Lần đầu tiên, sử dụng dữ liệu mẫu và lưu vào localStorage
      accountData = accountJs.getMockAccountData();
      localStorage.setItem('accountData', JSON.stringify(accountData));
    }
    
    rows.value = accountData.map((account) => ({ 
      ...account, 
      selected: false
    }));
    
    pagination.value = {
      currentPage: 1,
      totalPages: 1,
      pageSize: 10,
      totalItems: accountData.length,
    };
  } catch (err) {
    console.error("Lỗi tải dữ liệu:", err);
  } finally {
    loading.value = false;
  }
}

// Bỏ watch searchQuery vì đã sử dụng computed property filteredRows

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

const applyStatusFilter = (status) => {
  selectedStatusFilter.value = status;
  objQuery.value.FilterName = status ? "TrangThai" : "";
  objQuery.value.FilterValue = status;
  objQuery.value.page = 1;
  showFilterDropdown.value = false;
  // Không cần gọi loadData() vì đã có computed property filteredRows
};

const clearFilter = () => {
  selectedStatusFilter.value = "";
  objQuery.value.FilterName = "";
  objQuery.value.FilterValue = "";
  showFilterDropdown.value = false;
};

const clearSearch = () => {
  searchQuery.value = "";
};

// Đóng modal cập nhật status
const closeStatusModal = () => {
  showStatusModal.value = false;
  selectedAccount.value = {};
  newStatus.value = "";
  statusNote.value = "";
};

// Lưu cập nhật trạng thái
const saveStatusUpdate = async () => {
  try {
    loading.value = true;
    
    if (!newStatus.value) {
      alert('Vui lòng chọn trạng thái mới!');
      return;
    }
    
    // Cập nhật trạng thái trong danh sách
    const index = rows.value.findIndex(item => item.id === selectedAccount.value.id);
    if (index > -1) {
      rows.value[index].trangThai = newStatus.value;
      
      // Lưu vào localStorage
      localStorage.setItem('accountData', JSON.stringify(rows.value));
      
      closeStatusModal();
    }
  } catch (error) {
    console.error('Lỗi cập nhật trạng thái:', error);
    alert('Có lỗi xảy ra khi cập nhật trạng thái!');
  } finally {
    loading.value = false;
  }
};

// Function để reset dữ liệu về trạng thái ban đầu (dùng cho development)
const resetToMockData = () => {
  const mockData = accountJs.getMockAccountData();
  localStorage.setItem('accountData', JSON.stringify(mockData));
  loadData();
  alert('Đã reset về dữ liệu mẫu ban đầu!');
};

// Computed property để lọc dữ liệu theo trạng thái và tìm kiếm
const filteredRows = computed(() => {
  let filteredData = [...rows.value]; // Tạo copy để tránh mutation
  
  // Lọc theo trạng thái
  if (selectedStatusFilter.value) {
    filteredData = filteredData.filter(account => account.trangThai === selectedStatusFilter.value);
  }
  
  // Lọc theo từ khóa tìm kiếm
  if (searchQuery.value && searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    
    filteredData = filteredData.filter(account => {
      return (
        (account.id && account.id.toLowerCase().includes(query)) ||
        (account.tenTaiKhoan && account.tenTaiKhoan.toLowerCase().includes(query)) ||
        (account.email && account.email.toLowerCase().includes(query)) ||
        getStatusLabel(account.trangThai).toLowerCase().includes(query) ||
        getRoleLabel(account.vaiTro).toLowerCase().includes(query)
      );
    });
  }
  
  return filteredData;
});

const getStatusLabel = (status) => {
  const statusMap = {
    'pending': 'Chờ duyệt',
    'approved': 'Đã duyệt', 
    'rejected': 'Từ chối',
    'blocked': 'Bị khóa'
  };
  return statusMap[status] || status;
};

const getStatusClass = (status) => {
  const classMap = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800',
    'blocked': 'bg-gray-100 text-gray-800'
  };
  return classMap[status] || 'bg-gray-100 text-gray-800';
};

const getRoleLabel = (role) => {
  const roleMap = {
    'admin': 'Quản trị viên',
    'manager': 'Quản lý',
    'employee': 'Nhân viên',
    'viewer': 'Người xem'
  };
  return roleMap[role] || role;
};

const formData = ref({
  id: "",
  tenTaiKhoan: "",
  email: "",
  matKhau: "",
  confirmPassword: "",
  vaiTro: "",
  trangThai: ""
});

const editAccount = (account) => {
  formData.value = {
    id: account.id || "",
    tenTaiKhoan: account.tenTaiKhoan || "",
    email: account.email || "",
    matKhau: account.matKhau || "",
    confirmPassword: account.matKhau || "",
    vaiTro: account.vaiTro || "",
    trangThai: account.trangThai || ""
  };
  
  showAddAccount.value = true;
  isEditMode.value = true;
  openDropdownId.value = null;
};

const toggleDropdown = (accountId, event) => {
  // Ngăn chặn event bubbling
  if (event) {
    event.stopPropagation();
  }
  
  if (openDropdownId.value === accountId) {
    openDropdownId.value = null;
  } else {
    openDropdownId.value = accountId;
  }
};

const viewAccount = (account) => {
  viewAccountData.value = { ...account };
  showViewAccount.value = true;
  openDropdownId.value = null;
};

const updateAccountStatus = (account) => {
  // Đóng dropdown
  openDropdownId.value = null;
  
  // Mở modal cập nhật status
  selectedAccount.value = { ...account };
  showStatusModal.value = true;
};

const deleteAccount = (account) => {
  selectedAccount.value = { ...account };
  showDeleteModal.value = true;
  openDropdownId.value = null;
};

const confirmDeleteAccount = async () => {
  try {
    loading.value = true;
    // await accountJs.deleteAccount(selectedAccount.value.id);
    
     // Xóa tài khoản khỏi danh sách
     const index = rows.value.findIndex(item => item.id === selectedAccount.value.id);
     if (index > -1) {
       rows.value.splice(index, 1);
       
       // Lưu dữ liệu đã xóa vào localStorage
       localStorage.setItem('accountData', JSON.stringify(rows.value));
       
       // Cập nhật pagination
       pagination.value.totalItems = rows.value.length;
       pagination.value.totalPages = Math.ceil(rows.value.length / pagination.value.pageSize);
       
       // Điều chỉnh trang hiện tại nếu cần
       if (pagination.value.currentPage > pagination.value.totalPages && pagination.value.totalPages > 0) {
         pagination.value.currentPage = pagination.value.totalPages;
       }
     }
    
    showDeleteModal.value = false;
    alert('Xóa tài khoản thành công!');
  } catch (err) {
    console.error('Lỗi xóa tài khoản:', err);
    alert('Có lỗi xảy ra khi xóa tài khoản!');
  } finally {
    loading.value = false;
  }
};

// Function confirmAccount đã được xóa vì không còn nút xác nhận

const toggleAccountStatus = async (account) => {
  try {
    loading.value = true;
    // await accountJs.toggleAccountStatus(account.id, account.trangThai !== 'blocked');
    await loadData();
    alert(account.trangThai === 'blocked' ? 'Mở khóa tài khoản thành công!' : 'Khóa tài khoản thành công!');
  } catch (err) {
    console.error('Lỗi thay đổi trạng thái tài khoản:', err);
    alert('Có lỗi xảy ra khi thay đổi trạng thái tài khoản!');
  } finally {
    loading.value = false;
  }
};

const refreshForm = () => {
  formData.value = {
    id: "",
    tenTaiKhoan: "",
    email: "",
    matKhau: "",
    confirmPassword: "",
    vaiTro: "",
    trangThai: ""
  };
  isEditMode.value = false;
};

const submitForm = async () => {
  try {
    loading.value = true;
    
    if (!formData.value.tenTaiKhoan.trim()) {
      alert('Vui lòng nhập tên tài khoản');
      loading.value = false;
      return;
    }
    
    if (!formData.value.email.trim()) {
      alert('Vui lòng nhập email');
      loading.value = false;
      return;
    }
    
    if (!formData.value.matKhau.trim()) {
      alert('Vui lòng nhập mật khẩu');
      loading.value = false;
      return;
    }
    
    if (formData.value.matKhau !== formData.value.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp');
      loading.value = false;
      return;
    }
    
    if (!formData.value.vaiTro) {
      alert('Vui lòng chọn vai trò');
      loading.value = false;
      return;
    }
    
    if (!formData.value.trangThai) {
      alert('Vui lòng chọn trạng thái');
      loading.value = false;
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.value.email.trim())) {
      alert('Vui lòng nhập email hợp lệ');
      loading.value = false;
      return;
    }
    
    const submitData = {
      tenTaiKhoan: formData.value.tenTaiKhoan.trim(),
      email: formData.value.email.trim(),
      matKhau: formData.value.matKhau.trim(),
      vaiTro: formData.value.vaiTro,
      trangThai: formData.value.trangThai
    };
    
    let response;
     if (isEditMode.value) {
       // response = await accountJs.updateAccount(formData.value.id, submitData);
       // Cập nhật tài khoản trong danh sách
       const index = rows.value.findIndex(item => item.id === formData.value.id);
       if (index > -1) {
         rows.value[index] = {
           ...rows.value[index],
           ...submitData,
           id: formData.value.id
         };
         
         // Lưu dữ liệu đã cập nhật vào localStorage
         localStorage.setItem('accountData', JSON.stringify(rows.value));
       }
     } else {
       // response = await accountJs.createAccount(submitData);
       // Thêm tài khoản mới vào danh sách
       const newAccount = {
         id: `ACC${Date.now()}`, // Tạo ID duy nhất
         ...submitData,
         ngayTao: new Date().toISOString().split('T')[0],
         ngayCapNhat: new Date().toISOString().split('T')[0],
         selected: false
       };
       rows.value.unshift(newAccount); // Thêm vào đầu danh sách
       
       // Lưu dữ liệu mới vào localStorage
       localStorage.setItem('accountData', JSON.stringify(rows.value));
       
       // Cập nhật pagination
       pagination.value.totalItems = rows.value.length;
       pagination.value.totalPages = Math.ceil(rows.value.length / pagination.value.pageSize);
     }
    
    const wasEditMode = isEditMode.value;
    showAddAccount.value = false;
    isEditMode.value = false;
    refreshForm();
    
    alert(wasEditMode ? 'Cập nhật tài khoản thành công!' : 'Thêm tài khoản thành công!');
  } catch (err) {
    const action = isEditMode.value ? 'cập nhật' : 'thêm';
    console.error(`Lỗi ${action} tài khoản:`, err);
    alert(`Có lỗi xảy ra khi ${action} tài khoản!`);
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
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Skeleton loading animation */
@keyframes shimmer {
    0% {
        background-position: -200px 0;
    }
    100% {
        background-position: calc(200px + 100%) 0;
    }
}

.skeleton-shimmer {
    background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
    background-size: 200px 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

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
