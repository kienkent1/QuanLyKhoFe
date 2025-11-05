import * as api from "../../helper/call-api.js";
import * as contenType from "../../helper/base-header-contentype.js";

const controller = 'NhanVien';
export const getNhanVien = async (params = {}) => {
  try {
    const res = await api.getApi(controller, {
      params: params,
      requiresAuth: true,
    });

    return res;
  } catch (error) {
    return api.throwErr(error, controller);
  }
};

export const getNhanVienById = async (id) => {
  try {
    const res = await api.getApi(controller + `/${id}`, {
      requiresAuth: true,
    });

    return res;
  } catch (error) {
    return api.throwErr(error, controller);
  }
};

export const themNhanVien = async (data = {}) => {
  try {
    const res = await api.postApi(controller,{
      requiresAuth: true,
      data: data,
      headers: contenType.formType,
    } );
    return res;
  } catch (error) {
    return api.throwErr(error, controller);
  }
};

export const suaNhanVien = async (id, data = {}) => {
  try {
    const res = await api.putApi(`${controller}/${id}`, {
      requiresAuth: true,
      data: data,
      headers: contenType.formType,
    } );
    return res;
  } catch (error) {
    return api.throwErr(error, controller);
  }
};
