<template>
  <div class=" flex justify-center p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
      <!-- LEFT: EXPORT SECTION -->
      <div class="bg-white shadow rounded-2xl p-6 flex flex-col">
        <label class="font-medium mb-2">Nhập tên file</label>
        <input
          type="text"
          placeholder="Nhập tên file của bạn"
          class="border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
        />

        <label class="font-medium mb-2">Thông tin file</label>
        <textarea
          placeholder="Thông tin abc"
          rows="5"
          class="border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
        ></textarea>

        <button
          class="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition mb-4 self-start"
        >
          Export
        </button>

        <!-- FILE PROGRESS -->
        <div class="border border-gray-200 rounded-xl flex items-center p-3">
          <div class="text-blue-500 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5l9-4.5 9 4.5m-9 13.5V3" />
            </svg>
          </div>
          <div class="flex-1">
            <p class="font-medium text-gray-800 text-sm">Products.xls</p>
            <div class="h-2 bg-gray-200 rounded-full mt-1">
              <div class="h-2 bg-blue-500 rounded-full" style="width: 100%"></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">30 MB &nbsp; 100%</p>
          </div>
          <div class="text-green-500 ml-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        </div>
      </div>

      <!-- RIGHT: IMPORT SECTION -->
      <div class="bg-white shadow rounded-2xl p-6 flex flex-col">
        <label class="font-medium mb-2">Tải tệp lên</label>
        <div
          class="flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 p-10 text-center mb-4 hover:border-blue-300 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-gray-400 mb-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <p class="text-blue-500 text-sm">Tải tệp lên chỉ</p>
          <button class="mt-3 border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-gray-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>

        <button
          class="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition mb-4 self-start"
        >
          Import
        </button>

        <!-- FILE PROGRESS -->
        <div class="border border-gray-200 rounded-xl flex items-center p-3">
          <div class="text-blue-500 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5l9-4.5 9 4.5m-9 13.5V3" />
            </svg>
          </div>
          <div class="flex-1">
            <p class="font-medium text-gray-800 text-sm">PhoneList.xls</p>
            <div class="h-2 bg-gray-200 rounded-full mt-1">
              <div class="h-2 bg-blue-500 rounded-full" style="width: 100%"></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">15 MB &nbsp; 65%</p>
          </div>
          <div class="text-red-500 ml-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// purely UI, no logic for now
</script>
