<template>
  <div class="p-6 space-y-4">
    <!-- THANH CÔNG CỤ -->
    <div class="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl shadow-sm">
      <!-- Ô tìm kiếm -->
      <div class="relative flex-1 min-w-[250px]">
        <input v-model="searchQuery" type="text" placeholder="Tìm kiếm..."
          class="w-full rounded-xl border border-gray-200 bg-white shadow-sm py-3.5 pl-4 pr-10 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute right-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2"
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div v-if="showSort"
            class="absolute right-0 mt-2 w-36 rounded-xl bg-white shadow-lg border border-gray-200 text-sm text-gray-700 z-50">
            <button class="block w-full px-4 py-2 text-left hover:bg-gray-100" @click="setSort('Newest')">
              Newest
            </button>
            <button class="block w-full px-4 py-2 text-left hover:bg-gray-100" @click="setSort('Oldest')">
              Oldest
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- BẢNG DỮ LIỆU -->
    <div class="w-full overflow-visible bg-white rounded-xl shadow-sm border border-gray-200 mt-4">
      <table class="w-full border-collapse text-sm">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th v-for="header in headers" :key="header"
              class="border border-gray-200 p-3 text-left cursor-pointer hover:bg-gray-200">
              <div class="flex items-center gap-1">
                {{ header }}
                <div class="flex flex-col">
                  <svg class="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clip-rule="evenodd" />
                  </svg>
                  <svg class="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </th>
            <th class="border border-gray-200 p-3 text-center">
              <button
                class="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Lưu
              </button>
            </th>
          </tr>
        </thead>

        <tbody v-if="!loading && paginatedData.length > 0">
          <tr v-for="(row, i) in paginatedData" :key="row.id" class="hover:bg-gray-50 transition relative">
            <td class="border border-gray-200 p-3">
              {{ row.code || "XXXXXX" }}
            </td>
            <td class="border border-gray-200 p-3">
              {{ row.supplier || "Nhà cung cấp A" }}
            </td>
            <td class="border border-gray-200 p-3">
              {{ row.product || "XXXXXX" }}
            </td>
            <td class="border border-gray-200 p-3">
              {{ row.quantity || "XXXXXX" }}
            </td>
            <td class="border border-gray-200 p-3 text-black">
              {{ formatPrice(row.price) || "500.000 VNĐ" }}
            </td>
            <td class="border border-gray-200 p-3">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="getStatusClass(row.status)">
                {{ getStatusLabel(row.status) }}
              </span>
            </td>
            <td class="border border-gray-200 p-3">
              {{ row.creator || "XXXXXX" }}
            </td>
            <td class="border border-gray-200 p-3">
              {{ row.date || "13/11/2025" }} {{ row.time || "15:00" }}
            </td>
            <td class="border border-gray-200 p-3 text-center relative">
              <div class="flex items-center justify-center gap-3">
                <button @click="viewPhieu(row)" class="text-gray-700 hover:text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button @click="toggleRowMenu(i)" class="text-gray-700 hover:text-blue-500">
                  ⋯
                </button>
              </div>

              <!-- menu -->
              <transition name="fade">
                <div v-if="row.showMenu"
                  class="absolute right-3 top-10 z-50 w-32 bg-white border border-gray-200 rounded-lg shadow-md text-sm text-gray-700">
                  <button @click="updateStatus(row)" class="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    🔄 Cập nhật status
                  </button>
                  <button @click="confirmDeletePhieu(row)" class="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    🗑️ Xóa
                  </button>
                </div>
              </transition>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="9" class="h-80">
              <div class="flex items-center justify-center h-full">
                <Loader />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

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
        <div class="flex justify-between items-center cursor-move border-b border-gray-100 pb-4" @mousedown="startDrag">
          <h2 class="text-2xl font-bold text-gray-800">Tạo phiếu xuất kho</h2>
          <!-- Logo góc phải -->
          <img src="../../assets/logo.png" alt="Logo" class="w-20 h-20" />
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

    <!-- MODAL XEM CHI TIẾT PHIẾU XUẤT -->
    <div v-if="showViewModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black/15">
      <div class="bg-white rounded-2xl border border-gray-200 shadow-xl w-full max-w-4xl p-8 space-y-6">
        <button @click="closeViewModal"
          class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold">
          ✕
        </button>

        <!-- HEADER -->
        <div class="flex justify-between items-center border-b border-gray-100 pb-4">
          <h2 class="text-2xl font-bold text-gray-800">
            Chi tiết phiếu xuất kho
          </h2>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span class="text-lg font-semibold text-blue-600">Dâu</span>
          </div>
        </div>

        <!-- THÔNG TIN CHI TIẾT -->
        <div class="bg-gray-50 p-6 rounded-xl space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Cột trái -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Mã phiếu</label>
                <input :value="selectedPhieu.code || 'XXXXXX'" type="text" readonly
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-gray-50 text-gray-600" />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Nguồn nhập</label>
                <input :value="selectedPhieu.supplier || 'Nhà cung cấp A'" type="text" readonly
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-gray-50 text-gray-600" />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Tên hàng</label>
                <input :value="selectedPhieu.product || 'XXXXXX'" type="text" readonly
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-gray-50 text-gray-600" />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Số lượng</label>
                <input :value="selectedPhieu.quantity || 'XXXXXX'" type="text" readonly
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-gray-50 text-gray-600" />
              </div>
            </div>

            <!-- Cột phải -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Giá xuất</label>
                <input :value="selectedPhieu.price || '$500'" type="text" readonly
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-gray-50 text-gray-600" />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Tình trạng</label>
                <div class="flex items-center gap-2">
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {{ selectedPhieu.status || "Đã duyệt" }}
                  </span>
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Người tạo phiếu</label>
                <input :value="selectedPhieu.creator || 'XXXXXX'" type="text" readonly
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-gray-50 text-gray-600" />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Thời gian</label>
                <input :value="(selectedPhieu.date || '13/11/2025') +
                  ' ' +
                  (selectedPhieu.time || '15:00')
                  " type="text" readonly
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-gray-50 text-gray-600" />
              </div>
            </div>
          </div>

          <!-- Mô tả thêm -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Ghi chú</label>
            <textarea readonly
              class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-gray-50 text-gray-600 h-20"
              placeholder="Không có ghi chú nào..."></textarea>
          </div>
        </div>

        <!-- NÚT HÀNH ĐỘNG -->
        <div class="flex justify-center pt-6 border-t border-gray-200">
          <button @click="closeViewModal"
            class="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg transition shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Đóng
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL XÁC NHẬN XÓA PHIẾU -->
    <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div class="bg-white rounded-2xl p-8 w-[500px] max-w-[90%] relative shadow-2xl">
        <!-- Icon cảnh báo -->
        <div class="flex justify-center mb-4">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        <!-- Tiêu đề -->
        <h2 class="text-2xl font-bold text-gray-900 text-center mb-2">
          Xóa phiếu xuất kho
        </h2>
        <p class="text-gray-600 text-center mb-6">
          Hành động này không thể hoàn tác!
        </p>

        <!-- Thông tin phiếu -->
        <div class="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-sm font-semibold text-gray-700">Mã phiếu:</span>
              <span class="text-sm text-gray-900">{{
                phieuToDelete.code || "XXXXXX"
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm font-semibold text-gray-700">Nguồn nhập:</span>
              <span class="text-sm text-gray-900">{{
                phieuToDelete.supplier || "Nhà cung cấp A"
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm font-semibold text-gray-700">Giá xuất:</span>
              <span class="text-sm text-gray-900">{{
                phieuToDelete.price || "$500"
              }}</span>
            </div>
          </div>
        </div>

        <!-- Câu hỏi xác nhận -->
        <p class="text-center text-gray-700 mb-6">
          Bạn có chắc chắn muốn xóa phiếu xuất kho
          <span class="font-bold text-red-600">{{
            phieuToDelete.code || "XXXXXX"
          }}</span>?
        </p>

        <!-- Nút hành động -->
        <div class="flex gap-3">
          <button @click="showDeleteModal = false"
            class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-3 rounded-lg transition">
            Hủy
          </button>
          <button @click="deletePhieu" :disabled="loading"
            class="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {{ loading ? "Đang xóa..." : "Xóa" }}
          </button>
        </div>

        <!-- Nút đóng X -->
        <button @click="showDeleteModal = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold transition">
          ✕
        </button>
      </div>
    </div>

    <!-- MODAL CẬP NHẬT STATUS -->
    <div v-if="showStatusModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
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
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
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
              <span class="text-sm text-gray-900">{{
                phieuToUpdate.code || "XXXXXX"
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm font-semibold text-gray-700">Nguồn nhập:</span>
              <span class="text-sm text-gray-900">{{
                phieuToUpdate.supplier || "Nhà cung cấp A"
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm font-semibold text-gray-700">Trạng thái hiện tại:</span>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="getStatusClass(phieuToUpdate.status)">
                {{ getStatusLabel(phieuToUpdate.status) }}
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
            <textarea v-model="statusNote" placeholder="Nhập ghi chú về việc thay đổi trạng thái..."
              class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition h-20"></textarea>
          </div>
        </div>

        <!-- NÚT HÀNH ĐỘNG -->
        <div class="flex justify-center gap-4 pt-6 border-t border-gray-200">
          <button @click="closeStatusModal"
            class="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg transition shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Hủy
          </button>

          <button @click="saveStatusUpdate" :disabled="!newStatus || loading"
            class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition shadow-sm disabled:opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {{ loading ? "Đang cập nhật..." : "Cập nhật" }}
          </button>
        </div>
      </div>
    </div>

    <!-- PHÂN TRANG -->
    <div class="flex flex-wrap items-center justify-between px-2 pt-3">
      <p class="text-sm text-gray-600">
        Hiển thị {{ startIndex + 1 }} - {{ endIndex }} trong
        {{ filteredData.length }} dữ liệu
      </p>

      <div class="flex items-center gap-2">
        <button @click="prevPage" :disabled="currentPage === 1"
          class="px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 disabled:opacity-50">
          « Previous
        </button>

        <div class="flex items-center border border-blue-500 rounded-md overflow-hidden">
          <button v-for="page in totalPages" :key="page" @click="currentPage = page" class="px-3 py-2 text-sm" :class="page === currentPage
            ? 'bg-blue-500 text-white'
            : 'text-blue-600 hover:bg-blue-100'
            ">
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
import Loader from "../helper-components/Loader.vue";
import * as api from "../../helper/call-api.js";

const headers = [
  "Mã phiếu",
  "Nguồn nhập",
  "Tên hàng",
  "Số lượng",
  "Giá xuất",
  "Tình trạng",
  "Tên người tạo phiếu",
  "Thời gian",
];
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
    const res = await api.getApi("phieuXuatKho", {
      requiresAuth: true,
    });
    const fetchedData = await res.json();
    // Thêm trường creator cho mỗi item nếu chưa có
    data.value = fetchedData.map((item) => ({
      ...item,
      creator: item.creator || "Nguyễn Văn A",
    }));
  } catch (err) {
    console.error("Fetch error:", err);
    // Dữ liệu mẫu khi không kết nối được API
    data.value = [
      {
        id: 1,
        code: "PX001",
        supplier: "Nhà cung cấp A",
        product: "Sản phẩm A",
        quantity: "100",
        price: "$500",
        status: "approved",
        creator: "Nguyễn Văn A",
        date: "13/11/2025",
        time: "15:00",
      },
      {
        id: 2,
        code: "PX002",
        supplier: "Nhà cung cấp B",
        product: "Sản phẩm B",
        quantity: "200",
        price: "$750",
        status: "pending",
        creator: "Trần Thị B",
        date: "14/11/2025",
        time: "10:30",
      },
      {
        id: 3,
        code: "PX003",
        supplier: "Nhà cung cấp C",
        product: "Sản phẩm C",
        quantity: "150",
        price: "$300",
        status: "approved",
        creator: "Lê Văn C",
        date: "15/11/2025",
        time: "09:15",
      },
    ];
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
  else if (sortLabel.value === "Oldest")
    result = result.sort((a, b) => a.id - b.id);

  return result;
});

// 📄 PHÂN TRANG
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

const nextPage = () =>
  currentPage.value < totalPages.value && currentPage.value++;
const prevPage = () => currentPage.value > 1 && currentPage.value--;

// 📋 MENU
const toggleRowMenu = (index) => {
  paginatedData.value.forEach(
    (row, i) => (row.showMenu = i === index ? !row.showMenu : false)
  );
};

// ✏️ Chức năng mẫu
const editRow = (row) => alert(`Sửa phiếu: ${row.code}`);
const deleteRow = (id) => alert(`Xóa phiếu ID: ${id}`);
const showModal = ref(false);
const showViewModal = ref(false);
const showDeleteModal = ref(false);
const showStatusModal = ref(false);
const selectedPhieu = ref({});
const phieuToDelete = ref({});
const phieuToUpdate = ref({});
const newStatus = ref("");
const statusNote = ref("");

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

// Xem chi tiết phiếu xuất
const viewPhieu = (phieu) => {
  selectedPhieu.value = { ...phieu };
  showViewModal.value = true;
};

// Đóng modal xem chi tiết
const closeViewModal = () => {
  showViewModal.value = false;
  selectedPhieu.value = {};
};

// Cập nhật trạng thái phiếu xuất
const updateStatus = (phieu) => {
  phieuToUpdate.value = { ...phieu };
  newStatus.value = "";
  statusNote.value = "";
  showStatusModal.value = true;
  // Đóng menu dropdown
  phieu.showMenu = false;
};

// Đóng modal cập nhật status
const closeStatusModal = () => {
  showStatusModal.value = false;
  phieuToUpdate.value = {};
  newStatus.value = "";
  statusNote.value = "";
};

// Lưu cập nhật trạng thái
const saveStatusUpdate = async () => {
  try {
    loading.value = true;

    // TODO: Call API to update status
    // await updatePhieuStatusAPI(phieuToUpdate.value.id, newStatus.value, statusNote.value);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update status in data array
    const index = data.value.findIndex(
      (item) => item.id === phieuToUpdate.value.id
    );
    if (index > -1) {
      data.value[index].status = newStatus.value;
    }

    closeStatusModal();
  } catch (error) {
    console.error("Lỗi cập nhật trạng thái:", error);
    alert("Có lỗi xảy ra khi cập nhật trạng thái!");
  } finally {
    loading.value = false;
  }
};

// Helper functions for status
const getStatusLabel = (status) => {
  const statusMap = {
    pending: "Chờ duyệt",
    approved: "Đã duyệt",
    rejected: "Từ chối",
    blocked: "Bị khóa",
  };
  return statusMap[status] || status;
};

const getStatusClass = (status) => {
  const classMap = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    blocked: "bg-gray-100 text-gray-800",
  };
  return classMap[status] || "bg-gray-100 text-gray-800";
};

// Format price to Vietnamese Dong
const formatPrice = (price) => {
  if (!price) return "500.000 VNĐ";

  // Remove $ and convert to number
  let numericPrice = price.toString().replace(/[$,]/g, "");
  numericPrice = parseFloat(numericPrice);

  if (isNaN(numericPrice)) return "500.000 VNĐ";

  // Convert USD to VND (approximate rate 1 USD = 24,000 VND)
  const vndAmount = Math.round(numericPrice * 24000);

  // Format with thousand separators
  return vndAmount.toLocaleString("vi-VN") + " VNĐ";
};

// Xác nhận xóa phiếu
const confirmDeletePhieu = (phieu) => {
  phieuToDelete.value = { ...phieu };
  showDeleteModal.value = true;
  // Đóng menu dropdown
  phieu.showMenu = false;
};

// Xóa phiếu xuất
const deletePhieu = async () => {
  try {
    loading.value = true;
    // TODO: Call API to delete phieu
    // await deletePhieuAPI(phieuToDelete.value.id);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Remove from data array
    const index = data.value.findIndex(
      (item) => item.id === phieuToDelete.value.id
    );
    if (index > -1) {
      data.value.splice(index, 1);
    }

    showDeleteModal.value = false;
    phieuToDelete.value = {};
  } catch (error) {
    console.error("Lỗi xóa phiếu:", error);
    alert("Có lỗi xảy ra khi xóa phiếu xuất kho!");
  } finally {
    loading.value = false;
  }
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
