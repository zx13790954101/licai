<template>
  <div class="tableBox1">
    <!-- <nav class="flex-c">
      <span :class="active_type == 1 ? 'active' : ''" @click="toTable(1)"
        >最近</span
      >
      <span :class="active_type == 2 ? 'active' : ''" @click="toTable(2)"
        >周期</span
      >
    </nav> -->
    <!-- <el-table
      :data="tableData"
      @cell-click="headerC"
      border
      style="width: 100%"
    >
      <el-table-column prop="title" fixed="left" label="名称/时间">
      </el-table-column>
      <el-table-column
        prop="inflow"
        v-for="(item, index) in 4"
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
    </el-table> -->

    <histogramFund
      v-if="listData4.length > 0"
      :name="'_fundView_tablebox2'"
      :link="'https://data.eastmoney.com/hsgtcg/gzcglist.html?t2=101&t3=1'"
      :title="title4"
      :listData="listData4"
      :timeData="timeData4"
      :width1="'800px'"
      :height1="'500px'"
      value=""
      :thame="'dark'"
      :markPoint="markPoint2"
    >
    </histogramFund>

    <!-- <histogramFund
      v-if="num_listData.length > 0"
      :name="'_fundView_tablebox3'"
      :link="'https://data.eastmoney.com/hsgtcg/gzcglist.html?t2=101&t3=1'"
      :title="title4"
      :listData="num_listData"
      :timeData="timeData4"
      :width1="'800px'"
      :height1="'700px'"
      :typeline="'1'"
      value=""
    ></histogramFund> -->
  </div>
</template>

<script>
import {
  szzs_URL_day,
  szzs_URL_month,
  szcz_URL_day,
  szcz_URL_month,
  cyb_URL_day,
  cyb_URL_month,
  kc_URL_day,
  kc_URL_month,
} from "./../../../lib/api/api_name.js";

