<script setup>

import Slidebar_Navbar from './components/Slidebar_Navbar/Slidebar_Navbar.vue';
import { useRoute } from "vue-router";

const route = useRoute();

</script>

<template>
 <div v-if="['login', 'register', 'NotFound', 'Forbidden'].includes(route.name)">
  <router-view></router-view>
</div>
<div v-else>
  <slidebar_-navbar>
      <router-view></router-view>
  </slidebar_-navbar>

</div>

</template>



