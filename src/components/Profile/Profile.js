import * as api from "../../helper/callApi.js";
import * as contentType from '../../helper/baseHeaderContentype.js'

const controller = "NhanVien";

export const getProfile = async () => {
try {
  const res = await api.getApi(controller + `/profile`, {
    requiresAuth: true,
  });

  return res;
} catch (error) {
  api.throwErr(error,controller + '/profile');
}
};

export const updateAvatar = async (file = {}) => {
try {
  const res = await api.patchApi(controller + `/avatar`,{
    requiresAuth: true,
    body: file,
    headers: contentType.formType,
  });

  return res;
} catch (error) {
  api.throwErr(error, controller + '/avatar')
}
};

export const changePassword = async (body = {}) => {
try {
  const res = await api.postApi(controller + `/${id}/password`, {
    requiresAuth: true,
    body: body,
  });

  return res;
} catch (error) {
  api.throwErr(error, controller + '/{id}/password');
}
};