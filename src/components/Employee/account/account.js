import { callApi } from "../../../helper/callApi.js";

// Lấy danh sách tài khoản
export const getAccountList = async (queryParams) => {
  try {
    const response = await callApi("GET", "/api/accounts", null, queryParams);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tài khoản:", error);
    throw error;
  }
};

// Tạo tài khoản mới
export const createAccount = async (accountData) => {
  try {
    const response = await callApi("POST", "/api/accounts", accountData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo tài khoản:", error);
    throw error;
  }
};

// Cập nhật tài khoản
export const updateAccount = async (accountId, accountData) => {
  try {
    const response = await callApi("PUT", `/api/accounts/${accountId}`, accountData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật tài khoản:", error);
    throw error;
  }
};

// Xóa tài khoản
export const deleteAccount = async (accountId) => {
  try {
    const response = await callApi("DELETE", `/api/accounts/${accountId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa tài khoản:", error);
    throw error;
  }
};

// Xác nhận tài khoản
export const confirmAccount = async (accountId) => {
  try {
    const response = await callApi("POST", `/api/accounts/${accountId}/confirm`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xác nhận tài khoản:", error);
    throw error;
  }
};

// Từ chối tài khoản
export const rejectAccount = async (accountId) => {
  try {
    const response = await callApi("POST", `/api/accounts/${accountId}/reject`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi từ chối tài khoản:", error);
    throw error;
  }
};

// Khóa/Mở khóa tài khoản
export const toggleAccountStatus = async (accountId, isActive) => {
  try {
    const response = await callApi("POST", `/api/accounts/${accountId}/toggle-status`, { isActive });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thay đổi trạng thái tài khoản:", error);
    throw error;
  }
};

// Lấy chi tiết tài khoản
export const getAccountDetail = async (accountId) => {
  try {
    const response = await callApi("GET", `/api/accounts/${accountId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết tài khoản:", error);
    throw error;
  }
};

// Lấy danh sách trạng thái tài khoản
export const getAccountStatuses = () => {
  return [
    { value: "pending", label: "Chờ duyệt", color: "yellow" },
    { value: "approved", label: "Đã duyệt", color: "green" },
    { value: "rejected", label: "Từ chối", color: "red" },
    { value: "blocked", label: "Bị khóa", color: "gray" }
  ];
};

// Lấy danh sách vai trò
export const getAccountRoles = () => {
  return [
    { value: "admin", label: "Quản trị viên" },
    { value: "manager", label: "Quản lý" },
    { value: "employee", label: "Nhân viên" },
    { value: "viewer", label: "Người xem" }
  ];
};

// Dữ liệu mẫu cho tài khoản (để test)
export const getMockAccountData = () => {
  return [
    {
      id: "ACC001",
      tenTaiKhoan: "Nguyễn Văn A",
      matKhau: "123456789123",
      trangThai: "approved",
      email: "NVA@Gmail.com",
      vaiTro: "employee",
      ngayTao: "2024-01-15",
      ngayCapNhat: "2024-01-20"
    },
    {
      id: "ACC002", 
      tenTaiKhoan: "Trần Văn C",
      matKhau: "123456789123",
      trangThai: "pending",
      email: "TVC@Gmail.com",
      vaiTro: "manager",
      ngayTao: "2024-01-16",
      ngayCapNhat: "2024-01-21"
    },
    {
      id: "ACC003",
      tenTaiKhoan: "Nguyễn Gia B", 
      matKhau: "123456789123",
      trangThai: "rejected",
      email: "NGB@Gmail.com",
      vaiTro: "employee",
      ngayTao: "2024-01-17",
      ngayCapNhat: "2024-01-22"
    },
    {
      id: "ACC004",
      tenTaiKhoan: "Lê Thị D",
      matKhau: "123456789123", 
      trangThai: "approved",
      email: "LTD@Gmail.com",
      vaiTro: "admin",
      ngayTao: "2024-01-18",
      ngayCapNhat: "2024-01-23"
    },
    {
      id: "ACC005",
      tenTaiKhoan: "Phạm Văn E",
      matKhau: "123456789123",
      trangThai: "blocked",
      email: "PVE@Gmail.com", 
      vaiTro: "employee",
      ngayTao: "2024-01-19",
      ngayCapNhat: "2024-01-24"
    },
    {
      id: "ACC1761229173264",
      tenTaiKhoan: "Bé dâu",
      matKhau: "123456789123",
      trangThai: "approved",
      email: "strawbery@gmail.com",
      vaiTro: "employee",
      ngayTao: "2024-01-20",
      ngayCapNhat: "2024-01-25"
    }
  ];
};
