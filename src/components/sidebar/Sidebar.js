import { ref } from "vue";

export default function Sidebar() {
  const is_expanded = ref(localStorage.getItem("is_expanded") == "true");

  const ToggleMenu = () => {
    is_expanded.value = !is_expanded.value;

    localStorage.setItem("is_expanded", is_expanded.value);
  };
}
