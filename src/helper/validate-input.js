const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegexVN = /^(0\d{9,10}|\+84\d{9,10})$/;
const nameRegex = /^[A-Za-zÀ-ỹ0-9 _-]+$/;
const stringRegex = /^[A-Za-zÀ-ỹ0-9_-]+$/;

const fail = (message) => {
  return { message: message, success: false };
};

const pass = () => {
  return { message: "", success: true };
};

export const validatePhone = (phone = "") => {
  if (phone.trim().length < 1) {
    return fail("Số điện thoại không được trống");
  }
  if (!phoneRegexVN.test(phone.trim())) {
    return fail("Số điện thoại không đúng định dạng");
  }
  return pass();
};

export const validateString = (string = "", message = "") => {
  if (string.trim().length < 1) {
    return fail(message);
  }
  if (!nameRegex.test(string.trim())) {
    return fail(message);
  }
  return pass();
};

export const validateEmail = (email = "") => {
  if (email.trim().length < 1) {
    return fail("Email không được trống");
  }
  if (!emailRegex.test(email.trim())) {
    return fail("Email không đúng định dạng");
  }
  return pass();
};

export const stringNoSpace = (string = "", message = "") => {
  if (string.trim().length < 1) {
    return fail(message);
  }
  if (!stringRegex.test(string)) {
    return fail(message);
  }
  return pass();
};

export const validateNull = (value, message = "") => {
  if (value === null || value === undefined || value === "") {
    return fail(message);
  }
  return pass();
};

export const validateDate = (date = "") => {
  if (!date) {
    return fail("Ngày sinh không được trống");
  }

  const dob = new Date(date);
  if (isNaN(dob.getTime())) {
    return fail("Ngày sinh không đúng định dạng");
  }

  const now = new Date();

  if (dob > now) {
    return fail("Ngày sinh không được lớn hơn ngày hiện tại");
  }

  const age = now.getFullYear() - dob.getFullYear();
  const hasBirthdayPassed =
    now.getMonth() > dob.getMonth() ||
    (now.getMonth() === dob.getMonth() && now.getDate() >= dob.getDate());
  const realAge = hasBirthdayPassed ? age : age - 1;

  if (realAge < 15) {
    return fail("Ngày sinh phải đủ 15 tuổi trở lên");
  }

  if (realAge > 100) {
    return fail("Ngày sinh không được lớn hơn 100 tuổi");
  }

  return pass();
};