import { dealData } from "./../../fuCommon/getUrl";
import histogramFund from "../../fuCommon/histogramFund.vue";
import $ from "jquery";
export default {
  data() {
    return {
      active_type: 1,
      title_array: ["上证指数", "深证成指", "创业板", "科创50"],
      date_array: ["上证指数", "深证成指", "创业板", "科创50"],
      date_array2: ["上证指数", "深证成指", "创业板", "科创50"],
      tableData2: [],
      tableData1: [],
      this_data1: null,
      tableData: [],
      listData4: [],
      listData4_1: [],
      timeData4: [],
      timeData4_1: [],
      title4: null,
      title4_1: null,
      //金额的数组
      tableData_money: [],
      num_listData: [],
      num_timeData: [],
      markPoint2: [],
    };
  },
  created() {
    //this.getMonthData();
    this.getDayData();
  },
  components: {
    histogramFund,
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
    dealData2(name_array, time1, d1, type) {
      let d2 = this.splitData(this.getAjax(name_array[1]), type);
      let d3 = this.splitData(this.getAjax(name_array[2]), type);

      let d4 = this.splitData(this.getAjax(name_array[3]), type);

      var tableData1 = [];
      time1.forEach((item, index) => {
        tableData1[index] = {
          title: time1[index],
          inflow: [d1[index], d2[index], d3[index], d4[index]],
        };
      });
      return tableData1;
    },
    getMonthData() {
      var name_array = [
        szzs_URL_month,
        szcz_URL_month,
        cyb_URL_month,
        kc_URL_month,
      ];
      let time1 = this.dateDeal().reverse();
      let d1 = this.splitData(this.getAjax(szzs_URL_month));
      let end_arrary = this.dealData2(name_array, time1, d1).reverse();
      this.tableData2 = end_arrary;
    },
    getDayData() {
      var name_array = [szzs_URL_day, szcz_URL_day, cyb_URL_day, kc_URL_day];
      var end_array = {};
      let d1 = this.getAjax(szzs_URL_day);
      let time1 = this.splitTime(d1);
      let jrqz = this.splitData(d1, 1);
      let end_arrary = this.dealData2(name_array, time1, jrqz, 1).reverse();
      this.tableData1 = end_arrary;
      this.tableData = end_arrary;
      this.dealMoney();
    },
    setMarkPoint(this_data, data1, data2, time1) {
      let array1 = [];
      let type1 = ["买进", "卖出", "持有", "加仓", "等待"];
      this_data.forEach((item, index) => {
        let this_item = parseFloat(this_data[index] - this_data[index - 1]);
        let data2_item = parseFloat(data2[index] - data2[index - 1]);
        let big_this = this_item > 0;
        let iflag1_item1 =
          big_this &&
          data2_item > 0 &&
          data1[index] > 0 &&
          data1[index - 2] > 0 &&
          data1[index - 1] < 0;
        let iflag1 = iflag1_item1;
        let iflag2_item1 =
          this_item < 0 &&
          data1[index] < 0 &&
          data2_item < 0 &&
          this_data[index - 1] - this_data[index - 2] < 0 &&
          data1[index - 1] < 0 &&
          this_data[index - 2] - this_data[index - 3] < 0 &&
          data1[index] - data1[index - 1] > 0;
        let iflag2_item2 =
          this_item < 0 &&
          data1[index] < 0 &&
          data2_item > 0 &&
          data1[index - 1] > 0 &&
          data1[index] < -0.3 &&
          data2[index - 1] - data2[index - 2] < 0 &&
          data1[index - 2] < 0;
        let iflag2 = iflag2_item1 || iflag2_item2;

        if (iflag1) {
          let item1 = {
            name: "买卖操作逻辑",
            value: type1[1],
            xAxis: time1[index],
            yAxis: parseFloat(item),
            itemStyle: {
              color: "red",
            },
          };
          array1.push(item1);
        } else if (iflag2) {
          let item1 = {
            name: "买卖操作逻辑",
            value: type1[0],
            xAxis: time1[index],
            yAxis: parseFloat(item),
          };
          array1.push(item1);
        }
      });
      return [
        {
          data: array1,
        },
      ];
    },
    //金额
    dealMoney() {
      let array1 = [];
      let array2 = [];
      let array3 = [];
      let array4 = [];
      this.tableData_money[0].num.forEach((item, index) => {
        let item1 = parseFloat(item);
        let item2 = parseFloat(this.tableData_money[1].num[index]);
        let item3 = parseFloat(this.tableData_money[2].num[index]);
        array1.push((item1 + item2 + item3).toFixed(2));
        array2.push(item1.toFixed(2));
        array3.push(item2.toFixed(2));
        array4.push(item3.toFixed(2));
      });
      this.listData4.push({
        num: array1,
        time: this.tableData_money[0].time,
        name: "两市成交额",
      });

      this.markPoint2 = this.setMarkPoint(
        this.listData4[0].num,
        this.listData4[1].num,
        this.listData4[2].num,
        this.listData4[0].time
      );

      // this.listData4.push({
      //   num: array2,
      //   time: this.tableData_money[0].time,
      //   name: "上证指数成交额",
      // });
      // this.listData4.push({
      //   num: array3,
      //   time: this.tableData_money[0].time,
      //   name: "深证成指成交额",
      // });
      // this.listData4.push({
      //   num: array4,
      //   time: this.tableData_money[0].time,
      //   name: "创业板成交额",
      // });

      // this.num_listData.push({
      //   num: array2,
      //   time: this.tableData_money[0].time,
      //   name: "上证指数成交额",
      // });
      // this.num_listData.push({
      //   num: array3,
      //   time: this.tableData_money[0].time,
      //   name: "深证成指成交额",
      // });
      // this.num_listData.push({
      //   num: array4,
      //   time: this.tableData_money[0].time,
      //   name: "创业板成交额",
      // });
    },
    getAjax(url) {
      var htmlobj = $.ajax({
        url: url,
        async: false,
      });
      return htmlobj.responseJSON.data;
    },
    splitData(data, type) {
      let array1 = [];
      if (type) {
        //设计

        let item1 = dealData(data.klines, 2, data.name, 2);

        if (data.name == "上证指数") {
          let data_zdf = dealData(data.klines, 2, "涨跌幅", 8, "bar", 2);
          let data_cje = dealData(data.klines, 2, "成交额(亿)", 6);
          this.listData4.push(item1);
          this.listData4.push(data_zdf);
          //   this.listData4.push(data_cje);
        }

        this.tableData_money.push(dealData(data.klines, 2, data.name, 6));
        this.timeData4 = this.listData4[0].time;
      }

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
    headerC(row) {},
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

  .el-table .el-table__cell {
    border-bottom: 1px solid #949494;
    border-right: 1px solid #000000;
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
