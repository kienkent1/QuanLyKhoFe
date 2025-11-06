<script setup>
import { onMounted } from 'vue';
import * as api from '../../../helper/call-api'
const testApi = async () => {
    const res = await api.getApi("http://xuongkien-001-site1.qtempurl.com/api/NhanVien");
    console.log(res);
}

onMounted(() => {
    testApi();
})
</script>
<template></template>
