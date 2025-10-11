import { onMounted } from 'vue'

export function useGoogleOAuth({ onSuccess, onError } = {}) {
  let client = null

  onMounted(() => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => {
      client = google.accounts.oauth2.initCodeClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: 'openid profile email',
        ux_mode: 'popup', // mở popup chứ không redirect
        callback: (resp) => {
          if (resp.error) {
            onError && onError(resp)
          } else {
            onSuccess && onSuccess(resp)
          }
        },
      })
    }
    document.head.appendChild(script)
  })

  const startLogin = () => {
    if (!client) {
      console.warn('Google SDK chưa sẵn sàng')
      return
    }
    client.requestCode() 
  }

  return { startLogin }
}
