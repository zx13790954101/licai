<template>
  <div class="tableBox1">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="表格图" name="1">
        <nav class="array_btn">
          <button @click="active1 = 0" :class="active1 == 0 ? 'active' : ''">
            星期
          </button>
          <button @click="active1 = 1" :class="active1 == 1 ? 'active' : ''">
            每天
          </button>
        </nav>
        <section v-for="(item, index) in tableData" :key="index">
          <el-table
            :data="item"
            stripe
            border
            style="width: 100%"
            :default-sort="{ prop: 'timestamp', order: 'descending' }"
          >
            <el-table-column prop="name" fixed="left" label="名称">
            </el-table-column>

            <el-table-column
              prop="inflow"
              v-for="(item, index) in 9"
              :key="index"
              :label="timeDate[index]"
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

            <el-table-column prop="name" fixed="left" label="更多">
              <template #default="{ row }">
                <el-button @click="openDia(row.name)"> 查看操作逻辑 </el-button>
              </template>
            </el-table-column>
          </el-table>
        </section>
      </el-tab-pane>
      <el-tab-pane label="折线图" name="2">
        <histogramFund
          class="section1"
          ref="section1"
          :name="'_section1'"
          :link="''"
          :title="title2"
          :listData="dataList3"
          :timeData="timeDate2"
          :width1="width_all"
          :markLine="markLine"
          :height1="'350px'"
          value=""
        >
        </histogramFund>
      </el-tab-pane>
    </el-tabs>

    <defaultDialog v-model="showDialog" :name="diaName" :datalist="diaData">
    </defaultDialog>
  </div>
</template>

<script>
import {
  bxzt_day,
  zzyh_day,
  qc_day,
  gf_day,
  xny_day,
  xp_day,
  jg_day,
  bj_day,
} from "../lib/api/section.js";
import histogramFund from "./fuCommon/histogramFund.vue";
import $ from "jquery";
import axios from "axios";
export default {
  data() {
    return {
      timeDate2: [],
      dataList3: [],
      width_all: "800px",
      dataList: [],
      title2: "上证指数",
      markLine: [],
      tableData: [],
      showDialog: false,
      activeName: "2",
      diaName: "",
      diaData: [],
      active1: 0,
      this_url:
        "https://flash-api.xuangubao.cn/api/market_indicator/line?fields=limit_up_count,limit_down_count,market_temperature,limit_up_broken_count,limit_up_broken_ratio,rise_count,fall_count,yesterday_limit_up_avg_pcp&date=",
      timeDate: [],
      nameData: ["主力", "主力", "主力", "主力", "主力", "主力"],
      tableData: [],
    };
  },
  created() {
    // var that = this;
    // this.timeDate.forEach((element, index) => {
    //   that.getSection(element, index);
    // });
    let array1 = [
      [bxzt_day, zzyh_day],
      [qc_day, gf_day, xny_day],
      [xp_day, jg_day],
      [bj_day],
    ];
    array1.forEach((item, index) => {
      this.getWeekData(item, index);
    });
    this.timeDate2 = this.timeDate;

    this.diaName = "保险版块";
    this.diaData = ["", ""];
  },
  components: {
    defaultDialog: () => import("./fuCommon/defaultDialog.vue"),
    histogramFund,
  },
  mounted() {
    // this.width_all = document.querySelector(".tableBox1").offsetWidth + "px";
  },
  methods: {
    openDia(name) {
      this.showDialog = true;
    },
    getAjax(url) {
      var htmlobj = $.ajax({
        url: url,
        async: false,
      });
      return htmlobj.responseJSON.data;
    },

    splitData(data, num) {
      let array1 = [];
      data.klines.forEach((item, index) => {
        // if (index > data.klines.length - 10) {
        //   array1.push(item.split(",")[num]);
        // }
        array1.push(item.split(",")[num]);
      });
      return array1;
    },
    getWeekData(name_array, index1) {
      var that = this;
      let end_array = [];
      name_array.forEach((element, index) => {
        let d1 = that.getAjax(element);
        let array_data = that.splitData(d1, 8).reverse();
        that.timeDate = that.splitData(d1, 0);

        let data1 = {
          name: d1.name,
          inflow: array_data,
          num: that.splitData(d1, 2).reverse(),
          array: array_data,
        };

        end_array.push(data1);
        let data2 = {
          name: d1.name,
          inflow: array_data.reverse(),
          num: that.splitData(d1, 2),
          array: array_data.reverse(),
        };
        that.dataList3.push(data2);
      });
      this.tableData[index1] = end_array;
      // let time1 = this.splitTime(d1);
      // let jrqz = this.splitData(d1);
      // let end_arrary = this.dealData2(name_array, time1, jrqz).reverse();
      // this.tableData1 = end_arrary;
      // this.tableData = end_arrary;
    },
    colorDeal(num, type) {
      if (type == 1) {
        if (num > 55) {
          return "rgb(233, 64, 65)";
        } else if (num < 40) {
          return "rgb(5, 166, 135)";
        } else {
          return "";
        }
      }
    },
    dateFormat(fmt, date) {
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    },
    //获取版块的列表
    async getSection(time, index) {
      var that = this;
      var url1 = that.this_url + time;
      await axios.get(url1).then((res) => {
        let data1 = res.data.data[res.data.data.length - 1];
        console.log("time", data1);
        data1.timestamp = this.dateFormat(
          "YYYY-mm-dd ",
          new Date(data1.timestamp * 1000)
        );
        that.tableData.push(data1);
      });
    },
  },
};
</script>
<style lang="scss">
.tableBox1 {
  nav {
    button {
      padding: 5px 10px;
    }

    .active {
      color: #ff5722;
      font-weight: 600;
      font-size: 16px;
    }
  }

  .el-table td.el-table__cell div {
    color: #333333;
    font-weight: 600;
  }

  .array_btn {
    .active {
      color: #ff5722;
      font-weight: 600;
      font-size: 16px;
    }
  }
}
</style>
