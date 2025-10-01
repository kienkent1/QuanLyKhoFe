import { ref, onMounted, onBeforeUnmount } from "vue"

export default function useSlidebarNavbar() {
  const sidebarOpen = ref(true)
  const windowWidth = ref(window.innerWidth)


  const handleResize = () => {
    windowWidth.value = window.innerWidth
    if (window.innerWidth < 780) {
      sidebarOpen.value = false
    } else {
      sidebarOpen.value = true
    }
  }

  onMounted(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize)
  })

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  return {
    sidebarOpen,
    windowWidth,
    toggleSidebar
  }
}
