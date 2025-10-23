// userDropDown.js
// Composable dùng cho dropDownUser.vue
// NOTE: chỉnh đường dẫn import theo cấu trúc dự án của bạn
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as profileApi from "../Profile/Profile"; // <-- sửa đường dẫn nếu cần

const user = ref({
  fullName: "Người dùng",
  email: "",
  avatar: "/default-avatar.png",
});

const loading = ref(false);
const error = ref(null);

const open = ref(false);
const hasOpened = ref(false);

const toggleDropdown = () => {
  hasOpened.value = true;
  open.value = !open.value;
};

const refreshProfile = async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await profileApi.getProfile();
    if (res && res.success && res.data) {
      user.value.fullName = res.data.fullName || res.data.tenNhanVien || "Người dùng";
      user.value.email = res.data.email || "";
      user.value.avatar = res.data.avatar || res.data.urlHinh || "/default-avatar.png";
    } else {
      error.value = res?.message || "Không thể tải thông tin người dùng";
    }
  } catch (err) {
    console.error("❌ refreshProfile error:", err);
    error.value = "Không thể kết nối đến server";
  } finally {
    loading.value = false;
  }
};

const handleClickOutside = (e) => {
  if (!e.target.closest(".relative")) open.value = false;
};

export function useUserDropdown(autoFetch = true) {
  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
    if (autoFetch) refreshProfile();
  });

  onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
  });

  return {
    user,        // { fullName, email, avatar }
    loading,
    error,
    open,
    hasOpened,
    toggleDropdown,
    refreshProfile, // bạn có thể gọi thủ công để làm mới
  };
}

export default useUserDropdown;
