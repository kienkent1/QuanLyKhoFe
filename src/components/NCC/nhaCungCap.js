import { ref, computed } from "vue";
import * as api from "../../helper/callApi.js";
const controller = "NhaCungCap";

export function useNhaCungCap() {
  const showModal = ref(false);
  const q = ref("");
  const rows = ref([]);
  const currentPage = ref(1);
  const pageSize = 5;

  const modalRef = ref(null);
  let offset = { x: 0, y: 0 };
  let isDragging = false;

  // ✅ Lấy dữ liệu từ db.json
 

  // ✅ Tìm kiếm
  const filteredRows = computed(() =>
    rows.value.filter((r) => r.name.toLowerCase().includes(q.value.toLowerCase()))
  );

  // ✅ Phân trang
  const totalPages = computed(() => Math.ceil(filteredRows.value.length / pageSize));
  const startIndex = computed(() => (currentPage.value - 1) * pageSize);
  const endIndex = computed(() => Math.min(startIndex.value + pageSize, filteredRows.value.length));
  const paginatedRows = computed(() => filteredRows.value.slice(startIndex.value, endIndex.value));
  const nextPage = () => currentPage.value < totalPages.value && currentPage.value++;
  const prevPage = () => currentPage.value > 1 && currentPage.value--;

  // ✅ Kéo thả modal
  const startDrag = (e) => {
    if (e.target.closest("button")) return;
    isDragging = true;
    const rect = modalRef.value.getBoundingClientRect();
    offset = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    modalRef.value.style.left = `${e.clientX - offset.x}px`;
    modalRef.value.style.top = `${e.clientY - offset.y}px`;
    modalRef.value.style.position = "fixed";
    modalRef.value.style.margin = 0;
  };

  const stopDrag = () => {
    isDragging = false;
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
  };

  return {
    q,
    showModal,
    modalRef,
    rows,
    paginatedRows,
    filteredRows,
    totalPages,
    startIndex,
    endIndex,
    currentPage,
    nextPage,
    prevPage,
    startDrag,
  };
}
