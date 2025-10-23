<template>
    <div>
        <button @click="showModal = true"
            class="flex items-center gap-2 bg-white text-black font-medium px-5 py-2 rounded-xl shadow hover:bg-gray-300 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Thêm loại hàng
        </button>

        <!-- Popup -->
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/15">
            <div ref="modalRef" class="bg-white rounded-2xl shadow-2xl w-[750px] max-w-[90%] p-6 relative cursor-move"
                @mousedown="startDrag">
                <button @click="closeModal"
                    class="absolute top-3 right-3 text-gray-500 hover:text-black transition">✕</button>

                <h2 class="text-xl font-bold mb-6">Thêm loại hàng</h2>

                <div class="grid grid-cols-3 gap-4 mb-6">
                    <div>
                        <label class="block text-sm font-semibold mb-1">Tên loại hàng</label>
                        <input v-model="newLoai.tenLoai" type="text" placeholder="Nhập tên loại hàng"
                            class="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-1">Mô tả</label>
                        <input v-model="newLoai.moTa" type="text" placeholder="Viết mô tả"
                            class="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-1">Hình ảnh</label>
                        <div @click="selectImage"
                            class="flex items-center justify-between w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 cursor-pointer hover:bg-gray-100">
                            <span>{{ newLoai.imageName || 'Bấm vào để chọn ảnh' }}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3 7a2 2 0 012-2h3l1-1h4l1 1h3a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>

                        <input ref="fileInput" type="file" accept="image/*" @change="handleFile" class="hidden" />
                        <div v-if="previewUrl" class="mt-3">
                            <img :src="previewUrl" alt="Preview" class="w-28 h-16 object-cover rounded-md border" />
                        </div>
                    </div>
                </div>

                <div class="flex justify-center gap-6">
                    <button @click="resetForm"
                        class="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-2 rounded-lg shadow transition">
                        Làm mới
                    </button>
                    <button @click="saveLoaiHang"
                        class="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow transition">
                        Lưu lại
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { createLoai } from "./Loaihang.js";

const emit = defineEmits(["reload"]);

const showModal = ref(false);
const modalRef = ref(null);
const previewUrl = ref(null);
const fileInput = ref(null);

const newLoai = ref({ tenLoai: "", moTa: "", image: null, imageName: "" });

const resetForm = () => {
  newLoai.value = { tenLoai: "", moTa: "", image: null, imageName: "" };
  previewUrl.value = null;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const selectImage = () => fileInput.value.click();
const handleFile = (e) => {
  const file = e.target.files[0];
  if (file) {
    newLoai.value.image = file;
    newLoai.value.imageName = file.name;
    previewUrl.value = URL.createObjectURL(file);
  }
};

const saveLoaiHang = async () => {
  try {
    const data = {
      TenLoai: newLoai.value.tenLoai,
      MoTa: newLoai.value.moTa,
      HinhAnh: newLoai.value.image, // gửi file thật
    };

    console.log("📤 Payload:", data);

    const res = await createLoai(data);

    if (res.success) {
      alert("✅ Thêm loại hàng thành công!");
      emit("reload");
      closeModal();
    } else {
      alert("❌ Lỗi: " + res.message);

    // Validation
    if (!newLoai.value.tenLoai.trim()) {
      alert('Vui lòng nhập tên loại hàng');
      return;

    }
    
    if (newLoai.value.tenLoai.trim().length < 2) {
      alert('Tên loại hàng phải có ít nhất 2 ký tự');
      return;
    }
    
    // Tạo ID mới
    const existingData = JSON.parse(localStorage.getItem('loaiHangData') || '[]');
    const newId = existingData.length > 0 ? Math.max(...existingData.map(item => item.id)) + 1 : 1;
    
    // Tạo loại hàng mới
    const newCategory = {
      id: newId,
      tenLoai: newLoai.value.tenLoai.trim(),
      moTa: newLoai.value.moTa.trim() || `Mô tả cho ${newLoai.value.tenLoai.trim()}`,
      HinhAnh: newLoai.value.image ? URL.createObjectURL(newLoai.value.image) : null,
      imageName: newLoai.value.imageName,
      CreateAt: new Date().toISOString().split('T')[0]
    };
    
    // Thêm vào localStorage
    existingData.unshift(newCategory);
    localStorage.setItem('loaiHangData', JSON.stringify(existingData));
    
    // Reload và đóng modal
    emit("reload");
    closeModal();
    
  }
 } catch (error) {
    console.error('❌ Lỗi khi lưu loại hàng:', error);
    alert('Đã xảy ra lỗi khi lưu loại hàng!');
  }
};


// 🖱 Kéo thả popup
const isDragging = ref(false);
const offset = ref({ x: 0, y: 0 });
const startDrag = (e) => {
  if (!modalRef.value) return;
  isDragging.value = true;
  const rect = modalRef.value.getBoundingClientRect();
  offset.value = { x: e.clientX - rect.left, y: e.clientY - rect.top };

  const move = (ev) => {
    if (!isDragging.value) return;
    modalRef.value.style.position = "fixed";
    modalRef.value.style.left = `${ev.clientX - offset.value.x}px`;
    modalRef.value.style.top = `${ev.clientY - offset.value.y}px`;
  };
  const stop = () => {
    isDragging.value = false;
    window.removeEventListener("mousemove", move);
    window.removeEventListener("mouseup", stop);
  };
  window.addEventListener("mousemove", move);
  window.addEventListener("mouseup", stop);
};
</script>