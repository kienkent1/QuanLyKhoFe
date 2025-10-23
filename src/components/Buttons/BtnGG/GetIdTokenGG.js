import { onMounted } from 'vue'

export function useGoogleOAuth() {
  let client = null
  let ready = false

  onMounted(() => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => {
      ready = true
      client = google.accounts.oauth2.initTokenClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: 'openid profile email',
        callback: (resp) => {

        },
      })
    }
    document.head.appendChild(script)
  })


  const startLogin = () => {
    return new Promise((resolve, reject) => {
      if (!client || !ready) {
        console.warn('⚠️ Google SDK chưa sẵn sàng')
        reject(new Error('Google SDK chưa sẵn sàng'))
        return
      }

      // Override callback mỗi lần gọi
      client.callback = (resp) => {
        if (resp.error) reject(resp)
        else resolve(resp.access_token) 
      }

      client.requestAccessToken()
    })
  }

  return { startLogin }
}