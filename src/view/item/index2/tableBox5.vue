<template>
  <div class="tableBox1">
    <!-- <calculateStopLossBox
      v-if="calculateStopLoss1 != null"
      :calculateStopLossData="calculateStopLoss1"
      :this_name="this_name"
      :input_name1="input_name"
    >
    </calculateStopLossBox>
    <histogramFund
      ref="tableBox5"
      :name="'_tableBox5'"
      :link="''"
      :title="title2"
      :listData="dataList3"
      :timeData="timeDate"
      :width1="width_all"
      :markLine="markLine"
      :height1="'550px'"
      :markPoint="markPoint1"
      :areaStyle="areaStyle1"
      value=""
    >
    </histogramFund> -->

    <el-tabs :tab-position="tabPosition" v-model="activeName">
      <el-tab-pane label="是否突破趋势" name="first">
        <calculateHistogram
          v-if="fund1_data != null"
          :props_dataList="fund1_data"
          :input_name1="input_name"
          :this_name="this_name"
          :class_name="'_tableBox5'"
          :pointState="'1'"
        >
        </calculateHistogram>
      </el-tab-pane>
      <el-tab-pane label="买入位置" name="second">
        <decreaseHistogram
          v-if="activeName == 'second'"
          :day_data_array="day_data_array"
          :indexfun1="day_data_array"
        >
        </decreaseHistogram>
      </el-tab-pane>
    </el-tabs>
    <!-- <el-card class="box-card">
      <div class="flex-c">
        <div class="flex-item">
          <span> </span>
          <el-divider></el-divider>
          <el-button type="danger" plain>需要数据补充，</el-button>
        </div>
      </div>
    </el-card> -->
  </div>
</template>

<script>
import { getAjax, orchesData } from "../../../assets/common.js";
import { szzs_url } from "../../../lib/api/api_url.js";
import cjjg_json from "./json/cjjg.json";
import tableBox5_json from "./json/tableBox5.json";
import histogramFund from "../../fuCommon/histogramFund.vue";
import initCaculate from "../../fuCommon/js/calculateStopLoss";
import calculateStopLossBox from "../../fuCommon/common/calculateStopLoss.vue";
import { initMaxMin30 } from "../../fuCommon/js/dealCalculateStopLoss.js";
import { dealPoint } from "../../fuCommon/common/util.js";

