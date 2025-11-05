<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, computed, onMounted, reactive, watch, nextTick } from "vue";
import { vOnClickOutside } from "@vueuse/components";
import { getNhanVien } from "./user.js";
import ThemNhanVien from "./ThemNhanVien.vue";
import IconFilter from "../helper-components/IconFilter.vue";
import IconFemale from "../helper-components/IconFemale.vue";
import IconMale from "../helper-components/IconMale.vue";
import ActiveIcon from "../helper-components/ActiveIcon.vue";
import InactiveIcon from "../helper-components/InactiveIcon.vue";

//filter ---------------
const openSort = ref(false);
const openFilter = ref(false);

const selectedFilter = ref("filter");
const filterOptions = [
  { key: "filter", label: "Lọc", icon: IconFilter },
  {
    key: "male",
    label: "Nam",
    icon: IconMale,
    fieldName: "gioiTinh",
    value: "Nam",
  },
  {
    key: "female",
    label: "Nữ",
    icon: IconFemale,
    fieldName: "GioiTinh",
    value: "Nữ",
  },
  {
    key: "active",
    label: "Hoạt động",
    icon: ActiveIcon,
    fieldName: "trangthai",
    value: true,
  },
  {
    key: "inactive",
    label: "Ngừng HĐ",
    icon: InactiveIcon,
    fieldName: "trangthai",
    value: false,
  },
];

const selectedSort = ref("↓ Mới nhất");
function filterGioiTinh(item) {
  params.value.FilterName = item.fieldName;
  params.value.FilterValue = item.value;
  loadData();
}
const currentFilterIcon = computed(() => {
  return (
    filterOptions.find((f) => f.key === selectedFilter.value)?.icon ||
    iconFilter
  );
});
const currentFilterLabel = computed(() => {
  return (
    filterOptions.find((f) => f.key === selectedFilter.value)?.label || "Lọc"
  );
});
//end filter---------------

//load data----------------------

const route = useRoute();
const router = useRouter();

const currentPage = ref(1);
const totalPages = ref(1);
const totalItems = ref(1);
const params = ref({
  query: "",
  page: 1,
  pageSize: 10,
  FieldName: "createdAt",
  Isdesc: false,
  FilterName: "",
  FilterValue: "",
});
const formData = reactive({
  idNhanVien: "",
  maNV: "",
  email: "",
  sdt: "",
  ngaySinh: "",
  gioiTinh: "",
  chucVu: "",
  trangthai: null,
});

const listData = ref(null);

async function loadData() {
  const pageNum = Number(route.query.page) || 1;

  params.value.query = route.query.q || "";
  params.value.page = pageNum;

  const res = await getNhanVien(params.value);
  const result = res.data.data;
  currentPage.value = result.currentPage;
  totalPages.value = result.totalPages;
  totalItems.value = result.totalItems;

  listData.value = result.data;
}

onMounted(async () => {
  await loadData();
});

watch(
  () => route.query,
  async (newQuery) => {
    const pageNum = Number(newQuery.page) || 1;
    const q = newQuery.q || "";
    params.value.page = pageNum;
    params.value.query = q;

    await loadData();
  },
  { immediate: true }
);

async function search() {
  const q = params.value.query;
  await router.push({
    query: {
      ...route.query,
      q,
      page: 1,
    },
  });
  await loadData();
}

const sortField = async (name, value) => {
  params.value.FieldName = name;
  if (params.value.Isdesc === true) {
    params.value.Isdesc = false;
  } else {
    params.value.Isdesc = value;
  }

  await loadData();
};
//end load data --------------------
//hành động-------
const idNV = ref("");
const dropdownStyle = ref({});
function handleAction(id) {
  if (idNV.value === id) {
    idNV.value = null;
  } else {
    idNV.value = id;
    nextTick(() => {
      const btn = event.target.closest("button");
      const rect = btn.getBoundingClientRect();
      dropdownStyle.value = {
        top: `${rect.bottom + window.scrollY - 30}px`,
        left: `${rect.left - 50}px`,
        position: "absolute",
      };
    });
  }
}
function handleOutside() {
  if (idNV.value) {
    setTimeout(() => {
      idNV.value = null;
    }, 0); // delay 1 tick event loop
  }
}

function viewNhanVien(id) {
  router.push({ name: "DetailUser", params: { id: id } });
}

const doneThemNV = async (e) => {
  if (e) {
    await loadData();
  }
}
//end hàng động-----------

//Modal
const openModalThem = ref(false);

//kéo thả modal---------
const position = ref({ x: 10, y: 0 });
const dragging = ref(false);
const offset = ref({ x: 0, y: 0 });

const startDrag = (e) => {
  dragging.value = true;
  offset.value = {
    x: e.clientX - position.value.x,
    y: e.clientY - position.value.y,
  };
};

