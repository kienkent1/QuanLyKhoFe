<script setup>
import SlidebarNavbar from "./components/Slidebar_Navbar/SlidebarNavbar.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <router-view />
</template>
