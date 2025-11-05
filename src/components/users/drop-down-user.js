// userDropDown.js
// Composable dùng cho dropDownUser.vue
// NOTE: chỉnh đường dẫn import theo cấu trúc dự án của bạn
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as profileApi from "../Profile/Profile"; // <-- sửa đường dẫn nếu cần

const user = ref({
  fullName: "Người dùng",
  email: "",
  avatar: "/src/assets/default-avt.png",
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
    const res = await profileApi.getProfile();
    const data = res.data.data;
    if (data && res.data.success && data) {
      user.value.fullName = data.tenNhanVien|| "Người dùng";
      user.value.email = data.email || "";
      user.value.avatar = data.urlHinh || "/default-avatar.png";
    } else {
      error.value = res?.data.message || "Không thể tải thông tin người dùng";
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
