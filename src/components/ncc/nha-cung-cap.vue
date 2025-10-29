<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive, watch } from 'vue';
import pagination from '../helper-components/pagination.vue';
import { vOnClickOutside } from '@vueuse/components'
import themNhaCungCap from './them-nha-cung-cap.vue';
import {getNCC, deleteNcc} from './nha-cung-cap.js'
import Loader from '../helper-components/loader.vue';
import updateNCC from './update-ncc.vue';
import confirm from '../helper-components/confirm.vue';

const result = reactive({
  message:'',
  success: null,
});
const open = ref(false);
const selected = ref('↓ Mới nhất');
const modalThem = ref(false);
const modalUpdate = ref(false);
const modalBox = ref(null);
const listData = ref(null);
//pagination & params-----------
const currentPage = ref(1)
const totalPages = ref(1)
const totalItems = ref(1)
const params = ref({
  query:'',
  page: 1,
  pageSize: 6,
  FieldName:'createAt',
  Isdesc: false,
  FilterName:'',
  FilterValue:'',
});

const handlePageChange = (page) => {
  currentPage.value = page
  params.value.page = page
  loadData();
}

const handlePrev = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    handlePageChange(currentPage.value)
  }
}

const handleNext = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    handlePageChange(currentPage.value)
  }
}
//end pagination & params----------

const idNCC = ref(0);
const confirmModal = ref(false);


//delete ncc-------------
const idNCCToDelete = ref(0);
const deleteAndConfirm = async (e) => {

  if(e === true && idNCCToDelete.value > 0){
    const res = await deleteNcc(idNCCToDelete.value);
    if(res.data.success === true){
      result.message = 'Xóa nhà cung cấp thành công';
    result.success = true;

    await loadData();
    if (listData.value.length === 0 && currentPage.value > 1) {
        currentPage.value--;
        await loadData(); 
      }
    }
  }
  else{
    result.message = 'Đã hủy xóa nhà cung cấp';
    result.success = false;
  }
  confirmModal.value = false;
  idNCCToDelete.value = 0;
}
watch(
  () => result.message,
  (newVal) => {
    if (newVal) {
      // sau 3 giây xóa message
      setTimeout(() => {
        result.message = ''
        result.success = null
      }, 3000)
    }
  }
)
//end delete ncc-------------

//get data----------
const loadData = async() => {
  const res = await getNCC(params.value);
  listData.value = res?.data.data;
  totalItems.value = res?.data.data.totalItems;
  totalPages.value = res?.data.data.totalPages;
};

onMounted(() => {
  loadData();
});
//end --------------

//kéo thả modal---------
const position = ref({ x: 10, y: 0 })
const dragging = ref(false)
const offset = ref({ x: 0, y: 0 })

const startDrag = (e) => {
  dragging.value = true
  offset.value = {
    x: e.clientX - position.value.x,
    y: e.clientY - position.value.y,
  }
}

const stopDrag = () => {
  dragging.value = false
}

const onDrag = (e) => {
  if (dragging.value) {
    position.value = {
      x: e.clientX - offset.value.x,
      y: e.clientY - offset.value.y,
    }
  }
}
//end kéo thả-------------
const isModalResize = ref(false);

const checkModalResize = (url) => {
  isModalResize.value = !!url;
}

function search (){
loadData();
}

//Mobile--------------
const width = ref(window.innerWidth);
const height = ref(window.innerHeight);
const isMobile = ref(false);

function updateSize() {
  width.value = window.innerWidth
  height.value = window.innerHeight
}

const checkMobile = () => {
  if(width.value < 770){
    isMobile.value = true;
    position.value.x = 10;
  }
  else{
    isMobile.value = false;
    position.value.x = 600;
  }
}

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', updateSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSize)
})

