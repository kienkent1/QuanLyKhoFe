import * as api from "../../helper/callApi.js";

const controller = "NhanVien/";

/**
 * 🔹 Lấy thông tin hồ sơ nhân viên hiện tại
 * API: GET /api/NhanVien/profile
 */
export const getProfile = async () => {
  try {
    const res = await api.getApi(controller + "profile", {
      requiresAuth: true, // interceptor sẽ tự thêm Bearer token
    });

    if (res.status === 200 && res.data?.success) {
      const d = res.data.data;

      // Map dữ liệu từ API sang form hiện tại trong Vue
      return {
        success: true,
        data: {
          id: d.idNhanVien || "",
          fullName: d.tenNhanVien || "",
          username: d.userName || "",
          email: d.email || "",
          phone: d.sdt || "",
          dob: d.ngaySinh ? d.ngaySinh.split("T")[0] : "",
          gender: d.gioiTinh || "",
          role: d.chucVu || "",
          avatar: d.urlHinh || "/default-avatar.png", // fallback avatar
        },
      };
    }

    return {
      success: false,
      message: res.data?.message || "Không thể tải thông tin người dùng",
    };
  } catch (err) {
    console.error("❌ Lỗi getProfile:", err);
    return {
      success: false,
      message: "Không thể kết nối đến server",
    };
  }
};

/**
 * 🔹 Cập nhật Avatar nhân viên
 * API: PATCH /api/NhanVien/avatar
 * Header: multipart/form-data
 * Body: file (image)
 */
export const updateAvatar = async (file) => {
  try {
    // Chuẩn bị form-data
    const formData = new FormData();
    formData.append("file", file);

    // Gọi API
    const res = await api.patchApi(controller + "avatar", formData, {
      requiresAuth: true,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.status === 200 && res.data?.success) {
      return {
        success: true,
        message: res.data.message || "Cập nhật avatar thành công!",
        avatarUrl: res.data.data, // API trả về link ảnh mới
      };
    }

    return {
      success: false,
      message: res.data?.message || "Không thể cập nhật avatar",
    };
  } catch (err) {
    console.error("❌ Lỗi updateAvatar:", err);
    return {
      success: false,
      message: "Không thể kết nối đến server",
    };
  }
};
