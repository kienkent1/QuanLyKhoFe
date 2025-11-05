import Employee from "./User.vue";
import DetailNhanVien from "./DetailNhanVien.vue";

export default [
  {
    path: "/nhan-vien",
    name: "User",
    component: Employee,
  },
  {
    path: "/nhan-vien/:id",
    name: "DetailUser",
    component: DetailNhanVien,
    props: true,
  },
];
