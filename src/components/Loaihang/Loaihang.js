import { ref, computed, onMounted } from "vue";
import * as api from "../../helper/callApi.js";

const controller = "Loai";

// ======================
// 🧩 HÀM GỌI API
// ======================

// 🟢 Lấy tất cả loại hàng
export const getAllLoai = async () => {
  try {
    const res = await api.getApi(controller, { requiresAuth: true });

    if (res?.status === 200) {
      // ✅ Đảm bảo dữ liệu trả về là mảng
      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || []; // Một số API có dạng { data: [...] }
      return { success: true, data };
    }

    if (res?.status === 401) {
      return { success: false, message: "Không có quyền truy cập (401 Unauthorized)" };
    }

    return { success: false, message: res?.data?.message || "Không lấy được danh sách loại hàng" };
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách loại:", error);
    return { success: false, message: "Không thể kết nối tới server" };
  }
};


// 🟣 Thêm loại hàng (hỗ trợ upload ảnh)
export const createLoai = async (data) => {
  try {
    const formData = new FormData();

    formData.append("tenLoai", data.tenLoai || "");
    formData.append("moTa", data.moTa || "");

    // Nếu người dùng chọn ảnh thật (File)
    if (data.HinhAnh instanceof File) {
      formData.append("HinhAnh", data.HinhAnh);
    } else if (typeof data.HinhAnh === "string") {
      // Nếu bạn vẫn muốn cho phép gửi link URL (GitHub, vv)
      formData.append("HinhAnh", data.HinhAnh);
    }

    const res = await api.postApi("Loai", formData, {
      requiresAuth: true,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.status === 200 || res.status === 201) {
      return { success: true, data: res.data };
    } else {
      return { success: false, message: res.data?.message || "Không thể thêm loại hàng" };
    }
  } catch (error) {
    console.error("❌ Lỗi khi thêm loại hàng:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Không thể kết nối tới server",
    };
  }
};

// ======================
// 🧩 COMPOSABLE DÙNG TRONG COMPONENT
// ======================
export default function useLoaiHang() {
  const loaiHang = ref([]);
  const currentPage = ref(1);
  const perPage = 5;
  const loading = ref(false);
  const errorMessage = ref("");

  const loadLoai = async () => {
    loading.value = true;
    const res = await getAllLoai();
    loading.value = false;

    if (res.success) {
      // ✅ luôn đảm bảo là mảng
      loaiHang.value = Array.isArray(res.data) ? res.data : res.data?.data || [];
    } else {
      errorMessage.value = res.message;
      loaiHang.value = []; // tránh lỗi slice
      console.error(res.message);
    }
  };

  onMounted(() => {
    loadLoai();
  });

  // 🧮 PHÂN TRANG
  const totalItems = computed(() => loaiHang.value.length);
  const totalPages = computed(() => Math.ceil(totalItems.value / perPage));
  const startIndex = computed(() => (currentPage.value - 1) * perPage);
  const endIndex = computed(() => Math.min(startIndex.value + perPage, totalItems.value));

  const paginatedData = computed(() => {
    // ✅ Tránh lỗi slice nếu không phải array
    return Array.isArray(loaiHang.value)
      ? loaiHang.value.slice(startIndex.value, endIndex.value)
      : [];
  });

  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
  };
  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
  };
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages.value) currentPage.value = page;
  };
const getImageUrl = (fileName) => {
  if (!fileName) return "";
  if (fileName.startsWith("http")) return fileName;
  return `https://raw.githubusercontent.com/kienkent1/QuanLyKhoImg/main/Loai/${fileName}`;
};
  return {
    loaiHang,
    paginatedData,
    currentPage,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    nextPage,
    prevPage,
    changePage,
    loadLoai,
    getImageUrl,
    loading,
    errorMessage,
  };
}
