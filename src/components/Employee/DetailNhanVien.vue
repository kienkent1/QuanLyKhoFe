<script setup>
import { onMounted, ref, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getNhanVienById, suaNhanVien } from "./user.js";
import * as validate from '../../helper/validate-input.js';
import BtnLoader from '../helper-components/BtnLoader.vue'

const route = useRoute();
const router = useRouter();

//Data--------------
const formData = reactive({
  TenNhanVien: "",
  email: "",
  sdt: "",
  chucVu: "",
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

const id = ref(route.params.id);
const data = ref({});

async function loadData() {
  if (!id.value) {
    router.push({ name: "NotFound" });
  } else {
    const res = await getNhanVienById(id.value);
    if (res.status === 404 || res.status === 400) {
      router.push({ name: "NotFound" });
    } else {
      data.value = res.data.data;

      formData.TenNhanVien = data.value.tenNhanVien;
      formData.email = data.value.email;
      formData.sdt = data.value.sdt;
      formData.chucVu = data.value.chucVu;
      if (data.value.ngaySinh) {
        const date = new Date(data.value.ngaySinh);
        formData.NgaySinh = date.toISOString().split('T')[0];
      }
      formData.GioiTinh = data.value.gioiTinh === 'Nữ' ? 'Nu' : data.value.gioiTinh

      if (data.value.diaChi) {
        formData.diaChi.Tinh = data.value.diaChi?.Tinh || "";
        formData.diaChi.Phuong = data.value.diaChi?.Phuong || "";
        formData.diaChi.DiaChiNha = data.value.diaChi?.DiaChiNha || "";
      }
    }
  }
}

onMounted(() => {
  loadData();
});


const imgPreview = ref(null);
// Handle file change
function handleFileChange(e) {
  const file = e.target.files[0];
  if (file) {
    formData.Hinh = file;
    imgPreview.value = URL.createObjectURL(file);
  }
}
// end handle file change

//Update nhân viên

const message = ref('');
const isDoneUpdate = ref(true);
//validate
const updateNhanVien = async () => {
  const tenNV = validate.validateString(formData.TenNhanVien);
  if (tenNV.success === false) {
    message.value = tenNV.message;
    return;
  }

  const emailCheck = validate.validateEmail(formData.email);
  if (emailCheck.success === false) {
    message.value = emailCheck.message;
    return;
  }

  const phoneCheck = validate.validatePhone(formData.sdt);
  if (phoneCheck.success === false) {
    message.value = phoneCheck.message;
    return;
  }

  const ngaySinh = validate.validateDate(formData.NgaySinh);
  if (ngaySinh.success === false) {
    message.value = ngaySinh.message;
    return;
  }
  const chucVu = validate.validateString(formData.chucVu, "Chức vụ không được để trống và không chứa ký tự đặc biệt");
  if (chucVu.success === false) {
    message.value = chucVu.message;
    return;
  }

  //validate địa chỉ

  const tinh = validate.onlyString(formData.diaChi.Tinh, "Tỉnh chỉ cho phép chữ, phím cách, (-), (_)", false);
  const phuong = validate.onlyString(formData.diaChi.Phuong, "Phường chỉ cho phép chữ, phím cách, (-), (_)", false);
  const diaChiNha = validate.validateString(formData.diaChi.DiaChiNha, "Địa chỉ nhà chỉ cho phép chữ, số, phím cách, (-), (_)", false);

  if (tinh.success === false) {
    message.value = tinh.message;
  }
  if (phuong.success === false) {
    message.value = phuong.message;
    return;
  }
  if (diaChiNha.success === false) {
    message.value = diaChiNha.message;
    return;
  }

  const dataForm = new FormData();
  dataForm.append("TenNhanVien", formData.TenNhanVien);
  dataForm.append("email", formData.email);
  dataForm.append("sdt", formData.sdt);
  dataForm.append("ngaySinh", formData.NgaySinh);
  dataForm.append("chucVu", formData.chucVu);
  dataForm.append("avatar", data.value.urlHinh)
  if (formData.Hinh) {
    dataForm.append("NewAvt", formData.Hinh);
  }
  dataForm.append("diaChi", JSON.stringify(formData.diaChi));

  isDoneUpdate.value = false;
  const res = await suaNhanVien(id.value, dataForm);

  if (res.status === 200 || res.status === 201) {
    await loadData();
    isDoneUpdate.value = true;
    alert('Sửa nhân viên thành công');
  } else {
    isDoneUpdate.value = true;
    alert("Sửa thất bại");
  }
}

watch(
  () => message.value,
  (newVal) => {
    if (newVal) {
      // sau 3 giây xóa message
      setTimeout(() => {
        message.value = "";
      }, 3000);
    }
  }
);
//end update nhân viên
</script>
<template>
  <div class="bg-white shadow-xl rounded-md p -3 w-full p-4 mb-3">
    <div class="flex justify-between">
      <div>
        <h1 class="text-2xl font-bold mb-3">{{ data.tenNhanVien }} - {{ data.maNV }}</h1>
        <p class="text-gray-400 ">Email: {{ data.email }}</p>
      </div>
      <div>
        <img class="h-30 w-auto rounded-2xl" :src="data.urlHinh || '/src/assets/default-avt.png'" alt="">
      </div>
    </div>
    <p v-if="message" class="text-red-500 absolute z-40 ">*{{ message }}</p>
    <div class="p-3">

      <form @submit.prevent class="flex gap-4 justify-evenly p-4" enctype="multipart/form-data">
        <!-- left side -->
        <div class="w-4/12">
          <!-- tên nhân viên -->
          <div class="mb-2">
            <label for="TenNhanVien" class="block mb-2 text-sm font-medium text-gray-700">Tên nhân viên
            </label>
            <input v-model="formData.TenNhanVien" name="TenNhanVien" type="text" placeholder="Nhập tên nhân viên"
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
            <input v-model="formData.sdt" name="sdt" type="tel" placeholder="Nhập số điện thoại"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
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
        <!-- mid side -->
        <div class="w-4/12">
          <!-- chức vụ nhân viên -->
          <div class="mb-2">
            <label for="chucVu" class="block mb-2 text-sm font-medium text-gray-700">Chức vụ
            </label>
            <input v-model="formData.chucVu" name="chucVu" type="text" placeholder="Nhập chức vụ nhân viên"
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
          <div v-if="imgPreview" class="mt-3 flex justify-center">
            <img :src="imgPreview" alt="Preview" class="h-16  w-auto rounded-lg border shadow-sm object-contain" />
          </div>

        </div>
        <!-- right side -->
        <div class="w-4/12">
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
              class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none " />
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
          <div class="mb-2 flex justify-between">

            <!-- button lưu -->
            <button v-if="isDoneUpdate" @click="updateNhanVien"
              class=" w-full  rounded-lg p-2 mt-1 bg-blue-500 hover:bg-blue-600 text-white font-medium shadow transition flex justify-center gap-2">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd"
                  d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z"
                  clip-rule="evenodd" />
              </svg>

              <span>Lưu</span>
            </button>
            <button v-else disabled
              class="  rounded-lg p-2 mt-1 w-full h-10  text-white font-medium shadow transition flex justify-center cursor-wait disabled:bg-blue-300">
              <BtnLoader />
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
