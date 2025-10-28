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
    const saved = localStorage.getItem('isSlideBarShow');
  sidebarOpen.value = saved === 'true';
    window.addEventListener("resize", handleResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize)
  })

  const toggleSidebar = () => {
    const isSlideBarShow = localStorage.getItem('isSlideBarShow');

  if (isSlideBarShow === 'true') {
    localStorage.setItem('isSlideBarShow', 'false');
    sidebarOpen.value = false;
  } else {
    localStorage.setItem('isSlideBarShow', 'true');
    sidebarOpen.value = true;
  }
  }

  return {
    sidebarOpen,
    windowWidth,
    toggleSidebar
  }
}
