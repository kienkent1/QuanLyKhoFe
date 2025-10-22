<template>
    <div class="flex flex-wrap items-center justify-between px-2 pt-3">
      <p class="text-sm text-gray-600">
        Hiển thị {{ startIndex + 1 }} - {{ endIndex }} trong số {{ totalItems }} dữ liệu
      </p>
  
      <div class="flex items-center gap-2">
        <button
          @click="$emit('prev')"
          :disabled="currentPage === 1"
          class="px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 disabled:opacity-50 flex items-center gap-1"
        >
          « Previous
        </button>
  
        <div class="flex items-center border border-blue-500 rounded-md overflow-hidden">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="$emit('page-change', page)"
            class="px-3 py-2 text-sm"
            :class="page === currentPage ? 'bg-blue-500 text-white' : 'text-blue-600 hover:bg-blue-100'"
          >
            {{ page }}
          </button>
        </div>
  
        <button
          @click="$emit('next')"
          :disabled="currentPage === totalPages"
          class="px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 disabled:opacity-50 flex items-center gap-1"
        >
          Next »
        </button>
      </div>
    </div>
  </template>
  
  <script setup >
  defineProps({
    currentPage: Number,
    totalPages: Number,
    startIndex: Number,
    endIndex: Number,
    totalItems: Number
  });
  
  defineEmits(['page-change', 'next', 'prev']);
  </script>
  