<template>
    <button type="button"
            @click="startLogin"
            class="w-full relative flex items-center justify-center gap-2 mt-3
              border-2 border-gray-300 rounded-lg py-2.5 bg-white 
              shadow-[0px_8px_12px_rgba(0,0,0,0.15)] 
              transition-all duration-300 
              hover:shadow-[0px_10px_15px_rgba(0,0,0,0.25)] 
              hover:-translate-y-0.5 active:scale-95">
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google"
              class="w-5 h-5 absolute left-4" />
            <span class="text-blue-700 font-medium"><slot></slot></span>
          </button>
</template>
<script setup>
import { useGoogleOAuth  } from './GetIdTokenGG'
import { defineEmits } from 'vue'

const emit = defineEmits(['success', 'error'])
const { startLogin } = useGoogleOAuth ({
  onSuccess: (idToken) => emit('success', idToken),
  onError: (err) => emit('error', err)
})
</script>