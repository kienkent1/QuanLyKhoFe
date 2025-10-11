
import { onMounted } from "vue"

export function useGoogleLogin (){
const  onGsi = async (resp) => {
  const idToken = resp?.credential;   // <-- JWT có 2 dấu '.'
  if (!idToken || idToken.split('.').length !== 3) {
    console.warn('Không có idToken từ Google');
    return;
  }

  // const r = await fetch("https://localhost:7035/api/User/auth/google", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ idToken }) // KEY phải là idToken (khớp DTO)
  //});

  
};

onMounted(() => {
  const ready = setInterval(() => {
    if (window.google?.accounts?.id) {
      clearInterval(ready);
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: onGsi
      });
    }
  }, 50);
});


}
