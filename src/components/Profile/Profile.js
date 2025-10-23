import * as api from "../../helper/callApi.js";

const controller = "NhanVien/";

/** Helpers */
const mapProfile = (d = {}) => ({
  id: d.idNhanVien || "",
  fullName: d.tenNhanVien || "",
  username: d.userName || "",
  email: d.email || "",
  phone: d.sdt || "",
  dob: d.ngaySinh ? d.ngaySinh.split("T")[0] : "",
  gender: d.gioiTinh || "",
  role: d.chucVu || "",
  avatar: d.urlHinh || "/default-avatar.png",
});

const extractErrorMessage = (err) =>
  err?.response?.data?.message || err?.message || "Có lỗi xảy ra";

/**
 * Lấy profile hiện tại
 * GET /api/NhanVien/profile
 */
export const getProfile = async () => {
  try {
    const res = await api.getApi(controller + "profile", {
      requiresAuth: true,
    });

    if (res.status === 200 && res.data?.success) {
      return { success: true, data: mapProfile(res.data.data) };
    }

    return {
      success: false,
      message: res.data?.message || "Không thể tải thông tin người dùng",
    };
  } catch (err) {
    console.error("❌ Lỗi getProfile:", err);
    return { success: false, message: extractErrorMessage(err) };
  }
};

/**
 * Cập nhật avatar
 * PATCH /api/NhanVien/avatar
 * - file: instance of File
 * - options: { onProgress: fn(percent), maxSizeMB: number, allowedTypes: string[] }
 */
export const updateAvatar = async (file, options = {}) => {
  const { onProgress, maxSizeMB = 5, allowedTypes = ["image/jpeg", "image/png", "image/webp"] } = options;

  if (!file) {
    return { success: false, message: "Không có file được chọn" };
  }

  // Kiểm tra kiểu file
  if (!allowedTypes.includes(file.type)) {
    return { success: false, message: "Định dạng không hợp lệ. Chỉ chấp nhận JPG/PNG/WEBP" };
  }

  // Kiểm tra kích thước
  const maxBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxBytes) {
    return { success: false, message: `Kích thước vượt quá ${maxSizeMB} MB` };
  }

  try {
    const formData = new FormData();
    formData.append("file", file);

    // Không ép Content-Type — cho axios/browser set boundary tự động
    const config = {
      requiresAuth: true,
      // nếu wrapper api.patchApi cho phép truyền onUploadProgress, thêm vào
      onUploadProgress: (progressEvent) => {
        if (typeof onProgress === "function" && progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percent);
        }
      },
    };

    console.log("Token từ cookie trước khi PATCH:", VueCookies.get("accessToken"));
    const res = await api.patchApi(controller + "avatar", formData, config);

    if (res.status === 200 && res.data?.success) {
      // API có thể trả data trực tiếp hoặc object chứa url
      const avatarUrl = res.data?.data?.url || res.data?.data || null;
      return {
        success: true,
        message: res.data.message || "Cập nhật avatar thành công!",
        avatarUrl,
      };
    }

    return { success: false, message: res.data?.message || "Không thể cập nhật avatar" };
  } catch (err) {
    console.error("❌ Lỗi updateAvatar:", err);
    return { success: false, message: extractErrorMessage(err) };
  }
};
