<template>
  <router-link
    :to="to"
    class="inline-flex items-center gap-2 font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-200"
    :class="[

      color === 'blue' ? 'bg-blue-600 hover:bg-blue-900 text-white' :
      color === 'blue' ? 'bg-blue-600 hover:bg-blue-700 text-white' :

      color === 'gray' ? 'bg-gray-300 hover:bg-gray-400 text-black' :
      color === 'red' ? 'bg-red-600 hover:bg-red-700 text-white' :
      'bg-blue-600 hover:bg-blue-700 text-white'
    ]"
  >

    <span class="material-icons w-5 h-5 text-[#ffffff] ">home</span>

    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
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
