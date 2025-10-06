<template>
  <router-link
    :to="to"
    class="inline-flex items-center gap-2 font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-200"
    :class="[
      color === 'blue' ? 'bg-blue-600 hover:bg-blue-900 text-white' :
      color === 'gray' ? 'bg-gray-300 hover:bg-gray-400 text-black' :
      color === 'red' ? 'bg-red-600 hover:bg-red-700 text-white' :
      'bg-blue-600 hover:bg-blue-700 text-white'
    ]"
  >
    <span class="material-icons w-5 h-5 text-[#ffffff] ">home</span>
    {{ label }}
  </router-link>
</template>

<script setup>
const props = defineProps({
  to: { type: String, default: '/' },        
  label: { type: String, default: 'Trở về trang chủ' }, 
  color: { type: String, default: 'blue' }   
})
</script>
