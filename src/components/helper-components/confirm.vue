<script setup>
import {ref, defineProps, defineEmits} from 'vue'
const isConfirm = ref(false);
const emit = defineEmits(['confirm']);
const props = defineProps({
    message:{
        type: String,   
    },

    btnYesColor: {
    type: Object,
    default: () => ({
      color: '[#de1a1a]',
      hover: 'red-700',
      text: 'white'
    })
  },
  btnCancelColor: {
    type: Object,
    default: () => ({
      color: '[#12ae39]',
      hover: 'green-700',
      text: 'white'
    })
  }

});

function sendConfirm () {
    emit("confirm", isConfirm.value);
}
</script>
<template>
    <div class="w-full grid grid-cols-1 place-items-center mb-5">
    <div class=" bg-white drop-shadow-2xl rounded-xl p-6 flex-col justify-center">
        <h1 class="text-xl mb-3">{{ message }}</h1>
        <div class="flex justify-end gap-4">
            <button @click="isConfirm = true, sendConfirm()" 
            :class="`bg-${props.btnYesColor.color } hover:bg-${props.btnYesColor.hover} rounded-lg p-3 text-${props.btnYesColor.text} cursor-pointer transition-colors duration-300 ease-in-out`">
                Có
            </button>
            <button @click="isConfirm = false, sendConfirm()" 
            :class="`bg-${props.btnCancelColor.color} hover:bg-${props.btnCancelColor.hover} rounded-lg p-3 text-${props.btnCancelColor.text} cursor-pointer transition-colors duration-300 ease-in-out`">
                Hủy
            </button>
        </div>
        
    </div>
    </div>
</template>