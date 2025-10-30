import * as api from "../../../helper/call-api.js";
import router from "/routes.js";

const controller = "Authentication/register";
const register = async (obj = {}) => {
  try {
    const res = await api.postApi(controller, obj);
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
