import * as api from "../../helper/call-api.js";
import * as contentType from "../../helper/base-header-contentype.js";

const controller = "NhanVien";

export const getProfile = async () => {
  try {
    const res = await api.getApi(`${controller}/profile`, {
      requiresAuth: true,
    });
    return res;
  } catch (error) {
    return api.throwErr(error, controller + "/profile");
  }
};

export const updateAvatar = async (file = {}) => {
  try {
    const res = await api.patchApi(controller + `/avatar`, {
      requiresAuth: true,
      data: file,
      headers: contentType.formType,
    });

    return res;
  } catch (error) {
    return api.throwErr(error, controller + "/avatar");
  }
};

export const changePassword = async (body = {}) => {
  try {
    const res = await api.postApi(`${controller}/password`, {
      requiresAuth: true,
      data: body,
      headers: contentType.appJson,
    });

    return res;
  } catch (error) {
    return api.throwErr(error, controller + "/password");
  }
};
