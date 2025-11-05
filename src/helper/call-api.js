import axios from "axios";
import VueCookies from "vue-cookies";
import router from "../../routes.js";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {},
});

// === TOKEN UTIL ===
function getAccessToken() {
  return VueCookies.get("accessToken");
}
function setTokens(accessToken, refreshToken) {
  if (accessToken) VueCookies.set("accessToken", accessToken, "1d");
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
}

// === REFRESH TOKEN ===
export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    router.push("/login");
    throw new Error("No refresh token found");
  }

  try {
    const res = await axios.post(`${BASE_URL}Authentication/refreshtoken`, {
      refreshToken,
    });
    if (res.status === 200 || res.status === 201) {
      const { accessToken, refreshToken: newRefreshToken } = res.data.data;
      setTokens(accessToken, newRefreshToken);
      return accessToken;
    }
  } catch (err) {
    console.error("Refresh token failed:", err);
    router.push("/login");
    throw err;
  }
}

// === REQUEST INTERCEPTOR ===
api.interceptors.request.use((config) => {
  const isFormData =
    Object.prototype.toString.call(config.data) === "[object FormData]";

  if (!config.headers["Content-Type"]) {
    if (isFormData) {
      delete config.headers["Content-Type"]; // để axios tự set boundary
    } else {
      config.headers["Content-Type"] = "application/json";
    }
  }

  if (config.requiresAuth) {
    const token = getAccessToken();
    if (!token) {
      router.push("/login");
      throw new Error("Missing access token");
    }
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// === RESPONSE INTERCEPTOR ===
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (
      err.response?.status === 401 &&
      originalRequest.requiresAuth &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();
        processQueue(null, newToken);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (e) {
        processQueue(e, null);
        isRefreshing = false;
        return Promise.reject(e);
      }
    }

    if (err.response?.status === 403) {
      router.push("/403");
    }

    return Promise.reject(err);
  }
);

// === API WRAPPERS ===
export var objQuery = {
  query: "",
  page: 1,
  pageSize: 10,
  FieldName: "",
  Isdesc: false,
  FilterName: "",
  FilterValue: "",
};

// ✅ gom config vào data
export const getApi = (url, opts = {}) =>
  api.get(url, {
    params: opts.params ?? objQuery,
    ...opts,
  });

export const postApi = (url, opts = {}) => api.post(url, opts.data ?? {}, opts);

export const putApi = (url, opts = {}) => api.put(url, opts.data ?? {}, opts);

export const patchApi = (url, opts = {}) =>
  api.patch(url, opts.data ?? {}, opts);

export const deleteApi = (url, opts = {}) => api.delete(url, opts);

export function throwErr(error, context = "") {
  const res = error.response;
  const status = res?.status;

  let msg = null;

  // --- 1️⃣ Nếu BE trả về message dạng chuẩn (success + message)
  if (res?.data?.message) {
    msg = res.data.message;
  }
  // --- 2️⃣ Nếu là lỗi Validation từ ASP.NET (có "errors")
  else if (res?.data?.errors) {
    msg = extractValidationMessage(res.data.errors);
  }
  // --- 3️⃣ Nếu chỉ có title
  else if (res?.data?.title) {
    msg = res.data.title;
  }
  // --- 4️⃣ Cuối cùng fallback
  else {
    msg = error.message || "Lỗi không xác định từ máy chủ";
  }

  console.error(
    `%c[API ERROR] ${context ? context + " → " : ""}${status || "??"}: ${msg}`,
    "color: red; font-weight: bold;"
  );

  return {
    success: false,
    status,
    message: msg,
    data: res?.data?.data || null,
  };
}

// 🧩 Hàm trích xuất dòng đầu tiên trong object errors
function extractValidationMessage(errors) {
  if (!errors || typeof errors !== "object") return null;
  const firstKey = Object.keys(errors)[0];
  const firstVal = errors[firstKey];
  return Array.isArray(firstVal) ? firstVal[0] : String(firstVal);
}

export default api;
