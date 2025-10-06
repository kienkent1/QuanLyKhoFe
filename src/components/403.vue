<template>
  <div class="bg-white flex flex-col min-h-screen font-sans">
    <header
      class="w-full flex items-center justify-start px-10 py-5 fixed top-0 left-0 bg-white z-10 "
    >
      <div class="flex items-center gap-3">
        <img
          src="@/assets/logo-Photoroom1.png"
          alt="Logo"
          class="w-16 h-16 object-contain"
        />
        <h2 class="text-2xl font-semibold text-black leading-tight">
          Công ty Bấu De
        </h2>
      </div>
    </header>
    <main
      class="flex flex-1 items-center justify-between w-full pt-[100px]"
    >
      <div class="flex flex-col justify-center items-end w-1/2 pr-16">
        <div class="max-w-lg text-left">
          <h1 class="text-5xl font-bold text-gray-900 mb-6">Không đủ quyền</h1>
          <p class="text-gray-500 text-2xl mb-10 leading-relaxed">
            Bạn không có đủ quyền hạn để dùng trang này
          </p>
        </div>
      </div>

      <div class="flex flex-col justify-center items-start w-1/2 pl-16">
        <div class="text-center">
          <img
            src="@/assets/403.jpg"
            alt="403 Error"
            class="w-[620px] max-w-full object-contain mx-auto"
          />+
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goHome = () => router.push("/");
</script>