import calculateHistogram from "../../fuCommon/common/calculateHistogram.vue";
import decreaseHistogram from "../../fuCommon/common/decreaseHistogram.vue";
import indexFun from "./../../fuCommon/js/indexFun.js";
export default {
  data() {
    return {
      tabPosition: "left",
      timeDate: [],
      dataList3: [],
      width_all: "800px",
      dataList: [],
      title2: "上证指数",
      markLine: [],
      markPoint1: [],
      tableData: [],
      areaStyle1: [],
      input_name: "000001",
      this_name: "上证指数",
      calculateStopLoss1: null,
      fund1_data: null,
      day_data_array: null,
      activeName: "first",
    };
  },
  created() {
    this.init();
  },
  mounted() {
    this.width_all = document.querySelector(".tableBox1").offsetWidth + "px";
  },
  components: {
    histogramFund,
    calculateStopLossBox,
    calculateHistogram,
    decreaseHistogram,
  },
  methods: {
    //主力资金解析：
    dealZlzj(data, type) {
      let array1 = [];
      let array2 = [];
      let array3 = [];
      let array4 = [];
      let array5 = [];
      data.forEach((item, index) => {
        let r0_in_out = item.r0_in - item.r0_out;
        let r1_in_out = item.r1_in - item.r1_out;
        array5.push(
          ((parseFloat(r0_in_out) + parseFloat(r1_in_out)) / 100000000).toFixed(
            2
          )
        );
        array1.push(parseFloat(r0_in_out / 100000000).toFixed(2));
        array2.push(parseFloat(r1_in_out / 100000000).toFixed(2));
        array3.push(
          parseFloat((item.r2_in - item.r2_out) / 100000000).toFixed(2)
        );
        array4.push(
          parseFloat((item.r3_in - item.r3_out) / 100000000).toFixed(2)
        );
      });

      return {
        zljlr: array5.reverse(), //主力净流入
        tddlr: array1.reverse(), //特大单流入
        ddlr: array2.reverse(), //大单流入
        zdlr: array3.reverse(), //中单流入
        xdlr: array4.reverse(), //小单流入
      };
    },
    dealData(data2, type, name, num) {
      let num2 = 100;
      let that = this;
      let array2 = [];
      let time1 = [];
      let num1 = [];
      data2.forEach((element2, index2) => {
        if (type == 1) {
          array2.push(element2[6].toFixed(2));
          time1.push(dateFormat("YYYY-mm-dd", new Date(element2[9] * 1000)));
          num1.push(element2[1]);
        } else if (type == 2) {
          array2.push(element2.split(",")[8]);
          time1.push(element2.split(",")[0]);

          if (num == 6) {
            num1.push(
              (parseInt(element2.split(",")[num]) / 10000000).toFixed(2)
            );
          } else {
            num1.push(element2.split(",")[num]);
          }
        } else if (type == 3) {
          num1.push((element2.split(",")[num] / 100000000).toFixed(2));
        }
      });

      let object1 = {
        name: name,
        num: num1,
        time: time1,
        array: array2,
      };
      return object1; 
    },
    dealCjjg(data) {
      data.forEach((item, index) => {});
    },
    //处理url
    url1(num1, num2) {
      //修改数据流量
      return (
        "https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=" +
        num1 +
        "&fields1=f1,f2,f3,f4,f5&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&lmt=" +
        num2 +
        "&klt=101&fqt=1&end=30000101"
      );
    },
    init() {
      let indexfun1 = indexFun.initDataShares("000001");

      this.day_data_array = JSON.parse(JSON.stringify(indexfun1));

      let szzs = getAjax(szzs_url);
      szzs = szzs.responseJSON.data;
      let end_num = tableBox5_json.hlcm.length;

      szzs = this.dealData(szzs.klines, 2, szzs.name, 2);

      let szzs_array1 = getAjax(this.url1("1.000001", 504)).responseJSON.data;
      let szzs_array2 = this.dealData(
        szzs_array1.klines,
        2,
        szzs_array1.name,
        2
      );
      // let data2222 = this.dealZlzj(
      //   getAjax(
      //     "https://stock.sina.com.cn/stock/api/openapi.php/TouziService.getHistoryFlow?page=1&num=500&orderby=zd&ordertype=desc"
      //   ).responseJSON.result.data.data
      // );

      this.dataList3.push(szzs_array2);
      this.timeDate = szzs_array2.time;

      //处理弹出框
      this.fund1_data = {
        klines: szzs_array1.klines,
        name: szzs_array1.name,
        time: szzs_array2.time,
        num: szzs_array2.num,
        array: szzs_array2.array,
      };

      let calculateStopLoss = initCaculate.calculateStopLoss2(
        [
          {
            klines: szzs_array1.klines,
          },
        ],
        szzs_array1.klines,
        null,
        "",
        this.timeDate
      );
      this.calculateStopLoss1 = calculateStopLoss;

      this.dataList3.push({
        num: calculateStopLoss.deal_data2.zsw_array.reverse(),
        name: "止损位",
        yAxisIndex: false,
      });
      this.dataList3.push({
        num: calculateStopLoss.deal_data2.zcw_array.reverse(),
        name: "支撑位",
        yAxisIndex: false,
      });
      this.dataList3.push({
        num: calculateStopLoss.deal_data2.zcw3.reverse(),
        name: "近30日支撑位",
        yAxisIndex: false,
      });
      this.dataList3.push({
        num: calculateStopLoss.deal_data2.max_num1.reverse(),
        name: "近30日最高价",
        yAxisIndex: false,
      });
      this.dataList3.push({
        num: calculateStopLoss.deal_data2.min_num1.reverse(),
        name: "近30日最低价",
        yAxisIndex: false,
      });

      let initMax_data = initMaxMin30(
        JSON.parse(JSON.stringify(calculateStopLoss))
      );

      console.log(
        "计算最大值横盘周期",
        initMax_data.period_30_max_num_level.num
      );
      this.markPoint1 = [
        {},
        {},
        {},
        {},
        {
          data: dealPoint(initMax_data.max_num_level_item30.num, 1),
        },
        {
          data: dealPoint(initMax_data.min_num_level_item30.num, 0),
        },
      ];
      this.areaStyle1 = [{}, null, null, null, null];

      // this.dataList3.push({
      //   array: [],
      //   num: tableBox5_json.hlcm.reverse(),
      //   name: "获利筹码",
      //   time: [],
      // });
      // this.dataList3.push({
      //   array: [],
      //   num: tableBox5_json.pjcm.reverse(),
      //   name: "平均筹码",
      //   time: [],
      // });

      // this.dataList3.push({
      //   array: [],
      //   num: tableBox5_json.jzd.reverse(),
      //   name: "集中度",
      //   time: [],
      // });
    },
  },
};
</script>
<style lang="scss">
.tableBox1 {
  margin-top: 5px;

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