watch([width, height], ([newW, newH]) => {
  //console.log(`📏 Kích thước thay đổi: ${newW} x ${newH}`)
  if(newW > 770){
    isMobile.value = false;
  }else{
    isMobile.value = true;
  }
})
//end mobile----------
</script>
<template>
  <div v-if="modalThem" class="fixed inset-0 z-50 flex items-center justify-center">
    <div
      class="relative cursor-move"
      ref="modalBox"
      @mousedown="startDrag"
      @mouseup="stopDrag"
      @mousemove="onDrag"
      :style="{ top: position.y + 'px', left: position.x + 'px', position: 'absolute' }"
    >
      <!-- Nút đóng -->

      <button v-if="isModalResize" @click="modalThem = false, isModalResize = false"
        class="absolute top-1/9 left-11/12 text-gray-500 hover:text-gray-700 text-xl"
      >
        ✕
      </button>
      <button v-else @click="modalThem = false, isModalResize = false"
        class="absolute top-38 left-165 text-gray-500 hover:text-gray-700 text-xl"
      >
        ✕
      </button>

      <!-- Modal chính -->
      <themNhaCungCap @updatePreview="checkModalResize" />
    </div>
  </div>
  <div class="relative grid grid-cols-1 place-items-center  ">
    <div v-if="confirmModal" class=" fixed top-20 z-50">
    <confirm :message="'Bạn có chắc muốn xóa nhà cung cấp này?'" @confirm = "deleteAndConfirm"/>
    <button @click="confirmModal= false, idNCC = 0"
        class="absolute top-0 left-99 text-gray-500 hover:text-gray-700 text-sm cursor-pointer"
      >
        ✕
      </button>
  </div>
  </div>
  
  <div class="flex mt-4  gap-5 relative">
    
    <div class="w-50 flex-auto relative  ">
      <input v-model="params.query" @keyup.enter="search(params.q)" class="w-full border-0 rounded-md shadow-md focus:outline-gray-400" type="text" placeholder="Tìm kiếm nhà cung cấp ">
      <span class="absolute right-2 top-2">
        <svg class="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
      </svg>
      </span>

    </div>
    <div class="w-30 flex flex-auto justify-end gap-3">
      <!-- btn nhà cung cấp -->
      <div class="relative">
        <button @click="modalThem = !modalThem" class=" rounded-md h-auto p-2 bg-white shadow-md hover:bg-gray-200 transition-colors duration-300 ease-in-out"> 
       <span class="flex justify-around">
        <svg class="w-6  h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clip-rule="evenodd"/>
      </svg>
      <span class="">thêm nhà cung cấp</span>
        
      </span>
          
      </button>
      
      </div>
      
      <!-- dropdown -->
      <div class="relative overflow-visible" v-on-click-outside="() => (open = false)">

        <button class="h-10 w-25 shadow-md rounded-md bg-white hover:bg-gray-200 transition-colors duration-300 ease-in-out " @click="open = !open">
          {{ selected }}
          <span v-if="open" class="text-gray-600">▴</span>
            <span v-else class="text-gray-600">▾</span>
        </button>

        <ul class="bg-white mt-1 absolute left-0  pt-2 w-full shadow-xl rounded-md pb-2  z-10" v-if="open">
          <li @click="selected = '↓ Mới nhất', open = false, params.FieldName = 'createAt', params.Isdesc = true, loadData()" class="pl-2 hover:bg-gray-200 transition-colors duration-300 ease-in-out">↓ Mới nhất  </li>
          <li @click="selected = '↑ Cũ nhất', open = false, params.FieldName = 'createAt', params.Isdesc = false, loadData()" class="pl-2 hover:bg-gray-200 transition-colors duration-300 ease-in-out">↑ Cũ nhất</li>
        </ul>
      </div>

    </div>

  </div>

  

