import { ref, computed, onMounted } from "vue";

export default function useLoaiHang() {
  const loaiHang = ref([]);
  const currentPage = ref(1);
  const perPage = 5;

  onMounted(async () => {
    const res = await fetch("http://localhost:3000/loaiHang");
    loaiHang.value = await res.json();
  });

  const totalItems = computed(() => loaiHang.value.length);

  const totalPages = computed(() =>
    Math.ceil(totalItems.value / perPage)
  );

  const startIndex = computed(() => (currentPage.value - 1) * perPage);
  const endIndex = computed(() =>
    Math.min(startIndex.value + perPage, totalItems.value)
  );

  const paginatedData = computed(() => {
    return loaiHang.value.slice(startIndex.value, endIndex.value);
  });

  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
  };
  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
  };
  const changePage = (page) => {
    currentPage.value = page;
  };

  return {
    loaiHang,
    paginatedData,
    currentPage,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    nextPage,
    prevPage,
    changePage,
  };
}
