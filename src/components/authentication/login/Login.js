import * as api from "../../../helper/call-api.js";
import * as contentType from "../../../helper/base-header-contentype.js";
import VueCookies from "vue-cookies";

const controller = "Authentication/";

export const login = async (username, password, isRemember) => {
  const payload = {
    userNameOrEmail: username,
    password: password,
  };
  try {
    const res = await api.postApi(controller + "login", {
      data: payload,
      headers: contentType.formType,
    });
    if (res.status === 400)
      return { message: `${res.data.message}`, success: true };
    else if (res.status === 200 || res.status === 201) {
      const accessToken = res.data.data.accessToken;

      const refreshToken = res.data.data.refreshToken;
      if (isRemember === true) {
        VueCookies.set("accessToken", `${accessToken}`, "1d");
        localStorage.setItem("refreshToken", `${refreshToken}`);
        localStorage.setItem("isRemember", true);
      } else {
        VueCookies.set("accessToken", `${accessToken}`, "1h");
        localStorage.setItem("refreshToken", `${refreshToken}`);
        localStorage.removeItem("isRemember");
      }

      return { message: "Đăng nhập thành công", success: true };
    } else if (res.status === 5000) {
      console.error(res.data.message);

      return { message: "Lỗi hệ thống", success: false };
    }
  } catch (error) {
    console.error(error);
    return api.throwErr(error, "Login");
  }
};
