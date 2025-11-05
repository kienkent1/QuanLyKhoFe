import * as api from "../../../helper/call-api.js";
import router from "/routes.js";
import * as contenType from "../../../helper/base-header-contentype.js";

const controller = "Authentication/register";
const register = async (obj = {}) => {
  try {
    const res = await api.postApi(controller, {
      data: obj,
      headers: contenType.appJson,
    });
    if (res.status === 201 || res.status === 200) {
      alert("Đăng ký thành công! Vui lòng đăng nhập");
      router.push("/login");
      return res;
    }
    return res;
  } catch (err) {
    return api.throwErr(err, "register");
  }
};

export default register;