<!-- Phần danh sách data for desktop -->
  <div v-if="listData && isMobile === false" class="w-full mt-4 mb-5">
    <p v-if="result.message && result.success === false " class="text-red-600 bg-red-100 p-2 mb-2 rounded-xl">{{ result.message }}</p>
    <p v-if="result.message && result.success === true" class="text-green-600 p-2 mb-2 rounded-md bg-green-100">{{ result.message }}</p>
    <div v-for="item in listData.data" :key="item.maNCC" class="bg-white shadow-lg rounded-lg grid grid-cols-5 gap-4 mb-3">
      <!-- thông tin ncc -->
      <div class=" p-3">
        <p class="bg-[#E5F2FF] text-[#007AFF] p-1 rounded-lg">Mã nhà cung cấp: {{ item.maNCC }}</p>
        <h3 class="font-bold">Tên NCC: {{ item.tenNCC }}</h3>
        <p class="text-[#7A8699]">Thời gian: {{ new Date(item.createAt).toLocaleDateString('vi-VN') }}</p>
      </div>
      <!-- Thông tin liên hệ -->
      <div class="p-3 ">
        <h3 class="font-bold">Thông tin liên hệ</h3>
        <p class="text-[#7A8699]">Email: {{ item.email }}</p>
        <p class="text-[#7A8699]">Diện thoại: {{ item.dienThoai }}</p>
      </div>
      <!-- Logo -->
      <div class="p-3 ">
        <h3 class="font-bold text-center">Logo</h3>
        <img class="h-12 mx-auto block" :src="item.hinhAnh === null ? 'src/assets/NoImg.png': item.hinhAnh " >
      </div>
    
    <!-- btns -->
    <div class="p-3 flex h-8/12 place-self-center gap-3   col-span-2">
      <!-- Edit -->
      <button @click="idNCC = item.maNCC, modalUpdate = true" class="bg-[#4182F9] rounded-md p-2 text-white  flex items-center hover:bg-[#2975FF] transition-colors duration-300 ease-in-out gap-2">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
        <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
      </svg>
        <span>Chỉnh sửa</span>
        
      </button>
      <!-- xem -->
      <button @click="idNCC = item.maNCC, modalUpdate = true" class="bg-[#12ae39] rounded-md p-2 text-white  flex items-center hover:bg-[#2BA449] transition-colors duration-300 ease-in-out gap-2">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
        <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
      </svg>

        <span>Xem</span>
        
      </button>
      <!-- Delete -->
      <button @click="confirmModal = true, idNCCToDelete = item.maNCC" 
  class="bg-[#de1a1a] rounded-md p-2 text-white  flex items-center hover:bg-[#DA2727] transition-colors duration-300 ease-in-out gap-2">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15v3c0 .5523.44772 1 1 1h16c.5523 0 1-.4477 1-1v-3M3 15V6c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v9M3 15h18M8 15v4m4-4v4m4-4v4m-5.5061-7.4939L12 10m0 0 1.5061-1.50614M12 10l1.5061 1.5061M12 10l-1.5061-1.50614"/>
      </svg>


        <span>Xóa</span>
        
      </button>
      </div>
    
    </div>
    <pagination
    :currentPage="currentPage"
    :totalPages="totalPages"
    :totalItems="totalItems"
    @page-change="handlePageChange"
    @next="handleNext"
    @prev="handlePrev"/>
  </div>
   <!-- End danh sách for desktop-->
    <!-- --------------------------------------------------------------------------------------------- -->
   <!-- Danh sách for mobile -->
  <div v-else-if="listData && isMobile === true" class="w-full mt-4 mb-5">
    <p v-if="result.message && result.success === false " class="text-red-600 bg-red-100 p-2 mb-2 rounded-xl">{{ result.message }}</p>
    <p v-if="result.message && result.success === true" class="text-green-600 p-2 mb-2 rounded-md bg-green-100">{{ result.message }}</p>
    <div v-for="item in listData.data" :key="item.maNCC" class="bg-white shadow-lg rounded-lg grid grid-rows-4 gap-4 mb-3">
      <!-- thông tin ncc -->
      <div class=" p-2">
        <p class="bg-[#E5F2FF] text-[#007AFF] p-1 rounded-lg text-center">Mã nhà cung cấp: {{ item.maNCC }}</p>
        <h3 class="font-bold text-center">Tên NCC: {{ item.tenNCC }}</h3>
        <p class="text-[#7A8699] text-center">Thời gian: {{ new Date(item.createAt).toLocaleDateString('vi-VN') }}</p>
      </div>
      <!-- Thông tin liên hệ -->
      <div class="p-2 ">
        <h3 class="font-bold text-center">Thông tin liên hệ</h3>
        <p class="text-[#7A8699] text-center">Email: {{ item.email }}</p>
        <p class="text-[#7A8699] text-center">Diện thoại: {{ item.dienThoai }}</p>
      </div>
      <!-- Logo -->
      <div class="p-2 ">
        <h3 class="font-bold text-center">Logo</h3>
        <img class="h-12 mx-auto block" :src="item.hinhAnh === null ? 'src/assets/NoImg.png': item.hinhAnh " >
      </div>
    
    <!-- btns -->
    <div class="p-2 flex h-8/12 place-self-center gap-3 ">
      <!-- Edit -->
      <button @click="idNCC = item.maNCC, modalUpdate = true" class="bg-[#4182F9] rounded-md p-2 text-white  flex items-center hover:bg-[#2975FF] transition-colors duration-300 ease-in-out gap-2">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
        <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
      </svg>
        <span>Chỉnh sửa</span>
        
      </button>
      <!-- xem -->
      <button @click="idNCC = item.maNCC, modalUpdate = true" class="bg-[#12ae39] rounded-md p-2 text-white  flex items-center hover:bg-[#2BA449] transition-colors duration-300 ease-in-out gap-2">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
        <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
      </svg>

        <span>Xem</span>
        
      </button>
      <!-- Delete -->
      <button @click="confirmModal = true, idNCCToDelete = item.maNCC" 
  class="bg-[#de1a1a] rounded-md p-2 text-white  flex items-center hover:bg-[#DA2727] transition-colors duration-300 ease-in-out gap-2">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15v3c0 .5523.44772 1 1 1h16c.5523 0 1-.4477 1-1v-3M3 15V6c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v9M3 15h18M8 15v4m4-4v4m4-4v4m-5.5061-7.4939L12 10m0 0 1.5061-1.50614M12 10l1.5061 1.5061M12 10l-1.5061-1.50614"/>
      </svg>


        <span>Xóa</span>
        
      </button>
      </div>
    
    </div>
    <pagination
    :currentPage="currentPage"
    :totalPages="totalPages"
    :totalItems="totalItems"
    @page-change="handlePageChange"
    @next="handleNext"
    @prev="handlePrev"/>
  </div>
  <!-- End danh sách mobile -->
  <div v-else-if="!listData && params.query !== ''" class="content-center w-full">
    <h1 class="text-[#737373] font-semibold mt-5 text-xl">Không tìm thấy kết quả cho: <b class="text-black">{{ params.query }}</b></h1>
  </div>
  <div v-else class="mt-5 flex justify-center items-center">
    <Loader/>
  </div>
  
   <!-- End danh sách-->
   <div v-if="modalUpdate && idNCC > 0" class="fixed inset-0 z-50 flex items-center justify-center">
    <div
      class="relative cursor-move"
      ref="modalBox"
      @mousedown="startDrag"
      @mouseup="stopDrag"
      @mousemove="onDrag"
      :style="{ top: position.y + 'px', left: position.x + 'px', position: 'absolute' }"
    >
      <!-- Nút đóng -->

      <button v-if="isModalResize" @click="modalUpdate = false, idNCC = 0, isModalResize = false"
        class="absolute top-1/9 left-11/12 text-gray-500 hover:text-gray-700 text-xl"
      >
        ✕
      </button>
      <button v-else @click="modalUpdate = false, idNCC = 0, isModalResize = false"
        class="absolute top-38 left-165 text-gray-500 hover:text-gray-700 text-xl"
      >
        ✕
      </button>

      <!-- Modal chính -->
      <updateNCC :id = "idNCC" @updatePreview="checkModalResize"/>
    </div>
  </div>

  
   
</template>