<script setup lang="ts">
import { ref, reactive, defineEmits } from "vue";
import * as validate from "../../helper/validate-input";
import { themNhanVien } from "./user.js";

const message = ref("");

const emit = defineEmits(["themNhanVien"]);

// Validate data--------
//Data--------------
const formData = reactive({
  TenNhanVien: "",
  MaNV: "",
  email: "",
  sdt: "",
  ChucVu: "",
  NgaySinh: "",
  GioiTinh: "Nam",

  diaChi: {
    Tinh: "",
    Phuong: "",
    DiaChiNha: "",
  },
  Hinh: null,
});
//end data ----------

// Handle file change
function handleFileChange(e) {
  const file = e.target.files[0];
  if (file) {
    formData.Hinh = file;
  }
}
// end handle file change

async function submitForm() {

  const nameNV = validate.validateString(formData.TenNhanVien, "Tên nhân viên không được trống hoặc có ký tự đặc biệt");
  if (nameNV.success === false) {
    message.value = nameNV.message;

    return;
  };

  const maNV = validate.stringNoSpace(formData.MaNV, "Mã nhân viên không được trống");
  if (maNV.success === false) {
    message.value = maNV.message;

    return;
  };

  const email = validate.validateEmail(formData.email);
  if (email.success === false) {
    message.value = email.message;

    return;
  };

  const sdt = validate.validatePhone(formData.sdt);
  if (sdt.success === false) {
    message.value = sdt.message;

    return;
  };

  const ngaySinh = validate.validateDate(formData.NgaySinh);
  if (ngaySinh.success === false) {
    message.value = ngaySinh.message;

    return;
  }

  const data = new FormData();
  data.append("TenNhanVien", formData.TenNhanVien);
  data.append("MaNV", formData.MaNV);
  data.append("email", formData.email);
  data.append("sdt", formData.sdt);
  data.append("NgaySinh", formData.NgaySinh);
  data.append("GioiTinh", formData.GioiTinh);
  data.append("Hinh", formData.Hinh);
  data.append("diaChi", JSON.stringify(formData.diaChi));

  const res = await themNhanVien(data);
  if (res.status === 200 || res.status === 201) {
    alert('Thêm nhân viên thành công');
    emit("themNhanVien", true);
  } else {
    message.value = res.message;
    emit("themNhanVien", false);
  }
}

// end validate data----------
</script>
<template>
  <div class="w-full flex justify-center mb-3">
    <div class="w-8/12 bg-white shadow-xl rounded-xl">
      <div>
        <h1 class="p-3 text-2xl font-bold">Thêm Nhân viên</h1>
      </div>

      <form @submit.prevent class="flex gap-4 justify-evenly p-4" enctype="multipart/form-data">
        <!-- left side -->
        <div>
          <!-- tên nhân viên -->
          <div class="mb-2">
            <label for="TenNhanVien" class="block mb-2 text-sm font-medium text-gray-700">Tên nhân viên
            </label>
            <input v-model="formData.TenNhanVien" name="TenNhanVien" type="text" placeholder="Nhập tên nhân viên"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <!-- Mã nhân viên -->
          <div class="mb-2">
            <label for="MaNV" class="block mb-2 text-sm font-medium text-gray-700">Mã nhân viên
            </label>
            <input v-model="formData.MaNV" name="MaNV" type="text" placeholder="Tự động tạo nếu không nhập"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <!-- Email nhân viên -->
          <div class="mb-2">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-700">Email
            </label>
            <input v-model="formData.email" name="email" type="email" placeholder="Nhập email"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <!-- sđt nhân viên -->
          <div class="mb-2">
            <label for="sdt" class="block mb-2 text-sm font-medium text-gray-700">Số điện thoại
            </label>
            <p class="text-red-400">{{ message === null ? "" : message }}</p>
            <input v-model="formData.sdt" @keyup.enter="validate()" name="sdt" type="tel"
              placeholder="Nhập số điện thoại"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>
        <!-- mid side -->
        <div>
          <!-- chức vụ nhân viên -->
          <div class="mb-2">
            <label for="chucVu" class="block mb-2 text-sm font-medium text-gray-700">Chức vụ
            </label>
            <input v-model="formData.ChucVu" name="chucVu" type="text" placeholder="Nhập chức vụ nhân viên"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <!-- ngày sinh nhân viên -->
          <div class="mb-2">
            <label for="ngaySinh" class="block mb-2 text-sm font-medium text-gray-700">Ngày sinh nhân viên
            </label>
            <input v-model="formData.NgaySinh" name="ngaySinh" type="date" placeholder="Tự động tạo nếu không nhập"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <!-- Giới tính nhân viên -->
          <div class="mb-2">
            <label for="GioiTinh" class="block mb-2 text-sm font-medium text-gray-700">Giới tính
            </label>
            <select v-model="formData.GioiTinh" name="GioiTinh"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="Nam">Nam</option>
              <option value="Nu">Nữ</option>
            </select>
          </div>
          <!-- hình ảnh -->
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium text-gray-700">Ảnh</label>
            <label for="logo"
              class="flex items-center justify-between w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm cursor-pointer hover:bg-gray-100 transition">
              <span>Chọn ảnh</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 16l4-4 4 4m5-4l4-4 4 4M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </label>
            <input id="logo" type="file" accept="image/*" class="hidden" @change="handleFileChange" />
          </div>
        </div>
        <!-- right side -->
        <div>
          <!-- Tỉnh nhân viên -->
          <div class="mb-2">
            <label for="Tinh" class="block mb-2 text-sm font-medium text-gray-700">Tỉnh
            </label>
            <input v-model="formData.diaChi.Tinh" name="Tinh" type="text" placeholder="Nhập tỉnh"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <!-- Phường xã nhân viên -->
          <div class="mb-2">
            <label for="Phuong" class="block mb-2 text-sm font-medium text-gray-700">Phường/Xã
            </label>
            <input v-model="formData.diaChi.Phuong" name="Phuong" type="text" placeholder="Nhập phường/Xã"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <!-- Địa chỉ nhà nhân viên -->
          <div class="mb-2">
            <label for="DiaChiNha" class="block mb-2 text-sm font-medium text-gray-700">Địa chỉ nhà
            </label>
            <textarea v-model="formData.diaChi.DiaChiNha" rows="2" name="DiaChiNha" placeholder="Nhập địa chỉ nhà"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
            </textarea>
          </div>
          <!-- btn -->
          <div class="mb-2">
            <button
              class=" w-full rounded-lg pt-2 pb-2 mt-1 bg-blue-500 hover:bg-blue-600 text-white font-medium shadow transition">Lưu</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
