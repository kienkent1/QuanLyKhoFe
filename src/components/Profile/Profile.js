import { ref, computed, onMounted } from "vue";
import axios from "axios";
import ChangePassword from "../change_password.vue"; 

export default function useProfile() {
  const user = ref({});
  const now = ref(new Date());
  const showChangePassword = ref(false);

  onMounted(async () => {
    try {
      const res = await axios.get("http://localhost:3000/users/1");
      user.value = res.data;
    } catch (error) {
      console.error("Lỗi khi tải thông tin người dùng:", error);
    }
  });

  function formatDateVN(d) {
    const weekdays = [
      "Chủ nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];
    const dayOfWeek = weekdays[d.getDay()];
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${dayOfWeek}, ngày ${day} tháng ${month}, ${year}`;
  }

  const formattedDate = computed(() => formatDateVN(new Date()));
  const monthsAgo = computed(() => {
    if (!user.value.updatedAt) return 0;
    const updated = new Date(user.value.updatedAt);
    const diff =
      (now.value.getFullYear() - updated.getFullYear()) * 12 +
      (now.value.getMonth() - updated.getMonth());
    return diff;
  });

  // ✅ Cập nhật avatar
  function updateAvatar(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => (user.value.avatar = reader.result);
      reader.readAsDataURL(file);
    }
  }

  return {
    user,
    formattedDate,
    monthsAgo,
    showChangePassword,
    updateAvatar,
    ChangePassword,
  };
}
