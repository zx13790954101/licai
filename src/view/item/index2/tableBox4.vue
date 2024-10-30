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

    <histogramFund
      v-if="listData4.length > 0"
      :name="'_fundView_tablebox4'"
      :link="'https://data.eastmoney.com/hsgtcg/gzcglist.html?t2=101&t3=1'"
      :title="title4"
      :listData="listData4"
      :timeData="timeData4"
      :width1="'800px'"
      :height1="'700px'"
      value=""
      :thame="'dark'"
      :markPoint="markPoint2"
    >
    </histogramFund>
  </div>
</template>

<script>
import {
  jrqz_URL_day,
  jrqz_URL_month,
  xfqz_URL_day,
  xfqz_URL_month,
  xny_URL_day,
  xny_URL_month,
  ysjs_URL_day,
  ysjs_URL_month,
  ny_URL_day,
  ny_URL_month,
} from "./../../../lib/api/api_name.js";
import histogramFund from "../../fuCommon/histogramFund.vue";
import $ from "jquery";
export default {
  data() {
    return {
      active_type: 1,
      title_array: ["消费", "科技(新能源)", "能源", "金融", "有色金属"],
      date_array: ["消费", "科技(新能源)", "能源", "金融", "有色金属"],
      date_array2: ["消费", "科技(新能源)", "能源", "金融", "有色金属"],
      tableData2: [],
      tableData1: [],
      tableData: [],
      this_data1: null,
      timeData4: [],
      timeData4_1: [],
      title4: null,
      title4_1: null,
      markPoint2: [],
    };
  },

  created() {
    this.getMonthData();
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
        if (item1 == 0) {
          item1 = 12;
        } else if (item1 == -1) {
          item1 = 11;
        } else if (item1 == -2) {
          item1 = 10;
        } else if (item1 == -3) {
          item1 = 9;
        } else if (item1 == -4) {
          item1 = 8;
        } else if (item1 == -5) {
          item1 = 7;
        }
        array1.push(item1 + "月");
      }
      return array1;
    },
    dealData2(name_array, time1, jrqz) {
      let xfqz = this.splitData(this.getAjax(name_array[0]));
      let xny = this.splitData(this.getAjax(name_array[1]));
      let ny = this.splitData(this.getAjax(name_array[2]));
      let ysjs = this.splitData(this.getAjax(name_array[4]));
      // console.log("jrqz1", jrqz);
      var tableData1 = [];
      time1.forEach((item, index) => {
        tableData1[index] = {
          title: time1[index],
          inflow: [
            xfqz[index],
            xny[index],
            ny[index],
            jrqz[index],
            ysjs[index],
          ],
        };
      });
      return tableData1;
    },
    getMonthData() {
      var name_array = [
        xfqz_URL_month,
        xny_URL_month,
        ny_URL_month,
        jrqz_URL_month,
        ysjs_URL_month,
      ];
      let time1 = this.dateDeal().reverse();
      let jrqz = this.splitData(this.getAjax(jrqz_URL_month));
      let end_arrary = this.dealData2(name_array, time1, jrqz).reverse();
      this.tableData2 = end_arrary;
    },
    getDayData() {
      var name_array = [
        xfqz_URL_day,
        xny_URL_day,
        ny_URL_day,
        jrqz_URL_day,
        ysjs_URL_day,
      ];
      var end_array = {};
      let jrqz1 = this.getAjax(jrqz_URL_day);
      let time1 = this.splitTime(jrqz1);
      let jrqz = this.splitData(jrqz1);
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
  margin-top: 10px;

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
