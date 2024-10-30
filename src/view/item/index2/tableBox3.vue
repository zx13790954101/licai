<template>
  <div class="tableBox1">
    <nav class="flex-c">
      <span :class="active_type == 1 ? 'active' : ''" @click="toTable(1)"
        >最近</span
      >
      <span :class="active_type == 2 ? 'active' : ''" @click="toTable(2)"
        >周期</span
      >
    </nav>
    <el-table
      :data="tableData"
      @cell-click="headerC"
      border
      style="width: 100%"
    >
      <el-table-column prop="title" fixed="left" label="名称/时间">
      </el-table-column>
      <el-table-column
        prop="inflow"
        v-for="(item, index) in 5"
        :key="index"
        :label="title_array[index]"
        style="color: red"
      >
        <template #default="{ row }">
          <p
            :style="{
              color: row.inflow[index] > 0 ? '#e94041' : '#05a687',
            }"
          >
            {{ row.inflow[index] }}%
          </p>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  hs_URL_day,
  hs_URL_month,
  sz_URL_day,
  sz_URL_month,
  zz_URL_day,
  zz_URL_month,
  zz100_URL_day,
  zz100_URL_month,
  cy_URL_day,
  cy_URL_month,
} from "./../../../lib/api/api_name.js";
import $ from "jquery";
export default {
  data() {
    return {
      active_type: 1,
      title_array: ["沪深300", "上证50", "中证500", "中证1000", "创业50"],
      date_array: ["沪深300", "上证50", "中证500", "中证1000", "创业50"],
      date_array2: ["沪深300", "上证50", "中证500", "中证1000", "创业50"],
      tableData2: [],
      tableData1: [],
      this_data1: null,
      tableData: [],
    };
  },
  created() {
    this.getMonthData();
    this.getDayData();
  },
  methods: {
    dateDeal() {
      let array1 = [];
      let this_time = new Date().getMonth();
      for (var i = 0; i < 6; i++) {
        let item1 = this_time - i + 1;
        if (item1 <= 0) {
          item1 = 12 + item1;
        }
        array1.push(item1 + "月");
      }
      return array1;
    },
    dealData2(name_array, time1, d1) {
      let d2 = this.splitData(this.getAjax(name_array[1]));
      let d3 = this.splitData(this.getAjax(name_array[2]));
      let d4 = this.splitData(this.getAjax(name_array[3]));
      let d5 = this.splitData(this.getAjax(name_array[4]));
      // console.log("jrqz1", jrqz);
      var tableData1 = [];
      time1.forEach((item, index) => {
        tableData1[index] = {
          title: time1[index],
          inflow: [d1[index], d2[index], d3[index], d4[index], d5[index]],
        };
      });
      return tableData1;
    },
    getMonthData() {
      var name_array = [
        hs_URL_month,
        sz_URL_month,
        zz_URL_month,
        zz100_URL_month,
        cy_URL_month,
      ];
      let time1 = this.dateDeal().reverse();
      let d1 = this.splitData(this.getAjax(hs_URL_month));
      let end_arrary = this.dealData2(name_array, time1, d1).reverse();
      this.tableData2 = end_arrary;
    },
    getDayData() {
      var name_array = [
        hs_URL_day,
        sz_URL_day,
        zz_URL_day,
        zz100_URL_day,
        cy_URL_day,
      ];
      var end_array = {};
      let d1 = this.getAjax(hs_URL_day);
      let time1 = this.splitTime(d1);
      let jrqz = this.splitData(d1);
      let end_arrary = this.dealData2(name_array, time1, jrqz).reverse();
      this.tableData1 = end_arrary;
      this.tableData = end_arrary;
    },
    getAjax(url) {
      var htmlobj = $.ajax({
        url: url,
        async: false,
      });
      return htmlobj.responseJSON.data;
    },
    splitData(data) {
      let array1 = [];
      data.klines.forEach((item, index) => {
        if (index > data.klines.length - 7) {
          array1.push(item.split(",")[8]);
        }
      });
      return array1;
    },
    splitTime(data) {
      let array1 = [];
      data.klines.forEach((item, index) => {
        if (index > data.klines.length - 7) {
          array1.push(item.split(",")[0]);
        }
      });
      return array1;
    },
    headerC(row) {
      console.log(row);
    },
    toTable(index) {
      this.active_type = index;
      if (index == 1) {
        this.tableData = this.tableData1;
        this.title_array = this.date_array;
      } else {
        this.tableData = this.tableData2;
        this.title_array = this.date_array2;
      }
    },
  },
};
</script>
<style lang="scss">
.tableBox1 {
  margin-top: 5px;
  border: 2px solid #8b8b8b;
  .el-table tr {
    // background-color: #d3d3d3;
  }
  .el-collapse-item__content {
    padding-bottom: 10px;
  }
  .el-table .el-table__cell {
    border-bottom: 1px solid #949494;
    border-right: 1px solid #000000;
    padding: 0px 0px;
  }
  .el-table--border .el-table__cell:first-child .cell {
    padding: 5px 5px;
  }
  .el-table th.el-table__cell {
    padding: 5px 0px;
    background-color: #ffc107;
    color: black;
  }
  .el-table--border .el-table__cell:first-child .cell {
    font-weight: 600;
    height: auto;
  }
  P {
    font-weight: 600;
  }
  nav {
    span {
      padding: 5px 10px;
    }
    .active {
      color: #ff5722;
      font-weight: 600;
      font-size: 16px;
    }
  }
}
</style>
