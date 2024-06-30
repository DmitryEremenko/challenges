<script lang="ts" setup>
import { computed, ref, Ref } from 'vue'
import chart from 'chart.js'

interface MonthlyData {
  month: Date;
  revenue: number;
  freePackages: number;
  tax: number;
}

const chartOptions: Ref<chart.ChartOptions> = ref({
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Tax Amount ($)'
      }
    },
    x: {
      title: {
        display: true,
        text: 'Month'
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
});

let selectedMonth: Ref<Date | null> = ref(null);
let revenue: Ref<number | null> = ref(null);
let freePackages: Ref<number> = ref(0);
let monthlyData: Ref<MonthlyData[]> = ref([]);
let chartData: Ref<chart.ChartData> = ref({
  labels: [],
  datasets: [{
    data: [],
    backgroundColor: '#42A5F5'
  }]
});

const isValidInput = computed((): boolean => selectedMonth.value !== null && revenue.value !== null && revenue.value >= 0);

const totalTaxOwed = computed((): number => monthlyData.value.reduce((total, data) => total + data.tax, 0));

const addMonthData = (): void => {
  if (selectedMonth.value === null || revenue.value === null) return;

  const tax = calculateTax(revenue.value, freePackages.value);
  const newData: MonthlyData = {
    month: new Date(selectedMonth.value),
    revenue: revenue.value,
    freePackages: freePackages.value,
    tax: tax
  };
  monthlyData.value.push(newData);
  updateChartData();
  resetInputs();
}

const calculateTax = (revenue: number, freePackages: number): number => {
  const taxableRevenue = revenue - (freePackages * 5);
  return taxableRevenue * 0.08625;
}

const formatMonth = (date: Date): string => new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);

const resetInputs = (): void => {
  selectedMonth.value = null;
  revenue.value = null;
  freePackages.value = 0;
}

const updateChartData = (): void => {
  const labels = monthlyData.value.map(data => formatMonth(data.month));
  const taxData = monthlyData.value.map(data => data.tax);

  chartData.value = {
    labels: labels,
    datasets: [{
      data: taxData,
      backgroundColor: '#42A5F5'
    }]
  };
}

const monthBodyTemplate = (rowData: { month: Date }): string => formatMonth(rowData.month);

const currencyBodyTemplate = (rowData: { [key: string]: number }, field: string): string => formatCurrency(rowData[field]);

const formatCurrency = (value: number): string => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

</script>

<template>
  <div class="challenge-container">
    <h2 class="challenge-title">Challenge 3: Only two things in life are guaranteed...</h2>
    <Card>
      <template #content>
        <div class="p-fluid">
          <div class="p-field">
            <label for="month-select">Select Month:</label>
            <Calendar v-model="selectedMonth" view="month" dateFormat="mm/yy" :showIcon="true" />
          </div>
          <div class="p-field">
            <label for="revenue-input">Revenue:</label>
            <InputNumber v-model="revenue" mode="currency" currency="USD" locale="en-US" />
          </div>
          <div class="p-field">
            <label for="free-packages-input">Free Packages:</label>
            <InputNumber v-model="freePackages" :min="0" />
          </div>
          <Button label="Add to Tax Calculation" icon="pi pi-plus" @click="addMonthData" :disabled="!isValidInput" />
        </div>
        <div v-if="monthlyData.length > 0" class="mt-4">
          <h3>Tax Summary</h3>
          <DataTable :value="monthlyData" responsiveLayout="scroll">
            <Column field="month" header="Month" :body="monthBodyTemplate"></Column>
            <Column field="revenue" header="Revenue" dataType="numeric" :body="currencyBodyTemplate"></Column>
            <Column field="freePackages" header="Free Packages"></Column>
            <Column field="tax" header="Tax" dataType="numeric" :body="currencyBodyTemplate"></Column>
          </DataTable>
          <div class="p-text-right mt-2">
            <strong>Total Tax Owed: {{ formatCurrency(totalTaxOwed) }}</strong>
          </div>
        </div>
        <div v-if="monthlyData.length > 0" class="p-mt-4">
          <h3>Tax Calendar Visualization</h3>
          <Chart type="bar" :data="chartData" :options="chartOptions" />
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.challenge-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.challenge-title {
  color: var(--text-color);
  margin-bottom: 1rem;
  text-align: center;
}

.p-field {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
</style>