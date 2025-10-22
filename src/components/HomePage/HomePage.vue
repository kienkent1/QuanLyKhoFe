<script setup>
import { ref, onMounted } from "vue";
import { Line, Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const loading = ref(false);

// Dữ liệu demo
const cardStats = [
  { title: "Số lượng nhân viên", value: 562, color: "#2563eb", data: [3, 8, 6, 10, 7, 9, 8] },
  { title: "Nhà cung cấp", value: 562, color: "#2563eb", data: [4, 6, 9, 7, 10, 9, 8] },
  { title: "Số phiếu nhập", value: 1000, percent: "+5%" },
  { title: "Số phiếu xuất", value: 100, percent: "+8%" },
];

const lineChartData = {
  labels: [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7",
    "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
  ],
  datasets: [
    {
      label: "Phiếu xuất kho",
      borderColor: "#2563eb",
      backgroundColor: "#2563eb50",
      data: [5, 10, 25, 35, 37, 20, 45, 40, 30, 50, 60, 55],
      tension: 0.4,
      fill: false,
    },
    {
      label: "Phiếu nhập kho",
      borderColor: "#6b7280",
      backgroundColor: "#6b728050",
      data: [2, 5, 8, 20, 2, 30, 25, 20, 18, 25, 35, 28],
      tension: 0.4,
      fill: false,
    },
  ],
};

const expenseChartData = {
  labels: Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`),
  datasets: [
    {
      label: "Chi tiêu",
      backgroundColor: "#2563eb",
      borderRadius: 10,
      data: [20, 18, 25, 22, 30, 15, 28, 35, 25, 40, 45, 30],
    },
  ],
};

const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      labels: { usePointStyle: true },
    },
  },
  scales: { y: { beginAtZero: true } },
};

// Option cho biểu đồ mini (sparkline)
const sparkOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  scales: {
    x: { display: false },
    y: { display: false },
  },
  elements: {
    point: { radius: 0 },
  },
};

onMounted(() => {
  loading.value = false;
});
</script>

<template>
  <div class="p-6 bg-gray-50 space-y-6">
    <!-- HÀNG THẺ THỐNG KÊ -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- 2 thẻ đầu có mini chart -->
      <div v-for="(card, i) in cardStats.slice(0, 2)" :key="i"
        class="flex items-center justify-between bg-white rounded-2xl shadow p-5">
        <div>
          <h3 class="text-3xl font-semibold">{{ card.value }}</h3>
          <p class="text-gray-500 text-sm">{{ card.title }}</p>
        </div>
        <div class="w-12 h-10">
          <Line :data="{
            labels: card.data.map((_, j) => j),
            datasets: [
              {
                data: card.data,
                borderColor: card.color,
                borderWidth: 3,
                tension: 0.5,
              },
            ],
          }" :options="sparkOptions" />
        </div>
      </div>

      <!-- Thẻ 3 -->
      <!-- 2 thẻ cuối (xanh dương & xanh lá) -->
      <div class="col-span-1 sm:col-span-2 flex gap-0 overflow-hidden rounded-2xl shadow">
        <!-- Thẻ xanh dương -->
        <div class="flex-1 flex items-center justify-between bg-blue-600 text-white p-5">
          <div>
            <p class="text-sm opacity-90">Số phiếu nhập</p>
            <h3 class="text-3xl font-semibold">1000</h3>
          </div>
          <div class="relative w-12 h-12 flex items-center justify-center">
            <div class="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin-slow">
            </div>
            <span class="text-xs font-semibold">+5%</span>
          </div>
        </div>

        <!-- Thẻ xanh lá -->
        <div class="flex-1 flex items-center justify-between bg-green-500 text-white p-5">
          <div>
            <p class="text-sm opacity-90">Số phiếu xuất</p>
            <h3 class="text-3xl font-semibold">100</h3>
          </div>
          <div class="relative w-12 h-12 flex items-center justify-center">
            <div class="absolute inset-0 border-4 border-gray-200 border-t-transparent rounded-full animate-spin-slow">
            </div>
            <span class="text-xs font-semibold">+5%</span>
          </div>
        </div>

      </div>
    </div>

    <!-- BIỂU ĐỒ PHIẾU NHẬP / XUẤT -->
    <div class="bg-white p-6 rounded-2xl shadow">
      <h2 class="font-semibold mb-3">Thống kê số phiếu nhập, xuất kho</h2>
      <Line :data="lineChartData" :options="lineOptions" height="120" />
    </div>

    <!-- HÀNG DƯỚI: CHI TIÊU + TỔNG TIỀN -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Thống kê chi tiêu -->
      <div class="bg-white p-6 rounded-2xl shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-semibold">Thống kê chi tiêu</h2>
          <div class="flex gap-4 text-gray-400 font-medium text-sm">
            <button class="text-black font-semibold">2025</button>
            <button>2024</button>
            <button>2023</button>
          </div>
        </div>

        <p class="text-2xl font-bold text-blue-600 mb-2">12.434.000 VND</p>
        <Bar :data="expenseChartData" :options="{
          responsive: true,
          plugins: { legend: { display: false }, tooltip: { enabled: true } },
          scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true, ticks: { stepSize: 10 } },
          },
        }" height="120" />
      </div>

      <!-- Tổng tiền phiếu xuất, nhập -->
      <div class="bg-white p-6 rounded-2xl shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-semibold">Tổng tiền phiếu xuất, nhập</h2>
          <div class="flex gap-4 text-gray-400 font-medium text-sm">
            <button class="text-black font-semibold">Ngày</button>
            <button>Tháng</button>
            <button>Năm</button>
          </div>
        </div>

        <!-- Phiếu xuất -->
        <div class="flex justify-between items-center mb-8">
          <div>
            <button class="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium">
              Phiếu xuất
            </button>
            <p class="mt-1 font-medium">Tổng tiền phiếu xuất</p>
            <p class="text-sm text-gray-400 mt-1">✔ Cập nhật: 21/10/2025</p>
          </div>
          <div class="w-28 h-16">
            <Line :data="{
              labels: ['1', '2', '3', '4', '5'],
              datasets: [
                {
                  data: [20, 35, 25, 40, 30],
                  borderColor: 'red',
                  borderWidth: 3,
                  tension: 0.4,
                  pointRadius: 0,
                },
              ],
            }" :options="{
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                scales: { x: { display: false }, y: { display: false } },
              }" />
          </div>
        </div>

        <!-- Phiếu nhập -->
        <div class="flex justify-between items-center">
          <div>
            <button class="bg-green-100 text-green-600 px-3 py-1 rounded-lg text-sm font-medium">
              Phiếu nhập
            </button>
            <p class="mt-1 font-medium">Tổng tiền phiếu nhập</p>
            <p class="text-sm text-gray-400 mt-1">✔ Cập nhật: 21/10/2025</p>
          </div>
          <div class="w-28 h-16">
            <Line :data="{
              labels: ['1', '2', '3', '4', '5'],
              datasets: [
                {
                  data: [10, 15, 13, 22, 18],
                  borderColor: 'green',
                  borderWidth: 3,
                  tension: 0.4,
                  pointRadius: 0,
                },
              ],
            }" :options="{
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                scales: { x: { display: false }, y: { display: false } },
              }" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
canvas {
  max-height: 200px;
}

@keyframes spin-slow {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 4s linear infinite;
}
</style>
