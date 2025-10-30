import * as api from "../../../helper/call-api.js";
import * as contenType from '../../../helper/base-header-contentype.js'
const controller = 'accounts'

// Lấy danh sách tài khoản
export const getAccountList = async (queryParams) => {
  try {
    const response = await api.getApi(controller, {
      requiresAuth : true,
      params: queryParams
    });
    return response.data;
  } catch (error) {
    api.throwErr(error, controller)
  }
};

// Tạo tài khoản mới
export const createAccount = async (accountData) => {
  try {
    const response = await api.postApi(controller, {
      requiresAuth: true,
      body: accountData,
      headers: contenType.appJson
    });
    return response.data;
  } catch (error) {
    api.throwErr(error, controller)
  }
};

export const blockAccount = async (idUser) => {
  try {
    const res = await api.patchApi('NhanVien/BlocUser/' + idUser,{
      requiresAuth: true,
    });
    return res.data;
  } catch (error) {
    api.throwErr(error, "NhanVien/BlocUser")
  }
}