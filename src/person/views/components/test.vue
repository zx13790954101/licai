<template>
  <div>
    <el-table :data="calendarData" style="width: 100%">
      <el-table-column prop="year" label="Year"></el-table-column>
      <el-table-column v-for="month in months" :key="month" :label="month">
        <template slot-scope="scope">
          <div v-for="day in scope.row[month]" :key="day.time">
            {{ day.time }}: {{ day.num }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Table, TableColumn } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      rawData: [
        { time: "2022-10-22", num: "211" },
        { time: "2022-09-22", num: "111" },
        { time: "2022-06-22", num: "411" },
        { time: "2021-08-22", num: "111" },
        { time: "2021-07-22", num: "211" },
        { time: "2021-04-12", num: "111" },
        { time: "2020-06-22", num: "411" },
        { time: "2020-06-12", num: "111" },
        { time: "2020-03-22", num: "611" },
        { time: "2019-07-22", num: "211" },
        { time: "2019-04-12", num: "111" },
        { time: "2019-03-22", num: "411" },
        { time: "2019-03-12", num: "111" }
      ],
      calendarData: []
    };
  },
  created() {
    this.processData();
  },
  methods: {
    processData() {
      const data = {};
      this.rawData.forEach(item => {
        const [year, month, day] = item.time.split('-');
        const monthName = this.months[parseInt(month) - 1];
        if (!data[year]) {
          data[year] = {};
        }
        if (!data[year][monthName]) {
          data[year][monthName] = [];
        }
        data[year][monthName].push({ time: day, num: item.num });
      });
      this.calendarData = Object.keys(data).map(year => {
        const row = { year };
        this.months.forEach(month => {
          row[month] = data[year][month] || [];
        });
        return row;
      });
    }
  }
};
</script>

<style scoped>
/* 在这里添加任何自定义样式 */
</style>