const stopDrag = () => {
  dragging.value = false;
};

const onDrag = (e) => {
  if (dragging.value) {
    position.value = {
      x: e.clientX - offset.value.x,
      y: e.clientY - offset.value.y,
    };
  }
};
//end kéo thả-------------
//end modal
</script>
<template>
  <!-- Phần trên top của body -->
  <div class="flex mt-4 gap-5 relative mb-3">
    <div class="w-50 flex-auto relative">
      <input v-model="params.query" @keyup.enter="search()"
        class="w-full border-0 rounded-md shadow-md focus:outline-gray-400" type="text"
        placeholder="Tìm kiếm nhân viên " />
      <span class="absolute right-2 top-2">
        <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
        </svg>
      </span>
    </div>
    <div class="w-30 flex flex-auto justify-end gap-3">
      <!-- btn nhà cung cấp -->
      <div class="relative">
        <button @click="openModalThem = true"
          class="rounded-md h-auto p-2 bg-white shadow-md hover:bg-gray-200 transition-colors duration-300 ease-in-out">
          <span class="flex justify-around">
            <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
              height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                clip-rule="evenodd" />
            </svg>
            <span>thêm nhân viên</span>
          </span>
        </button>
      </div>

      <!-- dropdown filter-->
      <div class="relative" v-on-click-outside="() => (openFilter = false)">
        <button
          class="flex items-center justify-between gap-2 h-10 p-3 w-35 shadow-md rounded-md bg-white hover:bg-gray-200 transition"
          @click="openFilter = !openFilter">
          <component :is="currentFilterIcon" />
          <span>{{ currentFilterLabel }}</span>
          <span v-if="openFilter" class="ml-1 text-gray-600">▴</span>
          <span v-else class="ml-1 text-gray-600">▾</span>
        </button>

        <!-- Dropdown list -->
        <ul v-if="openFilter" class="bg-white mt-1 absolute left-0 w-full shadow-xl rounded-md z-10">
          <li v-for="item in filterOptions" :key="item.key" @click="
            selectedFilter = item.key;
          openFilter = false;
          filterGioiTinh(item);
          " class="flex items-center gap-2 pl-3 py-1 hover:bg-gray-100 cursor-pointer">
            <component :is="item.icon" />
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </div>
      <!-- dropdown sort-->
      <div class="relative overflow-visible" v-on-click-outside="() => (openSort = false)">
        <button
          class="h-10 w-25 shadow-md rounded-md bg-white hover:bg-gray-200 transition-colors duration-300 ease-in-out"
          @click="openSort = !openSort">
          {{ selectedSort }}
          <span v-if="openSort" class="text-gray-600">▴</span>
          <span v-else class="text-gray-600">▾</span>
        </button>

        <ul class="bg-white mt-1 absolute left-0 pt-2 w-full shadow-xl rounded-md pb-2 z-10" v-if="openSort">
          <li @click="
            (selectedSort = '↓ Mới nhất'),
            (openSort = false),
            (params.FieldName = 'createdAt'),
            (params.Isdesc = true),
            loadData()
            " class="pl-2 hover:bg-gray-200 transition-colors duration-300 ease-in-out">
            ↓ Mới nhất
          </li>
          <li @click="
            (selectedSort = '↑ Cũ nhất'),
            (openSort = false),
            (params.FieldName = 'createdAt'),
            (params.Isdesc = false),
            loadData()
            " class="pl-2 hover:bg-gray-200 transition-colors duration-300 ease-in-out">
            ↑ Cũ nhất
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- End phần top body -->

  <!-- List data -->
  <div class="w-full relative overflow-x-auto py-4">
    <!-- có nền khác để thấy bóng -->
    <div class="inline-block min-w-full align-middle">
      <div class="overflow-hidden rounded-lg shadow-sm bg-white">
        <table class="w-full text-sm text-left">
          <thead>
            <tr class="border-b-2 border-gray-200">
              <th scope="col" class="px-6 py-3 text-center">
                <div class="flex">
                  <p>Mã NV</p>
                  <button class="cursor-pointer" @click="sortField('maNV', true)">
                    <svg class="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                      height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd"
                        d="M12.832 3.445a1 1 0 0 0-1.664 0l-4 6A1 1 0 0 0 8 11h8a1 1 0 0 0 .832-1.555l-4-6Zm-1.664 17.11a1 1 0 0 0 1.664 0l4-6A1 1 0 0 0 16 13H8a1 1 0 0 0-.832 1.555l4 6Z"
                        clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </th>
              <th scope="col" class="px-6 py-3 text-center">
                <div class="flex">
                  <p>Tên nhân viên</p>
                  <button class="cursor-pointer" @click="sortField('tenNhanVien', true)">
                    <svg class="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                      height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd"
                        d="M12.832 3.445a1 1 0 0 0-1.664 0l-4 6A1 1 0 0 0 8 11h8a1 1 0 0 0 .832-1.555l-4-6Zm-1.664 17.11a1 1 0 0 0 1.664 0l4-6A1 1 0 0 0 16 13H8a1 1 0 0 0-.832 1.555l4 6Z"
                        clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </th>
              <th scope="col" class="px-6 py-3 text-center">Điện thoại</th>
              <th scope="col" class="px-6 py-3 text-center">
                <div class="flex">
                  <p>Email</p>
                  <button class="cursor-pointer" @click="sortField('email', true)">
                    <svg class="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                      height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd"
                        d="M12.832 3.445a1 1 0 0 0-1.664 0l-4 6A1 1 0 0 0 8 11h8a1 1 0 0 0 .832-1.555l-4-6Zm-1.664 17.11a1 1 0 0 0 1.664 0l4-6A1 1 0 0 0 16 13H8a1 1 0 0 0-.832 1.555l4 6Z"
                        clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </th>
              <th scope="col" class="px-6 py-3 text-center">Chức vụ</th>
              <th scope="col" class="px-6 py-3 text-center">
                <div class="flex">
                  <p>Ngày sinh</p>
                  <button class="cursor-pointer" @click="sortField('ngaySinh', true)">
                    <svg class="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                      height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd"
                        d="M12.832 3.445a1 1 0 0 0-1.664 0l-4 6A1 1 0 0 0 8 11h8a1 1 0 0 0 .832-1.555l-4-6Zm-1.664 17.11a1 1 0 0 0 1.664 0l4-6A1 1 0 0 0 16 13H8a1 1 0 0 0-.832 1.555l4 6Z"
                        clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </th>
              <th scope="col" class="px-6 py-3 text-center">Giới tính</th>
              <th scope="col" class="px-6 py-3 text-center">Trạng thái</th>
              <th scope="col" class="px-6 py-3 text-center">hành động</th>
            </tr>
          </thead>
          <tbody class="relative">
            <tr v-for="items in listData" class="hover:bg-gray-50">
              <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap border-1 border-gray-200">
                {{ items.maNV }}
              </th>
              <td class="px-6 py-4 border-1 border-gray-200">
                {{ items.tenNhanVien }}
              </td>
              <td class="px-6 py-4 border-1 border-gray-200">
                {{ items.sdt }}
              </td>
              <td class="px-6 py-4 border-1 border-gray-200">
                {{ items.email }}
              </td>
              <td class="px-6 py-4 border-1 border-gray-200 text-center">
                {{ items.chucVu }}
              </td>
              <td class="px-6 py-4 border-1 border-gray-200 text-center">
                {{ new Date(items.ngaySinh).toLocaleDateString("vi-VN") }}
              </td>
              <td class="px-6 py-4 border-1 border-gray-200 text-center">
                {{ items.gioiTinh }}
              </td>
              <td v-if="items.trangthai" class="px-6 py-4 text-green-800 border-1 border-gray-200 text-center">
                <span class="bg-green-100 p-1 rounded-xl">Hoạt động</span>
              </td>
              <td v-else class="px-6 py-4 text-red-800 border-1 border-gray-200 text-center">
                <span class="bg-red-100 p-1 rounded-xl">Ngừng hoạt động</span>
              </td>

              <td class="px-6 py-4 h-full border-1 border-gray-200">
                <button @click.stop="handleAction(items.idNhanVien.toString())"
                  v-on-click-outside="() => handleOutside()" class="w-full h-full cursor-pointer">
                  <svg class="h-6 text-gray-800 w-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                    height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                      d="M6 12h.01m6 0h.01m5.99 0h.01" />
                  </svg>
                </button>
                <teleport to="body">
                  <div v-if="idNV === items.idNhanVien" :style="dropdownStyle"
                    class="bg-white shadow-xl rounded-lg absolute z-50">
                    <ul>
                      <li class="pt-1 pb-1 pr-4 pl-4 hover:bg-gray-200 rounded-t-lg">
                        Sửa
                      </li>
                      <li @click="viewNhanVien(items.idNhanVien)" class="pt-1 pb-1 pr-4 pl-4 hover:bg-gray-200">
                        Xem
                      </li>
                    </ul>
                  </div>
                </teleport>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- End List data -->

  <div class="w-full flex justify-center cursor-move">
    <div @mousedown="startDrag" @mouseup="stopDrag" @mousemove="onDrag" :style="{
      top: position.y + 'px',
      left: position.x + 'px',
      position: 'absolute',
    }" v-if="openModalThem" class="fixed top-40 z-50 w-8/12  ">
      <ThemNhanVien @themNhanVien="doneThemNV" />

      <div class="absolute top-2 right-46 ">
        <button class="cursor-pointer" @click="openModalThem = false">✕</button>
      </div>
    </div>
  </div> 
  
</template>
