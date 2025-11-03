<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getNhanVienById } from "./user.js";

const route = useRoute();
const router = useRouter();

const id = ref(route.params.id);
const data = ref({});

async function checkId() {
  if (!id.value) {
    router.push({ name: "NotFound" });
  } else {
    const res = await getNhanVienById(id.value);
    if (res.status === 404 || res.status === 400) {
      router.push({ name: "NotFound" });
    } else {
      data.value = res.data.data;
      console.log(data.value);
    }
  }
}

onMounted(() => {
  checkId();
});
</script>
<template>
  <div class="bg-white shadow-lg rounded-md p -3">
    <p>{{ data.maNV }}</p>
  </div>
</template>
