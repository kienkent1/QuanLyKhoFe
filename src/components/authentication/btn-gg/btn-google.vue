<template>
  <div class="flex justify-center mt-4">
    <div id="googleBtn" class="google-btn-container"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

const emit = defineEmits(["success", "error"]);

const onGsi = async (resp) => {
  const idToken = resp?.credential;
  if (!idToken || idToken.split(".").length !== 3) {
    console.warn("Không có token xác thực từ Google");
    emit("error", "Token không hợp lệ");
    return;
  }
  emit("success", idToken); // ✅ gửi token ra component cha
};

onMounted(() => {
  const ready = setInterval(() => {
    if (window.google?.accounts?.id) {
      clearInterval(ready);
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: onGsi,
      });
      google.accounts.id.renderButton(document.getElementById("googleBtn"), {
        theme: "outline",
        size: "large",
        width: 380,
        text: "signin_with",
        shape: "rectangular",
      });
    }
  }, 50);
});
</script>

<style scoped>
.google-btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.google-btn-container:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}
.google-btn-container:active {
  transform: scale(0.98);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
