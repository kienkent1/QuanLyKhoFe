import { ref, computed, onMounted } from "vue";

export default function useLoaiHang() {
  const loaiHang = ref([]);
  const currentPage = ref(1);
  const perPage = 5;

  onMounted(async () => {
    const res = await fetch("http://localhost:3000/loaiHang");
    loaiHang.value = await res.json();
  });

  const totalPages = computed(() =>
    Math.ceil(loaiHang.value.length / perPage)
  );

  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * perPage;
    return loaiHang.value.slice(start, start + perPage);
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
    nextPage,
    prevPage,
    changePage,
  };
}
