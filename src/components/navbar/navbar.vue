<script setup></script>

<template>
  <header class="flex items-center justify-between bg-white px-8 py-4 shadow-sm border-b border-gray-100 h-[80px]">

    <div class="flex items-center gap-4">
      <button class="text-gray-600 p-2 focus:outline-none">
        <span class="material-icons text-3xl">menu</span> 
      </button>
      <h1 class="font-extrabold text-3xl text-gray-900 select-none">Spending List</h1>
    </div>

    <div class="flex-grow"></div> 
    
    <div class="mx-6">
      <div class="relative w-[500px] max-w-full">
        <input
          type="text"
          placeholder="Search here..."
          class="w-full rounded-xl border border-gray-300 py-3 pl-4 pr-12 text-base shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
          style="height: 52px; background-color: #ffffff;"
        />
        <button class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">
          <span class="material-icons">search</span>
        </button>
      </div>
    </div>

    <div class="flex items-center gap-6"> 
      
      <div class="flex items-center gap-6">
        
        <button class="relative text-gray-600 p-1 hover:text-gray-800">
          <svg class="w-6 h-6 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.193-.538 1.193H5.538c-.538 0-.538-.6-.538-1.193 0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365Zm-8.134 5.368a8.458 8.458 0 0 1 2.252-5.714m14.016 5.714a8.458 8.458 0 0 0-2.252-5.714M8.54 17.901a3.48 3.48 0 0 0 6.92 0H8.54Z"/>
          </svg>
          <span class="absolute top-[-5px] right-[-5px] bg-blue-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold ring-2 ring-white">23</span>
        </button>

        <button class="relative text-gray-600 p-1 hover:text-gray-800">
          <svg class="w-6 h-6 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z"/>
          </svg>
          <span class="absolute top-[-5px] right-[-5px] bg-green-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold ring-2 ring-white">68</span>
        </button>

        <button class="relative text-gray-600 p-1 hover:text-gray-800">
          <svg class="w-6 h-6 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
          </svg>
          <span class="absolute top-[-5px] right-[-5px] bg-gray-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold ring-2 ring-white">14</span>
        </button>
      </div>

      <div class="flex items-center gap-2 ml-2 cursor-pointer">
        <div class="text-right leading-snug">
          <p class="text-base font-semibold text-gray-800">Designluch</p>
          <p class="text-xs text-gray-500">Super Admin</p>
        </div>

        <div class="flex items-center gap-1">
          <div 
            class="w-11 h-11 rounded-xl flex items-center justify-center shadow-md overflow-hidden" 
            style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(200, 200, 200, 0.3)); border: 1px solid rgba(255, 255, 255, 0.4);"
          >
            <div class="text-3xl" style="color: rgba(255, 255, 255, 0.8); text-shadow: 0 0 5px rgba(0, 0, 0, 0.2);">
              😊
            </div>
          </div>
          
          <svg class="w-4 h-4 text-gray-400 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
          </svg>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
</style>