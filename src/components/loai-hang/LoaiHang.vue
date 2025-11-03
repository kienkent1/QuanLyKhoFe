<script setup>
import { ref, reactive, onMounted } from "vue";
const input = ref("hello");
const obj = ref({
  input1: "",
  input2: "",
});
function ThongBao() {
  alert(`ref: ${obj.value.input1}, reactive: ${obj2.input3}`);
}
const obj2 = reactive({
  input3: "",
});

const openModal = ref(false);

const fakeData = [
  { id: 1, name: "Dâu", age: 18, sex: 1 },
  { id: 2, name: "Tí đũ", age: 18, sex: "female" },
  { id: 3, name: "Bình", age: 18, sex: "gay" },
];

const getData = (name, age) => {
  alert(`name: ${name}, age: ${age}`);
};
</script>

<template>
  <div class="w-full mb-3">
    <div class="flex gap-3">
      <input
        @keyup.enter="ThongBao()"
        v-model="obj.input1"
        class="border-0 shadow-md rounded-lg"
        type="text"
        placeholder="Tìm kiếm loại 1"
      />

      <input
        v-model="obj.input2"
        class="border-0 shadow-md rounded-lg"
        type="text"
        placeholder="Tìm kiếm loại 2"
      />

      <input
        v-model="obj2.input3"
        class="border-0 shadow-md rounded-lg"
        type="text"
        placeholder="Tìm kiếm loại 3"
      />
      <p>{{ obj.input1 }} - {{ obj.input2 }} - {{ obj2.input3 }}</p>
    </div>

    <button @click="ThongBao()" class="bg-white rounded-lg mt-4 p-4">
      Thông báo
    </button>
  </div>

  <div class="bg-white shadow-2xl rounded-xl">
    <div class="p-3 flex gap-4" v-for="data in fakeData" :key="data.id">
      <p v-if="data.sex === 'female'">Con gái</p>
      <p v-else-if="data.sex === 'gay'">gay</p>
      <p v-else>Con trai</p>
      <p class="border p-3">Name: {{ data.name }}</p>
      <p class="border p-3">Age: {{ data.age }}</p>
      <button
        @click="getData(data.name, data.age)"
        class="bg-red-800 hover:bg-red-950 text-white p-3 rounded-lg"
      >
        Call
      </button>
      <button
        @click="openModal = true"
        class="bg-red-800 hover:bg-red-950 text-white p-3 rounded-lg"
      >
        open detail
      </button>
    </div>
  </div>

  <div v-if="openModal" class="bg-white w-full h-50 shadow-2xl rounded-md mt-4">
    hello
    <button @click="openModal = false" class="bg-red-700 p-3 rounded-lg mt-5">
      Close
    </button>
  </div>
</template>
