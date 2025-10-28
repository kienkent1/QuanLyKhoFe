import * as api from '../../helper/callApi.js'
import * as contenType from '../../helper/baseHeaderContentype.js'

const controller = 'NhanVien'

export const getNhanVien = async (params = {}) => {
try {
  const res = await api.getApi(controller, {
    params:params,
    requiresAuth: true,
  });

  return res;
} catch (error) {
  api.throwErr(error, controller);
}
};

export const getNhanVienById = async (id) => {
try {
  const res = await api.getApi(controller + `/${id}`,{
    requiresAuth: true
  });

  return res;
} catch (error) {
  api.throwErr(error, controller)
}
};

export const deleteNhanVien = async (id) => {
  try {
    const res = await api.deleteApi(controller + `/${id}`,{
      requiresAuth: true
    });

    return res;
  } catch (error) {
    api.throwErr(error, controller)
  }
}

