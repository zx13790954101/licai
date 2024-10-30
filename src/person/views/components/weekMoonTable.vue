<template>
  <div class="weekMoonTable">
    <table>
      <thead>
        <tr>
          <th>年份</th>
          <th v-for="month in months" :key="month">{{ month }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="year in years" :key="year.year">
          <td>{{ year.year }}</td>
          <td v-for="month in months" :key="`${year.year}-${month}`"
            :class="year.months[parseInt(month) - 1] > 0 ? 'active' : 'green'">
            {{ year.months[parseInt(month) - 1] || 0 }}
            <div class="date">

            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <dealLunarFullCalendar v-if="deal_lunar_data.length>0" :weekMoonTable_data="deal_lunar_data"></dealLunarFullCalendar>
    <!-- 
    <el-calendar v-model="this_time" >
      <template
        slot="dateCell"
        slot-scope="{date, data}">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
        </p>
      </template>
</el-calendar> -->
  </div>
</template>

<script>
import dealLunarFullCalendar from "./dealLunarFullCalendar.vue";
export default {
  data() {
    return {
      deal_lunar_data:[],
      this_time: '2024-04',
      years: [],
      months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    };
  },
  components: {
    dealLunarFullCalendar
  },
  props: {
    weekMoonTable_data: {
      type: Array,
      default: [],
    },
  },
  created() {
    let data = this.weekMoonTable_data

    let processedData = {};

    data.forEach(item => {
      let [year, month] = item.time.split('-');
      let key = `${year}-${month}`;
      if (!processedData[key]) {
        processedData[key] = 0;
      }
      processedData[key] += item.num; // 转换为数字并累加  
    });

    let tableData = {};

    // 转换数据为表格格式  
    Object.keys(processedData).forEach(key => {
      let [year, month] = key.split('-');
      if (!tableData[year]) {
        tableData[year] = {};
        for (let m = 1; m <= 12; m++) {
          tableData[year][m] = 0; // 初始化月份数据  
        }
      }
      tableData[year][parseInt(month, 10)] = parseFloat(processedData[key]).toFixed(2);
    });

    // 转换为年份数组，每个年份对象包含月份和对应的num总和  
    let years = [];
    for (let year in tableData) {
      years.push({
        year: parseInt(year, 10),
        months: tableData[year]
      });
    }
    this.years = years
    this.groupedData()
  },
  methods: {
    groupedData() {
      let data1 =this.weekMoonTable_data
      // 使用 reduce 来按年份和月份分组
      let groupedData = data1.reduce((acc, item) => {
        // 解析出年份和月份
        let [year, month] = item.time.split('-').slice(0, 2);
        // 找到对应的年份数组或创建一个新的
        let yearGroup = acc.find(group => group.year === year);
        if (!yearGroup) {
          yearGroup = { year, months: [] };
          acc.push(yearGroup);
        }
        // 在该年份下找到对应的月份数组或创建一个新的
        let monthGroup = yearGroup.months.find(monthObj => monthObj.month === month);
        if (!monthGroup) {
          monthGroup = { month, items: [] };
          yearGroup.months.push(monthGroup);
        }
        // 将当前项添加到对应的月份数组中
        monthGroup.items.push(item);
        return acc;
      }, []);
      // 按照年份排序（可选）
      let end_data=groupedData.sort((a, b) => a.year - b.year);
      end_data=end_data[end_data.length-1].months[8]
      this.deal_lunar_data=end_data.items
    }
  },

};

</script>
<style scoped lang="scss">
.weekMoonTable {
  margin: 40px 0px;

  table {
    width: 100%;
  }

  .active {
    background-color: red;
    color: white;
  }

  .green {
    background-color: green;
    color: white;
  }

  thead {
    tr {
      display: flex;

      th {
        padding: 5px;
        flex: 1;
        border: 1px solid #a5a5a5;
        background: #d2e3ff;
        font-weight: 600;
      }
    }
  }

  tbody {
    tr {
      display: flex;

      td {
        padding: 5px;
        flex: 1;
        border: 1px solid #a5a5a5;
        text-align: center;
      }
    }
  }
}
</style>