<template>
  <div class="flex">
    <!-- Sidebar -->
    <aside :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      class="fixed top-0 left-0 z-40 w-64 h-screen bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out">
      <div class="flex justify-end p-3 sm:hidden">
        <button @click="toggleSidebar" class="text-gray-600 hover:text-gray-900">
          <span class="material-icons text-2xl">close</span>
        </button>
      </div>
      <div class="h-full px-3 py-4 overflow-y-auto">
        <a href="/" class="flex items-center ps-2.5 mb-5">
          <img src="/public/logo.png" class="h-20  " alt="dau Logo" />
          <span class="self-center text-lg font-semibold">Công ty Bấu De</span>
        </a>

        <!-- Menu -->
        <ul class="space-y-2 font-medium">
          <li>
            <a href="/" class="flex items-center p-2 text-[#7A8699] rounded-lg hover:bg-[#E5F2FF] group">
              <span class="material-icons w-5 h-5 text-[#7A8699] group-hover:text-[#007AFF]">home</span>
              <span class="ms-3">Trang chủ</span>
            </a>
          </li>
          <li>
            <routerLink to="/supplier" class="flex items-center p-2 text-[#7A8699] rounded-lg hover:bg-[#E5F2FF] group">
              <span class="material-icons w-5 h-5 text-[#7A8699] group-hover:text-[#007AFF]">
                business
              </span>
              <span class="ms-3">Nhà cung cấp</span>
            </routerLink>
          </li>
          <li>
            <routerLink to="/xuatKho" class="flex items-center p-2 text-[#7A8699] rounded-lg hover:bg-[#E5F2FF] group">
              <span class="material-icons w-5 h-5 text-[#7A8699] group-hover:text-[#007AFF]">
                assignment
              </span>
              <span class="ms-3">Tạo phiếu xuất</span>
            </routerLink>
          </li>
          <li>
            <routerLink to="/nhapKho" class="flex items-center p-2 text-[#7A8699] rounded-lg hover:bg-[#E5F2FF] group">
              <span class="material-icons w-5 h-5 text-[#7A8699] group-hover:text-[#007AFF]">
                file_download
              </span>
              <span class="ms-3">Tạo phiếu nhập</span>
            </routerLink>
          </li>
          <li>
             <routerLink to="/loaiHangHoa" class="flex items-center p-2 text-[#7A8699] rounded-lg hover:bg-[#E5F2FF] group">
              <span class="material-icons w-5 h-5 text-[#7A8699] group-hover:text-[#007AFF]">
                category
              </span>
              <span class="ms-3">Loại hàng hóa</span>
            </routerLink>
          </li>
          <li>
            <router-link to="/hangHoa" class="flex items-center p-2 text-[#7A8699] rounded-lg hover:bg-[#E5F2FF] group">
              <span class="material-icons w-5 h-5 text-[#7A8699] group-hover:text-[#007AFF]">inventory</span>
              <span class="ms-3">Hàng Hóa</span>
            </router-link>
          </li>
          <li>
            <router-link to="/User" class="flex items-center p-2 text-[#7A8699] rounded-lg hover:bg-[#E5F2FF] group">
              <span class="material-icons w-5 h-5 text-[#7A8699] group-hover:text-[#007AFF]">group</span>
              <span class="ms-3">Nhân viên</span>
            </router-link>
          </li>
          <li>
            <a href="#" class="flex items-center p-2 text-[#7A8699] rounded-lg hover:bg-[#E5F2FF] group">
              <span class="material-icons w-5 h-5 text-[#7A8699] group-hover:text-[#007AFF]">
                person
              </span>
              <span class="ms-3">Trang tài khoản</span>
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center p-2 text-[#7A8699] rounded-lg hover:bg-[#E5F2FF] group">
              <span class="material-icons w-5 h-5 text-[#7A8699] group-hover:text-[#007AFF]">bar_chart</span>
              <span class="ms-3">Thống kê, báo cáo</span>
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center p-2 text-[#7A8699] rounded-lg hover:bg-[#E5F2FF] group">
              <span class="material-icons w-5 h-5 text-[#7A8699] group-hover:text-[#007AFF]">upload_file</span>
              <span class="ms-3">Xuất, nhập file</span>
            </a>
          </li>
          <li>
            <router-link to="/phanQuyen" class="flex items-center p-2 text-[#7A8699] rounded-lg hover:bg-[#E5F2FF] group">
              <span class="material-icons w-5 h-5 text-[#7A8699] group-hover:text-[#007AFF]">admin_panel_settings</span>
              <span class="ms-3">Phân Quyền</span>
            </router-link>
          </li>
        </ul>
      </div>
    </aside>
    <div v-if="sidebarOpen && windowWidth <= 600" @click="toggleSidebar"
      class="fixed inset-0 bg-white bg-opacity-40 sm:hidden z-10">
    </div>
    <!-- Main Content -->
    <div :class="sidebarOpen ? 'sm:ml-64 w-[calc(100%-16rem)]' : 'ml-0 w-full'" class="flex-1 transition-all">
      <!-- Header -->
      <header :class="sidebarOpen ? 'sm:w-[calc(100%-16rem)]' : 'w-full'"
        class="fixed top-0 z-30 flex items-center justify-between  px-6 py-4  h-[80px] transition-all">
        <!-- Left -->
        <div class="flex items-center gap-4">
          <button @click="toggleSidebar" class="text-gray-600 p-2">
            <span class="material-icons text-3xl">menu</span>
          </button>
          <h1 class="font-extrabold text-2xl text-gray-900 select-none">Trang chủ</h1>
        </div>

        <!-- Search -->
        <div v-if="windowWidth > 600">
          <div class="flex-grow flex justify-center mx-6">
            <div class="relative w-[400px] max-w-full">
              <input type="text" placeholder="Tìm kiếm..."
                class="w-full rounded-xl border border-gray-300 py-3 pl-4 pr-12 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-300" />
              <button class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">
                <span class="material-icons">search</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Right icons + user -->
        <div class="flex items-center gap-5">
          <button class="relative text-gray-600 hover:text-gray-800">
            <span class="material-icons">notifications</span>
            <span
              class="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold ring-2 ring-white">23</span>
          </button>

          <button class="relative text-gray-600 hover:text-gray-800">
            <span class="material-icons">email</span>
            <span
              class="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold ring-2 ring-white">68</span>
          </button>

          <button class="relative text-gray-600 hover:text-gray-800">
            <span class="material-icons">calendar_today</span>
            <span
              class="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold ring-2 ring-white">14</span>
          </button>

          <!-- User -->
          <!-- <div class="flex items-center gap-2 ml-2 cursor-pointer">
            <div class="text-right">
              <p class="text-sm font-semibold text-gray-800">Nguyễn Đức Thắng</p>
              <p class="text-xs text-gray-500">CIO</p>
            </div>
            <img src="/public/logo.png" class="w-10 h-10 rounded-full shadow-md" alt="user avatar" />
            <span class="material-icons text-gray-400">expand_more</span>
          </div> -->
          <dropDownUser />
        </div>
      </header>

      <!-- Page Content -->
      <main class="pt-[90px] px-6 transition-all duration-300 ease-in-out">
        <slot></slot>
      </main>
    </div>
  </div>
</template>
<script setup>
import slidebar_navbar from './Slidebar_Navbar.js';
import dropDownUser from '../users/dropDownUser.vue'
const { sidebarOpen, windowWidth, toggleSidebar } = slidebar_navbar()

</script>